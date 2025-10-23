import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { Ripple } from '@shared/types';
import { ThemeToggle } from '@/components/ThemeToggle';
type GameState = 'idle' | 'running' | 'finished';
const GAME_DURATION = 10000; // 10 seconds
const RIPPLE_DURATION = 1000; // 1 second
export function HomePage() {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [clickCount, setClickCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number>();
  const gameEndTime = useRef<number>(0);
  const resetGame = useCallback(() => {
    setGameState('idle');
    setClickCount(0);
    setTimeLeft(GAME_DURATION);
    setRipples([]);
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }
  }, []);
  const gameLoop = useCallback((now: number) => {
    // Update timer
    if (gameState === 'running') {
      const newTimeLeft = Math.max(0, gameEndTime.current - now);
      setTimeLeft(newTimeLeft);
      if (newTimeLeft === 0) {
        setGameState('finished');
      }
    }
    // Draw ripples
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let hasActiveRipples = false;
    const updatedRipples = ripples.filter(ripple => {
      const age = now - ripple.createdAt;
      if (age < RIPPLE_DURATION) {
        const progress = age / RIPPLE_DURATION;
        const radius = progress * 100; // Max radius of 100px
        const opacity = 1 - progress;
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, radius, 0, 2 * Math.PI);
        ctx.strokeStyle = `rgba(250, 204, 21, ${opacity})`; // Yellow accent
        ctx.lineWidth = 3;
        ctx.stroke();
        hasActiveRipples = true;
        return true;
      }
      return false;
    });
    if (ripples.length !== updatedRipples.length) {
        setRipples(updatedRipples);
    }
    // Continue animation loop if game is running or ripples are active
    if (gameState === 'running' || hasActiveRipples) {
      animationFrameId.current = requestAnimationFrame(gameLoop);
    }
  }, [gameState, ripples]);
  useEffect(() => {
    animationFrameId.current = requestAnimationFrame(gameLoop);
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [gameLoop]);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      const ctx = canvas.getContext('2d');
      ctx?.scale(dpr, dpr);
    }
  }, []);
  const startGame = () => {
    resetGame();
    setGameState('running');
    gameEndTime.current = performance.now() + GAME_DURATION;
  };
  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (gameState !== 'running') return;
    setClickCount(prev => prev + 1);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setRipples(prev => [...prev, { x, y, radius: 0, opacity: 1, createdAt: performance.now() }]);
  };
  const renderGameState = () => {
    const cps = (clickCount / (GAME_DURATION / 1000)).toFixed(2);
    const motionProps = {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.9 },
      transition: { duration: 0.3, ease: "easeInOut" },
    };
    switch (gameState) {
      case 'finished':
        return (
          <motion.div {...motionProps} key="finished" className="text-center space-y-6">
            <h2 className="text-3xl font-sans font-semibold">Time's Up!</h2>
            <p className="text-6xl font-bold font-sans text-primary">{cps}</p>
            <p className="text-xl text-muted-foreground">Clicks Per Second</p>
            <Button size="lg" onClick={startGame} className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg transition-transform hover:scale-105 active:scale-95">
              Try Again
            </Button>
          </motion.div>
        );
      case 'running':
        return (
          <motion.div {...motionProps} key="running" className="w-full flex justify-between items-center px-8 text-2xl md:text-4xl font-sans font-bold">
            <div className="text-left">
              <span className="text-muted-foreground text-lg md:text-2xl block">Time Left</span>
              <span>{(timeLeft / 1000).toFixed(1)}s</span>
            </div>
            <div className="text-right">
              <span className="text-muted-foreground text-lg md:text-2xl block">Clicks</span>
              <span>{clickCount}</span>
            </div>
          </motion.div>
        );
      case 'idle':
      default:
        return (
          <motion.div {...motionProps} key="idle" className="text-center space-y-6">
            <h1 className="text-6xl md:text-8xl font-display text-foreground">Ripple Rush</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-md mx-auto">
              Click as fast as you can in 10 seconds. Each click creates a ripple in the water.
            </p>
            <Button size="lg" onClick={startGame} className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg transition-transform hover:scale-105 active:scale-95">
              Start Game
            </Button>
          </motion.div>
        );
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4 sm:p-6 lg:p-8 font-sans relative overflow-hidden">
      <ThemeToggle className="absolute top-4 right-4 z-20" />
      <main className="w-full max-w-4xl flex flex-col items-center space-y-8">
        <div className="h-48 flex items-center justify-center w-full">
          <AnimatePresence mode="wait">
            {renderGameState()}
          </AnimatePresence>
        </div>
        <Card className="w-full h-96 shadow-lg border-2 border-foreground/10 overflow-hidden">
          <CardContent className="p-0 h-full">
            <canvas
              ref={canvasRef}
              onClick={handleCanvasClick}
              className="w-full h-full bg-foreground/90 cursor-pointer"
              style={{ backgroundColor: 'rgb(23, 37, 84)' }}
            />
          </CardContent>
        </Card>
      </main>
      <footer className="absolute bottom-4 text-center text-muted-foreground/80 text-sm">
        <p>Built with ❤️ by a Cloudflare Expert</p>
      </footer>
    </div>
  );
}