"use client";

import React from "react";
import { motion } from "framer-motion";
import Heading from "../Heading";
import { useInView } from "react-intersection-observer";
import { SiFramer, SiMapbox, SiNextdotjs, SiSelenium } from "react-icons/si";
import Typescript from "../svg/Typescript";
import ReactJS from "../svg/ReactJS";
import MongoDB from "../svg/MongoDB";
import Spring from "../svg/Spring";
import TailwindCSS from "../svg/TailwindCSS";
import Shadcnui from "../svg/Shadcnui";
import ZodIcon from "../svg/ZodIcon";
import ReactIcons from "../svg/ReactIcons";
import Postman from "../svg/Postman";
import Gcloud from "../svg/Gcloud";
import Prisma from "../svg/Prisma";
import Python from "../svg/Python";
import Java from "../svg/Java";

const techstack = [
  {
    id: "NextJS",
    icon: SiNextdotjs,
  },
  {
    id: "TypeScript",
    icon: Typescript,
  },
  {
    id: "Python",
    icon: Python,
  },
  {
    id: "Java",
    icon: Java,
  },
  {
    id: "React",
    icon: ReactJS,
  },
  {
    id: "MongoDB",
    icon: MongoDB,
  },
  {
    id: "Spring",
    icon: Spring,
  },
  {
    id: "Framer Motion",
    icon: SiFramer,
  },
  {
    id: "TailwindCSS",
    icon: TailwindCSS,
  },
  {
    id: "Shadcn/UI",
    icon: Shadcnui,
  },
  {
    id: "Mapbox",
    icon: SiMapbox,
  },
  {
    id: "Zod",
    icon: ZodIcon,
  },
  {
    id: "React-Icons",
    icon: ReactIcons,
  },
  {
    id: "Postman",
    icon: Postman,
  },
  {
    id: "Google Cloud",
    icon: Gcloud,
  },
  {
    id: "Prisma",
    icon: Prisma,
  },
  {
    id: "Selenium",
    icon: SiSelenium,
  },
] as const;

const fadeInAnimationVariants = {
  initial: { opacity: 0, y: 100 },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.05 * index },
  }),
};

export default function Technologies() {
  const { ref } = useInView({
    threshold: 0.5,
  });

  return (
    <section
      ref={ref}
      className="mb-28 max-w-[53rem] text-center sm:mb-40 flex flex-col items-center"
    >
      <Heading title="Tech Stack" className="text-neutral-300 mb-8" />
      <ul className="flex flex-wrap justify-center gap-2 text-lg text-gray-800">
        {techstack.map(
          ({ id, icon: Icon }: { id: string; icon: any }, index) => (
            <motion.li
              className="borderBlack rounded-xl px-5 py-3 bg-white/10 text-white/80 flex flex-row items-center gap-4 font-semibold"
              key={index}
              variants={fadeInAnimationVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              custom={index}
            >
              <Icon /> {id}
            </motion.li>
          )
        )}
      </ul>
    </section>
  );
}
