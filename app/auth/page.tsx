import React from "react";

// Login icons
import { FaApple } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaSpotify } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import Image from "next/image";
import img from "@/public/background.png";
import ResideLogo from "../_components/logo";

export default function Auth() {
  return (
    <main className="flex flex-row items-center justify-center relative overflow-hidden">
      <Image
        src={img}
        alt="background"
        quality={95}
        className="absolute h-full w-full -z-10 mt-[30rem] opacity-30 object-cover"
      />
      <div className="w-screen text-sm md:text-base md:w-1/2 h-screen flex flex-col justify-center items-center rounded-r-xl">
        <div className="w-[60%] h-4/6 flex flex-col justify-center items-center space-y-8">
          <ResideLogo />
          <div className="w-full">
            <h1 className="font-semibold text-base">Email</h1>
            <form>
              <input
                className="border-b border-slate-950 text-neutral-600 font-light w-full bg-transparent focus:outline-none focus:text-neutral-900"
                placeholder="Enter your email"
                type="text"
              />
            </form>
          </div>
          <div className="w-full">
            <h1 className="font-semibold text-base">Password</h1>
            <form>
              <input
                className="border-b border-slate-950 text-neutral-600 font-light w-full bg-transparent focus:outline-none focus:text-neutral-900"
                placeholder="Enter your password"
                type="text"
              />
            </form>
          </div>
          <div className="flex flex-row text-sm space-x-3 mr-auto">
            <input type="checkbox" />
            <p>I agree to the terms & conditions and privacy policy</p>
          </div>
          <div className="text-left w-full text-xs relative">
            <button className="absolute text-blue-600 underline left-0">
              Don't have an account?
            </button>
            <button className="absolute text-blue-600 underline right-0">
              Forgot password?
            </button>
          </div>
          <button className="bg-neutral-800 rounded-lg text-sm p-2 w-full text-center font-medium text-white">
            Sign in
          </button>
          <div className="flex flex-row w-full space-x-2 text-2xl">
            <button className="bg-black rounded-full text-white w-full h-8 py-2 flex flex-row items-center justify-center">
              <FaApple />
            </button>
            <button className="bg-blue-600 rounded-full text-white w-full h-8 py-2 flex flex-row items-center justify-center">
              <FaFacebookF />
            </button>
            <button className="bg-green-600 rounded-full text-white w-full h-8 py-2 flex flex-row items-center justify-center">
              <FaSpotify />
            </button>
            <button className="bg-white rounded-full w-full h-8 py-2 flex flex-row items-center justify-center">
              <FcGoogle />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
