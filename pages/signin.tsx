import React from "react";
import styles from "../styles/Home.module.css";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";

type Props = {};

export default function signin({}: Props) {
  return (
    <div className={styles.main}>
      <div className="outline outline-offset-2 outline-1 rounded min-w-fit flex flex-col justify-center">
        <input
          className="m-2 rounded outline outline-offset-2 outline-1"
          type="text"
          placeholder="Email"
        />
        <input
          className="m-2 rounded outline outline-offset-2 outline-1"
          type="password"
          placeholder="password"
        />
        <button className="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Login
        </button>
        <button className="m-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Cancel
        </button>
      </div>
    </div>
  );
}
