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

    const { style } = document.documentElement;
    // Set dark theme
    if (isDarkMode) {
      style.setProperty("--foreground-rgb", "0, 0, 0");
      style.setProperty("--background-start-rgb", "214, 219, 220");
      style.setProperty("--background-end-rgb", "255, 255, 255");
      return;
    }

    // Set light theme
    style.setProperty("--foreground-rgb", "255, 255, 255");
    style.setProperty("--background-start-rgb", "0, 0, 0");
    style.setProperty("--background-end-rgb", "0, 0, 0");
  };

  return (
    <main className={centerItems + "font-mono text-lg antialiased p-8"}>
      <div className={centerItems + "text-center"}>
        <h1 className="mb-8 text-2xl ">Hello, I&apos;m Yoru!</h1>

        <p className="text-sm md:text-lg">I develop creative projects and bring interesting ideas to life.</p>
        <p className="text-sm md:text-lg">I mostly play games on my free time and listen to music.</p>
        <p className={`cursor-pointer text-sm md:text-lg font-extrabold text-center ${isDarkMode ? "glow-white" : "glow-dark"}`} onClick={toggleDarkMode}>
          {isDarkMode ? "Let's brighten some stuff up" : "Let's tone it down a lil"}
        </p>

        <div className="flex items-center justify-center space-x-3 mt-8 md:space-x-6  w-10/12 md:w-full">
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
