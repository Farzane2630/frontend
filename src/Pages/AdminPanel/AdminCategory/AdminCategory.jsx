import React, { useEffect, useState } from 'react'
import TableContent from '../../../Components/AdminPanel/TableContent/TableContent'
import {
   requiredValidator,
   minValidator,
   maxValidator,
} from "../../../Components/Validators/rules"
import { useForm } from '../../../hooks/useForm'
import Input from '../../../Components/Form/Input'
import swal from 'sweetalert'


export default function AdminCategory() {
   const [categories, setCategories] = useState([])

   const [formState, onInputHandler] = useForm(
      {
         title: {
            value: "",
            isValid: false,
         },
         shortname: {
            value: "",
            isValid: false,
         },
      },
      false
   );

   useEffect(() => {
      getAllCategories()
   }, [])

   function getAllCategories() {
      fetch("http://127.0.0.1:8000/v1/category")
         .then(res => res.json())
         .then(allCategories => {
            console.log(allCategories);
            setCategories(allCategories)
         })
   }

   function createNewCategory(e) {
      e.preventDefault()
      const localStorageData = JSON.parse(localStorage.getItem("user"))
      // console.log(localStorageData);

      const newCategoryInfo = {
         title: formState.inputs.title.value,
         name: formState.inputs.shortname.value,
      }

      fetch("http://127.0.0.1:8000/v1/category", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorageData.token}`
         },
         body: JSON.stringify(newCategoryInfo)
      }).then(res => res.json())
         .then(result => {
            console.log(result);
            swal({
               title: "دسته بندی با موفقیت ثبت شد.",
               icon: "success",
               buttons: "ok"
            }).then(() => {
               getAllCategories()
            })
         })

   }

   const editCategory = categoryID => {

      swal({
         title: "عنوان دسته بندی جدید را وارد نمایید",
         content: "input",
         buttons: "ویرایش"
      }).then(result =>{
         if(result.trim().length){
            const localStorageData = JSON.parse(localStorage.getItem("user"))
            const updatedCategory = {
               title: result
            }
            fetch(`http://127.0.0.1:8000/v1/category/${categoryID}`, {
               method: "PUT",
               headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorageData.token}`
               },
               body: JSON.stringify(updatedCategory)
            }).then(res => res.json())
               .then(result => {
                  console.log(result);
                  swal({
                     title: "دسته بندی با موفقیت ویرایش شد.",
                     icon: "success",
                     buttons: "ok"
                  }).then(() => {
                     getAllCategories()
                  })
               })
         }
      })
   }
   const deleteCategory = categoryID => {
      const localStorageData = JSON.parse(localStorage.getItem("user"))

      fetch(`http://127.0.0.1:8000/v1/category/${categoryID}`, {
         method: "DELETE",
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorageData.token}`
         }
      }).then(res => res.json())
         .then(result => {
            console.log(result);
            swal({
               title: "دسته بندی با موفقیت حذف شد.",
               icon: "success",
               buttons: "ok"
            }).then(() => {
               getAllCategories()
            })
         })
   }

   return (
      <>
         <div className="container-fluid" id="home-content">
            <div className="container">
               <div className="home-title">
                  <span>افزودن دسته‌بندی جدید</span>
               </div>
               <form className="form">
                  <div className="col-6">
                     <div className="name input">
                        <label className="input-title">عنوان</label>
                        <Input
                           element="input"
                           onInputHandler={onInputHandler}
                           type="text"
                           id="title"
                           placeholder="لطفا عنوان را وارد کنید..."
                           validations={[minValidator(3), maxValidator(20)]}
                        />
                        <span className="error-message text-danger"></span>
                     </div>
                  </div>
                  <div className="col-6">
                     <div className="name input">
                        <label className="input-title">اسم کوتاه</label>
                        <Input
                           element="input"
                           onInputHandler={onInputHandler}
                           type="text"
                           id="shortname"
                           placeholder="لطفا اسم کوتاه را وارد کنید..."
                           validations={[minValidator(3), maxValidator(20)]}
                        />
                        <span className="error-message text-danger"></span>
                     </div>
                  </div>
                  <div className="col-12">
                     <div className="bottom-form">
                        <div className="submit-btn">
                           <input
                              type="submit"
                              value="افزودن"
                              onClick={createNewCategory}
                           />
                        </div>
                     </div>
                  </div>
               </form>
            </div>
         </div>
         <TableContent title="دسته بندی ها">
            <table className="table">
               <thead>
                  <tr>
                     <th>شناسه</th>
                     <th>عنوان</th>
                     <th>ویرایش</th>
                     <th>حذف</th>
                  </tr>
               </thead>
               <tbody>
                  {
                     categories.map((category, index) => (
                        <tr key={category._id}>
                           <td>{index + 1}</td>
                           <td>{category.title}</td>
                           <td>
                              <button
                                 type="button"
                                 className="btn btn-primary edit-btn"
                                 onClick={() => editCategory(category._id)}
                              >
                                 ویرایش
                              </button>
                           </td>
                           <td>
                              <button
                                 type="button"
                                 className="btn btn-danger delete-btn"
                                 onClick={() => deleteCategory(category._id)}
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
