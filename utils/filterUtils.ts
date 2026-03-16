import { CaricatureFeatures } from "@/data/imagesData";

export interface CaricatureImage {
  name: string;
  src: string;
  size: string;
  features: number[];
}

export interface Question {
  id: number;
  text: string;
  feature: CaricatureFeatures;
}

export const questions: Question[] = [
  { id: 1, text: "¿Tu caricatura tiene gafas?", feature: CaricatureFeatures.GLASSES },
  { id: 2, text: "¿Tu caricatura tiene barba?", feature: CaricatureFeatures.BEARD },
  { id: 3, text: "¿Tu caricatura tiene el pelo largo?", feature: CaricatureFeatures.LONG_AIR },
  { id: 4, text: "¿Tu caricatura tiene pendientes?", feature: CaricatureFeatures.EARRINGS },
  { id: 5, text: "¿Eres un hombre?", feature: CaricatureFeatures.MAN }
];

export const filterImagesBySequence = (images: CaricatureImage[], answers: boolean[]): CaricatureImage[] => {
  return images.filter(image => {
    // Verificar que la imagen tenga la secuencia de respuestas
    for (let i = 0; i < answers.length; i++) {
      const expectedValue = answers[i] ? 1 : 0;
      if (image.features[i] !== expectedValue) {
        return false;
      }
    }
    return true;
  });
};

export const downloadImage = (imageSrc: string, imageName: string) => {
  const link = document.createElement('a');
  link.href = imageSrc;
  link.download = imageName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}; 