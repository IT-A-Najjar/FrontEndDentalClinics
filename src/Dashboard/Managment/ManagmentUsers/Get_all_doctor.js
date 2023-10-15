import React, { useState, useEffect } from "react";
import Navbar from '../Navbar/Navbar'
import "../ManagmentUsers/Add_doctor.css";
import Add_doctor from "./Add_doctor";
import p2 from '../../../assets/p2.jpg'
import http from '../../../http';
import '../Navbar/App.css'
import { Link } from "react-router-dom";
import '../ManagmentBusiness/pagination.css';
import ReactPaginate from 'react-paginate';
import Loding from "../Loding";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';
import Form from 'react-bootstrap/Form';


function Get_all_doctor() {
    const privilegeStatus = sessionStorage.getItem("privilege");

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5;
    const [totalPages, setTotalPages] = useState(0);
    const [selectedUser, setSelectedUser] = useState(null);
    const [ShowUpdate, setShowUpdate] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        age: "",
        gender: "male",
        phone_number: "",
        university: "",
        privilege: 2,
        study_year: 4,
        administrativeCapacity: ""
    });
    const handleChange = (event) => {
        const { name, value, type } = event.target;
        let updatedValue = value; // استخدم متغير آخر بدلاً من const value

        if (name === "study_year" || name === "age" || name === "privilege") {
            updatedValue = parseInt(value, 10); // تحويل النص إلى عدد صحيح بنظام العدد العشري
            console.log(updatedValue);
        }

        setFormData((prevData) => ({
            ...prevData,
            [name]: updatedValue, // استخدم updatedValue بدلاً من value
        }));
    };


    useEffect(() => {
        fetchAllUsers();
    }, [currentPage]);
    const fetchAllUsers = async () => {
        await http.get(`/users?limit=${itemsPerPage}&page=${currentPage + 1}`)
            .then((res) => {
                if (res.status == 200) {
                    setLoading(false);
                    console.log("البيانات المسترجعة: ", res.status);
                    setUsers(res.data.user);
                    console.log(res.data.user.photo);
                    setTotalPages(res.data.totalPages);

                } else {
                    console.error("البيانات المسترجعة غير صالحة: ", res.status);
                }
            })
            .catch((error) => {
                console.error("حدث خطأ أثناء جلب البيانات: ", error);
            });
    };

    const addUser = async () => {
        try {
            console.log(formData);
            const response = await http.post('/users', {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                age: formData.age,
                gender: formData.gender,
                phone_number: formData.phone_number,
                university: formData.university,
                privilege: formData.privilege,
                study_year: formData.study_year,
                administrativeCapacity: formData.administrativeCapacity
            });
            toast.success('تم الاضافة بنجاح');
            fetchAllUsers();
        } catch (error) {
            if (error.response) {
                alert(error.response.data);
            } else {
                alert('حدث خطأ أثناء إضافة المريض.');
            }
        }
    };
    const handleUpdate = async () => {
        try {
            console.log(formData.privilege);
            await http.post(`/users/${formData.id}`, {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                age: formData.age,
                gender: formData.gender,
                phone_number: formData.phone_number,
                university: formData.university,
                privilege: formData.privilege,
                study_year: formData.study_year,
                administrativeCapacity: formData.administrativeCapacity
            });
            toast.warn('تم التعديل بنجاح');
            fetchAllUsers();
        } catch (error) {
            if (error.response) {
                alert(error.response.data);
            } else {
                alert('حدث خطأ أثناء التعديل.');
            }
        }
        handleCloseUpdate();
    };
    const handleDelete = async () => {
        try {
            await http.put(`/disableUser/${selectedUser.id}`);
            toast.error('تم التعطيل بنجاح');
            fetchAllUsers();
        } catch (error) {
            if (error.response) {
                toast.error('هناك خطا ما', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            } else {
                toast.error('هناك خطا ما', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }
        }
        handleCloseDelete();
    }
    const handleEnable = async () => {
        try {
            await http.put(`/enableUser/${selectedUser.id}`);
            toast.success('تم التفعيل بنجاح');
            fetchAllUsers();
        } catch (error) {
            if (error.response) {
                toast.error('هناك خطا ما', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            } else {
                toast.error('هناك خطا ما', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }
        }
        handleCloseEnable();
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };
    const handleCloseUpdate = () => setShowUpdate(false);
    const handleShowUpdate = (illnesse) => {
        setFormData(illnesse);
        setShowUpdate(true);
    };
    const [ShowEnable, setShowEnable] = useState(false);
    const handleCloseEnable = () => setShowEnable(false);
    const handleShowEnable = (state) => {
        setSelectedUser(state);
        setShowEnable(true);
        console.log(state.user_id);
    };
    const [ShowDelete, setShowDelete] = useState(false);
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = (state) => {
        setSelectedUser(state);
        setShowDelete(true);
        console.log(state.user_id);
    };
    return (
        <>
            <ToastContainer />
            <Button className="color_add" variant='' onClick={handleShow}>
                إضافة مريض
            </Button>
            <Modal show={show} onHide={handleClose} dir="rtl">
                <Modal.Header className='left_close'>
                    <Modal.Title>إضافة مريض</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <div className="input-group mb-3">
                            <i className="bx bxs-user bx_user"></i>
                            <input
                                type="text"
                                name="name"
                                className="form-control"
                                placeholder="الاسم الكامل"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="input-group mb-3">
                            <i className="bx bxs-envelope bx_user"></i>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="الإيميل"
                                name="email"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="input-group mb-3">
                            <i className="bx bxs-lock-open-alt bx_user"></i>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="كلمة المرور"
                                name="password"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="input-group mb-3">
                            <i className="bx bxs-time-five bx_user"></i>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="العمر"
                                name="age"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <i className="bx bx-male-female bx_user"></i>
                            </div>
                            <select
                                name="gender"
                                className="select"
                                onChange={handleChange}
                                value={formData.gender}
                            >
                                <option value="male">ذكر</option>
                                <option value="female">أنثى</option>
                            </select>
                        </div>

                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <i className="bx bxs-phone bx_user"></i>
                            </div>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="90xxxxxxxxxxxxxx+"
                                name="phone_number"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="input-group mb-3">
                            <i className="bx bxs-graduation bx_user"></i>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="الجامعة"
                                name="university"
                                onChange={handleChange}
                            />
                        </div>
                        {privilegeStatus === "0" ? (
                            <div className="input-group mb-3">
                                <i className="bx bxs-lock-alt bx_user"></i>
                                <select
                                    name="privilege"
                                    className="select"
                                    onChange={handleChange}
                                    value={formData.privilege = 1}
                                >
                                    <option value="1">مشرف</option>
                                </select>
                            </div>) : (privilegeStatus === "1" ? (
                                <div className="input-group mb-3">
                                    <i className="bx bxs-lock-alt bx_user"></i>
                                    <select
                                        name="privilege"
                                        className="select"
                                        onChange={handleChange}
                                        value={formData.privilege = 2}
                                    >

                                        <option value="2">دكتور</option>
                                    </select>
                                </div>) :
                                null
                        )
                        }

                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <i className="bx bx-male-female bx_user"></i>
                            </div>
                            <select
                                name="study_year"
                                className="select"
                                onChange={handleChange}
                                value={formData.study_year}
                            >
                                <option value="4" >اختر السنة</option>
                                <option value="4" >سنة رابعة</option>
                                <option value="5" >سنة خامسة</option>
                            </select>
                        </div>

                    </Form>
                </Modal.Body>
                <Modal.Footer dir='ltr'>
                    <Button variant="secondary" onClick={handleClose}>
                        إلغاء
                    </Button>
                    <Button type='submit' className='button-seve' onClick={() => { handleClose(); addUser(); }}>
                        حفظ
                    </Button>
                </Modal.Footer>
            </Modal>
            {loading == true ? (
                <center>
                    {loading && <Loding />}
                </center>) : (
                <div className="tablemodel">
                    <table>
                        <thead>
                            <tr>
                                <th>الرقم</th>
                                <th>الاسم</th>
                                <th>الإيميل </th>
                                <th>العمر</th>
                                <th>الجنس</th>
                                <th>رقم الهاتف</th>
                                <th>الجامعة</th>
                                <th>الصلاحيات</th>
                                <th className="tran">العملية</th>
                            </tr>
                        </thead>
                        <tbody className="table-hover">
                            {users.map((user, index) => (
                                <tr key={index}> {/* أضف مفتاح فريد لكل صف */}
                                    <td className="text-left">{++index}</td>
                                    <td className="text-left">{user.name}</td>
                                    <td className="text-left">{user.email}</td>
                                    <td className="text-left">{user.age}</td>
                                    <td className="text-left">{user.gender == 'female' ? 'أنثى' : 'ذكر'}</td>
                                    <td className="text-left">{user.phone_number}</td>
                                    <td className="text-left">{user.university}</td>
                                    <td className="text-left">{user.privilege === 0 ? 'مدير نظام' : (user.privilege === 1 ? 'مشرف' : 'دكتور')}</td>
                                    <td className="text-left" >
                                        <Button className="color_add" variant='' onClick={() => handleShowUpdate(user)}>
                                            تعديل
                                        </Button>

                                        {
                                            (user.is_disabled === 1 && privilegeStatus === 0) ? (
                                                <Button variant="danger" className='m-2' onClick={() => handleShowDelete(user)}>
                                                    تعطيل
                                                </Button>
                                            ) : (privilegeStatus === 0) ? (
                                                <Button variant="success" className='m-2' onClick={() => handleShowEnable(user)}>
                                                    تفعيل
                                                </Button>
                                            ) : null
                                        }



                                        <Modal
                                            show={ShowUpdate}
                                            onHide={handleCloseUpdate}
                                            dir="rtl"
                                        >
                                            <Modal.Header className='left_close'>
                                                <Modal.Title>تعديل قسم المرض</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <Form>
                                                    <div className="input-group mb-3">
                                                        <div className="input-group-prepend">
                                                            <i className='bx bxs-user bx_user'></i>
                                                        </div>
                                                        <input
                                                            type="text"
                                                            name="name"
                                                            value={formData.name}
                                                            className="form-control"
                                                            placeholder="الاسم الكامل"
                                                            onChange={handleChange}
                                                        />

                                                    </div>

                                                    <div className="input-group mb-3">
                                                        <div className="input-group-prepend">
                                                            <i className="bx bxs-envelope bx_user"></i>
                                                        </div>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="الإيميل"
                                                            name="email"
                                                            value={formData.email}
                                                            onChange={handleChange}
                                                        />
                                                    </div>

                                                    <div className="input-group mb-3">
                                                        <div className="input-group-prepend">
                                                            <i className="bx bxs-time-five bx_user"></i>

                                                        </div>
                                                        <input
                                                            type="number"
                                                            className="form-control"
                                                            placeholder="العمر"
                                                            name="age"
                                                            value={formData.age}
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                    <div className="input-group mb-3">
                                                        <i className="bx bx-male-female bx_user"></i>
                                                        <select type="text"
                                                            name="gender"
                                                            className="select"
                                                            onChange={handleChange}
                                                            value={formData.gender}>
                                                            <option value='male'>
                                                                ذكر
                                                            </option>
                                                            <option value='female'>
                                                                أنثى
                                                            </option>
                                                        </select>
                                                    </div>
                                                    <div className="input-group mb-3">
                                                        <div className="input-group-prepend">
                                                            <i className='bx bxs-phone bx_user'></i>

                                                        </div>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Tel:+90xxxxxxxxxxxxxx"
                                                            name="phone_number"
                                                            value={formData.phone_number}
                                                            onChange={handleChange} />
                                                    </div>
                                                    <div className="input-group mb-3">
                                                        <div className="input-group-prepend">
                                                            <i className="bx bxs-graduation bx_user"></i>

                                                        </div>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="الجامعة"
                                                            name="university"
                                                            onChange={handleChange}
                                                            value={formData.university}
                                                        />
                                                    </div>

                                                    {privilegeStatus === "0" ? (
                                                        <div className="input-group mb-3">
                                                            <i className="bx bxs-lock-alt bx_user"></i>
                                                            <select
                                                                name="privilege"
                                                                className="select"
                                                                onChange={handleChange}
                                                                value={formData.privilege}>
                                                                <option value={0}>
                                                                    مدير نظام
                                                                </option>
                                                                <option value={1}>
                                                                    دكتور
                                                                </option>
                                                                <option value={2}>
                                                                    مشرف
                                                                </option>
                                                            </select>

                                                        </div>) : (privilegeStatus === "1" ? (
                                                            <div className="input-group mb-3">
                                                                <i className="bx bxs-lock-alt bx_user"></i>
                                                                <select
                                                                    name="privilege"
                                                                    className="select"
                                                                    onChange={handleChange}
                                                                    value={formData.privilege = 2}
                                                                >

                                                                    <option value="2">دكتور</option>
                                                                </select>
                                                            </div>) :
                                                            null
                                                    )
                                                    }
                                                </Form>
                                            </Modal.Body>
                                            <Modal.Footer dir='ltr'>
                                                <Button variant="secondary" onClick={handleCloseUpdate}>
                                                    Close
                                                </Button>
                                                <Button type='submit' className='button-seve'
                                                    onClick={handleUpdate}
                                                >
                                                    Save
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>
                                        <Modal
                                            show={ShowDelete}
                                            onHide={handleCloseDelete}
                                            backdrop="static"
                                            keyboard={false}
                                        >
                                            <Modal.Header dir="rtl">
                                                <Modal.Title>تعطيل العنصر المحدد</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body dir="rtl">
                                                هل تريد تعطيل الحساب
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={handleCloseDelete}>
                                                    اغلاق
                                                </Button>
                                                <Button variant="danger"
                                                    onClick={handleDelete}
                                                >
                                                    تعطيل
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>
                                        <Modal
                                            show={ShowEnable}
                                            onHide={handleCloseEnable}
                                            backdrop="static"
                                            keyboard={false}
                                        >
                                            <Modal.Header dir="rtl">
                                                <Modal.Title>تفعيل العنصر المحدد</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body dir="rtl">
                                                هل تريد تفعيل الحساب
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={handleCloseEnable}>
                                                    اغلاق
                                                </Button>
                                                <Button variant="success"
                                                    onClick={handleEnable}
                                                >
                                                    تعفيل
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

export default Get_all_doctor;
