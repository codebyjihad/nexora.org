"use client";

import React, { useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

const AsideRight: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleAI = () => {
    alert("This is Working Now!");
  };

  return (
    <div className="p-10 hidden xl:block fixed">
      {/* Suggested Users */}
      <div className="shadow bg-black-mood-second-color border border-gray-500 p-3 rounded-xl">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-black-mood-text-color">
            You Will Like
          </h1>
          <a href="#" className="text-link-color cursor-pointer">
            View All
          </a>
        </div>
        <div className="flex flex-col gap-4 mt-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <Avatar className="w-10 h-10">
                  <AvatarImage
                    src={`https://i.pravatar.cc/150?u=user${i}`}
                    alt={`User${i}`}
                  />
                </Avatar>
                <p className="text-lg text-white">@User{i}</p>
              </div>
              <Button className="bg-sky-400 cursor-pointer text-lg">
                {i % 2 === 0 ? "Follow" : "UnFollow"}
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Info Card */}
      <div className="shadow bg-black-mood-second-color border border-gray-500 p-3 rounded-xl mt-10 max-w-[300px]">
        <div className="w-[280px] mx-auto">
          <img
            src="https://i.pravatar.cc/150?u=user${i}"
            alt="Info"
            className="rounded-xl cursor-pointer w-full"
          />
        </div>
        <p className="mt-2 text-black-mood-second-text-color text-sm">
          Learn everything about what is included in Nexora and where it is
          available.
        </p>
        <div className="pt-2 w-full">
          <Button
            onClick={() => setIsOpen(true)}
            className="w-full text-lg bg-button-color text-black-mood-text-color"
          >
            Click here
          </Button>

          {/* shadcn/ui Dialog */}
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="bg-black-mood-second-color">
              <DialogHeader>
                <DialogTitle className="text-black-mood-text-color">
                  Nexora Information
                </DialogTitle>
                <DialogDescription className="text-black-mood-second-text-color">
                  Learn everything about what is included in Nexora and where it
                  is available.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  className="bg-red-500 text-white"
                  onClick={() => setIsOpen(false)}
                >
                  Close
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* AI Help Button */}
      <div className="absolute bottom-[-100px] right-[-100px]">
        <button
          className="bg-red-500 px-4 py-2 rounded-2xl cursor-pointer text-white"
          onClick={handleAI}
        >
          Need Help?
        </button>
      </div>
    </div>
  );
};

export default AsideRight;
