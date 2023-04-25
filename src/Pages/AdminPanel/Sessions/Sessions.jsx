import React, { useEffect, useState } from 'react'
import TableContent from "../../../Components/AdminPanel/TableContent/TableContent"
import Input from '../../../Components/Form/Input'
import { minValidator } from "../../../Components/Validators/rules"
import { useForm } from '../../../hooks/useForm'

export default function Sessions() {
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
   const [sessions, setSessions] = useState([])
   const [courses,setCourses] = useState([])
  const [courseID, setCourseID] = useState("-1")
  const [sessionVideo, setSessionVideo] = useState("")


   function getAllSessions() {
      fetch("http://127.0.0.1:8000/v1/courses/sessions")
         .then(res => res.json())
         .then(allSessions => {
            setSessions(allSessions)
         })
   }

   const addSessions = (e) => {
      e.preventDefault()
   }

   const optionValueHandler = e => {
      setCourseID(e.target.value)
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
          console.log(allCourses);
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
                     <div class="number input">
                        <label class="input-title">دوره مربوط به این جلسه</label>
                        <select
                           onChange={optionValueHandler}
                        >
                           <option value="-1">انتخاب دوره مربوط به این جلسه</option>
                           {
                              courses.map(course => (
                                 <option value={course._id} key={course._id}>{course.title} </option>
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
                     sessions.slice(0,5).map((session, index) => (
                        <tr key={session._id}>
                           <td>{index + 1}</td>
                           <td>{session.title}</td>
                           <td>{session.time}</td>
                           <td>{session.course.name}</td>
                           <td>
                              <button
                                 type="button"
                                 className="btn btn-danger delete-btn"
                              // onClick={() => deletesession(session._id)}
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
