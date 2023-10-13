import React, { useEffect, useState } from "react";
import './EditInfo.css'
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
function EditInfo() {

    // const { id_user } = useParams();
    const id_user = sessionStorage.getItem("id");
    const [users, setUsers] = useState({});
    const navigate = useNavigate();
    useEffect(() => {
        fetchUser();
    }, [id_user]);
    const fetchUser = async() => {
       await axios.get(`http://127.0.0.1:8000/api/users/${id_user}`)
            .then((res) => {
                if (res.status === 200) {
                    setUsers(res.data.user);
                } else {
                    console.error("البيانات المسترجعة غير صالحة: ", res.status);
                }
            })
            .catch((error) => {
                console.error("حدث خطأ أثناء جلب البيانات: ", error);
            });
    };
    const handleChange = (event) => {
        const { name, value, type } = event.target;
        setUsers({
            ...users,
            [name]: value,
        });

    };
    const updateUser =async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", users.name);
        formData.append("email", users.email);
        // formData.append("photo", users.photo); // Assuming users.photo is a File object
      await  axios.post(`http://127.0.0.1:8000/api/usersupdate/${id_user}`, formData)
            .then((res) => {
                navigate("/Landing_Dash")
                 console.log("Data Update Successfully...");

             })
            .catch((err) => {
                alert(err.response.data);
            });
    };
    return (<>
        <div className="login-box">
            <form onSubmit={updateUser} >
                <div className="user-box">
                    <input type="text" name="name" required="true" value={users.name} onChange={handleChange} />
                    <label>اسم المستحدم</label>
                </div>
                <div className="user-box">
                    <input type="Email" name="email" required="true" value={users.email}  onChange={handleChange} />
                    <label>الإيميل</label>
                </div><center>
                    <a href="">
                        <button type="submit" className="btn__infoedit">
                            تحديث المعلومات
                        </button>
                        <span></span>
                    </a></center>
            </form>
        </div>
    </>

    );
}
export default EditInfo;