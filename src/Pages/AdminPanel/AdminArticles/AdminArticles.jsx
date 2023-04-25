import React, { useEffect, useState } from 'react'
import TableContent from '../../../Components/AdminPanel/TableContent/TableContent'
import swal from 'sweetalert';

import { minValidator } from "../../../Components/Validators/rules"
import { useForm } from '../../../hooks/useForm'
import Input from '../../../Components/Form/Input';
import Editor from '../../../Components/Form/Editor';

export default function AdminArticles() {

  const [formState, onInputHandler] = useForm({
    title: {
      value: "",
      isValid: false,
    },
    description: {
      value: "",
      isValid: false,
    },
    shortName: {
      value: "",
      isValid: false,
    }
  },
    false
  )

  const [allArticles, setAllArticles] = useState([])
  const [categories, setCategories] = useState([])
  const [categoryID, setCategoryID] = useState("-1")
  const [articleCover, setArticleCover] = useState({})
  const [articleBody, setArticleBody] = useState("")


  useEffect(() => {
    getAllArticles()

    fetch("http://127.0.0.1:8000/v1/category")
      .then(res => res.json())
      .then(allCategories => {
        setCategories(allCategories)
      })

  }, [])

  function getAllArticles() {
    fetch("http://127.0.0.1:8000/v1/articles")
      .then(res => res.json())
      .then(articles => {
        setAllArticles(articles)
      })

  }

  const deleteArticle = (ID) => {
    const localStorageData = JSON.parse(localStorage.getItem("user"))

    fetch(`http://127.0.0.1:8000/v1/articles/${ID}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorageData.token}`
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
      }).then(result => {
        swal({
          title: "",
          buttons: "Done",
          icon: "success"
        })

        getAllArticles()
      })

  }

  const optionValueHandler = (e) => {
    setCategoryID(e.target.value)
  }

  const addArticle = e => {
    e.preventDefault()

    const localStorageData = JSON.parse(localStorage.getItem("user"))

    let formData = new FormData()

    formData.append("title", formState.inputs.title.value)
    formData.append("description", formState.inputs.description.value)
    formData.append("body", articleBody)
    formData.append("shortName", formState.inputs.shortName.value)
    formData.append("categoryID", categoryID)
    formData.append("cover", articleCover)

    if (categoryID === "-1") {
      swal({
        title: "لطفا دسته بندی را انتخاب نمایید",
        icon: "warning",
        buttons: "OK"
      })
    } else {
      fetch("http://127.0.0.1:8000/v1/articles", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorageData.token}`
        },
        body: formData
      })
        .then(res => {
          if (res.ok) {
            swal({
              title: "مقاله با موفقیت ثبت شد.",
              icon: "success",
              buttons: "Done"
            })
          }
        }).then(result => {
          getAllArticles()
        })

    }


  }

  return (
    <>
      <div class="container-fluid" id="home-content">
        <div class="container">
          <div class="home-title">
            <span>افزودن مقاله جدید</span>
          </div>
          <form class="form">
            <div class="col-6">
              <div class="name input">
                <label class="input-title">نام دوره</label>
                <Input
                  id="title"
                  element="input"
                  onInputHandler={onInputHandler}
                  validations={[minValidator(5)]}
                  type="text"
                  placeholder="لطفا عنوان مقاله را وارد کنید..."
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="number input">
                <label class="input-title">Url مقاله</label>
                <Input
                  id="shortName"
                  element="input"
                  onInputHandler={onInputHandler}
                  validations={[minValidator(5)]}
                  type="text"
                  isValid="false"
                  placeholder="لطفا Url مقاله را وارد کنید..."
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="price input">
                <label class="input-title">توضیحات مقاله</label>
                <Input
                  id="description"
                  element="textarea"
                  onInputHandler={onInputHandler}
                  validations={[minValidator(5)]}
                  type="text"
                  placeholder="لطفا محتوای مقاله را وارد کنید..."
                  className="article-textarea"
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="number input">
                <label class="input-title">دسته‌بندی دوره</label>
                <select
                  onChange={optionValueHandler}
                >
                  <option value="-1">انتخاب دسته بندی</option>
                  {
                    categories.map(category => (
                      <option value={category._id} key={category._id}> {category.title} </option>
                    ))
                  }
                </select>
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-12">
              <div class="price input">
                <label class="input-title">محتوای مقاله</label>
                <Editor
                  value={articleBody}
                  setValue={setArticleBody}
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>

            <div class="col-6">
              <div class="file">
                <label class="input-title">عکس دوره</label>
                <input
                  type="file"
                  id="file"
                  onChange={e => setArticleCover(e.target.files[0])}
                />
              </div>
            </div>
            <div class="col-12">
              <div class="bottom-form">
                <div class="condition">
                  <div class="submit-btn">
                    <input type="submit" value="افزودن" onClick={e => addArticle(e)} />
                  </div>
                </div>
              </div>
            </div>
          </form >
        </div >
      </div >

      <TableContent title="مقالات">
        <table className="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>عنوان</th>
              <th>لینک</th>
              <th>نویسنده</th>
              <th>ویرایش</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {
              allArticles.map((article, index) => (
                <tr>
                  <th>{index + 1}</th>
                  <th>{article.title}</th>
                  <th>{article.shortName}</th>
                  <th>{article.creator.name}</th>
                  <th>
                    <button
                      type="button"
                      className="btn btn-primary edit-btn">
                      ویرایش
                    </button>
                  </th>
                  <th>
                    <button
                      type="button"
                      className="btn btn-danger delete-btn"
                      onClick={() => deleteArticle(article._id)}
                    >
                      حذف
                    </button>
                  </th>
                </tr>
              ))
            }
          </tbody>
        </table>
      </TableContent >
    </>
  )
}
