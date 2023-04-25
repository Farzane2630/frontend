import React, { useEffect, useState } from 'react'
import Footer from '../../Components/Footer/Footer'
import Navbar from '../../Components/Navbar/Navbar'
import Topbar from '../../Components/Topbar/Topbar'
import CourseBox from '../../Components/CourseBox/CourseBox'
import "./Category.css"
import Paginatin from '../../Components/Paginatin/Paginatin'
import { Link, useParams } from 'react-router-dom'

export default function Category() {
  const [courses, setCourses] = useState([])
  const [shownCourses, setShownCourses] = useState([])
  const [sortedCourses, setSortedCourses] = useState([])
  const [sortedBy, setSortedBy] = useState('default')
  const [sortTitle, setSortTitle] = useState('مرتب سازی بر اساس پیش فرض')
  const [searchValue, setSearchValue] = useState("")
  const [displayMode, setDisplayMode] = useState("row")


  const { categoryName } = useParams()



  useEffect(() => {
    const localInfos = JSON.parse(localStorage.getItem("user"))

    fetch(`http://127.0.0.1:8000/v1/courses/category/${categoryName}`, {
      headers: {
        Authorization: `Bearer ${localInfos.token}`,
      }
    })
      .then(res => res.json())
      .then(categoryInfo => {
        setCourses(categoryInfo)
        setSortedCourses(categoryInfo)
      })
  }, [categoryName])

  useEffect(() => {
    switch (sortedBy) {
      case "free": {
        const freeCourses = courses.filter(course => course.price === 0)
        console.log(freeCourses);
        setSortedCourses(freeCourses)
        break
      }
      case "costing": {
        const costingCourses = courses.filter(course => course.price !== 0)
        setSortedCourses(costingCourses)
        break
      }
      case "last": {
        setSortedCourses(courses)
        break
      }
      case "first": {
        const reversedCourses = courses.slice().reverse()
        setSortedCourses(reversedCourses)
        break
      }
      default: setCourses(courses)
    }
  }, [sortedBy])

  const onSortTitleHandler = event => {
    setSortTitle(event.target.textContent)
  }

  const searchValueHandler = e => {
    setSearchValue(e.target.value)

    const filteredResults = sortedCourses.filter(course => course.name.includes(e.target.value))
    setSortedCourses(filteredResults)
  }

  return (
    <>
      <Topbar />
      <Navbar />
      <section className="courses">
        <div className="container">
          <div className="courses-top-bar">

            <div className="courses-top-bar__right">
              <div className={`courses-top-bar__row-btn ${displayMode === "row" ? "courses-top-bar__icon--active" : ""}`} onClick={() => setDisplayMode("row")}>
                <i className="fas fa-border-all courses-top-bar__icon"></i>
              </div>
              <div className={`courses-top-bar__row-btn ${displayMode === "column" ? "courses-top-bar__icon--active" : ""}`} onClick={() => setDisplayMode("column")}>
                <i className="fas fa-align-left courses-top-bar__icon"></i>
              </div>

              <div className="courses-top-bar__selection">
                <span className="courses-top-bar__selection-title">
                  {
                    sortTitle
                  }
                  <i className="fas fa-angle-down courses-top-bar__selection-icon"></i>
                </span>
                <ul className="courses-top-bar__selection-list">
                  <li className="courses-top-bar__selection-item courses-top-bar__selection-item--active"
                    onClick={(event) => {
                      setSortedBy("default")
                      onSortTitleHandler(event)
                    }}
                  >مرتب سازی پیش فرض</li>
                  <li className="courses-top-bar__selection-item"
                    onClick={(event) => {
                      setSortedBy("free")
                      onSortTitleHandler(event)
                    }}
                  >دوره های رایگان</li>
                  <li className="courses-top-bar__selection-item"
                    onClick={(event) => {
                      setSortedBy("costing")
                      onSortTitleHandler(event)
                    }}
                  >دوره های غیر رایگان</li>
                  <li className="courses-top-bar__selection-item"
                    onClick={(event) => {
                      setSortedBy("last")
                      onSortTitleHandler(event)
                    }}
                  >مرتب سازی از آخر به اول</li>
                  <li className="courses-top-bar__selection-item"
                    onClick={(event) => {
                      setSortedBy("first")
                      onSortTitleHandler(event)
                    }}
                  >مرتب سازی از اول به آخر</li>
                </ul>
              </div>
            </div>

            <div className="courses-top-bar__left">
              <form action="#" className="courses-top-bar__form">
                <input type="text" className="courses-top-bar__input" value={searchValue} onChange={e => searchValueHandler(e)} placeholder="جستجوی دوره ..." />
                <i className="fas fa-search courses-top-bar__search-icon"></i>
              </form>
            </div>

          </div>
          <div className="courses-content">
            <div className="container">
              <div className="row">
                {
                  shownCourses.length === 0 ? (
                    <>
                      <div className='alert alert-warning'>
                        هیچ نتیجه ای یافت نشد.
                      </div>
                    </>
                  ) :
                    (
                      <>
                        {
                          displayMode === "row" ? (
                            <>
                              {
                                shownCourses.map(course => (
                                  <CourseBox key={course.id} {...course} />
                                ))
                              }
                            </>
                          )
                            : (
                              <>
                                {
                                  shownCourses.map(course => (
                                    <div className="col-12">
                                      <div className="course-box">
                                        <a href="#">
                                          <img src={course.cover} alt="Course img" className="course-box__img" />
                                        </a>
                                        <div className="course-box__main">
                                          <a href="#" className="course-box__title">{course.name}</a>

                                          <div className="course-box__rating-teacher">
                                            <div className="course-box__teacher">
                                              <i className="fas fa-chalkboard-teacher course-box__teacher-icon"> </i>
                                              {course.creator}
                                              <Link to={`/course-info/${course.shortName}`} className="course-box__teacher-link"> {course.teacher} </Link>
                                            </div>
                                            <div className="course-box__rating">
                                              {
                                                Array(course.courseAverageScore).fill(0).map(star => (
                                                  <img key={star.length} src="/images/svgs/star_fill.svg" alt="rating" className="course-box__star" />
                                                ))
                                              }
                                            </div>
                                          </div>

                                          <div className="course-box__status">
                                            <div className="course-box__users">
                                              <i className="fas fa-users course-box__users-icon"></i>
                                              <span className="course-box__users-text">500</span>
                                            </div>
                                            <span className="course-box__price">
                                              {
                                                course.price !== 0 ? course.price : "رایگان"
                                              }
                                            </span>
                                          </div>
                                        </div>

                                        <div className="course-box__footer">
                                          <Link to={`/course-info/${course.shortName}`} className="course-box__footer-link">
                                            مشاهده اطلاعات
                                            <i className="fas fa-arrow-left course-box__footer-icon"></i>
                                          </Link>
                                        </div>

                                      </div>
                                    </div>
                                  ))
                                }
                              </>

                            )
                        }
                      </>
                    )
                }
              </div>
            </div>
          </div>
          <Paginatin
            items={sortedCourses}
            itemsCount={6}
            pathname={`/category-info/${categoryName}`}
            setShownCourses={setShownCourses}
          />
        </div>
      </section>
      <Footer />
    </>
  )
}
