"use client";

import React from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MdPhoto } from "react-icons/md";

const Post: React.FC = () => {
  return (
    <section className="flex flex-col gap-2 sticky top-0 p-4 bg-sky-100  rounded-xl shadow-md">
      <div className="flex items-center gap-2 w-full">
        {/* User Avatar */}
        <Avatar className="w-12 h-12">
          <AvatarImage src="https://i.pravatar.cc/150?u=currentuser" alt="Current User" />
        </Avatar>

        {/* Input field */}
        <Input
          placeholder="What's Happening?"
          className="flex-1 text-white placeholder:text-gray-400 bg-black-mood-second-color border border-gray-700 focus:border-blue-500 rounded-md"
        />

        {/* Post Button */}
        <Button className="py-2 px-4 bg-blue-600 text-white hover:bg-blue-700 rounded-md">
          Post
        </Button>
      </div>

      {/* Optional photo upload */}
      <div className="flex items-center gap-2 mt-2">
        <MdPhoto className="text-2xl text-white cursor-pointer" />
        <span className="text-sm text-gray-400">Add Photo</span>
      </div>
    </section>
  );
};

export default Post;

