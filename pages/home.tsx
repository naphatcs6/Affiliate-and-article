import React from 'react'
import { useRouter } from "next/router";

type Props = {}

export default function home({ }: Props) {
  const router = useRouter()
  const {
    query: {
      message,
      status,
      token,
      user,
      email,
    }
  } = router
  const props = {
    message,
    status,
    token,
    user,
    email,
  }
  // const tokenBar = ""+props.token
  // var myHeaders = new Headers();
  // myHeaders.append("Authorization", `Bearer ${tokenBar}`);

  // var raw = "";

  // fetch("http://localhost:8080/jwt/profile",{
  //   method: 'GET',
  //   headers: myHeaders,
  //   redirect: 'follow',
  // })
  //   .then(response => response.text())
  //   .then(result => console.log(result))
  //   .catch(error => console.log('error', error));
  return (
    <div>Home {props.email}</div>
  )
}