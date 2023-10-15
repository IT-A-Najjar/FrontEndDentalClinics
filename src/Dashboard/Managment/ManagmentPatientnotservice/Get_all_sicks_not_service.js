import React, { useState, useEffect } from "react";
import "../ManagmentUsers/Add_doctor.css";
import http from '../../../http';
import '../Navbar/App.css'
import { Link, useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import '../ManagmentBusiness/pagination.css';
import Loding from "../Loding.js";
import Button from 'react-bootstrap/Button';

function Get_all_sicks_not_service() {
    const user_id = sessionStorage.getItem("id");

    const [pateints, setPateints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5;
    const [totalPages, setTotalPages] = useState(0);
    useEffect(() => {
        console.log(user_id);
        fetchAllUsers();
    }, [currentPage]);

    const fetchAllUsers = async() => {
       await  http.get(`/pateintnotserves?user_id=${user_id}&limit=${itemsPerPage}&page=${currentPage+1}`)
            .then((res) => {
                 if (res.status == 200) {
                    setPateints(res.data.patients);
                     setTotalPages(res.data.totalPages);
                    //  setPateints(prevPateints => prevPateints.map(pateint => pateint.id === res.data.patients.id ? res.data.patients : pateint));
                    setLoading(false);
                } else {
                    console.error("البيانات المسترجعة غير صالحة: ", res.status);
                }

            })

            .catch((error) => {
                console.error("حدث خطأ أثناء جلب البيانات: ", error);
            });
    };
   
    const delteState =   async(e, id) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;
        thisClicked.innerText = "جار الحذف...";
       await http.delete(`/pateints/${id}`).then(res => {
            console.log(res.data.message);
            // setPateints(prevPateints => prevPateints.filter(pateint => pateint.id !== id));
            thisClicked.closest("tr").remove();
        }).catch(function (err) {
            if (err.response) {
                if (err.response.status === 404) {
                    console.log(err.response.data.message);
                    thisClicked.innerText = "تم الحذف بنجاح ";
                }
                if (err.response.status === 500) {
                    console.log(err.response.data);
                }

            }
        })

    }
    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
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
            {/* <Navbar
                addPath='/ManagmentSick'
                showPath='/showSick'
                addElement={<Add_sick />}
                showElement={<Get_all_sicks />}
            /> */}
            {loading == true ? (
                <center>
                    {loading && <Loding />}
                </center>) : (
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
                            {pateints.map((pateint, index) => (
                                <tr key={index}>
                                    <td className="text-left">{++index}</td>
                                    <td className="text-left">{pateint.full_name}</td>
                                    <td className="text-left">{pateint.age}</td>
                                    <td className="text-left">{pateint.phone_number}</td>
                                    <td className="text-left">{pateint.symbol}</td>
                                    <td className="text-left">{pateint.name}</td>
                                    <td>
                                        
                                        <Button variant="success"  onClick={() => { handlePateintClick(pateint.id) }}>
                                            عرض إضبارة المريض
                                        </Button>
                                        <Button variant="danger" onClick={(e) => delteState(e, pateint.id)}>
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
        </>
    );
}
export default Get_all_sicks_not_service;
