import { Box, Typography, Fade, Slide } from '@mui/material';
import CaricatureCard from './CaricatureCard';
import { CaricatureImage } from '@/utils/filterUtils';

interface CaricatureGridProps {
  images: CaricatureImage[];
  isFiltering: boolean;
  onOpenModal: (image: CaricatureImage) => void;
  onDownload: (imageSrc: string, imageName: string) => void;
}

export default function CaricatureGrid({
  images,
  isFiltering,
  onOpenModal,
  onDownload
}: CaricatureGridProps) {
  if (images.length === 0 && !isFiltering) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h6" color="text.secondary">
          No se encontraron caricaturas con esas características
        </Typography>
      </Box>
    );
  }

  if (isFiltering) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h6" color="text.secondary">
          Filtrando caricaturas...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      display: 'grid',
      gridTemplateColumns: {
        xs: 'repeat(1, 1fr)',
        sm: 'repeat(2, 1fr)',
        md: 'repeat(3, 1fr)',
        lg: 'repeat(4, 1fr)',
        xl: 'repeat(6, 1fr)'
      },
      gap: 3,
      mt: 3
    }}>
      {images.map((image, index) => (
        <Fade 
          key={image.name} 
          in={!isFiltering} 
          timeout={300}
          style={{ transitionDelay: `${index * 50}ms` }}
        >
          <Slide 
            direction="up" 
            in={!isFiltering} 
            timeout={300}
            style={{ transitionDelay: `${index * 50}ms` }}
          >
            <div>
              <CaricatureCard
                image={image}
                index={index}
                isFiltering={isFiltering}
                onOpenModal={onOpenModal}
                onDownload={onDownload}
              />
            </div>
          </Slide>
        </Fade>
      ))}
    </Box>
  );
} 