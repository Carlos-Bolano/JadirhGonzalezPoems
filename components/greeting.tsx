"use client";
import React, { useEffect, useState } from "react";

const Greeting: React.FC = () => {
  const [message, setMessage] = useState<{ greeting: string; emoji: string }>({
    greeting: "",
    emoji: "",
  });

  useEffect(() => {
    const getGreetingMessage = () => {
      const hour = new Date().getHours();
      if (hour >= 6 && hour < 12) {
        return { greeting: "morning", emoji: "🌅" };
      } else if (hour >= 12 && hour < 18) {
        return { greeting: "afternoon", emoji: "🌞" };
      } else {
        return { greeting: "evening", emoji: "🌙" };
      }
    };

    setMessage(getGreetingMessage());
  }, []);

  return (
    <h2 className="text-3xl font-bold md:text-4xl lg:text-[45px] lg:leading-[45px] font-cormorant text-center lg:text-start text-balance text-Dark mb-4">
      Good {message.greeting} Jadirh {message.emoji}
    </h2>
  );
};

export default Greeting;
