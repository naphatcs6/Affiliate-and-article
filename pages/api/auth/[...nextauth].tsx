import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";

export default NextAuth({
  providers:[
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "text" },
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
  ],secret: "LlKq6ZtYbr+hTC073mAmAh9/h2HwMfsFo4hrfCx5mLg=",
}) 
