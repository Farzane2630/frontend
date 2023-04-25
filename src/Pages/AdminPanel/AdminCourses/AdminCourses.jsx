import React, { useEffect, useState } from 'react'
import TableContent from '../../../Components/AdminPanel/TableContent/TableContent'
import Input from '../../../Components/Form/Input'
import { minValidator } from "../../../Components/Validators/rules"
import { useForm } from '../../../hooks/useForm'


import "./AdminCourses.css";
import swal from 'sweetalert'

export default function AdminCourses() {
  const [formState, onInputHandler] = useForm({
    name: {
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
    },
    price: {
      value: "",
      isValid: false,
    },
    support: {
      value: "",
      isValid: false,
    }
  },
    false
  )

  const [courses, setCourses] = useState([])
  const [categories, setCategories] = useState([])
  const [categoryID, setCategoryID] = useState("-1")
  const [courseStatus, setCourseStatus] = useState("presell")
  const [courseCover, setCourseCover] = useState({})


  function getAllCourses() {
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    fetch("http://127.0.0.1:8000/v1/courses", {
      headers: {
        Authorization: `Bearer ${localStorageData.token}`,
      },
    })
      .then((res) => res.json())
      .then((allCourses) => {
        console.log(allCourses);
        setCourses(allCourses);
      });

  }

  const deleteCourse = (courseID) => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));

    fetch(`http://127.0.0.1:8000/v1/courses/${courseID}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorageData.token}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        swal({
          title: "دوره با موفقیت حذف شد",
          icon: "success",
          buttons: "تائید"
        }).then(() => {
          getAllCourses()
        })
      })
  }

  const addCourse = e => {
    e.preventDefault()
    const localStorageData = JSON.parse(localStorage.getItem("user"));

    let formData = new FormData()
    formData.append("name", formState.inputs.name.value)
    formData.append("description", formState.inputs.description.value)
    formData.append("shortName", formState.inputs.shortName.value)
    formData.append("price", formState.inputs.price.value)
    formData.append("support", formState.inputs.support.value)
    formData.append("categoryID", categoryID)
    formData.append("status", courseStatus)
    formData.append("cover", courseCover)

    if (categoryID === "-1") {
      swal({
        icon: "warning",
        title: "لطفا دسته بندی را انتخاب نمایید",
        buttons: "ok"
      })
    } else {
      fetch("http://127.0.0.1:8000/v1/courses", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorageData.token}`
        },
        body: formData
      }).then(res => {
        console.log(res)

        if (res.ok) {
          swal({
            title: ".دوره جدید با موفقیت ثبت شد",
            icon: "success",
            buttons: "Done"
          }).then(() => {
            getAllCourses()
          })
        }
      })
    }

  }

  const optionValueHandler = e => {
    setCategoryID(e.target.value)
  }

  useEffect(() => {
    getAllCourses()

    fetch("http://127.0.0.1:8000/v1/category")
      .then(res => res.json())
      .then(allCategories => {
        setCategories(allCategories)
      })
  }, [])

  return (
    <>
      <div class="container-fluid" id="home-content">
        <div class="container">
          <div class="home-title">
            <span>افزودن دوره جدید</span>
          </div>
          <form class="form">
            <div class="col-6">
              <div class="name input">
                <label class="input-title">نام دوره</label>
                <Input
                  id="name"
                  element="input"
                  onInputHandler={onInputHandler}
                  validations={[minValidator(5)]}
                  type="text"
                  placeholder="لطفا نام دوره را وارد کنید..."
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="price input">
                <label class="input-title">توضیحات دوره</label>
                <Input
                  id="description"
                  element="input"
                  onInputHandler={onInputHandler}
                  validations={[minValidator(5)]}
                  type="text"
                  placeholder="لطفا توضیحات دوره را وارد کنید..."
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="number input">
                <label class="input-title">Url دوره</label>
                <Input
                  id="shortName"
                  element="input"
                  onInputHandler={onInputHandler}
                  validations={[minValidator(5)]}
                  type="text"
                  isValid="false"
                  placeholder="لطفا Url دوره را وارد کنید..."
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="price input">
                <label class="input-title">قیمت دوره</label>
                <Input
                  id="price"
                  element="input"
                  onInputHandler={onInputHandler}
                  validations={[minValidator(5)]}
                  type="text"
                  isValid="false"
                  placeholder="لطفا قیمت دوره را وارد کنید..."
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="price input">
                <label class="input-title">نحوه پشتیبانی دوره</label>
                <Input
                  id="support"
                  element="input"
                  onInputHandler={onInputHandler}
                  validations={[minValidator(5)]}
                  type="text"
                  isValid="false"
                  placeholder="لطفا نحوه پشتیبانی دوره را وارد کنید..."
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="number input">
                <label class="input-title">دسته‌بندی دوره</label>
                <select onChange={optionValueHandler}>
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
            <div class="col-6">
              <div class="file">
                <label class="input-title">عکس دوره</label>
                <input
                  type="file"
                  id="file"
                  onChange={e => setCourseCover(e.target.files[0])}
                />
              </div>
            </div>
            <div class="col-12">
              <div class="bottom-form">
                <div class="condition">
                  <label class="input-title">وضعیت دوره</label>
                  <div class="radios">
                    <div class="available">
                      <label>
                        <span>در حال برگزاری</span>
                        <input
                          type="radio"
                          value="start"
                          name="condition"
                          checked
                          onClick={() => setCourseStatus("درحال برگزاری")}
                        />
                      </label>
                    </div>
                    <div class="unavailable">
                      <label>
                        <span>پیش فروش</span>
                        <input
                          type="radio"
                          value="presell"
                          name="condition"
                          onClick={() => setCourseStatus(" پیش فروش")}

                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div class="submit-btn">
                  <input type="submit" value="افزودن" onClick={e => addCourse(e)} />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <TableContent title="دوره‌ها">
        <table class="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>عنوان</th>
              <th>مبلغ</th>
              <th>وضعیت</th>
              <th>لینک</th>
              <th>مدرس</th>
              <th>دسته بندی</th>
              <th>ویرایش</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {
              courses.map((course, index) => (
                <tr key={course._id}>
                  <td>{index + 1}</td>
                  <td>{course.name}</td>
                  <td>{course.price === 0 ? "رایگان" : course.price}</td>
                  <td>{
                    course.isComplete !== 0 ? "به اتمام رسیده" : "در حال برگزاری"
                  }</td>
                  <td>{course.shortName}</td>
                  <td>{course.creator}</td>
                  <td>{course.categoryID} </td>
                  <td>
                    <button type="button" class="btn btn-primary edit-btn">
                      ویرایش
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-danger delete-btn"
                      onClick={() => deleteCourse(course._id)}
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </TableContent>
    </>
  )
}
