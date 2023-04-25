import React, { useEffect, useReducer } from 'react'
import validator from '../Validators/validator'

import './Input.css'

const inputReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE': {
            return {
                ...state,
                value: action.value,
                isValid: validator(action.value, action.validations)
            }
        }
        default: {
            return {
                state
            }
        }
    }
}
export default function Input(props) {

    const [mainInput, dispatch] = useReducer(inputReducer, {
        value: '',
        isValid: false
    })


    const changeHandler = e => {
        dispatch({
            type: 'CHANGE',
            value: e.target.value,
            validations: props.validations,
            isValid: true
        })
    }

    const { value, isValid } = mainInput
    const { id, onInputHandler } = props

    useEffect(() => {
        onInputHandler(value, isValid, id)
    }, [value])

    const element = props.element === 'input' ?
        (
            <input
                type={props.type}
                placeholder={props.placeholder}
                onChange={changeHandler}
                value={mainInput.value}
                className={`${props.className} ${mainInput.isValid ? "success" : "error"
                    }`}
            />
        ) :
        (
            <textarea
                placeholder={props.placeholder}
                className={`${props.className} ${mainInput.isValid ? "success" : "error"
                    }`}
                onChange={changeHandler}
                value={mainInput.value}
            />
        )
    return (
        <>
            {element}
        </>
    )
}
