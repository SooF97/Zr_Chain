"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [toggleDropdown, setToggleDropdown] = useState(false);

  return (
    <nav className="flex-between w-full mb-16 pt-4">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assetss/images/logo.svg"
          alt="your logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text hover:text-orange-600">ZR Chain</p>
      </Link>
      {/* {Desktop Navigation} */}
      <div className="sm:flex hidden">
        <div className="flex gap-3 md:gap-5">
          <Link href="/" className="white_btn">
            Home
          </Link>
          <Link href="/adminAccess" className="white_btn">
            Admin Access
          </Link>
          <Link href="/Verify" className="white_btn">
            Verify
          </Link>
          <Link href="/Advantages" className="white_btn">
            Advantages
          </Link>

          {/* <button className="outline_btn">Connect wallet</button> */}
        </div>
      </div>
      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        <div className="flex">
          <Image
            src="/assetss/icons/menu.svg"
            width={30}
            height={30}
            className=""
            alt="ham"
            onClick={() => setToggleDropdown(!toggleDropdown)}
          />

          {toggleDropdown && (
            <div className="dropdown">
              <Link
                href="/"
                className="dropdown_link "
                onClick={() => setToggleDropdown(false)}
              >
                Home
              </Link>
              <Link
                href="/adminAccess"
                className="dropdown_link "
                onClick={() => setToggleDropdown(false)}
              >
                Admin Access
              </Link>
              <Link
                href="/Verify"
                className="dropdown_link "
                onClick={() => setToggleDropdown(false)}
              >
                Verify
              </Link>
              <Link
                href="/Advantages"
                className="dropdown_link "
                onClick={() => setToggleDropdown(false)}
              >
                Advantages
              </Link>

              {/* <button
                className="dropdown_link outline_btn "
                onClick={() => setToggleDropdown(false)}
              >
                Connect wallet
              </button> */}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
