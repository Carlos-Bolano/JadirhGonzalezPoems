import Email from "@/icons/Email";
import Instagram from "@/icons/Instagram";
import Whatsapp from "@/icons/Whatsapp";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="p-4 rounded-t-2xl bg-Dark text-white">
      <section className="container flex flex-col md:flex-row  justify-between items-center gap-4">
        <p className="md:text-[20px] font-cagliostro text-center md:text-start text-pretty text-white ">
          Copyright © 2024, Jadirh Gonzalez Poems
        </p>
        <div className="flex justify-center items-center gap-6">
          <Link
            title="Instagram"
            href="https://www.instagram.com/jadirhgonzalez/"
            target="_blank"
            className="text-[#e8e6e6da] transition-all duration-300 hover:text-white hover:-translate-y-1.5"
          >
            <Instagram />
          </Link>
          <Link
            title="Email"
            href="mailto:5gQp0@example.com"
            target="_blank"
            className="text-[#e8e6e6da] transition-all duration-300 hover:text-white hover:-translate-y-1.5"
          >
            <Email />
          </Link>
          <Link
            title="Whatsapp"
            href="https://wa.me/573219750842?text=Hola%20Jadirh%2C%20estuve%20revisando%20algunos%20de%20tus%20poemas%20y%20me%20encantaron."
            target="_blank"
            className="text-[#e8e6e6da] transition-all duration-300 hover:text-white hover:-translate-y-1.5"
          >
            <Whatsapp />
          </Link>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
