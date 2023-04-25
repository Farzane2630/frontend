import React from 'react'
import './CourseDetailsBox.css'

export default function CourseDetailsBox({ props }) {
    return (
        <>
            {
                props.map(prop => (
                    <div className="col-4" key={prop.id}>
                        <div className="course-boxes__box">
                            <div className="course-boxes__box-right">
                                <i className={`course-boxes__box-right-icon fas ${prop.icon}`}></i>
                            </div>
                            <div className="course-boxes__box-left">
                                <span className="course-boxes__box-left-title">
                                    {prop.title}
                                </span>
                                <span className="course-boxes__box-left--subtitle">
                                    {prop.subTitle}
                                </span>
                            </div>
                        </div>
                    </div>
                ))
            }
        </>

    )
}
