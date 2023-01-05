import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { GoogleLogout } from 'react-google-login';
import { IoExitOutline } from "react-icons/io5";

type Props = {}

const clientId = "1070375292655-f066dq1p4b8s9l7hnedbs4n73uk356ao.apps.googleusercontent.com"

export default function LogoutBtnGoogle({ }: Props) {
  const router = useRouter()
  const [user, setUser] = useState([])
  const onGoogleLogoutSuccess = () => {
    console.log("Logout Success")
    localStorage.setItem('isLogin', 'logout');
    router.push('/sign')
  };

  return (
    <div className="App">
      <GoogleLogout
        clientId={clientId}
        onLogoutSuccess={onGoogleLogoutSuccess}
      />
    </div>
  )
}