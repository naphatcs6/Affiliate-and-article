import React from "react";
import CredentialsProvider from "next-auth/providers/credentials";

type Props = {};

export default function nextauth({}: Props) {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await fetch("http://localhost:8080/user-api/user/login", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();

        if(data.status == 'ok'){
          return data.user
        }
        return null;
      },
    }),
  ];
}
