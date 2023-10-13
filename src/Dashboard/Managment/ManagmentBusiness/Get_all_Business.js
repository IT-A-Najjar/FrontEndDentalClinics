import React, { useState, useEffect } from "react";
import Navbar from '../Navbar/Navbar';
import http from '../../../http';
import Add_Business from "./Add_Business";
import p2 from '../../../assets/عيادة.jpg'
import ReactPaginate from 'react-paginate';
import './pagination.css';
import Loding from "../Loding";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Get_all_Business() {
    const user_id = sessionStorage.getItem("id");
    const [users, setUsers] = useState([]);
    const [done, setDone] = useState(false);
    const [errore, setErrore] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        image: "",
        is_active: 0,
        user_id: user_id
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
        console.log(value);
    };

    const handleSubmit = async (event) => {
        console.log("ok");
        event.preventDefault();
    
        if (formData.title === "" || formData.description === "" || formData.image === "") {
            setErrore(true);
            setDone(false);
            return;
        }
    
        // const formDataToSend = new FormData();
        // formDataToSend.append("title", formData.title);
        // formDataToSend.append("description", formData.description);
    
        // if (formData.image) {
        //     formDataToSend.append("image", formData.image);
        // }
    
        await http.post('/businessall', formData)
            .then((res) => {
                setErrore(false);
                setDone(true);
                handleClose(); // إغلاق النافذة المنبثقة بعد الإضافة بنجاح
                // قد تحتاج إلى إعادة تحميل البيانات بعد الإضافة
            })
            .catch(err => {
                setErrore(true);
                setDone(false);
            });
    };

    const [business, setBusiness] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5;
    const [totalPages, setTotalPages] = useState(0);
    useEffect(() => {
        fetchAllBusiness();
       // fetchAllUsers();
    },);

    const fetchAllBusiness = async () => {
        await http.get(`/business?limit=${itemsPerPage}&page=${currentPage + 1}`)
            .then((res) => {
                if (res.status === 200) {
                    setBusiness(res.data.business);
                    setTotalPages(res.data.totalPages);
                    setLoading(false);
                } else {
                    console.error("البيانات المسترجعة غير صالحة: ", res.status);
                }
            })
            .catch((error) => {
                console.error("حدث خطأ أثناء جلب البيانات: ", error);
            });
    };

    const deleteState = async (e, id) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;
        thisClicked.innerText = "جار الحذف...";

        await http.delete(`/business/${id}`)
            .then(res => {
                alert(res.data.message);
                const updatedBusiness = business.filter(item => item.id !== id);
                setBusiness(updatedBusiness);
            })
            .catch(err => {
                if (err.response) {
                    if (err.response.status === 404) {
                        alert(err.response.data.message);
                        thisClicked.innerText = "تم الحذف بنجاح ";
                    }
                    if (err.response.status === 500) {
                        alert(err.response.data);
                    }
                }
            });
    };

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    const [ShowUpdate, setShowUpdate] = useState(false);
    const handleCloseUpdate = () => setShowUpdate(false);
    const handleShowUpdate = () => setShowUpdate(true);
    const [ShowDelete, setShowDelete] = useState(false);
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = () => setShowDelete(true);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Navbar
                addPath='/ManagmentBusiness'
                showPath='/showBusiness'
                addElement={<Add_Business />}
                showElement={<Get_all_Business />}
            />
            <Button className="color_add" variant='' onClick={handleShow}>
                إضافة عمل
            </Button>
            <Modal show={show} onHide={handleClose} dir="rtl">
                <Modal.Header className='left_close'>
                    <Modal.Title>إضافة عمل</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <i className='bx bxs-home-alt-2 bx_user' ></i>
                            </div>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="العنوان"
                                onChange={handleChange}
                                name="title"
                            />
                        </div>

                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <i className='bx bxs-notepad bx_user'></i>
                            </div>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="وصف العمل"
                                name="description"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <i className="bx bxs-image-add bx_user"></i>
                            </div>
                            <input
                                type="file"
                                className="form-control"
                                name="image"
                                onChange={handleChange}
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
            {loading == true ? (
                <center>
                    {loading && <Loding />}
                </center>
            ) : (
                <div className="tablemodel">
                    <table>
                        <thead>
                            <tr>
                                <th>الرقم</th>
                                <th>العنوان</th>
                                <th>الوصف</th>
                                <th>الصورة</th>
                                <th>الدكتور</th>
                                <th className="tran_bu">العملية</th>
                            </tr>
                        </thead>
                        <tbody className="table-hover">
                            {business.map((busines, index) => (
                                <tr key={busines.id}>
                                    <td className="text-left">{(currentPage * itemsPerPage) + index + 1}</td>
                                    <td className="text-left">{busines.title}</td>
                                    <td className="text-left">{busines.description}</td>
                                    <td className="text-left">
                                        <img src={p2} className="image_card2" alt="صورة العمل" />
                                    </td>
                                    <td className="text-left">{busines.user?.name}</td>
                                    <td>
                                        <Button className="color_add" variant='' onClick={handleShowUpdate}>
                                            تعديل
                                        </Button>
                                        <Button variant="danger" onClick={handleShowDelete}>
                                            حذف
                                        </Button>
                                        <Modal
                                            show={ShowDelete}
                                            onHide={handleCloseDelete}
                                            backdrop="static"
                                            keyboard={false}
                                        >
                                            <Modal.Header dir="rtl">
                                                <Modal.Title>حذف العنصر المحدد</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body dir="rtl">
                                                هل تريد حذف العنصر
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={handleCloseDelete}>
                                                    اغلاق
                                                </Button>
                                                <Button variant="danger" onClick={deleteState}>حذف</Button>
                                            </Modal.Footer>
                                        </Modal>
                                        <Modal show={ShowUpdate} onHide={handleCloseUpdate} dir="rtl">
                                            <Modal.Header className='left_close'>
                                                <Modal.Title>إضافة عمل</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <Form onSubmit={handleSubmit}>
                                                    <div className="input-group mb-3">
                                                        <div className="input-group-prepend">
                                                            <i className='bx bxs-home-alt-2 bx_user' ></i>
                                                        </div>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="العنوان"
                                                            onChange={handleChange}
                                                            name="title"
                                                        />
                                                    </div>
                                                    <div className="input-group mb-3">
                                                        <div className="input-group-prepend">
                                                            <i className='bx bxs-notepad bx_user'></i>
                                                        </div>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="وصف العمل"
                                                            name="description"
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                    <div className="input-group mb-3">
                                                        <div className="input-group-prepend">
                                                            <i className="bx bxs-image-add bx_user"></i>
                                                        </div>
                                                        <input
                                                            type="file"
                                                            className="form-control"
                                                            name="image"
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                </Form>
                                            </Modal.Body>
                                            <Modal.Footer dir='ltr'>
                                                <Button variant="secondary" onClick={handleCloseUpdate}>
                                                    Close
                                                </Button>
                                                <Button type='submit' className='button-seve' onClick={handleCloseUpdate}>
                                                    Save
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>
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
        </>
    );
}

export default Get_all_Business;
