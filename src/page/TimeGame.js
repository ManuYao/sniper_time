import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent,
  Button,
  Typography,
  IconButton,
  Box,
  ThemeProvider,
  createTheme,
  CssBaseline
} from '@mui/material';
import {
  Timer as TimerIcon,
  RestartAlt,
} from '@mui/icons-material';

import useSound from 'use-sound';

const TimerGame = () => {
  const [time, setTime] = useState(10000);
  const [isRunning, setIsRunning] = useState(false);
  const [lastScore, setLastScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const TARGET_TIME = 10000;

  const theme = createTheme({
    palette: {
      mode: 'dark',
      background: {
        default: '#1a1f2e',
        paper: '#1e2433',
      },
      primary: {
        main: '#ffffff',
      },
    },
    typography: {
      fontFamily: 'monospace',
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            backgroundColor: '#1e2433',
          },
        },
      },
    },
  });

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        setTime(prevTime => prevTime + 10);
      }, 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning]);

  const startTimer = () => {
    setTime(0);
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
    const score = Math.abs(time - TARGET_TIME);
    setLastScore(score);
    if (score < bestScore || bestScore === 0) {
      setBestScore(score);
    }
  };

  const formatTime = (ms) => {
    const seconds = Math.floor(ms / 1000);
    const milliseconds = ms % 1000;
    return `${seconds}.${milliseconds.toString().padStart(3, '0')}s`;
  };

  const formatScore = (score) => {
    return `${(score / 1000).toFixed(3)}s de différence`;
  };

  

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default'
      }}>
        <Card sx={{ width: 320, position: 'relative' }}>
          

          <CardContent sx={{ textAlign: 'center' }}>
            <Typography variant="h5" sx={{ mb: 4, color: 'white' }}>
              Visez 10 secondes !
            </Typography>

            <Box sx={{ 
              mb: 3,
              p: 2,
              borderRadius: 2,
              bgcolor: '#171b29'
            }}>
              <Typography variant="h3" sx={{ 
                fontFamily: 'monospace',
                color: 'white'
              }}>
                {formatTime(time)}
              </Typography>
            </Box>

            <Button
              fullWidth
              variant="contained"
              onClick={isRunning ? stopTimer : startTimer}
              sx={{
                mb: 2,
                py: 1.5,
                bgcolor: isRunning ? '#ef4444' : '#3b82f6',
                '&:hover': {
                  bgcolor: isRunning ? '#dc2626' : '#2563eb'
                }
              }}
            >
              {isRunning ? 'STOP' : 'START'} <TimerIcon sx={{ ml: 2 }} />
            </Button>

            <Button
              fullWidth
              variant="outlined"
              onClick={() => {
                setTime(0);
                setIsRunning(false);
                setLastScore(0);
              }}
              disabled={isRunning}
              sx={{
                mb: 3,
                color: 'white',
                borderColor: '#2a3142',
                '&:hover': {
                  borderColor: '#3a4152',
                  bgcolor: 'transparent'
                }
              }}
            >
              Réinitialiser <RestartAlt sx={{ ml: 2 }} />
            </Button>

            <Box sx={{ 
              p: 2,
              borderRadius: 2,
              bgcolor: '#171b29'
            }}>
              <Typography sx={{ mb: 2 }}>
                Dernier essai
                <Typography sx={{ color: '#3b82f6', fontSize: '1.25rem' }}>
                  {formatScore(lastScore)}
                </Typography>
              </Typography>

              <Typography>
                Meilleur score
                <Typography sx={{ color: '#22c55e', fontSize: '1.25rem' }}>
                  {formatScore(bestScore)}
                </Typography>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </ThemeProvider>
  );
};

export default TimerGame;