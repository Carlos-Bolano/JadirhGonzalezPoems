import ConctactForm from "@/components/ConctactForm";
import Email from "@/icons/Email";
import Instagram from "@/icons/Instagram";
import Whatsapp from "@/icons/Whatsapp";
import Link from "next/link";
import React from "react";

const Contact = () => {
  return (
    <section
      id="contact"
      className="container mt-[100px] mb-[100px] flex flex-col md:flex-row justify-between items-center md:items-start gap-6"
    >
      <section>
        <h2 className="text-3xl sm:text-4xl font-bold md:text-[45px] lg:leading-[45px] font-cormorant text-center md:text-start text-balance">
          Get in Touch
        </h2>
        <p className="md:text-[20px] font-cagliostro text-center md:text-start text-pretty text-Text lg:max-w-xl mt-8">
          You can contact me through my social networks below or you can also
          send me a message through the form, it will be a pleasure to respond
          to you.
        </p>
        <div className="flex justify-center items-center md:justify-start gap-6 mt-5">
          <Link
            title="Instagram"
            href="https://www.instagram.com/jadirhgonzalez/"
            target="_blank"
            className="text-[#828282] transition-all duration-300 hover:text-Dark hover:-translate-y-1.5"
          >
            <Instagram />
          </Link>
          <Link
            title="Email"
            href="mailto:5gQp0@example.com"
            target="_blank"
            className="text-[#828282] transition-all duration-300 hover:text-Dark hover:-translate-y-1.5"
          >
            <Email />
          </Link>
          <Link
            title="Whatsapp"
            href="https://wa.me/573219750842?text=Hola%20Jadirh%2C%20estuve%20revisando%20algunos%20de%20tus%20poemas%20y%20me%20encantaron."
            target="_blank"
            className="text-[#828282] transition-all duration-300 hover:text-Dark hover:-translate-y-1.5"
          >
            <Whatsapp />
          </Link>
        </div>
      </section>
      <ConctactForm />
    </section>
  );
};

export default Contact;
