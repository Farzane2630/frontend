import React, { useContext } from "react";
import Footer from "../../Components/Footer/Footer";
import Input from "../../Components/Form/Input";
import Navbar from "../../Components/Navbar/Navbar";
import Topbar from "../../Components/Topbar/Topbar";
import swal from "sweetalert";
import {
  requiredValidator,
  maxValidator,
  minValidator,
} from "../../Components/Validators/rules";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { AuthContext } from "../../Contexts/AuthContext";
import ReCAPTCHA from "react-google-recaptcha";


import "./Login.css";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();

  const authContext = useContext(AuthContext);

  const[isHuman, setIsHuman]= useState(false)

  const [formState, onInputHandler] = useForm(
    {
      username: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const reCaptchaChangeHandler = ()=>{
    setIsHuman(true)
  }

  const userLogin = (e) => {
    e.preventDefault();

    const userInfo = {
      identifier: formState.inputs.username.value,
      password: formState.inputs.password.value,
    };

    fetch("http://127.0.0.1:8000/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(text);
          });
        } else return response.json();
      })
      .then((result) => {
        swal({
          title: "با موفقیت وارد شدید.",
          icon: "success",
          buttons: "صفحه ی اصلی",
        }).then((user) => {
          navigate("/");
        });
        authContext.login({}, result.accessToken);
      })
      .catch((err) => {
        swal({
          title: "نام کاربری یا رمزعبور اشتباه است.",
          icon: "error",
          buttons: "تلاش مجدد",
        });
      });
  };
  return (
    <>
      <Topbar />
      <Navbar />

      <section className="login-register">
        <div className="login">
          <span className="login__title">ورود به حساب کاربری</span>
          <span className="login__subtitle">
            خوشحالیم دوباره میبینیمت دوست عزیز :)
          </span>
          <div className="login__new-member">
            <span className="login__new-member-text">کاربر جدید هستید؟</span>
            <Link className="login__new-member-link" to="/register">
              ثبت نام
            </Link>
          </div>
          <form action="#" className="login-form">
            <div className="login-form__username">
              <Input
                id="username"
                element="input"
                className="login-form__username-input"
                type="text"
                placeholder="نام کاربری یا آدرس ایمیل"
                validations={[
                  requiredValidator(),
                  // emailValidator(),
                  minValidator(6),
                  maxValidator(30),
                ]}
                onInputHandler={onInputHandler}
              />
              <i className="login-form__username-icon fa fa-user"></i>
            </div>
            <div className="login-form__password">
              <Input
                id="password"
                element="input"
                className="login-form__password-input"
                type="password"
                placeholder="رمز عبور"
                validations={[
                  requiredValidator(),
                  maxValidator(15),
                  minValidator(6),
                ]}
                onInputHandler={onInputHandler}
              />
              <i className="login-form__password-icon fa fa-lock-open"></i>
            </div>

            <ReCAPTCHA 
            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
            onChange={reCaptchaChangeHandler}
            />

            <button
              className={`${
                (formState.isFormValid && isHuman)
                  ? "login-form__btn"
                  : "login-form__btn_error"
              }`}
              type="submit"
              onClick={userLogin}
              disabled={(!formState.isFormValid || !isHuman)}
            >
              <i className="login-form__btn-icon fas fa-sign-out-alt"></i>
              <span className="login-form__btn-text">ورود</span>
            </button>
            <div className="login-form__password-setting">
              <label className="login-form__password-remember">
                <input
                  className="login-form__password-checkbox"
                  type="checkbox"
                />
                <span className="login-form__password-text">
                  مرا به خاطر داشته باش
                </span>
              </label>
              <label className="login-form__password-forget">
                <a className="login-form__password-forget-link" href="#">
                  رمز عبور را فراموش کرده اید؟
                </a>
              </label>
            </div>
          </form>
          <div className="login__des">
            <span className="login__des-title">سلام کاربر محترم:</span>
            <ul className="login__des-list">
              <li className="login__des-item">
                لطفا از مرورگر های مطمئن و بروز مانند گوگل کروم و فایرفاکس
                استفاده کنید.
              </li>
              <li className="login__des-item">
                ما هرگز اطلاعات محرمانه شمارا از طریق ایمیل درخواست نمیکنیم.
              </li>
              <li className="login__des-item">
                لطفا کلمه عبور خود را در فواصل زمانی کوتاه تغییر دهید.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
