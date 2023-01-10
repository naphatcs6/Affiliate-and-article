import { AiOutlineHome } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import { IoBedOutline } from "react-icons/io5";
import { VscGraphLine } from "react-icons/vsc";
import { HiOutlineReceiptPercent } from "react-icons/hi2";
import { GrArticle } from "react-icons/gr";
import { BsTags } from "react-icons/bs"


export const Sidebardata = [
  {
    title: "Home",
    path: "/home",
    pName: "nav-text",
    icon: <AiOutlineHome />
  },
  {
    title: "Profile",
    path: "/profile",
    pName: "nav-text",
    icon: <AiOutlineUser />
  },
  {
    title: "Dashboard",
    path: "/dashboard",
    pName: "nav-text",
    icon: <VscGraphLine />
  },
  {
    title: "Building",
    path: "/building",
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
    icon: <GrArticle />
  },
  {
    title: "Manage Tag",
    path: "/edittag",
    pName: "nav-text",
    icon: <BsTags />
  },
];
