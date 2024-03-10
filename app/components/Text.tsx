"use client";

import { FC } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useState, useEffect } from "react";
import { useSpeech } from "react-text-to-speech";
import { HiOutlineMicrophone } from "react-icons/hi2";
import { TbQuestionMark } from "react-icons/tb";

interface TextProps {}

const Text: FC<TextProps> = ({}) => {
  const { transcript, listening, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  const [openHint, setOpenHint] = useState(false);

  const text = "the friendly dog chased the ball in the sunny park";
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
        <p className=" absolute top-[16vh] left-[5vw] w-[90vw] px-1 h-10 bg-text-bg  rounded flex items-center justify-center ">
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

      <div className="flex justify-between w-full  px-[15vw] bg-mobile-bg items-center  pt-[8vh] ">
        <HiOutlineMicrophone
          className={`h-16 w-16 bg-mobile-bg ${
            listening ? "text-red-400" : "text-gray-500"
          }`}
          onClick={handleStart}
        />
        <TbQuestionMark
          className={`h-20 w-20  bg-mobile-bg   text-gray-500 ${
            openHint ? "text-red-400" : "text-gray-500"
          }`}
          onClick={toggleHint}
        />
      </div>
    </div>
  );
};

export default Text;
