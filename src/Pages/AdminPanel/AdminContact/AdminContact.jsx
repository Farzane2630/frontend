import React, { useEffect, useState } from 'react'
import TableContent from '../../../Components/AdminPanel/TableContent/TableContent'
import swal from 'sweetalert'

export default function AdminContact() {

   const [contacts, setContacts] = useState([])
   const [emailContent, setEmailContent] = useState("")

   function getAllMassages() {
      fetch('http://127.0.0.1:8000/v1/contact')
         .then(res => res.json())
         .then(info => {
            setContacts(info)
         })
   }
   useEffect(() => {
      getAllMassages()
   }, [getAllMassages])

   const showMassage = (body) => {
      swal({
         title: body,
         icon: "success",
         buttons: "مشاهده شد"
      }).then(() => { })
   }

   const sendAnswerToUser = (emailAddress) => {

      swal({
         title: "متن پاسخ را وارد نمایید:",
         content: "input",
         buttons: "ارسال پاسخ"
      }).then(res => {

         const answerInfo = {
            email: emailAddress,
            answer: res
         }

         const localStorageData = JSON.parse(localStorage.getItem("user"))

         fetch('http://127.0.0.1:8000/v1/contact/answer', {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${localStorageData.token}`
            },
            body: JSON.stringify(answerInfo)
         }).then(res => {
            if (res.ok) {
               return res.json()
            }

         }).
            then((result) => {
               swal({
                  title: "ایمیل با موفقیت ارسال شد",
                  buttons: "تائید",
                  icon: "success"
               })
               getAllMassages()
            })
      })

   }

   const deleteMassage = (msgID) => {
      const localStorageData = JSON.parse(localStorage.getItem('user'))

      fetch(`http://127.0.0.1:8000/v1/contact/${msgID}`, {
         method: "DELETE"
      }).then(res => {
         if (res.ok) {
            return res.json()
         }
      }).then(result => {
         swal({
            title: "پیام با موفقیت حذف شد",
            buttons: "تائید",
            icon: "success"
         })
      })

   }

   return (
      <>
         <TableContent title="پیغام ها">
            <table className="table">
               <thead>
                  <tr>
                     <th>شناسه</th>
                     <th>نام و نام خانوادگی</th>
                     <th>ایمیل</th>
                     <th>شماره تلفن</th>
                     <th>نمایش</th>
                     <th> پاسخ</th>
                     <th>حذف</th>
                  </tr>
               </thead>
               <tbody>
                  {
                     contacts.slice(0, 10).map((contact, index) => (
                        <tr key={contact._id}>
                           <td className={`${contact.answer === 1 ? "answer-comment" : "not-answer-comment"}`} >{index + 1}</td>
                           <td>{contact.name}</td>
                           <td>{contact.email}</td>
                           <td>{contact.phone}</td>
                           <td>
                              <button
                                 type="button"
                                 className="btn btn-primary edit-btn"
                                 onClick={() => showMassage(contact.body)}
                              >
                                 نمایش پیغام
                              </button>
                           </td>
                           <td>
                              <button
                                 type="button"
                                 className="btn btn-primary edit-btn"
                                 onClick={() => sendAnswerToUser(contact.email)}
                              >
                                 پاسخ
                              </button>
                           </td>
                           <td>
                              <button
                                 type="button"
                                 className="btn btn-danger delete-btn"
                                 onClick={() => deleteMassage(contact._id)}
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
