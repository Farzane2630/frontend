import React from 'react'
import { Link } from 'react-router-dom'
import './Sidebar.css'

export default function Sidebar({ isStudent, studentsCount, comments }) {
    return (
        <div className="col-4">
            <div className="courses-info">
                <div className="course-info">
                    <div className="course-info__register">
                        <span className="course-info__register-title">
                            <i className="fas fa-graduation-cap course-info__register-icon"></i>
                            {
                                isStudent ? "شما دانشجوی دوره هستید" : (
                                    <a to="/" >
                                        ثبت نام در دوره
                                    </a>
                                )
                            }
                        </span>
                    </div>
                </div>
                <div className="course-info">
                    <div className="course-info__total">
                        <div className="course-info__top">
                            <div className="course-info__total-sale">
                                <i className="fas fa-user-graduate course-info__total-sale-icon"></i>
                                <span className="course-info__total-sale-text">
                                    تعداد دانشجو :
                                </span>
                                <span className="course-info__total-sale-number">
                                    {studentsCount}
                                </span>
                            </div>
                        </div>
                        <div className="course-info__bottom">
                            <div className="course-info__total-comment">
                                <i className="far fa-comments course-info__total-comment-icon"></i>
                                <span className="course-info__total-comment-text">
                                    {comments}
                                </span>
                            </div>
                            <div className="course-info__total-view">
                                <i className="far fa-eye course-info__total-view-icon"></i>
                                <span className="course-info__total-view-text">
                                    14,234 بازدید
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="course-info">
                    <div className="course-info__header-short-url">
                        <i className="fas fa-link course-info__short-url-icon"></i>
                        <span className="course-info__short-url-text">
                            لینک کوتاه
                        </span>
                    </div>
                    <span className="course-info__short-url">
                        https://sabzlearn.ir/?p=117472
                    </span>
                </div>
                <div className="course-info">
                    <span className="course-info__topic-title">
                        سرفصل های دوره
                    </span>
                    <span className="course-info__topic-text">
                        برای مشاهده و یا دانلود دوره روی کلمه

                        <a href="#" style={{ color: "blue", fontWeight: "bold" }}>
                            {""} لینک {""}
                        </a>

                        کلیک کنید
                    </span>
                </div>
                <div className="course-info">
                    <span className="course-info__courses-title">دوره های مرتبط</span>
                    <ul className="course-info__courses-list">
                        <li className="course-info__courses-list-item">
                            <a href="#" className="course-info__courses-link">
                                <img src="/images/courses/js_project.png" alt="Course Cover" className="course-info__courses-img" />
                                <span className="course-info__courses-text">
                                    پروژه های تخصصی با جاوا اسکریپت
                                </span>
                            </a>
                        </li>
                        <li className="course-info__courses-list-item">
                            <a href="#" className="course-info__courses-link">
                                <img src="/images/courses/fareelancer.png" alt="Course Cover" className="course-info__courses-img" />
                                <span className="course-info__courses-text">
                                    تعیین قیمت پروژه های فریلنسری
                                </span>
                            </a>
                        </li>
                        <li className="course-info__courses-list-item">
                            <a href="#" className="course-info__courses-link">
                                <img src="/images/courses/nodejs.png" alt="Course Cover" className="course-info__courses-img" />
                                <span className="course-info__courses-text">
                                    دوره Api نویسی
                                </span>
                            </a>
                        </li>
                        <li className="course-info__courses-list-item">
                            <a href="#" className="course-info__courses-link">
                                <img src="/images/courses/jango.png" alt="Course Cover" className="course-info__courses-img" />
                                <span className="course-info__courses-text">
                                    متخصص جنگو
                                </span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
