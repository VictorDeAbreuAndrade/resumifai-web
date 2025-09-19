"use client";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import copyButton from "../../public/copyIcon.png";

export function Main() {
  const backEndUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const [idDetected, setIdDetected] = useState("");
  const [summary, setSummary] = useState("Your summary will be displayed here");
  const [selectedWordLimit, setSelectedWordLimit] = useState("100");
  const [copyButtonText, setCopyButtonText] = useState("Copy");

  const handleChange = (event) => {
    let videoId = urlValidate(event.target.value);
    setIdDetected(videoId);
  };

  const handleButtonPasteAndGoClicked = async () => {
    const inputText = document.getElementById("urlVideo");

    try {
      if (!navigator.clipboard) {
        alert("Clipboard API not supported in this browser.");
        return;
      }

      const copiedUrl = await navigator.clipboard.readText();
      inputText.value = copiedUrl;
      const videoId = urlValidate(copiedUrl);
      setIdDetected(videoId);
      handleButtonResumirClicked(videoId);
    } catch (error) {
      console.error("Error reading from clipboard:", error);
      alert("Failed to read from clipboard. Please paste the URL manually.");
      inputText.value = "";
      setIdDetected("");
      setSummary("Your summary will be displayed here");
    }
  };

  const handleButtonResumirClicked = async (videoId) => {
    const idToUse = videoId || idDetected;

    try {
      setSummary("Generating summary...");

      const summaryResponse = await axios.post(`${backEndUrl}/`, {
        videoId: idToUse,
        wordLimit: selectedWordLimit,
      });

      setSummary(summaryResponse.data.summary);
    } catch (error) {
      console.error("Full error object:", error);
      setSummary(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleButtonLimparClicked = () => {
    window.location.reload();
  };

  const handleCopySummary = async () => {
    if (
      !summary ||
      summary === "Your summary will be displayed here" ||
      summary.startsWith("Error:") ||
      summary.startsWith("Generating summary...")
    ) {
      return;
    }
    try {
      await navigator.clipboard.writeText(
        `"${summary.trim()}"\n\nSummarized with ResumifAI - tinyurl.com/resumifai`
      );
      setCopyButtonText("Copied!");
      setTimeout(() => {
        setCopyButtonText("Copy");
      }, 100); // Reset button text after 2 seconds
    } catch (err) {
      console.error("Failed to copy text: ", err);
      setCopyButtonText("Failed!");
      setTimeout(() => {
        setCopyButtonText("Copy");
      }, 2000);
    }
  };

  const urlValidate = (url) => {
    let idDetected = "Invalid ID!";

    // Check if URL is from Youtube and collect its ID
    if (url.includes("https://www.youtube.com/watch?v=")) {
      idDetected = url.split(/watch\?v=|&/)[1];
      idDetected.length === 11 ? null : (idDetected = "Invalid ID!");
    } else if (url.includes("https://youtu.be/")) {
      idDetected = url.split(/youtu.be\/|\?/)[1];
      idDetected.length === 11 ? null : (idDetected = "Invalid ID!");
    } else if (url.includes("https://www.youtube.com/live/")) {
      idDetected = url.split(/live\/|\?/)[1];
      idDetected.length === 11 ? null : (idDetected = "Invalid ID!");
    } else if (url.includes("https://youtube.com/shorts/")) {
      idDetected = url.split(/shorts\/|\?/)[1];
      idDetected.length === 11 ? null : (idDetected = "Invalid ID!");
    }

    return idDetected;
  };

  const isSummaryAvailable =
    summary &&
    summary !== "Your summary will be displayed here" &&
    !summary.startsWith("Generating summary...") &&
    !summary.startsWith("Error:");

  return (
    <>
      <div className="p-2.5 max-w-xl mx-auto m-2">
        <div className="relative items-center">
          <input
            type="url"
            name="urlVideo"
            id="urlVideo"
            placeholder="Paste here the video URL"
            className="align-middle bg-white text-black p-2 pr-28 mb-3 h-10 w-full border shadow-md"
            onChange={handleChange}
          />
          <button
            className="absolute right-1 top-1 rounded-lg w-25 h-8 shadow-md bg-gray-600 hover:bg-gray-700"
            onClick={handleButtonPasteAndGoClicked}
          >
            Paste'n'Go
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="p-2 w-1/2 rounded-lg shadow-md bg-gray-600 hover:bg-gray-700"
            onClick={() => handleButtonResumirClicked()}
          >
            ResumifAI
          </button>
          <button
            className="p-2 w-1/2 rounded-lg shadow-md bg-gray-500 hover:bg-gray-700"
            onClick={handleButtonLimparClicked}
          >
            Reset
          </button>
        </div>

        <div className="space-x-4 mt-3 text-sm text-center">
          <span className="text-base">Number of words:</span>
          <label className="cursor-pointer">
            <input
              type="radio"
              name="qtdWords"
              className="hidden"
              checked={selectedWordLimit == "100"}
              onChange={() => setSelectedWordLimit("100")}
            />
            <span
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                selectedWordLimit == "100"
                  ? "bg-gray-900 border border-white"
                  : "bg-gray-700"
              }`}
            >
              100
            </span>
          </label>

          <label className="cursor-pointer">
            <input
              type="radio"
              name="qtdWords"
              className="hidden"
              checked={selectedWordLimit == "200"}
              onChange={() => setSelectedWordLimit("200")}
            />
            <span
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                selectedWordLimit == "200"
                  ? "bg-gray-900 border border-white"
                  : "bg-gray-700"
              }`}
            >
              200
            </span>
          </label>

          <label className="cursor-pointer">
            <input
              type="radio"
              name="qtdWords"
              className="hidden"
              checked={selectedWordLimit == "noLimits"}
              onChange={() => setSelectedWordLimit("noLimits")}
            />
            <span
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                selectedWordLimit == "noLimits"
                  ? "bg-gray-900 border border-white"
                  : "bg-gray-700"
              }`}
            >
              Unlimited
            </span>
          </label>
        </div>

        <div className="flex justify-center space-x-4 mt-3">
          <span className="flex space-x-2 items-center">
            <input
              type="radio"
              name="qtdWords"
              id="qtdPersonalized"
              value="personalized"
              className="hidden"
            />{" "}
            Custom quantity (25-9999):
            <input
              className="h-8 ml-2 p-1 w-17 border shadow-md text-black bg-white"
              type="number"
              name="qtdChosen"
              id="qtdChosen"
              min="25"
              max="9999"
              maxLength={4}
              onInput={(e) => {
                if (e.target.value.length > 4) {
                  e.target.value = e.target.value.slice(0, 4);
                }
              }}
              onChange={(e) => setSelectedWordLimit(e.target.value)}
              onBlur={(e) => {
                if (e.target.value && Number(e.target.value) < 25) {
                  setSelectedWordLimit("25");
                  e.target.value = 25;
                }
                if (e.target.value && Number(e.target.value) > 9999) {
                  setSelectedWordLimit("9999");
                  e.target.value = 9999;
                }
              }}
            />
          </span>
        </div>
      </div>
      <div className="flex items-start min-h-fit p-2 px-3 max-w-135 mx-auto m-4 bg-neutral-900 text-justify text-white">
        <span className="flex-grow">{summary}
        {
        isSummaryAvailable &&
        (
          <button
            onClick={handleCopySummary}
            className={`px-1 transition-all opacity-30 hover:opacity-70 ${
              copyButtonText === "Copied!"
                ? "scale-70"
                : ""
            }`}
            title="Copy summary"
          >
            <Image
              src={copyButton}
              alt={copyButtonText}
              width={17}
              height={17}
            />
          </button>
        )}
        </span>
      </div>
      {idDetected == "Invalid ID!" ? (
        <div className="absolute top-1 left-1 border border-red-600 p-1 text-sm font-semibold text-red-600 bg-red-300">
          Insert a valid URL!
        </div>
      ) : (
        ""
      )}
    </>
  );
}
