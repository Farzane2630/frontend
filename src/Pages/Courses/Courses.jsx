import React, { useEffect, useState } from 'react'
import Breadcrumb from '../../Components/Breadcrumb/Breadcrumb'
import Footer from '../../Components/Footer/Footer'
import Navbar from '../../Components/Navbar/Navbar'
import Topbar from '../../Components/Topbar/Topbar'
import CourseBox from '../../Components/CourseBox/CourseBox'
import Pagination from '../../Components/Paginatin/Paginatin'
import './Courses.css'


export default function Courses() {
    const [courses, setCourses] = useState([])
    const [shownCourses, setShownCourses] = useState([])

    useEffect(() => {
        const localInfos = JSON.parse(localStorage.getItem("user"))
        fetch("http://127.0.0.1:8000/v1/courses", {
            headers: {
                Authorization: `Bearer ${localInfos.token}`,
            }
        })
            .then(res => res.json())
            .then(result => {
                setCourses(result)
            })
        console.log(shownCourses);

    }, [])

    return (
        <>
            <Topbar />
            <Navbar />
            <Breadcrumb links={[
                { id: 1, title: "خانه", to: "" },
                { id: 2, title: "دوره ها" }
            ]}
            />

            <div className="courses-content">
                <div className="container">
                    <div className="row">
                        {
                            shownCourses.map(courseInfo => (

                                <CourseBox key={courseInfo.id} {...courseInfo} />
                            ))
                        }
                    </div>
                </div>

                <Pagination
                    items={courses}
                    itemsCount={6}
                    pathname="/courses"
                    setShownCourses={setShownCourses}
                />
            </div>


            <Footer />
        </>
    )
}
