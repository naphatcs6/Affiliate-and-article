import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { GoogleLogin } from 'react-google-login';

type Props = {}

const clientId = "1070375292655-f066dq1p4b8s9l7hnedbs4n73uk356ao.apps.googleusercontent.com"

export default function LoginBtnGoogle({ }: Props) {
  
  const [user, setUser] = useState([])
  const router = useRouter();
  const onGoogleLoginSuccess = (googleUser) => {
    const profile = googleUser.getBasicProfile();
    const name = profile.getName();
    const email = profile.getEmail();
    const idToken = googleUser.getAuthResponse().id_token;
    setUser(email)
    localStorage.setItem('isLogin', 'login');
    console.log(email)
    console.log("Success")
    router.push('/home')
  };
  const onGoogleLoginFailure = (error) => {
    console.error(error);
    console.log("Fail")
    // router.push('/home')
  };

  return (
    <div className="App">
      <GoogleLogin
        clientId={clientId}
        onSuccess={onGoogleLoginSuccess}
        onFailure={onGoogleLoginFailure}
        // cookiePolicy={'single_host_origin'}
        isSignedIn={true}
      />
    </div>
  )
}