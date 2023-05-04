import React, { useEffect, useState } from 'react'
import TableContent from "../../../Components/AdminPanel/TableContent/TableContent"
import Input from '../../../Components/Form/Input'
import { minValidator } from "../../../Components/Validators/rules"
import { useForm } from '../../../hooks/useForm'
import swal from 'sweetalert'

export default function Sessions() {
   const [formState, onInputHandler] = useForm({
      title: {
         value: "",
         isValid: false,
      },
      time: {
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
   const [sessions, setSessions] = useState([])
   const [courses, setCourses] = useState([])
   const [courseID, setCourseID] = useState("-1")
   const [sessionVideo, setSessionVideo] = useState("")
   const [isFree, setIsFree] = useState(0)


   function getAllSessions() {
      fetch("http://127.0.0.1:8000/v1/courses/sessions")
         .then(res => res.json())
         .then(allSessions => {
            setSessions(allSessions)
            console.log(allSessions);
         })
   }

   const addSessions = (e) => {
      e.preventDefault()

      const localStorageData = JSON.parse(localStorage.getItem("user"));

      let formData = new FormData()
      formData.append("title", formState.inputs.title.value)
      formData.append("time", formState.inputs.time.value)
      formData.append("courseID", courseID)
      formData.append("video", sessionVideo)
      formData.append("free", isFree)

      if (courseID === "-1") {
         swal({
            title: "لطفا دوره ی مورد نظر را انتخاب کنید",
            buttons: "OK",
            icon: "warning"
         })
      } else {
         fetch(`http://127.0.0.1:8000/v1/courses/${courseID}/sessions`, {
            method: "POST",
            headers: {
               Authorization: `Bearer ${localStorageData.token}`
            },
            body: formData
         }).then(res => {
            console.log(res)

            if (res.ok) {
               swal({
                  title: ".جلسه ی جدید با موفقیت ثبت شد",
                  icon: "success",
                  buttons: "Done"
               }).then(() => {
                  getAllSessions()
               })
            }
         })
      }
   }

   const optionValueHandler = e => {
      setCourseID(e.target.value)
   }

   const deletesession = (sessionID) => {
      const localStorageData = JSON.parse(localStorage.getItem("user"));
      swal({
         title: "آیا از حذف این جلسه اطمینان دارید؟",
         icon: "warning",
         buttons: ["خیر", "بله"]
      }).then(() => {
         fetch(`http://127.0.0.1:8000/v1/courses/sessions/${sessionID}`, {
            method: "DELETE",
            headers: {
               Authorization: `Bearer ${localStorageData.token}`,
            },
         })
            .then((res) => res.json())
            .then((result => {
               swal({
                  title: "جلسه با موفقیت حذف شد",
                  icon: "success",
                  buttons: "ok"
               }).then(() => getAllSessions())

            }))
      })
   }

   useEffect(() => {

      const localStorageData = JSON.parse(localStorage.getItem("user"));
      fetch("http://127.0.0.1:8000/v1/courses", {
         headers: {
            Authorization: `Bearer ${localStorageData.token}`,
         },
      })
         .then((res) => res.json())
         .then((allCourses) => {
            setCourses(allCourses);
         });

      getAllSessions()
   }, [])


   return (
      <>
         <div class="container-fluid" id="home-content">
            <div class="container">
               <div class="home-title">
                  <span>افزودن جلسه جدید</span>
               </div>
               <form class="form">
                  <div class="col-6">
                     <div class="name input">
                        <label class="input-title">عنوان جلسه</label>
                        <Input
                           id="title"
                           element="input"
                           onInputHandler={onInputHandler}
                           validations={[minValidator(5)]}
                           type="text"
                           placeholder="لطفا عنوان جلسه را وارد کنید..."
                        />
                        <span class="error-message text-danger"></span>
                     </div>
                  </div>
                  <div class="col-6">
                     <div class="name input">
                        <label class="input-title">مدت زمان جلسه</label>
                        <Input
                           id="time"
                           element="input"
                           onInputHandler={onInputHandler}
                           validations={[minValidator(5)]}
                           type="text"
                           placeholder="لطفا مدت زمان جلسه را وارد کنید..."
                        />
                        <span class="error-message text-danger"></span>
                     </div>
                  </div>
                  <div class="col-6">
                     <div class="number input">
                        <label class="input-title">دوره مربوط به این جلسه</label>
                        <select
                           onChange={optionValueHandler}
                        >
                           <option value="-1">انتخاب دوره مربوط به این جلسه</option>
                           {
                              courses.map(course => (
                                 <option value={course._id} key={course._id}>{course.name} </option>
                              ))
                           }
                        </select>
                        <span class="error-message text-danger"></span>
                     </div>
                  </div>

                  <div class="col-6">
                     <div class="file">
                        <label class="input-title">آپلود ویدئو جلسه</label>
                        <input
                           type="file"
                           id="file"
                           onChange={e => setSessionVideo(e.target.files[0])}
                        />
                     </div>
                  </div>
                  <div class="col-6">
                     <div class="bottom-form">
                        <div class="condition">
                           <label class="input-title">وضعیت دوره</label>
                           <div class="radios">
                              <div class="available">
                                 <label>
                                    <span>رایگان</span>
                                    <input
                                       type="radio"
                                       value="1"
                                       name="condition"
                                       checked
                                       onClick={(e) => setIsFree(1)}
                                    />
                                 </label>
                              </div>
                              <div class="unavailable">
                                 <label>
                                    <span> غیر رایگان</span>
                                    <input
                                       type="radio"
                                       value="0"
                                       name="condition"
                                       onClick={(e) => setIsFree(0)}
                                    />
                                 </label>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="col-12">
                     <div class="bottom-form">
                        <div class="condition">
                           <div class="submit-btn">
                              <input type="submit" value="افزودن" onClick={e => addSessions(e)} />
                           </div>
                        </div>
                     </div>
                  </div>
               </form >
            </div >
         </div >


         <TableContent title="جلسات">
            <table className="table">
               <thead>
                  <tr>
                     <th>شناسه</th>
                     <th>عنوان</th>
                     <th> مدت زمان جلسه</th>
                     <th> دوره </th>
                     <th>حذف</th>
                  </tr>
               </thead>
               <tbody>
                  {
                     sessions.map((session, index) => (
                        <tr key={session._id}>
                           <td>{index + 1}</td>
                           <td>{session.title}</td>
                           <td>{session.time}</td>
                           <td>{session.course.name}</td>
                           <td>
                              <button
                                 type="button"
                                 className="btn btn-danger delete-btn"
                                 onClick={() => deletesession(session._id)}
                              >
                                 حذف
                              </button>
                           </td>
                        </tr>
                     ))
                  }
               </tbody>
            </table>
         </TableContent >
      </>
   )
}
