import React, { useEffect, useState } from 'react'
import TableContent from '../../../Components/AdminPanel/TableContent/TableContent'
import swal from 'sweetalert'
import { useForm } from '../../../hooks/useForm'
import Input from '../../../Components/Form/Input'
import { minValidator } from '../../../Components/Validators/rules'

export default function AdminMenu() {

   const [formState, onInputHandler] = useForm({
      title: {
         value: "",
         isValid: false
      },
      href: {
         value: "",
         isValid: false
      },
   }, false)

   const [menus, setMenus] = useState([])
   const [mainMenus, setMainMenus] = useState([])
   const [menuParent, setMenuParent] = useState("-1")

   function getAllMenus() {
      fetch('http://127.0.0.1:8000/v1/menus/all')
         .then(res => res.json())
         .then(menus => {
            // console.log(menus)
            setMenus(menus)
         })
   }

   const deleteHandler = (id) => {

      const localStorageData = JSON.parse(localStorage.getItem("user"))

      swal({
         title: "آیا از حذف این دوره اطمینان دارید؟",
         icon: "warning",
         buttons: ["نه", "بله"]
      }).then(result => {
         if (result) {
            fetch(`http://127.0.0.1:8000/v1/menus/${id}`, {
               method: "DELETE",
               headers: {
                  "Authorization": `Bearer ${localStorageData.token}`
               }
            }).then(res => res.json())
               .then(result => getAllMenus())
         }
      })
   }

   const optionValueHandler = e => {
      setMenuParent(e.target.value)
   }
   const addMenu = e => {
      e.preventDefault()
      const newMenu = {
         title: formState.inputs.title.value,
         href: formState.inputs.href.value,
         parent: menuParent === "-1" ? undefined : menuParent
      }

      fetch("http://127.0.0.1:8000/v1/menus", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`
         },
         body: JSON.stringify(newMenu)
      }).then(res => res.json())
         .then(result => {
            swal({
               title: "منو با موفقیت اضافه شد.",
               icon: "success",
               buttons: "OK"
            }).then(data => {
               getAllMenus()
            })
         })



   }

   useEffect(() => {
      getAllMenus()
   }, [])

   return (
      <>

         <div class="container-fluid" id="home-content">
            <div class="container">
               <div class="home-title">
                  <span>افزودن منوی جدید</span>
               </div>
               <form class="form">
                  <div class="col-6">
                     <div class="name input">
                        <label class="input-title">عنوان </label>
                        <Input
                           id="title"
                           element="input"
                           onInputHandler={onInputHandler}
                           validations={[minValidator(5)]}
                           type="text"
                           placeholder="لطفا عنوان را وارد کنید..."
                        />
                        <span class="error-message text-danger"></span>
                     </div>
                  </div>
                  <div class="col-6">
                     <div class="name input">
                        <label class="input-title">آدرس </label>
                        <Input
                           id="href"
                           element="input"
                           onInputHandler={onInputHandler}
                           validations={[minValidator(5)]}
                           type="text"
                           placeholder="لطفا آدرس را وارد کنید..."
                        />
                        <span class="error-message text-danger"></span>
                     </div>
                  </div>
                  <div class="col-6">
                     <div class="number input">
                        <label class="input-title"> منوی اصلی </label>
                        <select
                           onChange={optionValueHandler}
                        >
                           <option value="-1">انتخاب منوی مربوطه</option>
                           {
                              menus.map(menu => (
                                 <>
                                    {
                                       !Boolean(menu.parent) && (
                                          <option value={menu._id} key={menu._id}>{menu.title} </option>
                                       )
                                    }
                                 </>
                              ))
                           }
                        </select>
                        <span class="error-message text-danger"></span>
                     </div>
                  </div>
                  <div class="col-12">
                     <div class="bottom-form">
                        <div class="condition">
                           <div class="submit-btn">
                              <input type="submit" value="افزودن" onClick={addMenu} />
                           </div>
                        </div>
                     </div>
                  </div>
               </form >
            </div >
         </div >

         <TableContent title={"منوها"}>
            <table className="table">
               <thead>
                  <tr>
                     <th>شناسه</th>
                     <th>عنوان</th>
                     <th>مقصد</th>
                     <th> فرزند ... </th>
                     <th>ویرایش</th>
                     <th>حذف</th>
                  </tr>
               </thead>
               <tbody>
                  {
                     menus.map((menu, index) => (
                        <tr key={menu._id}>
                           <td>{index + 1}</td>
                           <td>{menu.title}</td>
                           <td>{menu.href}</td>
                           <td>{
                              menu.parent ? menu.parent.title : (<i className='fa fa-check'></i>)
                           }</td>
                           <td>
                              <button
                                 type="button"
                                 className="btn btn-danger delete-btn"
                              // onClick={() => deletesession(session._id)}
                              >
                                 ویرایش
                              </button>
                           </td>
                           <td>
                              <button
                                 type="button"
                                 className="btn btn-danger delete-btn"
                                 onClick={() => deleteHandler(menu._id)}
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
