import React, { useState, useEffect } from "react";
import Navbar from '../Navbar/Navbar'
import "../ManagmentUsers/Add_doctor.css";
import http from '../../../http';
import '../Navbar/App.css'
import ReactPaginate from 'react-paginate';

import { Link } from "react-router-dom";
import '../ManagmentBusiness/pagination.css';
import Loding from "../Loding";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';


function Get_all_illnesse() {
    const [illnesses, setIllnesse] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5;
    const [totalPages, setTotalPages] = useState(0);
    const [categorys, setcategorys] = useState([]); // حالة لقائمة أنواع الأمراض

    const [formData, setFormData] = useState({
        name: '',
        study_year: '',
        is_active: false,
        categoryIllnesses_id: null,
    });

    useEffect(() => {
        fetchcategorys(); // استدعاء دالة جلب أنواع الأمراض
        fetchAllillnesse();
    }, [currentPage]);

    const fetchcategorys = async () => {
        try {
            const response = await http.get(`/category`);
            setcategorys(response.data.category); // تعيين قائمة أنواع الأمراض هنا
        } catch (error) {
            console.error("حدث خطأ أثناء جلب قائمة أنواع الأمراض: ", error);
        }
    };

    const fetchAllillnesse = async () => {
        try {
            const response = await http.get(`/illnesses?limit=${itemsPerPage}&page=${currentPage + 1}`);
            setIllnesse(response.data.illnesses);
            setLoading(false);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error("حدث خطأ أثناء جلب قائمة الأمراض: ", error);
        }
    };

    const addIllness = async () => {
        try {
            const response = await http.post('/illnesses', {
                name: formData.name,
                study_year: formData.study_year,
                is_active: formData.is_active,
                categoryIllnesses_id: formData.categoryIllnesses_id
            });
            toast.success('تم الاضافة بنجاح');
            fetchAllillnesse();
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
            await http.post(`/illnesses/${formData.id}`, {
                name: formData.name,
                study_year: formData.study_year,
                is_active: formData.is_active,
                categoryIllnesses_id: formData.categoryIllnesses_id,
            });
            toast.warn('تم التعديل بنجاح');
            fetchAllillnesse();
        } catch (error) {
            if (error.response) {
                alert(error.response.data);
            } else {
                alert('حدث خطأ أثناء التعديل.');
            }
        }
        handleCloseUpdate();
    };

    const deleteIllness = async () => {
        try {
            await http.delete(`/illnesses/${formData.id}`);
            toast.error('تم الحذف بنجاح');
            fetchAllillnesse();
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
    };

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    const [ShowUpdate, setShowUpdate] = useState(false);
    const [ShowDelete, setShowDelete] = useState(false);
    const handleCloseUpdate = () => setShowUpdate(false);
    const handleShowUpdate = (illnesse) => {
        setFormData(illnesse);
        setShowUpdate(true);
    };
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = (illnesse) => {
        setFormData(illnesse);
        setShowDelete(true);
    };

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
                    <Form>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <i class='bx bxs-user bx_user'></i>
                            </div>
                            <input
                                type="text"
                                name="name"
                                className="form-control"
                                placeholder="اسم المرض الكامل"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <i className="bx bxs-time-five bx_user"></i>
                            </div>
                            <input
                                type="number"
                                name="study_year"
                                className="form-control"
                                placeholder="السنة الدراسية"
                                value={formData.study_year}
                                onChange={(e) => setFormData({ ...formData, study_year: e.target.value })}
                            />
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <i class='bx bxs-id-card bx_user'></i>
                            </div>
                            <label for='is_active'>هل نعالج المرض</label>
                            <input
                                type="checkbox"
                                name="is_active"
                                id="is_active"
                                checked={formData.is_active}
                                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                            />
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <i class='bx bxs-phone bx_user'></i>
                            </div>
                            <select
                                name="categoryIllnesses_id"
                                className="form-control"
                                value={formData.categoryIllnesses_id}
                                onChange={(e) => setFormData({ ...formData, categoryIllnesses_id: e.target.value })}
                            >
                                <option value="">اختر نوع المرض...</option>
                                {categorys.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer dir='ltr'>
                    <Button variant="secondary" onClick={handleClose}>
                        إلغاء
                    </Button>
                    <Button type='submit' className='button-seve' onClick={() => { handleClose(); addIllness(); }}>
                        حفظ
                    </Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer />
            {loading == true ? (
                <center>
                    {loading && <Loding />}
                </center>) : (
                <div className="tablemodel">
                    <table>
                        <thead>
                            <tr>
                                <th>الرقم</th>
                                <th> اسم المرض</th>
                                <th>العملية</th>
                            </tr>
                        </thead>
                        <tbody className="table-hover">
                            {illnesses.map((illnesse, index) => (
                                <tr key={illnesse.id}>
                                    <td className="text-left">{++index}</td>
                                    <td className="text-left">{illnesse.name}</td>
                                    <td>
                                        <Button className="color_add" variant='' onClick={() => handleShowUpdate(illnesse)}>
                                            تعديل
                                        </Button>
                                        <Button variant="danger" onClick={() => handleShowDelete(illnesse)}>
                                            حذف
                                        </Button>
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
                                                            <i class='bx bxs-user bx_user'></i>
                                                        </div>
                                                        <input
                                                            type="text"
                                                            name="name"
                                                            className="form-control"
                                                            placeholder="اسم المرض الكامل"
                                                            value={formData.name}
                                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                        />
                                                    </div>
                                                    <div className="input-group mb-3">
                                                        <div className="input-group-prepend">
                                                            <i className="bx bxs-time-five bx_user"></i>
                                                        </div>
                                                        <input
                                                            type="number"
                                                            name="study_year"
                                                            className="form-control"
                                                            placeholder="السنة الدراسية"
                                                            value={formData.study_year}
                                                            onChange={(e) => setFormData({ ...formData, study_year: e.target.value })}
                                                        />
                                                    </div>
                                                    <div className="input-group mb-3">
                                                        <div className="input-group-prepend">
                                                            <i class='bx bxs-id-card bx_user'></i>
                                                        </div>
                                                        <label for='is_active'>هل نعالج المرض</label>
                                                        <input
                                                            type="checkbox"
                                                            name="is_active"
                                                            id="is_active"
                                                            checked={formData.is_active}
                                                            onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                                                        />
                                                    </div>
                                                    <div className="input-group mb-3">
                                                        <div className="input-group-prepend">
                                                            <i class='bx bxs-phone bx_user'></i>
                                                        </div>
                                                        <select
                                                            name="categoryIllnesses_id"
                                                            className="form-control"
                                                            value={formData.categoryIllnesses_id}
                                                            onChange={(e) => setFormData({ ...formData, categoryIllnesses_id: e.target.value })}
                                                        >
                                                            <option value="">اختر نوع المرض...</option>
                                                            {categorys.map((category) => (
                                                                <option key={category.id} value={category.id}>
                                                                    {category.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
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
                                                <Modal.Title>حذف العنصر المحدد</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body dir="rtl">
                                                هل تريد حذف العنصر
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={handleCloseDelete}>
                                                    اغلاق
                                                </Button>
                                                <Button variant="danger"
                                                onClick={() => deleteIllness(illnesse.id)}
                                                >
                                                    حذف
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

export default Get_all_illnesse;
