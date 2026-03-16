'use client';

import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import AppBarComponent from "@/components/appBar";
import { WhoIsWhoBoard, QuestionSystem, ImageModal } from '../../components';
import { CaricatureFeatures } from '../../data/imagesData';
import { filterImagesBySequence } from '../../utils/filterUtils';

export default function WhoIsWho3DPage() {
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleFiltersChange = (newAnswers: boolean[]) => {
    setAnswers(newAnswers);
  };

  const handleCardClick = (caricature: { file: string; features: number[] }) => {
    setSelectedImage(caricature.file);
  };

  return (
    <div className="min-h-screen bg-white">
      <AppBarComponent />
      <div className="absolute top-0 left-0 right-0 z-10 p-4" style={{ marginTop: '64px' }}>
        <div className="max-w-4xl mx-auto">
          <h1 
            className="text-4xl md:text-5xl font-semibold text-[#033778] text-center leading-tight"
            style={{ 
              fontFamily: 'var(--font-source-sans-pro), sans-serif',
              fontWeight: 600
            }}
          >
            ¿Quién es quién? 3D
          </h1>
          <QuestionSystem 
            onFiltersChange={handleFiltersChange}
          />
        </div>
      </div>

      {/* Canvas 3D */}
      <div className="w-full h-screen" style={{ marginTop: '-100px' }}>
        <Canvas
          camera={{ position: [0, 5, 25], fov: 35 }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} />
          
          <WhoIsWhoBoard answers={answers} onCardClick={handleCardClick} />
          
          <OrbitControls 
            enablePan={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2.5}
            minDistance={15}
            maxDistance={30}
            target={[0, 0, 0]}
          />
        </Canvas>
      </div>

      {/* Modal para mostrar la imagen */}
      <ImageModal
        open={!!selectedImage}
        selectedImage={selectedImage ? {
          src: `/caricatures/${selectedImage}`,
          name: selectedImage
        } : null}
        onClose={() => setSelectedImage(null)}
        onDownload={(imageSrc, imageName) => {
          // Función para descargar la imagen
          const link = document.createElement('a');
          link.href = imageSrc;
          link.download = imageName;
          link.click();
        }}
      />
    </div>
  );
} 