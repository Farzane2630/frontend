import React from 'react'
import { Link } from 'react-router-dom'

export default function Button(props) {

  return(
    <>
    {/* {
      props.to ? (
        <Link to={props.to} className={props.className}>
            {props.children}
        </Link>

) : props.href ?(
<a href={props.href} className={props.className}>
            {props.children}
        </a>
) : (
  <Button type={props.type} className={props.className} onclick={props.onClick}>
            {props.children}
        </Button>
)
} */}
</>
  )
}
