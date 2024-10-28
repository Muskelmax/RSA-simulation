import React from 'react';

const VideoEmbed = () => {
  return (
    <div className="flex justify-center items-center h-1/8">
      <div className="w-full p-4 flex justify-center items-center">
        <iframe
          className="w-[700px] h-[300px]"
          src="https://www.youtube.com/embed/wXB-V_Keiu8?start=667"
          title="Art of the Problem - Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default VideoEmbed;