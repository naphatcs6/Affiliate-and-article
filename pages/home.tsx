import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { useState } from "react";
import { useSession } from "next-auth/react";

type Props = {};

export default function home({ }: Props) {
  const { data: session } = useSession()
  const mailGoo = session?.user?.email as string
  const router = useRouter();
  const {
    query: { message, status, token, user, email },
  } = router;
  const props = {
    message,
    status,
    token,
    user,
    email,
  };
  const [userCurr, setUser] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    dateborn: "",
    address: "",
    province: "",
    district: "",
    postcode: "",
  });
  if (session) {
    const userLocal = localStorage.getItem("userLogin") ? JSON.parse(localStorage.getItem("userLogin")!) : "";
    if (userLocal.email == "") {
      console.log('eiei')
      userCurr.email = mailGoo
      localStorage.setItem('userLogin', JSON.stringify(userCurr));
    }
  }

  // const userLocaol = localStorage.getItem("userLogin") ? JSON.parse(localStorage.getItem("userLogin")!) : "";
  // const [local, setLocal] = useState(localStorage.getItem("userLogin"))


  const tokenBar = "" + props.token
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${tokenBar}`);

  var raw = "";

  // fetch("http://localhost:8080/jwt/profile",{
  //   method: 'GET',
  //   headers: myHeaders,
  //   redirect: 'follow',
  // })
  //   .then(response => response.text())
  //   .then(result => console.log(result))
  //   .catch(error => console.log('error', error));
  return (
    <Layout>
      <div className="overflow bg-white shadow h-full">
        HOME
      </div>
    </Layout>
  );
}
