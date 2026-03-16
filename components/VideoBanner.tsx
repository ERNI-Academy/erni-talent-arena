import React from 'react';

export default function VideoBanner() {
  return (
    <div className="w-full h-[75vh] relative overflow-hidden">
      <iframe
        src="https://www.youtube.com/embed/pNh3RXKItQE?si=xmFGSl4ZHhwLmBhc&autoplay=1&mute=1&loop=1&playlist=pNh3RXKItQE"
        className="w-full h-full border-0 absolute top-0 left-0 object-cover scale-[2.8] md:scale-[1.6] origin-center"
        title="Video Banner"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      <div
        className="absolute top-0 left-0 w-full h-full pointer-events-auto z-[1]"
        style={{
          backgroundColor: '#033778',
          opacity: 0
        }}
      />
      <div
        className="absolute left-0 bottom-0 w-full flex items-end z-[2]"
      >
        <h1
          className="text-white text-5xl md:text-7xl font-semibold pl-8 pb-8"
          style={{ 
            lineHeight: 1.1,
            fontFamily: 'var(--font-source-sans-pro), sans-serif',
            fontWeight: 600
          }}
        >
          ERNI<br />Ingeniería de Software Suiza
        </h1>
      </div>
    </div>
  );
} 