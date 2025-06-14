import React, { useEffect, useState } from "react";

export const Typewriter = ({ text, speed = 250}) => {
    const [displayedText, setDispayedText] = useState('');

    useEffect(() =>{
        if (!text) return;

    let index = 0;
    let forward = true;

    const interval = setInterval(() => {
        setDispayedText((prev) => {
        if (forward) {
            index++;
            if (index === text.length) forward = false;
            return text.slice(0, index);
        } else {
            index--;
            if (index === 0) forward = true;
            return text.slice(0, index);
        }
        });
    }, speed);

    return () => clearInterval(interval);
    }, [text, speed]);

    return (
    <h1>I'm 
      <span className="text-3xl ml-2 sm:text-4xl font-bold font-poppins text-cyan-500">{displayedText}</span>
      <span className="text-cyan-400 blink">|</span>
    </h1>
  );
}