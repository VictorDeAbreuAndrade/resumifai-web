"use client";
import axios from "axios";
import { useState } from "react";

export function Main() {
  const backEndUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  console.log("BackEnd URL:", backEndUrl);
  const [idDetected, setIdDetected] = useState("");
  const [summary, setSummary] = useState("Your summary will be displayed here");
  const [selectedWordLimit, setSelectedWordLimit] = useState("200");

  const handleChange = (event) => {
    let videoId = urlValidate(event.target.value);
    setIdDetected(videoId);
  };

  const handleButtonResumirClicked = async () => {
    console.log("ID detected:", idDetected);

    try {
      // setSummary('Fetching transcription...')
      // const transcriptionResponse = await axios.get(`${backEndUrl}/transcription/${idDetected}`)

      setSummary("Generating summary...");

      // const summaryResponse = await axios.post(`${backEndUrl}/summary`,
      // 	{
      // 		transcription: transcriptionResponse.data.transcription,
      // 		wordLimit: selectedWordLimit
      // 	})

      const summaryResponse = await axios.post(`${backEndUrl}/`, {
        videoId: idDetected,
        wordLimit: selectedWordLimit,
      });

      // setSummary(summaryResponse)
      setSummary(summaryResponse.data.summary);
    } catch (error) {
      console.error("Full error object:", error);
      console.error("Response data:", error.response?.data);
      console.error("Response status:", error.response?.status);
      setSummary(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleButtonLimparClicked = () => {
    window.location.reload();
  };

  const urlValidate = (url) => {
    // console.log('URL tested:', url);

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
      // Insert here the possibility to recognize shorts links
      idDetected = url.split(/shorts\/|\?/)[1];
      idDetected.length === 11 ? null : (idDetected = "Invalid ID!");
    }

    console.log(`Video ID: ${idDetected}`);

    return idDetected;
  };

  return (
    <>
      <div className="p-4 max-w-xl mx-auto m-2">
        <div className="items-center">
          <input
            type="url"
            name="urlVideo"
            id="urlVideo"
            placeholder="Paste here the video URL"
            className="align-middle bg-white text-black p-2 mb-3 h-10 w-full border shadow-md"
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            className="p-2 w-1/2 rounded-lg shadow-md bg-gray-600 hover:bg-gray-700"
            onClick={handleButtonResumirClicked}
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
              checked={selectedWordLimit == "400"}
              onChange={() => setSelectedWordLimit("400")}
            />
            <span
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                selectedWordLimit == "400"
                  ? "bg-gray-900 border border-white"
                  : "bg-gray-700"
              }`}
            >
              400
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
      <div className="min-h-fit p-2 px-3 m-4 bg-neutral-900 flex text-justify">
        {summary}
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
