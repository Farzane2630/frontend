import React from 'react'
import FooterItem from './FooterItem'
import './Footer.css'
import { Link } from 'react-router-dom'
import Input from "../Form/Input"
import {
    requiredValidator,
    emailValidator,
    minValidator,
    maxValidator
} from "../Validators/rules"
import { useForm } from '../../hooks/useForm'
import swal from "sweetalert";


export default function Footer() {
    const [formState, onInputHandler] = useForm(
        {
            email: {
                value: "",
                isValid: false,
            }
        },
        false
    );

    const registerUser = (e) => {
        e.preventDefault();

        const newEmail = {
            email: formState.inputs.email.value
        };

        fetch("http://127.0.0.1:8000/v1/newsletters", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newEmail),
        })
            .then((res) => res.json())
            .then((result) => {
                swal({
                    title: "با موفقیت عضو شدید.",
                    icon: "success",
                    buttons: "بسیار خب!",
                })
                    .catch((err) => {
                        swal({
                            title: "خطایی رخ داده مجددا تلاش کنید.",
                            icon: "error",
                            buttons: "تلاش مجدد",
                        });
                    });
            })
    };

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-widgets">
                    <div className="row">

                        <FooterItem title=" درباره ما">
                            <p className="footer-widgets__text">
                                وقتی تازه شروع به یادگیری برنامه نویسی کردم. یکی از مشکلاتی که در فرآیند یادگیری داشتم، کمبود آموزش های خوب با پشتیبانی قابل قبول بود که باعث شد اون موقع تصمیم بگیرم اگر روزی توانایی مالی و فنی قابل قبولی داشتم یک وب سایت برای حل این مشکل راه اندازی کنم! و خب امروز آکادمی آموزش برنامه نویسی سبزلرن به عنوان یک آکادمی خصوصی فعالیت میکنه و این به این معنی هست که هر مدرسی اجازه تدریس در اون رو نداره و باید از فیلترینگ های خاص آکادمی سبزلرن رد شه! این به این معنی هست که ما برامون فن بیان و نحوه تعامل مدرس با دانشجو بسیار مهمه! ما در آکادمی سبزلرن تضمین پشتیبانی خوب و با کیفیت رو به شما میدیم . چرا که مدرسین وب سایت سبزلرن حتی برای پشتیبانی دوره های رایگان شون هم هزینه دریافت میکنند و متعهد هستند که هوای کاربر های عزیز رو داشته باشند !
                            </p>
                        </FooterItem>

                        <FooterItem title="  آخرین مطالب">
                            <div className="footer-widgets__links">
                                <a href="#" className="footer-widgets__link">
                                    نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه پایتون
                                </a>
                                <a href="#" className="footer-widgets__link">
                                    چگونه پایتون را آپدیت کنیم؟ | آموزش صفر تا صد آپدیت کردن پایتون
                                </a>
                                <a href="#" className="footer-widgets__link">
                                    آموزش نصب پایتون ( Python ) در در مک، ویندوز و لینوکس | گام به گام و تصویری
                                </a>
                                <a href="#" className="footer-widgets__link">
                                    بهترین فریم ورک های فرانت اند | 16 فریم ورک Front end بررسی معایب و مزایا
                                </a>
                                <a href="#" className="footer-widgets__link">
                                    معرفی بهترین سایت آموزش جاوا اسکریپت [ تجربه محور ] + آموزش رایگان
                                </a>
                            </div>
                        </FooterItem>

                        <FooterItem title="   دسترسی سریع">
                            <div className="row">
                                <div className="col-6">
                                    <a href="#" className="footer-widgets__link">
                                        آموزش HTML
                                    </a>
                                </div>

                                <div className="col-6">
                                    <a href="#" className="footer-widgets__link">
                                        آموزش CSS
                                    </a>
                                </div>

                                <div className="col-6">

                                    <a href="#" className="footer-widgets__link">
                                        آموزش جاوا اسکریپت
                                    </a>
                                </div>
                                <div className="col-6">

                                    <a href="#" className="footer-widgets__link">
                                        آموزش بوت استرپ
                                    </a>
                                </div>
                                <div className="col-6">

                                    <a href="#" className="footer-widgets__link">
                                        آموزش ریکت
                                    </a>
                                </div>

                                <div className="col-6">

                                    <a href="#" className="footer-widgets__link">
                                        آموزش پایتون
                                    </a>
                                </div>

                                <div className="col-6">

                                    <Link to="/contact" className="footer-widgets__link">
                                        <span className="footer-widgets__title">
                                            ارتباط با ما
                                        </span>
                                    </Link>
                                </div>

                            </div>
                        </FooterItem>

                        <FooterItem title="عضویت در خبرنامه">
                            <div className="col-12  text-center d-block">

                                <span href="#" className="footer-widgets__link">
                                    برای اطلاع از آخرین دوره ها و تخفیفات مشترک شوید!
                                </span>
                                <form className='footer-widgets__form' action='#'>
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
                                    <button
                                        type='submit'
                                        className='footer-widgets__btn login-form__btn justify-content-center'
                                        onClick={e => registerUser(e)}
                                    >
                                        عضویت
                                    </button>
                                </form>
                            </div>
                        </FooterItem>
                    </div>
                </div>
            </div>
            <div className="footer__copyright">
                <span className="footer__copyright-text">
                    کلیه حقوق برای <a href='#'>آکادمی آموزش برنامه نویسی سبز لرن</a> محفوظ است.
                </span>
            </div>
        </footer>
    )
}
