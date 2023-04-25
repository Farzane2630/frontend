import React, { useContext, useEffect, useState } from 'react'
import Accordion from 'react-bootstrap/Accordion'
import Topbar from '../../Components/Topbar/Topbar'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import Breadcrumb from '../../Components/Breadcrumb/Breadcrumb'
import CourseDetailsBox from '../../Components/CourseDetailsBox/CourseDetailsBox'
import Sidebar from '../../Components/Sidebar/Sidebar'
import CommentSection from '../../Components/CommentSection/CommentSection'
import "./CoursesInfo.css"
import { useParams, Link } from 'react-router-dom'
import { AuthContext } from '../../Contexts/AuthContext'
import { FcLock } from "react-icons/fc"

export default function CoursesInfo() {

  const [courseInfo, setCourseInfo] = useState({})
  const [teacher, setTeacher] = useState({})
  const [categoryInfo, setCategoryInfo] = useState({})
  const [sessionsInfo, setSessionsInfo] = useState([])
  const [comments, setComments] = useState([])
  const [createdDate, setCreatedDate] = useState('')
  const [lastUpdate, setLastUpdate] = useState('')
  const [isStudent, setIsStudent] = useState(false)

  const { courseName } = useParams()

  useEffect(() => {
    const userLocalStorage = JSON.parse(localStorage.getItem('user'))

    fetch(`http://127.0.0.1:8000/v1/courses/${courseName}`, {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${userLocalStorage ? userLocalStorage.token : null}`
      }
    })
      .then(res => res.json())
      .then(courseInfos => {
        console.log("courseInfo", courseInfos)
        setCourseInfo(courseInfos)
        setCategoryInfo(courseInfos.categoryID)
        setSessionsInfo(courseInfos.sessions)
        setCreatedDate(courseInfos.createdAt)
        setLastUpdate(courseInfos.updatedAt)
        setComments(courseInfos.comments)
        setTeacher(courseInfos.creator)

        courseInfos.isUserRegisteredToThisCourse ? setIsStudent(true) : setIsStudent(false)

      })
  }, [])
  return (
    <>
      <Topbar />
      <Navbar />
      <Breadcrumb
        links={[
          { id: 1, title: "خانه", to: "" },
          { id: 2, title: `${categoryInfo.title}`, to: "category-info/python" },
          { id: 3, title: `${courseInfo.name}`, to: "course-info/js-expert" },
        ]}
      />

      <section className="course-info">
        <div className="container">
          <div className="row">
            <div className="col-6">
              <a href="#" className="course-info__link">
                {categoryInfo.title}
              </a>
              <h1 className="course-info__title">
                {courseInfo.name}
              </h1>
              <p className="course-info__text">
                {courseInfo.description}
              </p>
              <div className="course-info__social-media">
                <a href="#" className="course-info__social-media-item">
                  <i className="fab fa-telegram-plane course-info__icon"></i>
                </a>
                <a href="#" className="course-info__social-media-item">
                  <i className="fab fa-twitter course-info__icon"></i>
                </a>
                <a href="#" className="course-info__social-media-item">
                  <i className="fab fa-facebook-f course-info__icon"></i>
                </a>
              </div>
            </div>

            <div className="col-6">
              <video src={courseInfo.cover} poster="" className="course-info__video" controls></video>
            </div>
          </div>
        </div>
      </section>

      <main className="main">
        <div className="container">
          <div className="row">
            <div className="col-8">
              <div className="course-boxes">
                <div className="row">
                  <CourseDetailsBox
                    props={
                      [
                        { id: 1, title: "وضعیت دوره:", subTitle: `${courseInfo.isComplete === 0 ? "درحال برگزاری" : "به اتمام رسیده"}`, icon: "fa-graduation-cap" },
                        { id: 2, title: "مدت زمان دوره:", subTitle: "19 ساعت", icon: "fa-clock" },
                        { id: 3, title: "آخرین بروزرسانی:", subTitle: `${lastUpdate.slice(0, 10)}`, icon: "fa-calendar-alt" },
                        { id: 4, title: "روش پشتیبانی:", subTitle: `${courseInfo.support}`, icon: "fa-user-alt" },
                        { id: 5, title: "پیش نیاز:", subTitle: "HTML CSS", icon: "fa-info-circle" },
                        { id: 6, title: "نوع مشاهده:", subTitle: "ضبط شده / آنلاین", icon: "fa-play" },
                      ]
                    }
                  />
                </div>
              </div>
              <div className="course-progress">
                <div className="course-progress__header">
                  <i className="fas fa-chart-line course-progress__icon"></i>
                  <span className="course-progress__title">
                    درصد پیشرفت دوره: 100%
                  </span>
                </div>
                <div className="progress course-progress__bar">
                  <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ width: "75%" }}></div>
                </div>
              </div>

              <div className="introduction">
                <div className="introduction__item">
                  <span className="introduction__title title">
                    {courseInfo.name}
                  </span>
                  <img src="/images/info/1.gif" alt="course info image" className="introduction__img img-fluid" />
                  <p className="introduction__text">
                    کتابخانه های بسیار زیادی برای زبان جاوا اسکریپت وجود دارد و سالانه چندین کتابخانه جدید نیز به این لیست اضافه می شود که در بازار کار به شدت از آن ها استفاده می شود و اگر بدون بلد بودن این کتابخانه ها وارد بازار کار شوید، خیلی اذیت خواهید شد و حتی ممکن است ناامید شوید!
                  </p>
                  <p className="introduction__text">
                    در این دوره نحوه کار با 20 مورد از پر استفاده ترین کتابخانه های جاوا اسکریپت به صورت پروژه محور به شما عزیزان آموزش داده می شود تا هیچ مشکلی برای ورود به بازار کار نداشته باشید
                  </p>
                </div>
                <div className="introduction__item">
                  <span className="introduction__title title">
                    هدف از این دوره چیست؟ (تنها راه ورود به بازار کار و کسب درآمد)
                  </span>
                  <img src="/images/info/2.jpg" alt="course info image" className="introduction__img img-fluid" />
                  <p className="introduction__text">
                    وقتی برای اولین بار وارد یکی از شرکت های برنامه نویسی شدم، از کتابخانه هایی به اسم Lodash و Formik استفاده می شد، در حالی که من اولین بارم بود اسم Formik را می شنیدم و تا اون موقع از این کتابخانه ها استفاده نکرده بودم.
                  </p>
                  <p className="introduction__text">
                    همینجا بود که متوجه شدم کتابخانه های جاوا اسکریپت یکی از مهم ترین مباحثی هستند که هر برنامه نویس وب برای ورود به بازار کار و کسب درآمد بهتر، راحت و بیشتر باید با آن ها کار کرده باشد                  </p>
                  <p className="introduction__text">
                    همان طور که از اسم این دوره مشخص است، هدف از این دوره آموزش 20 مورد از کاربردی ترین و پر استفاده ترین کتابخانه های جاوا اسکریپت است تا شما بتوانید بعد از این دوره با قدرت و آمادگی بیشتر ادامه مسیر برنامه نویسی وب را ادامه دهید، ری اکت یا نود یا … را راحت تر یاد بگیرید و در نهایت وارد بازار کار شده و کسب درآمد کنید.
                  </p>
                  <p className="introduction__text">
                    شا به عنوان یک برنامه نویس وب، حداقل اگر با کتابخانه خاصی کار نکرده باشید، باید بلد باشید که چطور باید یک کتابخانه جدید را یاد بگیرید. فرض کنید یک یک کتابخانه جدید ساخته شد. آیا شما باید منتظر دوره آموزشی باشید؟! قطعا نه.
                  </p>
                  <p className="introduction__text">
                    در این دوره سعی کردیم علاوه بر آموزش مستقیم هر کتابخانه، نحوه یادگیری یک کتابخانه جدید را نیز به شما عزیزان آموزش دهیم تا بعد از گذراندن دوره، دیگر وابسته هیچ دوره یا شخص خاصی نباشید و اگر کتابخانه جدیدی به دنیای جاوا اسکریپت و وب اضافه شد، به راحتی بتوانید آن را یاد بگیرید.
                  </p>
                </div>

                <div className="introduction__btns">
                  <a href="#" className="introduction__btns-item">دانلود همگانی ویدیوها</a>
                  <a href="#" className="introduction__btns-item">دانلود همگانی پیوست‌ها</a>
                </div>

                <div className="introduction__topic">
                  <Accordion defaultActiveKey="0">
                    <Accordion.Header>معرفی دوره</Accordion.Header>
                    <Accordion.Item eventKey="0" className='accordion' id="accordionExample">
                      {
                        sessionsInfo.map((session, index) => (
                          <>
                            {
                              session.free === 1 || isStudent ? (
                                <>
                                  <Accordion.Body className='introduction__accordion-body'>
                                    <div className="introduction__accordion-right">
                                      <span className="introduction__accordion-count">{index + 1}</span>
                                      <i className="fab fa-youtube introduction__accordion-icon"></i>
                                      <Link to={`/${courseName}/ ${session._id}`} className="introduction__accordion-link">
                                        {session.title}
                                      </Link>
                                    </div>
                                    <div className="introduction__accordion-left">
                                      <span className="introduction__accordion-time">
                                        {session.time}
                                      </span>
                                    </div>
                                  </Accordion.Body>
                                </>
                              ) : (
                                <>
                                  <Accordion.Body className='introduction__accordion-body'>
                                    <div className="introduction__accordion-right">
                                      <span className="introduction__accordion-count">{index + 1}</span>
                                      <i className="fab fa-youtube introduction__accordion-icon"></i>
                                      <span href="#" className="introduction__accordion-link">
                                        {session.title}
                                      </span>
                                    </div>
                                    <div className="introduction__accordion-left">
                                      <span className="introduction__accordion-time">
                                        {session.time}

                                      </span>
                                      <FcLock />
                                    </div>
                                  </Accordion.Body>
                                </>
                              )
                            }
                          </>
                        ))
                      }
                    </Accordion.Item>
                  </Accordion>
                </div>

              </div>

              <div className="techer-details">
                <div className="techer-details__header">
                  <div className="techer-details__header-right">
                    <img src="/images/info/teacher.jfif" alt="Teacher Profile" className="techer-details__header-img" />
                    <div className="techer-details__header-titles">
                      <a href="#" className="techer-details__header-link">{teacher.name}</a>
                      <span className="techer-details__header-skill">
                        Front End & Back End Developer
                      </span>
                    </div>
                  </div>
                  <div className="techer-details__header-left">
                    <i className="fas fa-chalkboard-teacher techer-details__header-icon"></i>
                    <span className="techer-details__header-name">مدرس</span>
                  </div>
                </div>
                <p className="techer-details__footer">
                  اول از همه برنامه نویسی اندروید رو شروع کردم و نزدیک به 2 سال با زبان جاوا اندروید کار میکردم .بعد تصمیم گرفتم در زمینه وب فعالیت داشته باشم.و..
                </p>
              </div>

              <CommentSection />
            </div>
            <Sidebar
              isStudent={isStudent}
              studentsCount={courseInfo.courseStudentsCount}
              comments={comments.length}
            />
          </div>
        </div>
      </main>
      <Footer />
    </>

  )
}
