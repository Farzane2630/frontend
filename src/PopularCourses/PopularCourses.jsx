import React, { useEffect, useState } from 'react'
import './PopularCourses.css'
import SectionHeader from '../Components/SectionHeader/SectionHeader'
import CourseBox from '../Components/CourseBox/CourseBox';
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function PopularCourses() {
    const [allPopularCourses, setAllPopularCourses] = useState([])

    useEffect(() => {
        fetch("http://127.0.0.1:8000/v1/courses/popular")
            .then(res => res.json())
            .then(allCourses => {
                setAllPopularCourses(allCourses)
            })
    }, [])
    return (
        <div className="popular">
            <div className="container">
                <SectionHeader
                    title="محبوب ترین دوره ها"
                />
            </div>
            <div className="courses-content">
                <div className="container">
                    <div className="row">
                        <Swiper
                            slidesPerView={3}
                            spaceBetween={30}
                            loop={true}
                            pagination={{
                                clickable: true,
                            }}
                            className="mySwiper"
                        >
                            {
                                allPopularCourses.map(course => (
                                    <SwiperSlide>
                                        <CourseBox {...course} isSlider={true} />
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                    </div>
                </div>
            </div>
        </div>
    )
}
