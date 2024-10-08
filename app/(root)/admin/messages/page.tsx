"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import UserDropdown from "../../../../components/UserDropdown";
import Search from "../../../../icons/Search";
import Input from "../../../../components/ui/Input";
import Greeting from "../../../../components/greeting";
import { LinkButton } from "../../../../components/ui/LinkButton";
import Message from "../../../../components/Message";
import NoMessagesYet from "../../../../components/NoMessagesYet";

type Message = {
  _id: string;
  name: string;
  email: string;
  message: string;
};

const MessagesPage = () => {
  const [messages, setMessages] = React.useState<Message[]>([]);
  useEffect(() => {
    const fetchMessages = async () => {
      const res = await fetch("/api/messages");
      const data = await res.json();
      setMessages(data);
    };
    fetchMessages();
  }, []);
  return (
    <section className="container py-8">
      <header className="flex gap-4 flex-col md:flex-row md:justify-between items-center ">
        <div>
          <UserDropdown />
        </div>
        <div className="relative font-cagliostro">
          <Search className="absolute top-1/2 -translate-y-1/2 right-2" />
          <Input
            name="search"
            placeholder="Search Poems..."
            className="w-[300px] "
            id="searchInput"
          />
        </div>
      </header>

      <section className="flex flex-col-reverse items-center justify-between lg:flex-row gap-5 my-5">
        <div className="font-cagliostro">
          <Greeting />
          <p className="md:text-[20px] font-cagliostro text-center lg:text-start text-pretty text-Text md:max-w-xl md:m-auto ">
            Welcome to your messages panel Here you can see all the people who
            have sent you messages through the form in contact section
          </p>
          <div className="text-center lg:text-start">
            <LinkButton
              href="/admin"
              variant="default"
              size="lg"
              className="mt-5"
            >
              Back to admin
            </LinkButton>
          </div>
        </div>
        <Image src="/assets/messages.png" width={300} height={300} alt="404" />
      </section>
      <aside className="flex flex-col justify-between items-center lg:items-start gap-5 ">
        <h2 className="text-4xl font-bold font-cormorant text-center lg:text-start ">
          Messages
        </h2>
        <div className="flex flex-col gap-5">
          {messages.length > 0 ? (
            messages.map((message) => (
              <Message
                key={message._id}
                name={message.name}
                email={message.email}
                message={message.message}
              />
            ))
          ) : (
            <div>
              <NoMessagesYet />
            </div>
          )}
        </div>
      </aside>
    </section>
  );
};

export default MessagesPage;
