import React, { useState, useEffect } from "react";
import Navbar from '../Navbar/Navbar';
import "../ManagmentUsers/Add_doctor.css";
import http from '../../../http';
import '../Navbar/App.css';
import { ToastContainer, toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import '../ManagmentBusiness/pagination.css';
import Loding from "../Loding";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import File_sick from "./File_sick";
import { Link, useNavigate } from 'react-router-dom';
import { Router } from "react-router-dom";

function Get_all_sicks() {
    const user_id = sessionStorage.getItem("id");
    const privilege = sessionStorage.getItem("privilege");
    const [pateints, setPateints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5;
    const [totalPages, setTotalPages] = useState(0);
    const [done, setDone] = useState(false);
    const [errore, setErrore] = useState(false);

    const [formData, setFormData] = useState({
        full_name: "",
        age: "",
        phone_number: "",
        user_id: user_id,
    });

    const [selectedPatient, setSelectedPatient] = useState(null);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
        console.log(value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await http.post('/pateintWithUser', formData)
            .then((res) => {
                toast.success('تم الإضافة بنجاح');
                setLoading(false);
                fetchAllUsers();
            })
            .catch(err => {
                setErrore(true);
                setDone(false);
            });
        handleClose();
    }

    useEffect(() => {
        fetchAllUsers();
    }, [currentPage]);

    const fetchAllUsers = async () => {
        if (privilege != 1) {
            await http.post(`/allpatientforuser?limit=${itemsPerPage}&page=${currentPage + 1}`, { user_id: user_id })
                .then((res) => {
                    if (res.status === 200) {
                        setPateints(res.data.allpatientforuser);
                        setTotalPages(res.data.totalPages);
                        setLoading(false);
                    } else {
                        console.error("البيانات المسترجعة غير صالحة: ", res.status);
                    }
                })
                .catch((error) => {
                    console.error("حدث خطأ أثناء جلب البيانات: ", error);
                });

        } else {
            console.log(user_id);
            await http.get(`/allpatenits?limit=${itemsPerPage}&page=${currentPage + 1}`)
                .then((res) => {
                    if (res.status === 200) {
                        setPateints(res.data.patients);
                        setTotalPages(res.data.totalPages);
                        setLoading(false);
                    } else {
                        console.error("البيانات المسترجعة غير صالحة: ", res.status);
                    }
                })
                .catch((error) => {
                    console.error("حدث خطأ أثناء جلب البيانات: ", error);
                });
        }
    };

    const deleteState = async (id) => {
        try {
            await http.delete(`/pateints/${id}`)
            toast.error('تم الحذف بنجاح');
            fetchAllUsers();
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error('حدث خطأ أثناء الحذف');
            }
        }
        handleCloseDelete();
    };

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    const handleShowUpdate = (patient) => {
        setFormData(patient);
        setSelectedPatient(patient);
        setShowUpdate(true);
    };

    const handleCloseUpdate = () => {
        setSelectedPatient(null);
        setShowUpdate(false);
    };

    const handleUpdate = async () => {
        try {
            await http.post(`/pateints/${selectedPatient.id}`, {
                full_name: formData.full_name,
                age: formData.age,
                phone_number: formData.phone_number,
            });
            toast.success('تم التعديل بنجاح');
            fetchAllUsers();
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error('حدث خطأ أثناء التعديل');
            }
        }
        handleCloseUpdate();
    };

    const handleShowDelete = (patient) => {
        setSelectedPatient(patient);
        setShowDelete(true);
    };

    const handleCloseDelete = () => {
        setSelectedPatient(null);
        setShowDelete(false);
    };

    const handleDelete = async () => {
        try {
            await http.delete(`/pateints/${selectedPatient.id}`);
            toast.error('تم الحذف بنجاح');
            fetchAllUsers();
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error('حدث خطأ أثناء الحذف');
            }
        }
        handleCloseDelete();
    };
    const Navigate = useNavigate();

    const handlePateintClick = (pateintID) => {
        // يمكنك هنا تنفيذ العمليات التي تحتاج إلى subjectID مثل الانتقال إلى الصفحة الأخرى
        console.log("تم النقر على الدورة بمعرف:", pateintID);
        // setSubjectID(subjectID); // تحديث subjectID
        Navigate(`/File_sick`, { state: { id: pateintID } }); // التوجيه إلى صفحة Subject مع subjectID

    };

    const [ShowUpdate, setShowUpdate] = useState(false);
    const [ShowDelete, setShowDelete] = useState(false);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button className="color_add" variant='' onClick={handleShow}>
                إضافة مريض
            </Button>
            <Modal show={show} onHide={handleClose} dir="rtl">
                <Modal.Header className='left_close'>
                    <Modal.Title>إضافة مريض</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <i class='bx bxs-user bx_user'></i>
                            </div>
                            <input
                                type="text"
                                name="full_name"
                                onChange={handleChange}
                                className="form-control"
                                placeholder="اسم المريض الكامل"
                            />
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <i className="bx bxs-time-five bx_user"></i>
                            </div>
                            <input
                                type="number"
                                name="age"
                                onChange={handleChange}
                                className="form-control"
                                placeholder="العمر"
                            />
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <i class='bx bxs-phone bx_user'></i>
                            </div>
                            <input
                                type="text"
                                name="phone_number"
                                onChange={handleChange}
                                className="form-control"
                                placeholder="+90xxxxxxxx"
                            />
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer dir='ltr'>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button type='submit' className='button-seve' onClick={handleSubmit}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer />
            {loading ? (
                <center>
                    <Loding />
                </center>
            ) : (
                <div className="tablemodel">
                    <table>
                        <thead>
                            <tr>
                                <th>الرقم</th>
                                <th> اسم المريض</th>
                                <th>العمر </th>
                                <th>رقم التيلفون </th>
                                <th>رمز المريض</th>
                                <th>الطبيب</th>
                                <th>العملية</th>
                            </tr>
                        </thead>
                        <tbody className="table-hover">
                            {pateints.map((patient, index) => (
                                <tr key={index}>
                                    <td className="text-left">{++index}</td>
                                    <td className="text-left">{patient.full_name}</td>
                                    <td className="text-left">{patient.age}</td>
                                    <td className="text-left">{patient.phone_number}</td>
                                    <td className="text-left">{patient.symbol}</td>
                                    <td className="text-left">{patient.user?.name}</td>
                                    <td>
                                        <Button className="color_add" variant='' onClick={() => handleShowUpdate(patient)}>
                                            تعديل
                                        </Button>
                                        <Button variant="danger" onClick={() => handleShowDelete(patient)}>
                                            حذف
                                        </Button>
                                        <Button variant="success"  onClick={() => { handlePateintClick(patient.id) }}>
                                            عرض إضبارة المريض
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <ReactPaginate
                        previousLabel={"السابق"}
                        nextLabel={"التالي"}
                        pageCount={totalPages}
                        onPageChange={handlePageChange}
                        containerClassName={"pagination"}
                        activeClassName={"active"}
                    />
                   
                 </div>
            )}
            <Modal show={ShowDelete} onHide={handleCloseDelete} backdrop="static" keyboard={false}>
                <Modal.Header dir="rtl">
                    <Modal.Title>حذف العنصر المحدد</Modal.Title>
                </Modal.Header>
                <Modal.Body dir="rtl">هل تريد حذف العنصر؟</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDelete}>
                        اغلاق
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        حذف
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={ShowUpdate} onHide={handleCloseUpdate} dir="rtl">
                <Modal.Header className='left_close'>
                    <Modal.Title>تعديل بيانات المريض</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleUpdate}>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <i class='bx bxs-user bx_user'></i>
                            </div>
                            <input
                                type="text"
                                name="full_name"
                                value={formData.full_name}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="اسم المريض الكامل"
                            />
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <i className="bx bxs-time-five bx_user"></i>
                            </div>
                            <input
                                type="number"
                                name="age"
                                value={formData.age}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="العمر"
                            />
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <i class='bx bxs-phone bx_user'></i>
                            </div>
                            <input
                                type="text"
                                name="phone_number"
                                value={formData.phone_number}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="+90xxxxxxxx"
                            />
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer dir='ltr'>
                    <Button variant="secondary" onClick={handleCloseUpdate}>
                        Close
                    </Button>
                    <Button type='submit' className='button-seve' onClick={handleUpdate}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Get_all_sicks;
