import React, { useEffect, useState } from 'react'
import ArticleBox from '../Components/ArticleBox/ArticleBox'
import SectionHeader from '../Components/SectionHeader/SectionHeader'
import './RecentArticles.css'

export default function RecentArticles() {
  const [articles, setArticles] = useState([])

  useEffect(() => {
    fetch("http://127.0.0.1:8000/v1/articles")
      .then(res => res.json())
      .then(data => {
        setArticles(data);
      })
  }, [])

  return (
    <section className="articles">
      <div className="container">

        <SectionHeader
          title="جدیدترین مقاله ها"
          subTitle="پیش به سوی ارتقای دانش"
          btnTitle="تمامی مقاله ها"
          pathname="/articles/1"
        />


        <div className="articles__content">
          <div className="row">
            {
              articles.slice(0,3).map(article=>(
                <ArticleBox
                  href="#"
                  {...article}
                />
              ))
            }
          </div>
        </div>
      </div>
    </section>
  )
}
