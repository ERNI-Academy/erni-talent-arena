import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

export default function AppBarComponent() {
  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar sx={{position: "static", height: '5.5em', maxWidth: '100%', backgroundColor: 'white', boxShadow: 'none'}}>
        <Container sx={{
          position: 'absolute', 
          top: '1.375rem', 
          left: '1.3125rem', 
          height: { xs: '1.5rem', sm: '2.2386rem' }, 
          width: { xs: '8rem', sm: '11.5625rem' }
        }}>
            <a href="https://www.betterask.erni/" target="_blank" rel="noopener noreferrer">
                <img
                    alt="Ventana"
                    src="/erniLogo.png"
                    style={{ 
                      cursor: 'pointer',
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain'
                    }}
                />
            </a>
        </Container>
        hello
      </AppBar> 
    </Box>
  );
}
