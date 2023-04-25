import React, { useEffect, useState } from 'react'
import CourseBox from '../CourseBox/CourseBox'
import SectionHeader from '../SectionHeader/SectionHeader'

import './LastCourses.css'

export default function LastCourses() {

    const [lastCoursesInfos, setLastCoursesInfos] = useState([])

    useEffect(() => {
        const localInfos = JSON.parse(localStorage.getItem("user"))

        fetch("http://127.0.0.1:8000/v1/courses")
            .then(res => res.json())
            .then(result => {
                setLastCoursesInfos(result)
                console.log(result);
            })
    }, [])
    return (
        <div className="courses">
            <div className="container">
                <SectionHeader
                    title="جدیدترین دوره های آموزشی"
                    subTitle="سکوی پرتاب شما به سمت موفقیت"
                    btnTitle="آخرین دوره ها"
                    pathname="/courses/1"
                />
                <div className="courses-content">
                    <div className="container">
                        <div className="row">
                            {
                                lastCoursesInfos.slice(0,3).map(courseInfo => (

                                    <CourseBox {...courseInfo} />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
