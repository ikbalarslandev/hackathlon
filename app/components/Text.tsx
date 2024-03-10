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
    <div>
      {openHint && (
        <p className=" absolute top-20 left-[15vw] w-[70vw] px-1 h-10 bg-gray-100 rounded">
          mirored version: {arrText[whichItem].split("").reverse().join("")}
        </p>
      )}
      <p className=" mt-6 px-2 pt-2 pb-32 mb-4 rounded-md bg-base-100 lg:w-96 lg:h-48 w-64 h-64">
        <span className="text-gray-500 bg-base-100">
          {" "}
          {" " + arrText.slice(0, -arrText.length + whichItem).join(" ")}
        </span>
        <span className="bg-base-100">
          {" "}
          {" " + arrText.slice(whichItem).join(" ")}
        </span>
      </p>
      <p className="mb-2 text-xl font-bold">
        Microphone: {listening ? "Listening.." : "off"}
      </p>
      <div className="flex justify-between ">
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
