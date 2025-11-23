"use client";

import React from "react";
import Link from "next/link";
import {
  GoHomeFill,
  GoQuote,
  GoBookmarkFill,
} from "react-icons/go";
import { FaSearch } from "react-icons/fa";
import { MdOutlineOndemandVideo, MdPeopleAlt } from "react-icons/md";
import { LuMessageCircleCode } from "react-icons/lu";
import { IoIosNotificationsOutline } from "react-icons/io";
import { AiOutlineUser } from "react-icons/ai";

const AsideLeft: React.FC = () => {
  return (
    <section className="fixed">
      <div className="flex flex-col gap-7 hidden md:flex mt-10 pl-20">
        <h1 className="text-2xl font-bold text-black-mood-text-color">
          Nexora
        </h1>

        {/* Home */}
        <Link href="/" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-800 transition">
          <GoHomeFill className="text-black-mood-text-color text-2xl" />
          <span className="text-2xl text-black-mood-text-color">Home</span>
        </Link>

        {/* Reel */}
        <Link href="/reelsection" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-800 transition">
          <MdOutlineOndemandVideo className="text-black-mood-text-color text-2xl" />
          <span className="text-2xl text-black-mood-text-color">Reel</span>
        </Link>

        {/* Create Post */}
        <Link href="/createpost" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-800 transition">
          <GoQuote className="text-black-mood-text-color text-2xl" />
          <span className="text-2xl text-black-mood-text-color">Create Post</span>
        </Link>

        {/* BookMark */}
        <Link href="/bookmark" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-800 transition">
          <GoBookmarkFill className="text-black-mood-text-color text-2xl" />
          <span className="text-2xl text-black-mood-text-color">BookMark</span>
        </Link>

        {/* Search */}
        <Link href="/search" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-800 transition">
          <FaSearch className="text-black-mood-text-color text-2xl" />
          <span className="text-2xl text-black-mood-text-color">Search</span>
        </Link>

        {/* Friend */}
        <Link href="/friend" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-800 transition">
          <MdPeopleAlt className="text-black-mood-text-color text-2xl" />
          <span className="text-2xl text-black-mood-text-color">Friend</span>
        </Link>

        {/* Notifications */}
        <Link href="/notifications" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-800 transition">
          <IoIosNotificationsOutline className="text-black-mood-text-color text-2xl" />
          <span className="text-2xl text-black-mood-text-color">Notifications</span>
        </Link>

        {/* Message */}
        <Link href="/message" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-800 transition">
          <LuMessageCircleCode className="text-black-mood-text-color text-2xl" />
          <span className="text-2xl text-black-mood-text-color">Message</span>
        </Link>

        {/* Profile */}
        <Link href="/profiledeshboard" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-800 transition">
          <AiOutlineUser className="text-black-mood-text-color text-2xl" />
          <span className="text-2xl text-black-mood-text-color">Profile</span>
        </Link>
      </div>
    </section>
  )
};

export default AsideLeft;

