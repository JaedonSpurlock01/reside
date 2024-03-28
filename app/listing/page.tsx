"use client";

import Image from "next/image";
import Header from "../_components/header";
import Footer from "../_components/footer";

export default function ResideHome() {
  return (
    <main className="relative bg-neutral-800 flex justify-center items-center flex-col">
      <Header mapOnly={false} />

      <div className="w-[70rem] bg-[#636262]d flex flex-col items-center mt-36 mb-16">
        <div className="rounded-xl p-4 bg-[#3a3838] h-[38rem] mb-4">
          <Image
            src="/example_apartment.jpg"
            alt=""
            width={1024}
            height={576}
            className="object-cover rounded-xl"
          />
        </div>
        <div className="w-[66rem] text-white space-y-5 mb-10">
          <span className="flex flex-row items-center space-x-2">
            <div className="bg-red-400 rounded-full w-3 h-3" />
            <p className="font-semibold">For Rent</p>
          </span>
          <p className="text-lg font-light text-neutral-300">
            1 Homs Ct,Hillsborough, CA 94010
          </p>
          <div className="flex flex-row text-3xl space-x-8">
            <div>
              <h1 className="font-bold">$42,000/mo</h1>
              <p className="font-light text-neutral-400">Price</p>
            </div>
            <div>
              <h1 className="font-bold">7</h1>
              <p className="font-light text-neutral-400">Beds</p>
            </div>
            <div>
              <h1 className="font-bold">8.5</h1>
              <p className="font-light text-neutral-400">Baths</p>
            </div>
            <div>
              <h1 className="font-bold">11,673</h1>
              <p className="font-light text-neutral-400">Sq Ft</p>
            </div>
          </div>
        </div>

        <div className="w-[66rem] h-[0.1rem] bg-[#3b3b3b] mb-16" />

        <div className="w-[66rem] mb-10">
          <h1 className="text-3xl font-bold text-white mb-5">About Listing</h1>
          <p className="text-lg font-light text-neutral-300">
            In the quietude of dawn, as the first rays of sunlight cascade over
            the horizon, painting the sky in hues of orange and pink, the world
            stirs from its slumber. Birds commence their melodious symphony,
            greeting the new day with exuberance, while the gentle rustle of
            leaves whispers secrets of the night passed. In this tranquil
            moment, nature seems to hold its breath, as if in awe of the beauty
            unfolding before it.
          </p>
        </div>

        <div className="w-[66rem] h-[0.1rem] bg-[#3b3b3b] mb-16" />

        <div className="w-[66rem] mb-16">
          <Image
            src="/temp_map.png"
            alt=""
            width={1024}
            height={576}
            className="object-cover rounded-xl"
          />
        </div>

        <div className="w-[66rem] h-[0.1rem] bg-[#3b3b3b] mb-16" />

        <div className="w-[66rem] mb-10">
          <h1 className="text-3xl font-bold text-white mb-5">
            Fees & Policies
          </h1>
          <p className="text-lg font-light text-neutral-300">EMPTY</p>
        </div>

        <div className="w-[66rem] h-[0.1rem] bg-[#3b3b3b] mb-16" />

        <div className="w-[66rem] mb-10">
          <h1 className="text-3xl font-bold text-white mb-5">Amenities</h1>
          <p className="text-lg font-light text-neutral-300">EMPTY</p>
        </div>

        <div className="w-[66rem] h-[0.1rem] bg-[#3b3b3b] mb-16" />

        <div className="w-[66rem] mb-10">
          <h1 className="text-3xl font-bold text-white mb-5">
            Nearby Facilities
          </h1>
          <p className="text-lg font-light text-neutral-300">EMPTY</p>
        </div>
      </div>

      <Footer />
    </main>
  );
}
