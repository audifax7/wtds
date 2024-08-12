/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import { type Metadata } from "next";
import { Button } from "@/components/ui/button";
import { CopyleftIcon, LucideSquareArrowOutUpRight, PlusIcon } from "lucide-react";
import { FaGithub } from "react-icons/fa";

export const metadata: Metadata = {
  title: "KWTP",

};

const githubUrl = "https://github.com/iamtouha/next-lucia-auth";



const HomePage = () => {
  return (
    <>
      <section className="mx-auto grid min-h-[calc(77vh-300px)] max-w-5xl flex-col  items-center justify-center gap-1 py-2 text-center  md:py-2" style={{ backgroundImage: "url('/images/wasac.jpg')" }}
      >

      </section>
      <section className="mx-auto grid min-h-[calc(50vh-300px)] max-w-5xl flex-col  items-center justify-center gap-1 py-2 text-center  md:py-2" >
        <div className="p-2">

          <h1 className="text-balance bg-gradient-to-tr  from-black/70 via-black to-black/60 bg-clip-text text-center text-2xl font-bold text-transparent dark:from-zinc-400/10 dark:via-white/90 dark:to-white/20  sm:text-5xl md:text-6xl lg:text-3xl">
            Welcome to Our portal
          </h1>
          <p className="text-balance mb-10 mt-4 text-center text-muted-foreground md:text-lg lg:text-xl">
            Providing quality, reliable and affordable water and sewerage services through continuous innovations and detailed care to our customers’ needs".
          </p>
          <p>“To be the most sustainable Water and Sanitation Utility in Africa, exceeding stakeholder’s expectations"</p>


        </div>
      </section>
      <section className="mx-auto grid min-h-[calc(50vh-300px)] max-w-5xl flex-col  items-center justify-center gap-1 py-2 text-center  md:py-2" >
        <div className="p-2">

          <h1 className="text-balance bg-gradient-to-tr  from-black/70 via-black to-black/60 bg-clip-text text-center text-2xl font-bold text-transparent dark:from-zinc-400/10 dark:via-white/90 dark:to-white/20  sm:text-5xl md:text-6xl lg:text-3xl">
            <a id="about"></a> About us
          </h1>
          <p className="text-balance mb-10 mt-4 text-center text-muted-foreground md:text-lg lg:text-xl">
            WASAC is a product of reforms and institutional development of the former Energy, Water and Sanitation Corporation (EWSA).
            The Water and Sanitation Corporation (WASAC) is a limited liability Corporation registered under the company law of
            Rwanda with the Government as a sole proprietor/shareholder. WASAC is responsible for the growth and development of the water and sanitation sector.
          </p>

        </div>
      </section>

    </>
  );
};

export default HomePage;

