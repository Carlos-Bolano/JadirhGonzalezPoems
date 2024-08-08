import React from "react";
import Input from "./ui/Input";
import Textarea from "./ui/TextArea";
import { Button } from "./ui/Button";

const ConctactForm = () => {
  return (
    <form
      action=""
      className="w-full max-w-lg flex flex-col gap-5 justify-center md:justify-normal items-center md:items-start"
    >
      <Input
        label="Name"
        name="name"
        type="text"
        placeholder="Jhon Doe"
        required
      />
      <Input
        label="Email Adress"
        name="email"
        placeholder="Jhondoe@gmail.com"
        type="email"
        required
      />
      <Textarea
        label="Message"
        name="message"
        required
        rows={4}
        placeholder="Hello JG Poems, it’s a pleasure reading yours poems, i would like to meet you for talking that i think it’s going to like you, see you  "
      />
      <div>
        <Button variant="default" size="lg" type="submit">
          Send Message
        </Button>
      </div>
    </form>
  );
};

export default ConctactForm;
