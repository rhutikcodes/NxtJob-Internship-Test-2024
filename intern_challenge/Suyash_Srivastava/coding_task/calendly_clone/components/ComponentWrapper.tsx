"use client"
import React, {useState, useEffect} from "react";
import clsx from "clsx";

const LanguageSelectorWrapper = ({ className, children }: React.PropsWithoutRef<React.HTMLAttributes<HTMLElement>>) =>{
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const languageSelectorOffsetTop = document.getElementById("language-selector").getBoundingClientRect().top;

      if (!visible && scrollPosition >= languageSelectorOffsetTop) {
        setVisible(true);
      } else if (visible && scrollPosition + window.innerHeight <= document.getElementById('Nav-Bar').getBoundingClientRect().top) {
        setVisible(false);
      }
    };

    document.addEventListener("scroll", handleScroll);
    return () => {document.removeEventListener("scroll", handleScroll);
  };
  }, []);
  return (
    <div id="language-selector" className={clsx("hidden md:block", visible ? "" : "hidden")}>
      {children}
    </div>
  );
};

const NavBarWrapper = ({ className, children }: React.PropsWithoutRef<React.HTMLAttributes<HTMLElement>>) =>  {
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const languageSelectorOffsetTop = document.getElementById('language-selector').getBoundingClientRect().top;
      const navBarOffsetTop = document.getElementById('Nav-Bar').getBoundingClientRect().top;
      if (!isFixed && scrollPosition >= languageSelectorOffsetTop) {
        setIsFixed(false);
      } else if (scrollPosition + window.innerHeight <= navBarOffsetTop) {
        setIsFixed(false);
      } else {
        setIsFixed(true);
      }
    };

    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div id="Nav-Bar" className={clsx("md:sticky md:top-0 md:z-1003", isFixed ? "fixed" : "")}>
      {children}
    </div>
  );
};

export { LanguageSelectorWrapper, NavBarWrapper };