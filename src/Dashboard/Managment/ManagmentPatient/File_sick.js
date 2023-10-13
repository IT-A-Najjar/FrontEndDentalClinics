import { useState, useEffect } from 'react';
import React, { Fragment } from 'react';
import './File_sick.css'
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import Alert from 'react-bootstrap/Alert';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import http from '../../../http';
import { ToastContainer, toast } from 'react-toastify';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';


import { BrowserRouter as Router, Route, Routes, Link, useLocation, useParams, useNavigate } from 'react-router-dom';


import './Add_sick.css';
import DentalForm from './DentalForm/DentalForm';
import DentalFormPulp from './DentalForm/DentalFormPulp';
import DentalFormPulp1 from './DentalForm/DentalFormPulp1';
import DentalFormCompensation from './DentalForm/DentalFormPulpCompensation';
import DentalFormQilih from './DentalForm/DentalFormQilih';
import DentalFormAbout from './DentalForm/DentalFormAbout';
const File_sick = () => {
    const user_id1 = sessionStorage.getItem("id");
    const [Categorys, setCategorys] = useState([]);
    const [loading, setLoading] = useState(true);
    const [patient, setPatient] = useState([]); // حالة لبيانات المريض
    const [states1, setState1] = useState([]); // استخدام مصفوفة فارغة بدلاً من كائن
    const [open, setOpen] = useState(false);
    const [selectedTeeth, setSelectedTeeth] = useState([]);
    const [showModels, setShowModels] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [ShowDelete, setShowDelete] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState(null);



    // const handleClose = () => setShow(false);
    const location = useLocation();
    const { state } = useLocation();
    const [show, setShow] = useState(false);
    const handleShow = (illnessId) => {
        setShowModels((prevShowModels) => ({
            ...prevShowModels,
            [illnessId]: true,
        }));
    };

    const handleClose = (illnessId) => {
        setShowModels((prevShowModels) => ({
            ...prevShowModels,
            [illnessId]: false,
        }));
    };

    const sendPatientDataToAPI = async (illness_id) => {
        const dataToSend = {
            selectedTeeth: selectedTeeth,
            illness_id: illness_id,
            patient_id: patient.id,
            user_id: user_id1,
        };
        // console.log(dataToSend);
        try {
            console.log(dataToSend);
            const response = await http.post('/state', dataToSend)
                .then((res) => {
                    toast.success(res.data.message);
                    handleClose(dataToSend.illness_id);
                    fetchStateData();
                })
                .catch(err => {
                    toast.error('يوجد خطاء في البيانات');
                });;
            console.log('تم إرسال البيانات بنجاح', response.data);
        } catch (error) {
            console.error('حدث خطأ أثناء إرسال البيانات', error);
        }
    };


    useEffect(() => {
        async function fetchData() {
            try {
                await fetchPatientData();
                await fetchAllCategory();
                await fetchStateData();
                setIsLoading(false);

            } catch (error) {
                console.error('حدث خطأ: ', error);
            }
        }
        console.log(user_id1);
        fetchData();
    }, []);
    const fetchPatientData = async () => {
        try {


            const response = await http.get(`/pateints/${state.id}`);
            setPatient(response.data.pateints);
        } catch (error) {
            console.error('حدث خطأ أثناء جلب بيانات المريض: ', error);
        }
    };
    const fetchStateData = async () => {
        try {
            const response = await http.get(`/state1?id_patient=${state.id}`);
            setState1(response.data.state); // تعيين بيانات المريض
        } catch (error) {
            console.error('حدث خطأ أثناء جلب بيانات المريض: ', error);
        }
    };
    const fetchAllCategory = async () => {
        await http.get(`/category`)
            .then(async (res) => {
                const organizedData = res.data.category.map(async (category) => {
                    // استدعاء الأمراض المتعلقة بالفئة
                    const illnessesResponse = await http.get(`/illnesses/${category.id}`);
                    category.illnesses = illnessesResponse.data.illness;
                    // console.log(illnessesResponse.data.illness);
                    return category;
                });
                // console.log(res.data.category);
                // انتظر حتى يتم جلب البيانات ثم قم بتحديث الحالة
                const updatedData = await Promise.all(organizedData);

                setCategorys(updatedData);
                setLoading(false);
            });
    };
    const updatestate = async (ustate) => {
        try {
            await http.get(`/state/${ustate.id}`);
            toast.success('تم التخديم بنجاح');
            fetchStateData();
        } catch (error) {
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
    const updatestatetouser = async () => {
        // console.log(patient.id);
        try {
            await http.get(`/statetouser/${patient.id}`);
            toast.success('تم الارسال بنجاح');
            fetchStateData();
        } catch (error) {
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
    const handleDelete = async () => {

        try {

            await http.delete(`/state/${selectedPatient.id}`);
            toast.error('تم الحذف بنجاح');
            fetchStateData();
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

    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = (state) => {
        setSelectedPatient(state);
        setShowDelete(true);
        console.log(state.user_id);
    };
    const handleSelectionChange = (updatedSelectedTeeth) => {
        setSelectedTeeth(updatedSelectedTeeth);
    };

    return (
        <>
            <ToastContainer />
            <div className='col-10 center_file'>
                <Alert className='alert_file' variant='dark'>
                    <span className='span_title'> إضبارة المريض الإلكترونية</span>
                    <br />
                    <br />
                    <div className='d-flex justify-content-between'>
                        <div className='text-left m-auto'>
                            <span className='d-flex'>الأسم الكامل: {patient.full_name}</span>
                            <span className='d-flex'>العمر: {patient.age}</span>
                        </div>
                        <div className='text-right m-auto'>
                            <span className='d-flex'>رقم التواصل: {patient.phone_number}</span>
                            <span className='d-flex'>الطبيب المشرف: {patient.user?.name}</span>
                        </div>
                    </div>
                </Alert>
                <Button variant="primary" className='btn__color m-2' onClick={updatestatetouser}>ارسال</Button>
                <Button
                    onClick={() => setOpen(!open)}
                    aria-controls="example-collapse-text"
                    aria-expanded={open}
                    variant=''
                    className='btn__color_selected'
                >
                    تشخيص
                </Button>
                <div className='card___2 col-12'  >
                    <Collapse in={open}>
                        <div id="example-collapse-text"  >
                            {Categorys.map((category, index) => (
                                <DropdownButton
                                    as={ButtonGroup}
                                    key={category.id}
                                    id={`dropdown-variants-${category.id}`}
                                    variant={category.name.toLowerCase()}
                                    title={category.name}
                                    className='btn__color_selected'
                                >
                                    {category.illnesses.map((illness) => (
                                        <>
                                            <React.Fragment key={illness.id}>
                                                <Dropdown.Item eventKey="1" onClick={() => handleShow(illness.id)}>
                                                    {illness.name}
                                                </Dropdown.Item>
                                                <Modal show={showModels[illness.id]} onHide={() => handleClose(illness.id)} dir="rtl">
                                                    <Modal.Header className='left_close'>
                                                        <Modal.Title>نموذج الاسنان {illness.name}</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        <Form >
                                                            {category.name === "المداواة الترميمية" && (
                                                                <DentalForm onSelectionChange={handleSelectionChange} />
                                                            )}
                                                            {illness.name === "امامي" && (
                                                                <DentalFormPulp onSelectionChange={handleSelectionChange} />
                                                            )}
                                                            {illness.name === "خلفي" && (
                                                                <DentalFormPulp1 onSelectionChange={handleSelectionChange} />
                                                            )}
                                                            {(illness.name === "تعويضات متحركة كاملة" || illness.name === "تعويضات متحركة جزئية") && (
                                                                <DentalFormCompensation onSelectionChange={handleSelectionChange} />
                                                            )}
                                                            {illness.name === "تعويضات ثابتة جسور" && (
                                                                <>
                                                                    <h4>ملاحظة: التحديد للفقد فقط</h4>
                                                                    <DentalForm onSelectionChange={handleSelectionChange} />
                                                                </>
                                                            )}
                                                            {(illness.name === "تعويضات ثابتة تيجان" || illness.name === "قلب ووتد") && (
                                                                <DentalForm onSelectionChange={handleSelectionChange} />
                                                            )}
                                                            {illness.name === "تقليح" && (
                                                                <DentalFormQilih onSelectionChange={handleSelectionChange} />
                                                            )}
                                                            {illness.name === "معالجة حول سنية" && (
                                                                <DentalFormAbout onSelectionChange={handleSelectionChange} />
                                                            )}
                                                            {category.name === "مداواة الأطفال" && (
                                                                <DentalForm onSelectionChange={handleSelectionChange} />
                                                            )}
                                                        </Form>
                                                    </Modal.Body>
                                                    <Modal.Footer dir='ltr'>
                                                        <Button variant="secondary" onClick={() => handleClose(illness.id)}>
                                                            Close
                                                        </Button>
                                                        <Button type='submit' onClick={() => sendPatientDataToAPI(illness.id)} className='button-seve' >
                                                            Save
                                                        </Button>
                                                    </Modal.Footer>
                                                </Modal>
                                            </React.Fragment>
                                        </>
                                    ))}
                                </DropdownButton>
                            ))}
                        </div>
                    </Collapse>
                    {loading ? (
                        <>
                            <br></br>
                            <div className="d-flex justify-content-around mt-5">
                                <Card style={{ width: '100%' }}>
                                    <Card.Body>
                                        <Placeholder as={Card.Title} animation="glow">
                                            <Placeholder xs={6} />
                                        </Placeholder>
                                        <Placeholder as={Card.Text} animation="glow">
                                            <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                                            <Placeholder xs={6} /> <Placeholder xs={8} />
                                        </Placeholder>
                                        <Placeholder.Button variant="primary" xs={6} />
                                    </Card.Body>
                                </Card>
                            </div>
                        </>
                    ) : (
                        <div className='scrol_state'>

                            {
                                states1.map((item, index) => (
                                    <>
                                        <br></br>
                                        <div className="card_state d-flex justify-content-around">
                                            <Card style={{ width: '100%' }}>
                                                <Card.Body>
                                                    <Card.Title>الحالة: {index + 1}</Card.Title>
                                                    <Card.Title>المرض: {item.illnesse.name}</Card.Title>
                                                    <Card.Text>
                                                        العمل على السن:   {item.description}
                                                    </Card.Text>
                                                    {/* <Card.Text>
                                                        العمل على السن:   {item.user.name}
                                                    </Card.Text> */}
                                                    {(item.user_id == user_id1 && item.is_serve === 0) && (
                                                        <>
                                                            <Button variant="primary" className='btn__color m-2' onClick={() => updatestate(item)}>نخديم</Button>
                                                            <Button variant="danger" className='m-2' onClick={() => handleShowDelete(item)}>
                                                                حذف
                                                            </Button>
                                                        </>
                                                    )}
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
                                                </Card.Body>
                                            </Card>
                                        </div>
                                    </>
                                ))
                            }
                        </div>
                    )}
                </div>
            </div>

        </>
    );

}
export default File_sick;