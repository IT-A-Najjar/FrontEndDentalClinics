// import Navbar from '../Navbar/Navbar'
// import Get_all_Business from './Get_all_Business';
// import { useNavigate } from "react-router-dom";
// import { useState, useEffect } from 'react';
// import axios from "axios";
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import Modal from 'react-bootstrap/Modal';
function Add_Business() {


//   // تحقق من صحة الحقول قبل تفعيل زر "Add"
//   // const isFormValid = formData.title.trim() !== "" && formData.description.trim() !== "" && formData.user_id.trim() !== "";
//   return (
//     <>
//       <Navbar
//         addPath='/ManagmentBusiness'
//         showPath='/showBusiness'
//         addElement={<Add_Business />}
//         showElement={<Get_all_Business />}
//       />

//       {
//         (done == true ? (
//           <div className="alert alert-success alert__" role="alert">
//             تمت الإضافة بنجاح
//           </div>
//         ) : null)

//       }
//       {
//         (errore == true ? (
//           <div className="alert alert-danger alert__" role="alert">
//             لم تنجح عملية الاضافة حاول مرة أحرى
//           </div>) : null)
//       }
//        <Button className="color_add" variant='' onClick={handleShow}>
//         إضافة عمل 
//       </Button>
      // <Modal show={show}  onHide={handleClose} dir="rtl">
      //   <Modal.Header className='left_close'>
      //     <Modal.Title>إضافة عمل</Modal.Title>
      //   </Modal.Header>
      //   <Modal.Body>
      //     <Form>
      //     <div className="input-group mb-3">
      //           <div className="input-group-prepend">
      //             <i className='bx bxs-home-alt-2 bx_user' ></i>
      //           </div>
      //           <input
      //             type="text"
      //             className="form-control"
      //             placeholder="العنوان"
      //             onChange={handleChange}
      //             name="title"
      //           />
      //         </div>

      //         <div className="input-group mb-3">
      //           <div className="input-group-prepend">
      //             <i className='bx bxs-notepad bx_user'></i>
      //           </div>
      //           <input
      //             type="text"
      //             className="form-control"
      //             placeholder="وصف العمل"
      //             name="description"
      //             onChange={handleChange}
      //           />
      //         </div>

      //         <div className="input-group mb-3">
      //           <div className="input-group-prepend">
      //             <i className="bx bxs-image-add bx_user"></i>

      //           </div>
      //           <input
      //             type="file"
      //             className="form-control"
      //             name="image"
      //             onChange={handleChange}
      //           />
      //         </div>

      //         <div className="input-group mb-3">
                
      //           <select name="user_id" onChange={handleChange} value={formData.user_id} className="select">
      //             <option value="">اختر مستخدمًا...</option>
      //             {users.map((user) => (
      //               <option key={user.id} value={user.id}>
      //                 {user.name}
      //               </option>
      //             ))}
      //           </select>
      //         </div>

      //     </Form>
      //   </Modal.Body>
      //   <Modal.Footer dir='ltr'>
      //     <Button variant="secondary" onClick={handleClose}>
      //       Close
      //     </Button>
      //     <Button type='submit' className='button-seve' onClick={handleClose}>
      //       Save
      //     </Button>
      //   </Modal.Footer>
      // </Modal>
//       {/* <div className="container" dir='rtl'>

//         <div className="form-box">
//           <div className="header-form">
//             <h4 className="text-primary text-center"></h4>
//             <div className="image"></div>
//           </div>
//           <div className="body-form">
//             <form onSubmit={handleSubmit}>
//               <div className="input-group mb-3">
//                 <div className="input-group-prepend">
//                   <i className='bx bxs-home-alt-2 bx_user' ></i>
//                 </div>
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="العنوان"
//                   onChange={handleChange}
//                   name="title"
//                 />
//               </div>

//               <div className="input-group mb-3">
//                 <div className="input-group-prepend">
//                   <i className='bx bxs-notepad bx_user'></i>
//                 </div>
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="وصف العمل"
//                   name="description"
//                   onChange={handleChange}
//                 />
//               </div>

//               <div className="input-group mb-3">
//                 <div className="input-group-prepend">
//                   <i className="bx bxs-image-add bx_user"></i>

//                 </div>
//                 <input
//                   type="file"
//                   className="form-control"
//                   name="image"
//                   onChange={handleChange}
//                 />
//               </div>

//               <div className="input-group mb-3">
//                 <div className="input-group-prepend">
//                   <i className='bx bxs-user bx_user'></i>

//                 </div>
//                 <select name="user_id" onChange={handleChange} value={formData.user_id} className="select">
//                   <option value="">اختر مستخدمًا...</option>
//                   {users.map((user) => (
//                     <option key={user.id} value={user.id}>
//                       {user.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <button type="submit" className='btn_send'>
//                 <div className="svg-wrapper-1">
//                   <div className="svg-wrapper">
//                     <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                       <path d="M0 0h24v24H0z" fill="none"></path>
//                       <path d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z" fill="currentColor"></path>
//                     </svg>
//                   </div>
//                   <span>أرسال</span>
//                 </div>

//               </button>
//               {/* <button type="submit" className="btn btn-secondary btn-block">
//                 Add
//               </button> */}
//             {/* </form> */}
//           {/* </div> */}
//         {/* </div> */}
//       {/* </div> */} 

//     </>
//   );
}

export default Add_Business;