"use client";
import Image from "next/image";
import { useState } from "react";

import GithubWhite from "../images/white/github.svg";
import TwitchWhite from "../images/white/twitch.svg";
import TwitterWhite from "../images/white/twitter.svg";
import YoutubeWhite from "../images/white/youtube.svg";

import GithubDark from "../images/dark/github.svg";
import TwitchDark from "../images/dark/twitch.svg";
import TwitterDark from "../images/dark/twitter.svg";
import YoutubeDark from "../images/dark/youtube.svg";

const centerItems = "flex min-h-screen flex-col items-center justify-center ";

interface ImageButtonProps {
  src: string;
  alt: string;
  link: string;
}

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);

    const root = document.documentElement;
    if (isDarkMode) {
      root.style.setProperty("--foreground-rgb", "0, 0, 0");
      root.style.setProperty("--background-start-rgb", "214, 219, 220");
      root.style.setProperty("--background-end-rgb", "255, 255, 255");
    } else {
      root.style.setProperty("--foreground-rgb", "255, 255, 255");
      root.style.setProperty("--background-start-rgb", "0, 0, 0");
      root.style.setProperty("--background-end-rgb", "0, 0, 0");
    }
  };

  return (
    <main className={centerItems + "font-mono text-lg antialiased"}>
      <div className={centerItems + "text-center"}>
        <h1 className="mb-10 text-2xl ">Hello, I&apos;m Yoru!</h1>

        <p>I develop creative projects and bring interesting ideas to life.</p>
        <p>I mostly play games on my free time and listen to music.</p>
        <p className={`mt-6 cursor-pointer text-lg font-extrabold text-center ${isDarkMode ? "glow-white" : "glow-dark"}`} onClick={toggleDarkMode}>
          {isDarkMode ? "Let's brighten some stuff up" : "Let's tone it down a lil"}
        </p>

        <div className="flex flex-wrap justify-center space-x-6 mt-8">
          <ImageButton src={isDarkMode ? GithubWhite : GithubDark} alt="GitHub" link="https://github.com/yorunoken" />
          <ImageButton src={isDarkMode ? TwitchWhite : TwitchDark} alt="Twitch" link="https://www.twitch.tv/yorunokenosu" />
          <ImageButton src={isDarkMode ? TwitterWhite : TwitterDark} alt="Twitter" link="https://twitter.com/ken_yoru" />
          <ImageButton src={isDarkMode ? YoutubeWhite : YoutubeDark} alt="YouTube" link="https://www.youtube.com/@yorunoken" />
        </div>
      </div>
    </main>
  );
}

const ImageButton = ({ src, alt, link }: ImageButtonProps) => {
  return (
    <div className="relative group mt-4">
      <a href={link} target="_blank" className="relative overflow-hidden">
        <Image src={src} alt={alt} width={70} height={100} className="dark-mode opacity-70 transition-all duration-300 hover:scale-110 hover:opacity-100" />
      </a>
    </div>
  );
};
