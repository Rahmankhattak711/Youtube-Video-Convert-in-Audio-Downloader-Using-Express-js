import axios from "axios";
import React, { useState } from "react";

function VideoToAudioDownload() {
  const [urlValue, setUrlValue] = useState("");
  const [data, setData] = useState(null);

  const handleDownload = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/download?url=${urlValue}`
      );
      setData(response.data);
      setUrlValue("");
    } catch (error) {
      console.error("Error downloading:", error.message);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="text-4xl font-bold mb-4">
        <h1>Youtube video Download in Any Fromat</h1>
      </div>
      <div className="flex flex-row mb-4">
        <input
          type="text"
          value={urlValue}
          onChange={(e) => setUrlValue(e.target.value)}
          placeholder="Enter URL..."
          className="outline-none p-2 w-80 border-2 border-gray-500 rounded-md mr-4"
        />
        <button
          onClick={handleDownload}
          className="bg-black text-white py-2 px-6 rounded-md cursor-pointer"
        >
          Download Now
        </button>
      </div>

      <div>
        {data !== null ? (
          <div>
            <div className="my-4">
              <iframe
                width="770"
                height="320"
                src={`${data.url}`}
                title="video"
              />
            </div>
            <div>
              {data?.info.map((videoDownloadFormat, index) => (
                <div key={index}>
                  <a
                    href={videoDownloadFormat.url}
                    target="_blank"
                    download
                    className="font-bold italic"
                  >
                    {`${videoDownloadFormat.mimeType.split(";")[0]} ${
                      videoDownloadFormat.hasVideo
                        ? videoDownloadFormat.height + "p"
                        : ""
                    }`}
                  </a>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-black font-bold ">No download Present</div>
        )}
      </div>
    </div>
  );
}

export default VideoToAudioDownload;
