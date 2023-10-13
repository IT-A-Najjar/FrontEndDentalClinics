import React, { useState, useEffect } from "react";
import Navbar from '../Navbar/Navbar'
import "../ManagmentUsers/Add_doctor.css";
import http from '../../../http';
import '../Navbar/App.css'
import Add_state from "./Add_state";
import { Link } from "react-router-dom";
import '../ManagmentBusiness/pagination.css';
import ReactPaginate from 'react-paginate';
import Loding from "../Loding";
import { ToastContainer, toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {  useNavigate } from 'react-router-dom';

function Get_all_state() {
    const user_id1 = sessionStorage.getItem("id");
    const [selectedPatient, setSelectedPatient] = useState(null);

    const [states, setState] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5;
    const [totalPages, setTotalPages] = useState(0);
    useEffect(() => {
        fetchAllStates();
    }, [currentPage]);
    const fetchAllStates = async () => {
        await http.get(`/stateuser?user_id=${user_id1}&limit=${itemsPerPage}&page=${currentPage + 1}`)
            .then((res) => {
                if (res.status == 200) {
                    setState(res.data.state);
                    setTotalPages(res.data.totalPages);
                    setLoading(false);
                    console.log(200);
                } else {
                    console.error("البيانات المسترجعة غير صالحة: ", res.status);
                }
            })
            .catch((error) => {
                console.error("حدث خطأ أثناء جلب البيانات: ", error);
            });
    };
    const handleDelete = async () => {
        try {
            await http.delete(`/state/${selectedPatient.id}`);
            toast.error('تم الحذف بنجاح');
            fetchAllStates();
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

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };
    const [ShowUpdate, setShowUpdate] = useState(false);
    const handleCloseUpdate = () => setShowUpdate(false);
    const handleShowUpdate = () => setShowUpdate(true);
    const [ShowDelete, setShowDelete] = useState(false);
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = (state) => {
        setSelectedPatient(state);
        setShowDelete(true);
        console.log(state.user_id);
    };
    const Navigate = useNavigate();
    const handlePateintClick = (pateintID) => {
        // يمكنك هنا تنفيذ العمليات التي تحتاج إلى subjectID مثل الانتقال إلى الصفحة الأخرى
        console.log("تم النقر على الدورة بمعرف:", pateintID);
        // setSubjectID(subjectID); // تحديث subjectID
        Navigate(`/File_sick`, { state: { id: pateintID } }); // التوجيه إلى صفحة Subject مع subjectID

    };
    return (
        <>
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
                                <th>الوصف </th>
                                <th>الوقت  </th>
                                <th>المكان</th>
                                <th>اسم المريض</th>
                                <th>اسم المرض</th>
                                <th>اسم الطبيب</th>
                                <th>العملية</th>
                            </tr>
                        </thead>
                        <tbody className="table-hover">
                            {states.map((state, index) => (
                                <tr key={index}>
                                    <td className="text-left">{++index}</td>
                                    <td className="text-left">{state.description}</td>
                                    <td className="text-left">{state.time}</td>
                                    <td className="text-left">{state.place}</td>
                                    <td className="text-left">{state.pateint?.full_name}</td>
                                    <td className="text-left">{state.illnesse?.name}</td>
                                    <td className="text-left">{state.user?.name}</td>
                                    <td>
                                        <Button variant="success" onClick={() => { handlePateintClick(state.pateint_id) }}>
                                            عرض إضبارة المريض
                                        </Button>
                                        <Button variant="danger" className='m-2' onClick={() => handleShowDelete(state)}>
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
                                                <Button variant="danger"
                                                    onClick={handleDelete}
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
                </div>)}


        </>
    );
}

export default Get_all_state;
