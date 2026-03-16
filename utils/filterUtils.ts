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
  { id: 1, text: "¿Alguien de tu caricatura tiene gafas?", feature: CaricatureFeatures.GLASSES },
  { id: 2, text: "¿Alguien de tu caricatura tiene barba?", feature: CaricatureFeatures.BEARD },
  { id: 3, text: "¿Alguien de tu caricatura tiene el pelo largo?", feature: CaricatureFeatures.LONG_AIR },
  { id: 4, text: "¿Alguien de tu caricatura tiene pendientes?", feature: CaricatureFeatures.EARRINGS },
  { id: 5, text: "¿Sale algún hombre en la caricatura?", feature: CaricatureFeatures.MAN },
  { id: 6, text: "¿Salís más de una persona en la caricatura?", feature: CaricatureFeatures.GROUP },
  { id: 7, text: "¿Aparece una mascota en la caricatura?", feature: CaricatureFeatures.PET }
];

export const filterImagesBySequence = (images: CaricatureImage[], answers: boolean[]): CaricatureImage[] => {
  const petQuestionIndex = questions.findIndex(
    (question) => question.feature === CaricatureFeatures.PET
  );

  // Si la pregunta de mascota es afirmativa, ignora el resto de respuestas y
  // filtra solo por la característica PET = 1.
  if (petQuestionIndex >= 0 && answers[petQuestionIndex] === true) {
    return images.filter(
      (image) => image.features[CaricatureFeatures.PET] === 1
    );
  }

  return images.filter(image => {
    // Verificar que la imagen cumpla con cada respuesta según su feature real.
    for (let i = 0; i < answers.length; i++) {
      const question = questions[i];
      if (!question) continue;
      const featureIndex = question.feature;
      const expectedValue = answers[i] ? 1 : 0;
      if (image.features[featureIndex] !== expectedValue) {
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