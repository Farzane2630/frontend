import React, { useEffect, useState } from 'react'
import TableContent from '../../../Components/AdminPanel/TableContent/TableContent'
import swal from 'sweetalert'
import Input from "../../../Components/Form/Input"
import {
  requiredValidator,
  minValidator,
  maxValidator,
  emailValidator,
} from "../../../Components/Validators/rules"
import { useForm } from '../../../hooks/useForm'


export default function Users() {

  const [usersData, setUsersData] = useState([])
  const [isBann, setIsbann] = useState(false)
  const [formState, onInputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      username: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
      phone: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  function getAllUsers() {
    fetch("http://127.0.0.1:8000/v1/users", {
      headers: {
        Authorization: `Bearer ${userLocalStorage.token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        setUsersData(data.slice().reverse())
      })
  }

  const userLocalStorage = JSON.parse(localStorage.getItem('user'))
  useEffect(() => {
    getAllUsers()
  }, [deleteUser, banUser, registerNewUser])

  function deleteUser(userID) {

    const userLocalStorage = JSON.parse(localStorage.getItem('user'))

    fetch(`http://127.0.0.1:8000/v1/users/${userID}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${userLocalStorage.token}`,
      }
    }).then(res => res.json())
      .then((result) => {

        swal({
          title: "کاربر با موفقیت حذف شد",
          icon: "success",
          buttons: "تائید",
        })
      })
      getAllUsers()
  }
  function banUser(userID) {

    const userLocalStorage = JSON.parse(localStorage.getItem('user'))

    fetch(`http://127.0.0.1:8000/v1/users/ban/${userID}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${userLocalStorage.token}`,
      }
    }).then(res => res.json())
      .then((result) => {
        swal({
          title: "کاربر با موفقیت مسدود شد",
          icon: "success",
          buttons: "تائید",
        })
      })
  }

  function registerNewUser (e) {
    e.preventDefault()

    const newUserInfo = {
      name: formState.inputs.name.value,
      username: formState.inputs.username.value,
      phone: formState.inputs.phone.value,
      email: formState.inputs.email.value,
      password: formState.inputs.password.value
    };

    fetch("http://127.0.0.1:8000/v1/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUserInfo)
    }).then((res) => {
      return res.json();
    })
      .then((result) => {
        swal({
          title: "کاربر مورد نظر با موفقیت اضافه شد",
          icon: "success",
          buttons: "اوکی",
        });
        getAllUsers();
      });
  }

  return (
    <>
      <div className="home-content-edit">
        <div className="back-btn">
          <i className="fas fa-arrow-right"></i>
        </div>
        <form className="form">
          <div className="col-6">
            <div className="name input">
              <label className="input-title">نام و نام خانوادگی</label>
              <Input
                type="text"
                className=""
                id="name"
                element="input"
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(20),
                ]}
                onInputHandler={onInputHandler}
                placeholder="لطفا نام و نام خانوادگی کاربر را وارد کنید..."
              />
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-6">
            <div className="family input">
              <label className="input-title">نام کاربری</label>
              <Input
                type="text"
                className=""
                id="username"
                element="input"
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(20),
                ]}
                onInputHandler={onInputHandler}
                placeholder="لطفا نام کاربری را وارد کنید..."
              />
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-6">
            <div className="email input">
              <label className="input-title">ایمیل</label>
              <Input
                type="text"
                className=""
                id="email"
                element="input"
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(20),
                  emailValidator(),
                ]}
                onInputHandler={onInputHandler}
                placeholder="لطفا ایمیل کاربر را وارد کنید..."
              />
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-6">
            <div className="password input">
              <label className="input-title">رمز عبور</label>
              <Input
                type="text"
                className=""
                id="password"
                element="input"
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(20),
                ]}
                onInputHandler={onInputHandler}
                placeholder="لطفا رمز عبور کاربر را وارد کنید..."
              />
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-6">
            <div className="phone input">
              <label className="input-title">شماره تلفن</label>
              <Input
                type="text"
                className=""
                id="phone"
                element="input"
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(20),
                ]}
                onInputHandler={onInputHandler}
                placeholder="لطفا شماره تلفن کاربر را وارد کنید..."
              />
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-12">
            <div className="bottom-form">
              <div className="submit-btn">
                <input type="submit" value="افزودن" onClick={registerNewUser} />
              </div>
            </div>
          </div>
        </form>
      </div>
      <TableContent title="کاربران">
        <table className="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>نام و نام خانوادگی</th>
              <th>ایمیل</th>
              <th>نقش</th>
              <th>ویرایش</th>
              <th>تغییر سطح</th>
              <th>حذف</th>
              <th>مسدود</th>
            </tr>
          </thead>
          <tbody>
            {
              usersData.slice(0, 10).map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  {/* <td>09123443243</td> */}
                  <td>{user.email}</td>
                  <td>
                    {
                      user.role === "ADMIN" ? "ادمین" : "کاربر عادی"
                    }
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary edit-btn"
                    >
                      ویرایش
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary edit-btn"
                    >
                      تغییر نقش
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger delete-btn"
                      onClick={() => deleteUser(user._id)}
                    >
                      حذف
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      className={`btn btn-danger delete-btn ${isBann ? "deactive-btn" : ""}`}
                      onClick={() => banUser(user._id)}
                    >
                      مسدود
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
