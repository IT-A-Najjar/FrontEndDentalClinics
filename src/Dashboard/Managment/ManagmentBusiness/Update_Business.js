import Navbar from '../Navbar/Navbar'
import Get_all_Business from './Get_all_Business';
import { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Add_Business from './Add_Business';

function Update_Business() {
    let { id } = useParams();
    const [users, setUsers] = useState([]);
    const [business, setBusiness] = useState({
        title: "",
        description: "",
        user_id: "",
    });
    const navigate = useNavigate();
    useEffect(() => {
        fetchAllUsers();
    }, []);
    useEffect(() => {
        fetchBusiness();
    }, [id]);

    const fetchAllUsers = async() => {
       await axios.get(`http://127.0.0.1:8000/api/users`)
            .then((res) => {
                if (res.status === 200) {
                    console.log("البيانات المسترجعة: ", res.data);
                    setUsers(res.data.user);
                    // }
                } else {
                    console.error("البيانات المسترجعة غير صالحة: ", res.status);
                }
            })
            .catch((error) => {
                console.error("حدث خطأ أثناء جلب البيانات: ", error);
            });
    };
    const fetchBusiness = async() => {
    await    axios.get(`http://127.0.0.1:8000/api/business/${id}`)
            .then((res) => {
                if (res.status === 200) {
                    setBusiness(res.data.business);
                } else {
                    console.error("البيانات المسترجعة غير صالحة: ", res.status);
                }
            })
            .catch((error) => {
                console.error("حدث خطأ أثناء جلب البيانات: ", error);
            });
    };



    // const handleChange = (event) => {
    //   setFormData({ ...formData, [event.target.name]: event.target.value });
    // };
    const handleChange = (event) => {
        const { name, value, type } = event.target;
        if (type === "file") {
            setBusiness({
                ...business,
                [name]: event.target.files[0],
            });
        } else {
            setBusiness({
                ...business,
                [name]: value,
            });
        }
    };
    const updateBusiness = async(event) => {
        event.preventDefault();
        const formData = new FormData();

        formData.append('title', business.title);
        formData.append('description', business.description);
        formData.append('user_id', business.user_id);
     await    axios.post(`http://127.0.0.1:8000/api/business/${id}`, formData)
            .then((res) => {
                 console.log("Data Added Successfuly...");
                navigate('/showBusiness');
            })
            .catch(err => {
                console.log("Data failed... " + err);
            });
    }

    // const isFormValid = formData.title.trim() !== "" && formData.description.trim() !== "" && formData.user_id.trim() !== "";
    return (
        <>
            <Navbar
                addPath='/ManagmentBusiness'
                showPath='/showBusiness'
                addElement={<Add_Business />}
                showElement={<Get_all_Business />}
            />
            <div className="container" dir='rtl'>
                <div className="form-box">
                    <div className="header-form">
                        <h4 className="text-primary text-center"></h4>
                        <div className="image"></div>
                    </div>
                    <div className="body-form">
                        <form onSubmit={updateBusiness}>
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
                                    value={business.title}
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
                                    value={business.description}
                                />
                            </div>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                <i className='bx bxs-user bx_user'></i>
                                </div>
                                <select name="user_id" onChange={handleChange} value={business.user_id} className="select">
                                    <option value="">اختر مستخدمًا...</option>
                                    {users.map((user) => (
                                        <option key={user.id} value={user.id}>
                                            {user.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <button type="submit" className='btn_send'>
                                <div className="svg-wrapper-1">
                                    <div className="svg-wrapper">
                                        <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0 0h24v24H0z" fill="none"></path>
                                            <path d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z" fill="currentColor"></path>
                                        </svg>
                                    </div>
                                    <span>أرسال</span>
                                </div>
                             </button>
                        </form>
                        <div className="social">
                            <a href="#">
                                <i className="fab fa-facebook"></i>
                            </a>
                            <a href="#">
                                <i className="fab fa-twitter-square"></i>
                            </a>
                            <a href="#">
                                <i className="fab fa-google"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Update_Business;