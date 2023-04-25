import React from 'react'
import { useForm } from '../../hooks/useForm'
import Input from '../Form/Input'
import { requiredValidator, emailValidator, maxValidator, minValidator } from '../../Components/Validators/rules'

import './CommentSection.css'

export default function CommentSection() {
  const [formState, onInputHandler] = useForm(
    {
      commentArea: {
        value: "",
        isValid: false,
      }
    }
  );

  return (

    <div className="comments">
      <span className="comments__title">
        دیدگاهتان را بنویسید
      </span>
      <span className="comments__text">
        <a href="#">
          با عنوان محمدامین سعیدی راد
          وارد شده اید.
        </a>
        <a href="#">خارج میشوید? </a>
        بخش های موردنیاز علامت گذاری شده اند *
      </span>
      <div className="comments_content">
        <span className="comments__content-title">دیدگاه *</span>
        <Input
          id="commentArea"
          className="comments__content-textarea"
          placeholder="دیدگاه خود را بنویسید..."
          validations={[
            requiredValidator()
          ]}
          onInputHandler={onInputHandler}
        />
        {/* <textarea className="comments__content-textarea"></textarea> */}
      </div>
      <button type="submit" className="comments__button">فرستادن دیدگاه</button>
    </div>
  )
}
