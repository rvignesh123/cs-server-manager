import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";

export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    isPrivate: false,
  },
  {
    title: "Manager Portal",
    path: "/manager",
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    isPrivate: true,

    subNav: [
      {
        title: "Live Console",
        path: "/manager/console",
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "Maps",
        path: "/manager/maps",
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
    ],
  },
  {
    title: "Downloads",
    path: "/downloads",
    icon: <IoIcons.IoMdPeople />,
    isPrivate: false,
  },
  {
    title: "About",
    path: "/about",
    icon: <IoIcons.IoMdHelpCircle />,
    isPrivate: false,
  },
];
