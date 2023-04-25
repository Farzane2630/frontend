import React from 'react'
import AboutUs from '../../AboutUs/AboutUs'
import Footer from '../../Components/Footer/Footer'
import Header from '../../Components/Header/Header'
import LastCourses from '../../Components/LastCourses/LastCourses'
import PopularCourses from '../../PopularCourses/PopularCourses'
import PreSaleCourses from '../../PreSaleCourses/PreSaleCourses'
import RecentArticles from '../../RecentArticles/RecentArticles'
import './Index.css'

export default function Index() {
  return (
    <>
      <Header />
      <LastCourses />
      <AboutUs />
      <PopularCourses />
      <PreSaleCourses />
      <RecentArticles />
      <Footer />
    </>
  )
}
