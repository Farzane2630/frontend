import React, { useEffect, useState } from 'react'
import "./ArticleInfo.css"
import Topbar from "../../Components/Topbar/Topbar"
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import Breadcrumb from '../../Components/Breadcrumb/Breadcrumb'
import CommentSection from '../../Components/CommentSection/CommentSection'
import { useParams } from 'react-router-dom'
import DOMPurify from 'dompurify'

export default function ArticleInfo() {
  const [articleInfo, setArticleInfo] = useState([])
  const [teacher, setTeacher] = useState("")
  const [categoryInfo, setCategoryInfo] = useState({})
  const [sessionsInfo, setSessionsInfo] = useState([])
  const [comments, setComments] = useState([])
  const [createdDate, setCreatedDate] = useState('')
  const [lastUpdate, setLastUpdate] = useState('')

  const { shortName } = useParams()

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/v1/articles/${shortName}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setArticleInfo(data)
        setCategoryInfo(data.categoryID)
        setSessionsInfo(data.sessions)
        setCreatedDate(data.createdAt)
        setLastUpdate(data.updatedAt)
        setComments(data.comments)
        setTeacher(data.creator.name)
      })

  }, [shortName])
  return (
    <>
      <Topbar />
      <Navbar />
      <Breadcrumb
        links={[
          { id: 1, title: "خانه", to: "" },
          { id: 2, title: "مقاله ها", to: "category-info/python" },
          { id: 3, title: `${articleInfo.title}`, to: "course-info/js-expert" },
        ]}
      />
      <main className="main">
        <div className="container">
          <div className="row">
            <div className="col-8">
              <div className="article">
                <h1 className="article__title">
                  {articleInfo.title}
                </h1>
                <div className="article__header">
                  <div className="article-header__category article-header__item">
                    <i className="far fa-folder article-header__icon"></i>
                    <a href="#" className="article-header__text">{categoryInfo.title} </a>
                  </div>
                  <div className="article-header__category article-header__item">
                    <i className="far fa-user article-header__icon"></i>
                    <span className="article-header__text"> ارسال شده توسط {teacher}</span>
                  </div>
                  <div className="article-header__category article-header__item">
                    <i className="far fa-clock article-header__icon"></i>
                    <span className="article-header__text">{lastUpdate.slice(0, 10)} </span>
                  </div>
                  <div className="article-header__category article-header__item">
                    <i className="far fa-eye article-header__icon"></i>
                    <span className="article-header__text">  2.14k بازدید</span>
                  </div>
                </div>
                <img src={`http://127.0.0.1:8000/courses/covers/${articleInfo.cover}`} alt="Article Cover" className="article__banner" />

                <div className="article__score">
                  <div className="article__score-icons">
                    <img src="/images/svgs/star_fill.svg" className="article__score-icon" />
                    <img src="/images/svgs/star_fill.svg" className="article__score-icon" />
                    <img src="/images/svgs/star_fill.svg" className="article__score-icon" />
                    <img src="/images/svgs/star_fill.svg" className="article__score-icon" />
                    <img src="/images/svgs/star.svg" className="article__score-icon" />
                  </div>
                  <span className="article__score-text">4.2/5 - (5 امتیاز)</span>
                </div>

                <div className="article-read">
                  <span className="article-read__title">آنچه در این مقاله خواهید خواند</span>
                  <ul className="article-read__list">
                    <li className="article-read__item">
                      <a href="#" className="article-read__link">معرفی بهترین سایت ‌های آموزش جاوا اسکریپت:</a>
                    </li>
                    <li className="article-read__item">
                      <a href="#" className="article-read__link">یک راه آسان‌تر، دوره‌ های جاوا اسکریپت آکادمی سبزلرن!</a>
                    </li>
                    <li className="article-read__item">
                      <a href="#" className="article-read__link">ثبت نام در دوره‌ های جاوا اسکریپت سبزلرن:</a>
                    </li>
                  </ul>
                </div>

                <img src="/images/blog/2.jpg" alt="Article Image" className="article__seconadary-banner" />
                <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(articleInfo.body)}} className="article-section">
                  {/* <h2 className="article-section__title">
                    معرفی بهترین سایت ‌های آموزش جاوا اسکریپت:
                  </h2>
                  <p className="paragraph article-section__text">
                    توجه داشته باشید که تمام وب سایت‌هایی که به عنوان بهترین سایت آموزش جاوا اسکریپت در ادامه معرفی می‌کنیم، بین‌المللی هستند و منابع موجود در آن‌ها به زبان انگلیسی است. در نتیجه شما باید یا تسلط متوسط و حداقلی به زبان انگلیسی داشته باشید و یا اینکه با استفاده از گوگل ترنسلیت منابع موجود را ترجمه کرده و از آن‌ها استفاده کنید. به همین دلیل در انتهای محتوا به شما خواهیم گفت که راه آسان دیگری برای یادگیری زبان جاوا اسکریپت وجود دارد که شما بتوانید به واسطه آن به صورت رایگان و به زبان فارسی این زبان را یاد بگیرید.
                  </p>
                   */}
                </div>
                

                <div className="article-social-media">
                  <span className="article-social-media__text">اشتراک گذاری :</span>
                  <a href="#" className="article-social-media__link">
                    <i className="fab fa-telegram-plane article-social-media__icon"></i>
                  </a>
                  <a href="#" className="article-social-media__link">
                    <i className="fab fa-twitter article-social-media__icon"></i>
                  </a>
                  <a href="#" className="article-social-media__link">
                    <i className="fab fa-facebook-f article-social-media__icon"></i>
                  </a>
                </div>

              </div>
              <div className="suggestion-articles">
                <div className="row">
                  <div className="col-6">
                    <div className="suggestion-articles__right suggestion-articles__content">
                      <a href="#" className="suggestion-articles__icon-link">
                        <i className="fas fa-arrow-right suggestion-articles__icon"></i>
                      </a>
                      <a href="#" className="suggestion-articles__link">
                        سریع ترین و بهترین راه یادگیری جاوا اسکریپت چیست؟ | تجربه برنامه نویسان
                      </a>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="suggestion-articles__left suggestion-articles__content">
                      <a href="#" className="suggestion-articles__icon-link">
                        <i className="fas fa-arrow-left suggestion-articles__icon"></i>
                      </a>
                      <a href="#" className="suggestion-articles__link">
                        سریع ترین و بهترین راه یادگیری جاوا اسکریپت چیست؟ | تجربه برنامه نویسان
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <CommentSection />
            </div>
            <div className="col-4">
              <div className="courses-info">
                <div className="course-info">
                  <span className="course-info__courses-title">پر امتیازترین دوره ها</span>
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

                <div className="course-info">
                  <span className="course-info__courses-title">دسترسی سریع</span>
                  <ul className="sidebar-articles__list">
                    <li className="sidebar-articles__item">
                      <i className="fas fa-angle-left sidebar-articles__icon"></i>
                      <a href="#" className="sidebar-articles__link">صفحه اصلی</a>
                    </li>
                    <li className="sidebar-articles__item">
                      <i className="fas fa-angle-left sidebar-articles__icon"></i>
                      <a href="#" className="sidebar-articles__link">فرانت اند</a>
                    </li>
                    <li className="sidebar-articles__item">
                      <i className="fas fa-angle-left sidebar-articles__icon"></i>
                      <a href="#" className="sidebar-articles__link">امنیت</a>
                    </li>
                    <li className="sidebar-articles__item">
                      <i className="fas fa-angle-left sidebar-articles__icon"></i>
                      <a href="#" className="sidebar-articles__link">پایتون</a>
                    </li>
                    <li className="sidebar-articles__item">
                      <i className="fas fa-angle-left sidebar-articles__icon"></i>
                      <a href="#" className="sidebar-articles__link">مهارت های نرم</a>
                    </li>
                  </ul>
                </div>

                <div className="course-info">
                  <span className="course-info__courses-title">مقاله های جدید</span>
                  <ul className="last-articles__list">
                    <li className="last-articles__item">
                      <a href="#" className="last-articles__link">
                        نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه پایتون
                      </a>
                    </li>
                    <li className="last-articles__item">
                      <a href="#" className="last-articles__link">
                        نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه پایتون
                      </a>
                    </li>
                    <li className="last-articles__item">
                      <a href="#" className="last-articles__link">
                        نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه پایتون
                      </a>
                    </li>
                    <li className="last-articles__item">
                      <a href="#" className="last-articles__link">
                        نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه پایتون
                      </a>
                    </li>
                    <li className="last-articles__item">
                      <a href="#" className="last-articles__link">
                        نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه پایتون
                      </a>
                    </li>
                    <li className="last-articles__item">
                      <a href="#" className="last-articles__link">
                        نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه پایتون
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="course-info">
                  <span className="course-info__courses-title">دسته بندی مقالات</span>
                  <ul className="sidebar-articles__list">
                    <li className="sidebar-articles__item">
                      <i className="fas fa-angle-left sidebar-articles__icon"></i>
                      <a href="#" className="sidebar-articles__link">صفحه اصلی</a>
                    </li>
                    <li className="sidebar-articles__item">
                      <i className="fas fa-angle-left sidebar-articles__icon"></i>
                      <a href="#" className="sidebar-articles__link">فرانت اند</a>
                    </li>
                    <li className="sidebar-articles__item">
                      <i className="fas fa-angle-left sidebar-articles__icon"></i>
                      <a href="#" className="sidebar-articles__link">امنیت</a>
                    </li>
                    <li className="sidebar-articles__item">
                      <i className="fas fa-angle-left sidebar-articles__icon"></i>
                      <a href="#" className="sidebar-articles__link">پایتون</a>
                    </li>
                    <li className="sidebar-articles__item">
                      <i className="fas fa-angle-left sidebar-articles__icon"></i>
                      <a href="#" className="sidebar-articles__link">مهارت های نرم</a>
                    </li>
                  </ul>
                </div>

                <div className="course-info">
                  <span className="course-info__courses-title">دوره های جدید</span>
                  <ul className="sidebar-articles__list">
                    <li className="sidebar-articles__item">
                      <i className="fas fa-angle-left sidebar-articles__icon"></i>
                      <a href="#" className="sidebar-articles__link">صفحه اصلی</a>
                    </li>
                    <li className="sidebar-articles__item">
                      <i className="fas fa-angle-left sidebar-articles__icon"></i>
                      <a href="#" className="sidebar-articles__link">فرانت اند</a>
                    </li>
                    <li className="sidebar-articles__item">
                      <i className="fas fa-angle-left sidebar-articles__icon"></i>
                      <a href="#" className="sidebar-articles__link">امنیت</a>
                    </li>
                    <li className="sidebar-articles__item">
                      <i className="fas fa-angle-left sidebar-articles__icon"></i>
                      <a href="#" className="sidebar-articles__link">پایتون</a>
                    </li>
                    <li className="sidebar-articles__item">
                      <i className="fas fa-angle-left sidebar-articles__icon"></i>
                      <a href="#" className="sidebar-articles__link">مهارت های نرم</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
