import React, { useEffect, useState } from 'react'
import { GoogleLogin } from 'react-google-login';

type Props = {}

// const clientId = `${process.env.GOOGLE_CLIENT_ID}`
const clientId = "1070375292655-aktm1bbc30qgqejf64qrpfapsmgk4gac.apps.googleusercontent.com"

export default function signupgoogle({ }: Props) {

  const [user, setUser] = useState([])
  const onGoogleLoginSuccess = (googleUser) => {
    const profile = googleUser.getBasicProfile();
    const name = profile.getName();
    const email = profile.getEmail();
    const idToken = googleUser.getAuthResponse().id_token;
    setUser(email)
    console.log("Success")
  };
  const onGoogleLoginFailure = (error) => {
    console.error(error);
  };

  return (
    <div className="App">
      <GoogleLogin
        clientId={clientId}
        onSuccess={onGoogleLoginSuccess}
        onFailure={onGoogleLoginFailure}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
      />
    </div>
  );
}