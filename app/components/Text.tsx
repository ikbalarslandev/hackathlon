"use client";

import { FC } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useState, useEffect } from "react";

interface TextProps {}

const Text: FC<TextProps> = ({}) => {
  const { transcript, listening, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

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

  const handleStart = () => {
    SpeechRecognition.startListening();
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser does not support speech recognition.</span>;
  }

  return (
    <div>
      <p className=" mt-6 px-2 pt-2 pb-32 mb-4 rounded-md bg-base-100 lg:w-96 lg:h-48 w-64 h-64">
        {/* {transcript.toLowerCase() === arrText[whichItem - 1] ? (
          <span className="text-red-500">{transcript}</span>
        ) : (
          transcript + " "
        )} */}
        <span className="text-gray-500">
          {" "}
          {" " + arrText.slice(0, -arrText.length + whichItem).join(" ")}
        </span>
        <span className="text-blue-700">
          {" "}
          {" " + arrText.slice(whichItem).join(" ")}
        </span>
      </p>
      <p className="mb-2 text-xl font-bold">
        {whichItem} Microphone: {listening ? "Listening.." : "off"}
      </p>
      <div className="flex justify-between ">
        <button className="btn btn-primary btn-sm" onClick={handleStart}>
          Start
        </button>
        <button className="btn btn-secondary btn-sm">hint</button>
      </div>
    </div>
  );
};

export default Text;
