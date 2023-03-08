import { AiOutlineHome } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import { IoBedOutline } from "react-icons/io5";
import { VscGraphLine } from "react-icons/vsc";
import { HiOutlineReceiptPercent } from "react-icons/hi2";
import { GrArticle } from "react-icons/gr";
import { BsTags } from "react-icons/bs"
import { RiFilePaper2Line } from "react-icons/ri"



export const Sidebardata = [
  {
    title: "Dashboard",
    path: "/dashboard",
    pName: "nav-text",
    icon: <VscGraphLine />
  },
  {
    title: "Profile",
    path: "/profile",
    pName: "nav-text",
    icon: <AiOutlineUser />
  },
  {
    title: "Affiliate",
    path: "/affiliate",
    pName: "nav-text",
    icon: <IoBedOutline />
  },
  {
    title: "Calculate Commission",
    path: "/commission",
    pName: "nav-text",
    icon: <HiOutlineReceiptPercent />
  },
  {
    title: "Article",
    path: "/article",
    pName: "nav-text",
    icon: <RiFilePaper2Line />
  },
  {
    title: "Manage Tag",
    path: "/tag",
    pName: "nav-text",
    icon: <BsTags />
  },
];
