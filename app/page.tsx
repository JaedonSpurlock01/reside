"use client";

import Search from "@/components/Search";
import { BiDownArrow } from "react-icons/bi";
import { GiPathDistance } from "react-icons/gi";
import { CiMap } from "react-icons/ci";
import { LiaHandshakeSolid } from "react-icons/lia";
import { PiHandSoap } from "react-icons/pi";
import AvatarCard from "@/components/AvatarCard";
import Heading from "@/components/Heading";
import { InfiniteMovingCards } from "@/components/InfiniteMovingCards";

const products = [
  {
    title: "Moonbeam",
    link: "https://gomoonbeam.com",
    thumbnail:
      "https://ssl.cdn-redfin.com/photo/rent/a76af1a3-36bf-4540-a195-8306b5165785/islphoto/genIsl.0_2.jpg",
  },
  {
    title: "Cursor",
    link: "https://cursor.so",
    thumbnail:
      "https://ssl.cdn-redfin.com/photo/rent/b0dc3209-a4bf-405d-afa5-744e596e1e4d/islphoto/genIsl.0_1.jpg",
  },
  {
    title: "Rogue",
    link: "https://userogue.com",
    thumbnail:
      "https://ssl.cdn-redfin.com/photo/rent/900b6700-7bc9-4f0d-ac5d-f9ad1caf6980/islphoto/genIsl.0_1.jpg",
  },

  {
    title: "Editorially",
    link: "https://editorially.org",
    thumbnail:
      "https://ssl.cdn-redfin.com/photo/rent/fd874932-dc1f-4348-bb8c-a37a05cfd8a8/islphoto/genIsl.0_1.jpg",
  },
  {
    title: "Editrix AI",
    link: "https://editrix.ai",
    thumbnail:
      "https://ssl.cdn-redfin.com/photo/rent/cbc0c2aa-2b07-40b4-a7f8-7c84c650f2aa/islphoto/genIsl.0_1.jpg",
  },
  {
    title: "Pixel Perfect",
    link: "https://app.pixelperfect.quest",
    thumbnail:
      "https://ssl.cdn-redfin.com/photo/rent/3d80538b-0feb-45ef-92c8-716945274ba9/islphoto/genIsl.0_1.jpg",
  },

  {
    title: "Algochurn",
    link: "https://algochurn.com",
    thumbnail:
      "https://ssl.cdn-redfin.com/photo/rent/b5c472e9-aaf2-4507-973a-5674fce53ebe/islphoto/genIsl.0_1.jpg",
  },
  {
    title: "Aceternity UI",
    link: "https://ui.aceternity.com",
    thumbnail:
      "https://ssl.cdn-redfin.com/photo/rent/8c6d4957-4b6a-4eaa-bb2a-224a79696f14/islphoto/genIsl.0_1.jpg",
  },
  {
    title: "Tailwind Master Kit",
    link: "https://tailwindmasterkit.com",
    thumbnail:
      "https://ssl.cdn-redfin.com/photo/rent/42225b31-6fc5-4385-be85-2a998a8672df/islphoto/genIsl.0_1.jpg",
  },
  {
    title: "SmartBridge",
    link: "https://smartbridgetech.com",
    thumbnail:
      "https://ssl.cdn-redfin.com/photo/rent/87a170cb-9372-4428-b6c8-88f3b4dcc539/islphoto/genIsl.0_10.jpg",
  },
  {
    title: "Renderwork Studio",
    link: "https://renderwork.studio",
    thumbnail:
      "https://ssl.cdn-redfin.com/photo/rent/86f9ff29-a883-4932-89ca-1fff8ff305ac/islphoto/genIsl.0_2.jpg",
  },

  {
    title: "Creme Digital",
    link: "https://cremedigital.com",
    thumbnail:
      "https://ssl.cdn-redfin.com/photo/rent/bcc5bd71-810a-4c48-819a-dee71570e3c6/islphoto/genIsl.0_2.jpg",
  },
  {
    title: "Golden Bells Academy",
    link: "https://goldenbellsacademy.com",
    thumbnail:
      "https://ssl.cdn-redfin.com/photo/rent/9f15b4ef-1803-4453-aaba-e6ef8c739f2d/islphoto/genIsl.0_1.jpg",
  },
  {
    title: "Invoker Labs",
    link: "https://invoker.lol",
    thumbnail:
      "https://ssl.cdn-redfin.com/photo/rent/1762ef1f-3a5f-4ca9-9fc2-817ae2c956ad/islphoto/genIsl.0_1.jpg",
  },
  {
    title: "E Free Invoice",
    link: "https://efreeinvoice.com",
    thumbnail:
      "https://ssl.cdn-redfin.com/photo/rent/24287815-f901-4d15-b640-83e6a4497e0e/islphoto/genIsl.0_3.jpg",
  },
];

const testimonials = [
  {
    quote:
      "Yeah, I actually stumbled upon Reside last week. It's been a lifesaver! Found a cozy apartment near campus within my budget and preferences.",
    name: "Charles Dickens",
    title: "A Tale of Two Cities",
  },
  {
    quote:
      "Tell me about it! But have you tried Reside? I found this amazing studio downtown through their website, and it's surprisingly affordable!",
    name: "William Shakespeare",
    title: "Hamlet",
  },
  {
    quote:
      "I totally get it. But Reside made it so much easier for me. Their filters helped narrow down options based on location, price, and amenities. Found my dream apartment without the hassle!",
    name: "Edgar Allan Poe",
    title: "A Dream Within a Dream",
  },
  {
    quote:
      "That's why I swear by Reside. Their listings are verified, and they have this rating system for landlords. I feel much more secure renting through them.",
    name: "Jane Austen",
    title: "Pride and Prejudice",
  },
  {
    quote:
      "You should give Reside a try. They aggregate listings from multiple sources, so you get a comprehensive view of what's available in the area. Saved me so much time.",
    name: "Herman Melville",
    title: "Moby-Dick",
  },
];

export default function ResideHome() {
  return (
    <>
      <div className="w-full bg-neutral-800 flex flex-col items-center text-center bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(23,144,209,0.3),rgba(255,255,255,0))]">
        <h1 className="text-neutral-100 text-5xl mt-48 font-bold">
          Solve your student housing{" "}
          <span className="font-bold text-cyan-500">problems</span>
        </h1>
        <p className="text-neutral-400 text-2xl mt-6 mb-16">
          Take control of affordable college housing
        </p>

        <Search
          className="w-[30rem] text-white rounded-lg py-3 !bg-neutral-800 mb-32 relative z-[999]"
          resultsClassName="!top-20 !w-[30rem] text-left !bg-neutral-800"
        />

        <div className="w-full bg-neutral-800 border-t border-[#373737] flex flex-col items-center py-20">
          <div className="flex gap-2 w-full items-center justify-center mb-40">
            <InfiniteMovingCards speed="slow" items={testimonials} />
          </div>

          <h1 className="text-2xl text-neutral-300 font-semibold w-full mb-10">
            Tired of not being able to find rentals?
          </h1>
          <div className="flex flex-col">
            <div className="bg-neutral-900/50 p-4 w-[22rem] rounded-lg flex flex-col text-neutral-500 font-semibold text-lg mb-6">
              <div>
                <span className="text-rose-500">Limited</span> availability
              </div>
              <div>
                + <span className="text-rose-500">High</span> cost
              </div>
              <div>
                + <span className="text-rose-500">Low quality</span> rentals
              </div>
              <div>
                + <span className="text-rose-500">Poor</span> location
              </div>
              <div>
                + <span className="text-rose-500">No </span> roommates
              </div>
              <div>
                + <span className="text-rose-500">Lack</span> of safety
              </div>
              <div>
                + <span className="text-rose-500">∞</span> hrs of stress
              </div>
            </div>
          </div>
          <div className="flex flex-row text-neutral-400 font-semibold items-center gap-2 mb-40">
            <BiDownArrow /> There&apos;s an easier way
          </div>

          <div className="w-[70%] sm:w-[36%]">
            <h1 className="text-4xl font-semibold text-neutral-300 text-left mb-6">
              Make housing affordable and sustainable,
              <br />
              save hundreds of $
            </h1>
            <p className="text-start text-neutral-400 mb-6">
              Search your area, and find cheap listings at lightspeed. Spend
              your time building on what truly matters for you. Reside provides
              you with a smooth experience for finding a new homestead.
            </p>

            <div className="flex flex-row justify-between mb-10">
              <div className="text-neutral-200 flex flex-col items-center">
                <GiPathDistance size={40} />
                Distance
                <br />
                Matrix
              </div>
              <div className="text-neutral-200 flex flex-col items-center">
                <CiMap size={40} />
                MapBox
              </div>
              <div className="text-neutral-200 flex flex-col items-center">
                <LiaHandshakeSolid size={40} />
                Support
              </div>
              <div className="text-neutral-200 flex flex-col items-center">
                <PiHandSoap size={40} />
                Amenities
              </div>
            </div>
          </div>

          <div className="bg-neutral-900 w-full h-[20rem] mb-40"></div>

          <Heading
            title="Meet the Reside team"
            className="text-neutral-200 mb-20"
          />

          <div className="space-y-8 md:space-y-0 flex flex-row flex-wrap items-center justify-center gap-6 mb-20">
            <AvatarCard
              hostName="Jaedon"
              location="Oceanside, CA"
              language="English"
              role="Fullstack Developer"
            />
            <AvatarCard
              hostName="Yashaswi"
              location="San Diego, CA"
              language="English & Hindu"
              role="Backend Developer"
            />
            <AvatarCard
              hostName="Gabriel"
              location="Somewhere, CA"
              language="English & Spanish"
              role="Backend & Embedded Dev"
            />
          </div>
        </div>
      </div>
    </>
  );
}
