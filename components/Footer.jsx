import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="p-5 mt-10 flex justify-between text-gray-500">
      <div className="text-md">
        © 2023{" "}
        <Link href="/" className="hover:underline">
          ByteTech™
        </Link>
      </div>
      <div className="flex flex-col md:flex-row gap-5">
        <a href="#">About</a>
        <a href="#">Privacy Policy</a>
        <a href="#">Licensing</a>
        <a href="#">Contact</a>
      </div>
    </div>
  );
};

export default Footer;
