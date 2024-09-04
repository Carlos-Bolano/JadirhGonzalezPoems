import React from "react";
import IconMessage from "@/icons/Message";

interface MessageProps {
  name: string;
  email: string;
  message: string;
}

const Message = ({ name, email, message }: MessageProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 lg:items-start p-2 border-2 rounded-md bg-Dark/10 max-w-[900px]">
      <IconMessage className="w-10 h-10 min-w-10 min-h-10" />
      <div className="flex flex-col justify-between">
        <span className="font-bold block mb-2">
          {name} - <span className="text-Dark/90">{email}</span>
        </span>
        <p className="text-Text font-cagliostro leading-5 mb-1">{message}</p>
      </div>
    </div>
  );
};

export default Message;
