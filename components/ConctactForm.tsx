"use client";
import React, { useState } from "react";
import Input from "./ui/Input";
import Textarea from "./ui/TextArea";
import { Button } from "./ui/Button";
import axios from "axios";
import { toast } from "./ui/use-toast";

const ConctactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors([]);

    try {
      const formData = { name, email, message };
      await axios.post("/api/messages", formData);
      toast({
        title: "Message sent",
        description: "We'll be in touch soon.",
      });

      setName("");
      setEmail("");
      setMessage("");
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
        toast({
          title: "Message not sent",
          description: "There were some errors in your submission.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Message not sent",
          description: "Something went wrong. Please try again later.",
          variant: "destructive",
        });
      }
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-lg flex flex-col gap-5 justify-center md:justify-normal items-center md:items-start"
    >
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        label="Name"
        name="name"
        type="text"
        placeholder="Jhon Doe"
        required
      />

      <Input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        label="Email Adress"
        name="email"
        placeholder="Jhondoe@gmail.com"
        type="email"
        required
      />
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        label="Message"
        name="message"
        required
        rows={4}
        placeholder="Hello JG Poems, it’s a pleasure reading yours poems, i would like to meet you for talking that i think it’s going to like you, see you  "
      />

      {errors.length > 0 && (
        <ul>
          {errors.map((error, index) => (
            <li className="text-red-500 text-sm" key={index}>
              {error}
            </li>
          ))}
        </ul>
      )}
      <div>
        <Button variant="default" size="lg" type="submit">
          Send Message
        </Button>
      </div>
    </form>
  );
};

export default ConctactForm;
