// Maincontainer.jsx
import React from "react";
import AsideLeft from "./AsideLeft";
import Post from "./Post";
import PostCard from "./Mainber";
import AsideRight from "./AsideRight";


export default function Maincontainer() {
  return (
    <div className="flex min-h-screen relative">
      {/* Left Sidebar */}
      <div className="w-md border-r border-gray-700 shadow hidden lg:block">
        <AsideLeft/>
      </div>

      {/* Main Content */}
      <div className="flex-1 relative">
        <div className="w-full backdrop-blur-md bg-gray-200 z-50 p-4 sticky top-0">
           <Post/>
        </div>

        {/* SocialFeed/PostCard handles infinite scroll itself */}
        <div className="m-10 space-y-10">
           <PostCard/>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-xl border-l border-r-gray-700 hidden xl:block">
         <AsideRight/>
      </div>
    </div>
  );
}
