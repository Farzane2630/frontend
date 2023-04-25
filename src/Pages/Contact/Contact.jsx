import React from 'react'

import "./Contact.css"
import Topbar from '../../Components/Topbar/Topbar'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import Input from '../../Components/Form/Input'
import {
   requiredValidator,
   emailValidator,
   maxValidator,
   minValidator,
} from "../../Components/Validators/rules";
import { useForm } from "../../hooks/useForm";
import swal from 'sweetalert'


export default function Contact() {

   const [formState, onInputHandler] = useForm(
      {
         name: {
            value: "",
            isValid: false,
         },
         phone: {
            value: "",
            isValid: false,
         },
         email: {
            value: "",
            isValid: false,
         },
         body: {
            value: "",
            isValid: false,
         },
      },
      false
   );

   const registerUser = (e) => {
      e.preventDefault();

      const bodyInfos = {
         name: formState.inputs.name.value,
         email: formState.inputs.email.value,
         phone: formState.inputs.phone.value,
         body: formState.inputs.body.value
      }

      fetch("http://127.0.0.1:8000/v1/contact", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(bodyInfos),
      })
         .then((res) => {
            if (res.ok) {
               return res.json()
            }
         })
         .then(result => {

            swal({
               title: "پیام شما با موفقیت ارسال شد",
               icon: "success",
               buttons: "Done"
            }).then(() => { })
         })

   }

   return (
      <>
         <Topbar />
         <Navbar />
         <section className="login-register">
            <div className="login register-form">
               <span className="login__subtitle">
                  نظر یا انتقادتو برامون بنویس ;)
               </span>
               <form action="#" className="login-form">
                  <div className="login-form__username">
                     <Input
                        className="login-form__username-input"
                        type="text"
                        placeholder="نام و نام خانوادگی"
                        element="input"
                        validations={[
                           requiredValidator(),
                           minValidator(6),
                           maxValidator(20),
                        ]}
                        id="name"
                        onInputHandler={onInputHandler}
                     />
                     <i className="login-form__username-icon fa fa-user"></i>
                  </div>
                  <div className="login-form__username">
                     <Input
                        type="text"
                        placeholder="شماره تماس"
                        className="login-form__username-input"
                        element="input"
                        id="phone"
                        onInputHandler={onInputHandler}
                        validations={[minValidator(10), maxValidator(12)]}
                     />
                     <i className="login-form__username-icon fa fa-user"></i>
                  </div>
                  <div className="login-form__password">
                     <Input
                        className="login-form__password-input"
                        type="text"
                        placeholder="آدرس ایمیل"
                        element="input"
                        validations={[
                           requiredValidator(),
                           emailValidator(),
                           minValidator(10),
                           maxValidator(50),
                        ]}
                        id="email"
                        onInputHandler={onInputHandler}
                     />
                     <i className="login-form__password-icon fa fa-envelope"></i>
                  </div>
                  <div className="login-form__password">
                     <Input
                        className="login-form__password-input"
                        type="text"
                        placeholder="متن خود را بنویسید ..."
                        validations={[
                           requiredValidator(),
                           minValidator(10)
                        ]}
                        id="body"
                        onInputHandler={onInputHandler}
                     />
                     <i className="login-form__password-icon fa fa-envelope"></i>
                  </div>
                  <button
                     className={`${formState.isFormValid
                        ? "login-form__btn"
                        : "login-form__btn_error"
                        }`}
                     type="submit"
                     onClick={registerUser}
                     disabled={!formState.isFormValid}
                  >
                     <i className="login-form__btn-icon fa fa-user-plus"></i>
                     <span className="login-form__btn-text">ارسال</span>
                  </button>
               </form>
            </div>
         </section>
         <Footer />
      </>
   )
}
