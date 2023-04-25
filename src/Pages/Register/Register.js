import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import Input from "../../Components/Form/Input";
import Navbar from "../../Components/Navbar/Navbar";
import Topbar from "../../Components/Topbar/Topbar";
import {
  requiredValidator,
  emailValidator,
  maxValidator,
  minValidator,
} from "../../Components/Validators/rules";
import { AuthContext } from "../../Contexts/AuthContext";
import { useForm } from "../../hooks/useForm";

import "./Register.css";
import swal from "sweetalert";

export default function Register() {
  const authContext = useContext(AuthContext);

  const [formState, onInputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      username: {
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
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const navigate = useNavigate();

  const registerUser = (e) => {
    e.preventDefault();

    const newUserInfos = {
      name: formState.inputs.name.value,
      username: formState.inputs.username.value,
      phone: formState.inputs.phone.value,
      email: formState.inputs.email.value,
      password: formState.inputs.password.value,
      confirmPassword: formState.inputs.password.value,
    };

    fetch("http://127.0.0.1:8000/v1/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUserInfos),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          if (res.status === 403) {
            swal({
              title: "با این شماره مجاز به ثبت نام نمی باشید",
              buttons: "تغییر شماره",
              icon: "error",
            });
          } else {
            swal({
              title: "با موفقیت ثبت نام شدید.",
              buttons: "صفحه اصلی",
              icon: "success",
            }).then((result) => {
              navigate("/");
            });
          }
        }
      })
      .then((data) => {
        console.log(data);
        authContext.login(data.user, data.accessToken);
      })
      .then((ok) => {
        swal({
          title: "با موفقیت ثبت نام شدید.",
          buttons: "صفحه اصلی",
          icon: "success",
        }).then((result) => {
          navigate("/");
        });
      });
  };
  return (
    <>
      <Topbar />
      <Navbar />

      <section className="login-register">
        <div className="login register-form">
          <span className="login__title">ساخت حساب کاربری</span>
          <span className="login__subtitle">
            خوشحالیم قراره به جمع ما بپیوندی
          </span>
          <div className="login__new-member">
            <span className="login__new-member-text">
              قبلا ثبت‌نام کرده‌اید؟{" "}
            </span>
            <Link className="login__new-member-link" to="/login">
              وارد شوید
            </Link>
          </div>
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
                className="login-form__username-input"
                type="text"
                placeholder="نام کاربری"
                element="input"
                validations={[
                  requiredValidator(),
                  minValidator(6),
                  maxValidator(15),
                ]}
                id="username"
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
                type="password"
                placeholder="رمز عبور"
                element="input"
                validations={[
                  requiredValidator(),
                  minValidator(6),
                  maxValidator(15),
                ]}
                id="password"
                onInputHandler={onInputHandler}
              />
              <i className="login-form__password-icon fa fa-lock-open"></i>
            </div>
            <button
              className={`${
                formState.isFormValid
                  ? "login-form__btn"
                  : "login-form__btn_error"
              }`}
              type="submit"
              onClick={registerUser}
              disabled={!formState.isFormValid}
            >
              <i className="login-form__btn-icon fa fa-user-plus"></i>
              <span className="login-form__btn-text">عضویت</span>
            </button>
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
