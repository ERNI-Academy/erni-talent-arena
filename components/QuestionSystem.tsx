'use client';

import { useState, useEffect } from 'react';
import { Button, Box, Typography } from '@mui/material';
import { CaricatureFeatures } from '../data/imagesData';
import { filterImagesBySequence } from '../utils/filterUtils';

interface Question {
  id: number;
  text: string;
  feature: CaricatureFeatures;
}

interface QuestionSystemProps {
  onFiltersChange: (answers: boolean[]) => void;
}

const questions: Question[] = [
  { id: 1, text: "¿Tu caricatura tiene gafas?", feature: CaricatureFeatures.GLASSES },
  { id: 2, text: "¿Tu caricatura tiene barba?", feature: CaricatureFeatures.BEARD },
  { id: 3, text: "¿Tu caricatura tiene el pelo largo?", feature: CaricatureFeatures.LONG_AIR },
  { id: 4, text: "¿Tu caricatura tiene pendientes?", feature: CaricatureFeatures.EARRINGS },
  { id: 5, text: "¿Eres un hombre?", feature: CaricatureFeatures.MAN }
];

export default function QuestionSystem({ onFiltersChange }: QuestionSystemProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [isVisible, setIsVisible] = useState(true);
  const [isShaking, setIsShaking] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const handleAnswer = (answer: boolean) => {
    // Animación de fade out
    setIsVisible(false);
    
    setTimeout(() => {
      // Guardar la respuesta
      const newAnswers = [...answers, answer];
      setAnswers(newAnswers);
      
      // Pasar las respuestas al componente padre
      onFiltersChange(newAnswers);
      
      // Verificar si hay más preguntas
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setIsVisible(true);
        
        // Animación de shock después del fade in
        setTimeout(() => {
          setIsShaking(true);
          setTimeout(() => setIsShaking(false), 300);
        }, 100);
      } else {
        // Terminaron las preguntas
        setIsFinished(true);
        setIsVisible(true);
      }
    }, 300); // Duración del fade out
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setIsFinished(false);
    setIsVisible(true);
    onFiltersChange([]);
  };

  if (isFinished) {
    return (
      <Box
        sx={{
          textAlign: 'center',
          opacity: isVisible ? 1 : 0,
          transform: isShaking ? 'scale(1.05)' : 'scale(1)',
          transition: isShaking ? 'transform 0.3s ease-in-out' : 'opacity 0.3s ease-in-out'
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: '#033778',
            fontWeight: 'bold',
            mb: 1,
            fontFamily: 'var(--font-source-sans-pro), sans-serif'
          }}
        >
          ¡Estos son tus posibles gemelos digitales!
        </Typography>
        <Button
          variant="contained"
          onClick={handleRestart}
          sx={{
            backgroundColor: '#033778',
            color: 'white',
            px: 4,
            py: 1.5,
            borderRadius: '25px',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            fontFamily: 'var(--font-source-sans-pro), sans-serif',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#022a5a'
            }
          }}
        >
          Reiniciar
        </Button>
      </Box>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <Box
      sx={{
        textAlign: 'center',
        opacity: isVisible ? 1 : 0,
        transform: isShaking ? 'scale(1.05)' : 'scale(1)',
        transition: isShaking ? 'transform 0.3s ease-in-out' : 'opacity 0.3s ease-in-out'
      }}
    >
      <Typography
        variant="h5"
        sx={{
          color: '#033778',
          fontWeight: 'bold',
          mb: 1,
          fontFamily: 'var(--font-source-sans-pro), sans-serif'
        }}
      >
        {currentQuestion.text}
      </Typography>

      <Box sx={{ 
        display: 'flex', 
        gap: 2, 
        justifyContent: 'center',
        flexDirection: { xs: 'column', sm: 'row' }
      }}>
        <Button
          variant="contained"
          color="success"
          size="large"
          onClick={() => handleAnswer(true)}
          sx={{
            minWidth: { xs: '100%', sm: '120px' },
            py: 0.6,
            fontSize: '1.1rem',
            fontWeight: 'bold',
            borderRadius: '25px',
            fontFamily: 'var(--font-source-sans-pro), sans-serif',
            textTransform: 'none',
            lineHeight: 1.1
          }}
        >
          Sí
        </Button>
        <Button
          variant="contained"
          color="error"
          size="large"
          onClick={() => handleAnswer(false)}
          sx={{
            minWidth: { xs: '100%', sm: '120px' },
            py: 0.6,
            fontSize: '1.1rem',
            fontWeight: 'bold',
            borderRadius: '25px',
            fontFamily: 'var(--font-source-sans-pro), sans-serif',
            textTransform: 'none',
            lineHeight: 1.1
          }}
        >
          No
        </Button>
      </Box>
    </Box>
  );
} 