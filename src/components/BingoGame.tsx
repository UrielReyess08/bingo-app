"use client";

import {useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const generateCalledNumbers = () => {
  const numbers = [];
  for (let i = 1; i <= 75; i++) {
    numbers.push(i);
  }
  return numbers.sort(() => Math.random() - 0.5);
};

export default function BingoGame() {
  const [calledNumbers, setCalledNumbers] = useState<number[]>([]);
  const [currentNumber, setCurrentNumber] = useState<number | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [availableNumbers, setAvailableNumbers] = useState<number[]>(generateCalledNumbers());
  const audioRef = useRef<HTMLAudioElement>(null);

  //FUNCION DE CANTAR EL NUMERO CON VOZ
  const speakNumber = (number: number) => {
    window.speechSynthesis.cancel();
    const msg = new window.SpeechSynthesisUtterance(`El número cantado es ${number}`);
    window.speechSynthesis.speak(msg);
  };

  const callNextNumber = () => {
    if (availableNumbers.length === 0) return;

    const nextNumber = availableNumbers[0];
    setCurrentNumber(nextNumber);
    setCalledNumbers((prev) => [...prev, nextNumber]);
    setAvailableNumbers((prev) => prev.slice(1));

    speakNumber(nextNumber);

    if (availableNumbers.length - 1 === 20 || availableNumbers.length - 1 === 10) {
      audioRef.current?.play();
    }

    if (!gameStarted) setGameStarted(true);
  };

  const resetGame = () => {
    setCalledNumbers([]);
    setCurrentNumber(null);
    setGameStarted(false);
    setAvailableNumbers(generateCalledNumbers());
    audioRef.current?.pause();
    audioRef.current!.currentTime = 0;
  };

  return (
    <div className="min-h-screen bg-background p-4">
     <audio ref={audioRef} src="/musica-suspenso.mp3" preload="auto" />
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">BINGO DIGITAL</h1>
          <p className="text-muted-foreground">Panel de números cantados</p>
        </div>

        <div className="text-center mb-8">
          {currentNumber ? (
            <div className="bg-primary text-primary-foreground rounded-2xl p-8 inline-block shadow-lg">
              <p className="text-lg font-medium mb-2">Número actual</p>
              <div className="text-8xl font-bold">{currentNumber}</div>
            </div>
          ) : (
            <div className="bg-muted text-muted-foreground rounded-2xl p-8 inline-block">
              <p className="text-lg font-medium mb-2">Listo para comenzar</p>
              <div className="text-12xl font-bold">--</div>
            </div>
          )}
        </div>

        {/* Game Controls */}
        <div className="flex justify-center gap-4 mb-8">
          <Button
            onClick={callNextNumber}
            disabled={availableNumbers.length === 0}
            size="lg"
            className="text-lg px-8 py-4"
          >
            {!gameStarted ? "Comenzar Juego" : "Siguiente Número"}
          </Button>
          <Button onClick={resetGame} variant="outline" size="lg" className="text-lg px-8 py-4 bg-transparent">
            Nuevo Juego
          </Button>
        </div>

        <div className="max-w-3xl mx-auto w-full">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-xl">Números Cantados</h3>
              <Badge variant="outline" className="text-lg px-3 py-1">
                {calledNumbers.length} / 75
              </Badge>
            </div>

            <div className="grid grid-cols-11 gap-2">
              {Array.from({ length: 75 }, (_, i) => i + 1).map((number) => {
                const isCalled = calledNumbers.includes(number)
                const isCurrent = number === currentNumber

                return (
                  <div
                    key={number}
                    className={`
                      aspect-square flex items-center justify-center text-lg font-semibold rounded-lg transition-all
                      ${
                        isCurrent
                          ? "bg-primary text-primary-foreground shadow-lg scale-110 ring-2 ring-primary ring-offset-2"
                          : isCalled
                            ? "bg-accent text-accent-foreground"
                            : "bg-muted text-muted-foreground/50"
                      }
                    `}
                  >
                    {number}
                  </div>
                )
              })}
            </div>

            {availableNumbers.length === 0 && (
              <div className="text-center mt-6">
                <Badge className="text-lg px-4 py-2">¡Todos los números han sido cantados!</Badge>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}