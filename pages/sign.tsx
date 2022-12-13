import React from "react";
import styles from "../styles/Home.module.css";

type Props = {};

export default function sign({}: Props) {
  return (
    <div className={styles.main}>
      <div className="outline outline-offset-2 outline-1 rounded-lg min-w-fit flex flex-col justify-center">
        <button className="m-2 first-letter:bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
          Sign in
        </button>
        <button className="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Sign up
        </button>
        <button className="m-2 bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Sign up with google
        </button>
      </div>
    </div>
  );
}
