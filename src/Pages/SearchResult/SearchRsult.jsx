import React, { useState } from 'react'
import Topbar from '../../Components/Topbar/Topbar'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import SectionHeader from '../../Components/SectionHeader/SectionHeader'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import CourseBox from '../../Components/CourseBox/CourseBox'
import ArticleBox from '../../Components/ArticleBox/ArticleBox'

export default function SearchRsult() {
   const [courses, setCourses] = useState([])
   const [articles, setArticles] = useState([])
   const { value } = useParams()

   useEffect(() => {
      fetch(`http://127.0.0.1:8000/v1/search/${value}`)
         .then(res => res.json())
         .then(results => {
            console.log(results)
            setArticles(results.allResultArticles)
            setCourses(results.allResultCourses)
         })
   }, [value])

   return (
      <>
         <Topbar />
         <Navbar />
         <SectionHeader
            title="نتایج جستجوی دوره ها"
            subTitle="پیش به سوی سکوی پرتاب شما"
         />
         {
            courses.length === 0 ? (
               <div className="alert alert-warning">نتیجه ای برای این جستجو یافت نشد!</div>
            ) : (
               <div className="courses-content">
                  <div className="container">
                     <div className="row">
                        {
                           courses.map(courseInfo => (

                              <CourseBox key={courseInfo._id} {...courseInfo} />
                           ))
                        }
                     </div>
                  </div>
               </div>)
         }

         <SectionHeader
            title="نتایج جستجوی مقاله ها"
            subTitle="پیش به سوی سکوی پرتاب شما"
         />
         {
            articles.length === 0 ? (
               <div className="alert alert-warning">نتیجه ای برای این جستجو یافت نشد!</div>
            ) :
               (
                  <div className="container">
                     <div className="courses-content">
                        <div className="container">
                           <div className="row">
                              {articles.map((article) => (
                                 <ArticleBox key={article._id} {...article} />
                              ))}
                           </div>
                        </div>
                     </div>
                  </div>
               )
         }

         <Footer />
      </>
   )
}
