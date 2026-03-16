import { HtmlRenderer } from '@/utils/htmlRenderer';
import React from 'react';

export default function FooterBanner() {
  return (
    <section className="relative w-full py-16 px-12 overflow-hidden h-[600px]">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(/footerImage.JPG)'
        }}
      />
      <div 
        className="absolute inset-0 bg-[#033778] opacity-10"
      />
      <div className="relative z-10 px-0 sm:px-12 mx-auto h-full">
        <div className="grid grid-cols-1 lg:grid-cols-10 h-full gap-6 lg:gap-0">
          <div className="lg:col-span-7 flex flex-col justify-between">
            <h1 
              className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight"
              style={{ fontFamily: 'var(--font-source-sans-pro), sans-serif' }}
            >
              <HtmlRenderer text={`Desarrolla tu potencial<br />y conviértete en un ERNIan.`} />
            </h1>
            
            <div className="space-y-6 lg:space-y-0">
              <p 
                className="hidden lg:block text-base md:text-lg lg:text-xl text-white leading-relaxed max-w-2xl"
                style={{ fontFamily: 'var(--font-source-sans-pro), sans-serif' }}
              >
                <HtmlRenderer text={`Buscamos personas como tú, con ganas de crecer y que quieran formar<br />parte de proyectos retadores para llegar aún más lejos.`} />
              </p>
            </div>
          </div>
          <div className="flex lg:flex lg:col-span-3 items-end justify-end">
            <a
              href="https://www.betterask.erni/es-en/job-opportunities/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg flex items-center justify-center min-w-[280px] whitespace-nowrap"
              style={{ fontFamily: 'var(--font-source-sans-pro), sans-serif' }}
            >
              <HtmlRenderer text={`Ver oportunidades disponibles →`} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
} 