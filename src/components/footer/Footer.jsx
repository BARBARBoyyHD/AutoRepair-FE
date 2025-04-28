import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.svg";
import phone from "../../assets/ph_phone-call.svg";
import { AiFillTikTok } from "react-icons/ai";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaInstagramSquare, FaFacebookSquare } from "react-icons/fa";

const Footer = () => {

  const contacts = [
    { icon: logo, text: "Drivix" },
    { icon: phone, text: "+62899765410" },
  ];

  const socials = [
    { icon: <AiFillTikTok />, link: "#" },
    { icon: <FaSquareXTwitter />, link: "#" },
    { icon: <FaInstagramSquare />, link: "#" },
    { icon: <FaFacebookSquare />, link: "#" },
  ];

  return (
    <footer className="p-8 h-auto bg-[#222021] text-white flex flex-col md:flex-row justify-between items-center gap-6">
      {/* Contacts */}
      <div className="flex flex-col md:flex-row items-center gap-4">
        {contacts.map((contact, index) => (
          <div key={index} className="flex items-center gap-2">
            <img src={contact.icon} className="w-10 h-10" alt={contact.text} />
            <h1 className="text-2xl font-semibold">{contact.text}</h1>
          </div>
        ))}
      </div>

      {/* Copyright and Socials */}
      <div className="flex flex-col items-center md:items-end gap-4">
        <p className="text-sm md:text-base text-center md:text-right">
          © Copyright 2024. DRIVIX. All Rights Reserved
        </p>
        <div className="flex gap-4 text-2xl">
          {socials.map((social, index) => (
            <a
              key={index}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400 transition"
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
