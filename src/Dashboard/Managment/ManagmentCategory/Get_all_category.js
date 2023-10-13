import React, { useState, useEffect } from "react";
import "../ManagmentUsers/Add_doctor.css";
import http from '../../../http';
import '../Navbar/App.css';
import ReactPaginate from 'react-paginate';
import { ToastContainer, toast } from 'react-toastify';
import '../ManagmentBusiness/pagination.css';
import Loding from "../Loding";
import axios from "axios";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Get_all_category() {
    const [Categorys, setCategorys] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5;
    const [totalPages, setTotalPages] = useState(0);
    const [formData, setFormData] = useState({
        name: "", // يمكنك إضافة الحقول الأخرى هنا إذا لزم الأمر
    });
    const [Category, setCategory] = useState({});
    const [ShowUpdate, setShowUpdate] = useState(false);
    const [ShowDelete, setShowDelete] = useState(false);
    const [show, setShow] = useState(false);

    const handleChange = (event) => {
        const { name, value, type } = event.target;
        const newValue = type === "file" ? event.target.files[0] : value;

        setFormData((prevData) => ({
            ...prevData,
            [name]: newValue,
        }));
    };

    useEffect(() => {
        fetchAllCategory();
    }, [currentPage]);

    const fetchAllCategory = async () => {
        await http.get("/category")
        // await axios.get(`baseURL/category`)
            .then((res) => {
                setCategorys(res.data.category);
                setLoading(false);
                setTotalPages(res.data.totalPages);
            });
    };

    const delteState = async (id) => {
        try {
            await http.delete(`/category/${id}`);
            const updatedCategorys = Categorys.filter(category => category.id !== id);
            setCategorys(updatedCategorys);
            toast.success('تم الحذف بنجاح');
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error('حدث خطأ أثناء الحذف');
            }
        }
        handleCloseDelete();
    };

    const handleUpdate = async () => {
        try {
            await http.post(`/category/${Category.id}`, formData);
            const updatedCategorys = Categorys.map(category => {
                if (category.id === Category.id) {
                    return { ...category, ...formData };
                }
                return category;
            });
            setCategorys(updatedCategorys);
            toast.success('تم التعديل بنجاح');
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error('حدث خطأ أثناء التعديل');
            }
        }
        handleCloseUpdate();
    };

    const handleShowUpdate = (category) => {
        setCategory(category);
        setShowUpdate(true);
    };

    const handleCloseUpdate = () => {
        setShowUpdate(false);
        setCategory({});
    };

    const handleShowDelete = (category) => {
        setCategory(category);
        setShowDelete(true);
    };

    const handleCloseDelete = () => {
        setShowDelete(false);
        setCategory({});
    };

    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false);
        setCategory({});
        setFormData({ name: "" });
    };

    const handleSave = async () => {
        try {
            await http.post("/category", formData);
            toast.success('تم الإضافة بنجاح');
            fetchAllCategory(); // إعادة جلب البيانات بعد الإضافة
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error('حدث خطأ أثناء الإضافة');
            }
        }
        handleClose();
    };

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    return (
        <>
            <Button className="color_add" variant='' onClick={handleShow}>
                إضافة قسم مرض
            </Button>
            <Modal show={show} onHide={handleClose} dir="rtl">
                <Modal.Header className='left_close'>
                    <Modal.Title>إضافة قسم مرض</Modal.Title>
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
                                value={formData.name}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="تصنيف المرض"
                            />
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer dir='ltr'>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button type='submit' className='button-seve' onClick={handleSave}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer />
            {loading ? (
                <center>
                    {loading && <Loding />}
                </center>
            ) : (
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
                            {Categorys.map((category, index) => (
                                <tr key={category.id}>
                                    <td className="text-left">{++index}</td>
                                    <td className="text-left">{category.name}</td>
                                    <td>
                                        <Button className="color_add" variant='' onClick={() => handleShowUpdate(category)}>
                                            تعديل
                                        </Button>
                                        <Button variant="danger" onClick={() => handleShowDelete(category)}>
                                            حذف
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
                                <i className='bx bxs-home-alt-2 bx_user' ></i>
                            </div>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="العنوان"
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
                    <Button variant="danger" onClick={() => delteState(Category.id)}>
                        حذف
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Get_all_category;
