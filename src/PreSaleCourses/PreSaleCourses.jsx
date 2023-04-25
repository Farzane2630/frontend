import React, { useEffect, useState } from 'react'
import './PreSaleCourses.css'
import SectionHeader from '../Components/SectionHeader/SectionHeader'
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import CourseBox from '../Components/CourseBox/CourseBox';

export default function PreSaleCourses() {
  const [allPresellCourses, setAllPresellCourses] = useState([])

  useEffect(() => {
    fetch("http://127.0.0.1:8000/v1/courses/presell")
      .then(res => res.json())
      .then(allCourses => {
        setAllPresellCourses(allCourses)
      })
  }, [])
  return (
    <div className="presell">
      <div className="container">
        <SectionHeader
          title="دوره های در حال پیش فروش"
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
                allPresellCourses.map(course => (
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
