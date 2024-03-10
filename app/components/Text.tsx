"use client";

import { FC } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useState, useEffect } from "react";
import { useSpeech } from "react-text-to-speech";

interface TextProps {}

const Text: FC<TextProps> = ({}) => {
  const { transcript, listening, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  const [openHint, setOpenHint] = useState(false);

  const text = "hello dark my old friend";
  const arrText = text.split(" ");

  const [whichItem, setWhichItem] = useState(-1);

  useEffect(() => {
    transcript.toLowerCase() === arrText[whichItem] &&
      setWhichItem(whichItem + 1);
  }, [transcript]);

  useEffect(() => {
    setWhichItem(0);
  }, []);

  const toggleHint = () => {
    setOpenHint(!openHint);

    if (!openHint) {
      start();
    }
  };

  const handleStart = () => {
    SpeechRecognition.startListening();
  };

  const { Text, speechStatus, start, pause, stop } = useSpeech({
    text: arrText[whichItem],
  });

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser does not support speech recognition.</span>;
  }

  return (
    <div className="flex flex-col justify-center items-center bg-mobile-bg  pt-[10vh]">
      {openHint && (
        <p className=" absolute top-20 left-[5vw] w-[90vw] px-1 h-10 bg-text-bg  rounded flex items-center justify-center ">
          mirored version : {arrText[whichItem].split("").reverse().join("")}
        </p>
      )}
      <p className=" bg-text-bg p-2 text-xl  rounded h-[40vh] w-[90vw] ">
        <span className="text-gray-500 bg-text-bg">
          {" "}
          {" " + arrText.slice(0, -arrText.length + whichItem).join(" ")}
        </span>
        <span className="bg-text-bg">
          {" "}
          {" " + arrText.slice(whichItem).join(" ")}
        </span>
      </p>
      <p className="mt-6 text-xl font-bold bg-mobile-bg">
        Microphone: {listening ? "Listening.." : "off"}
      </p>
      <div className="flex justify-between w-full  px-[15vw] bg-mobile-bg  pt-[10vh] ">
        <button className="btn btn-primary btn-sm" onClick={handleStart}>
          Start
        </button>
        <button className="btn btn-secondary btn-sm" onClick={toggleHint}>
          hint
        </button>
      </div>
    </div>
  );
};

export default Text;
