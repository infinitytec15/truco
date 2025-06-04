"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import GameBoard from "@/components/game/GameBoard";
import GameStatusPanel from "@/components/game/GameStatusPanel";

export default function GamePage() {
  const { gameId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [gameState, setGameState] = useState({
    players: [
      {
        id: "1",
        name: "Player 1",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=player1",
        cards: [],
        isCurrentTurn: true,
      },
      {
        id: "2",
        name: "Player 2",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=player2",
        cards: [],
        isCurrentTurn: false,
      },
      {
        id: "3",
        name: "Player 3",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=player3",
        cards: [],
        isCurrentTurn: false,
      },
      {
        id: "4",
        name: "Player 4",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=player4",
        cards: [],
        isCurrentTurn: false,
      },
    ],
    currentRound: 1,
    currentStakes: 1, // 1 = normal, 2 = truco, 4 = 6, 8 = 9, 12 = 12
    teamScores: [0, 0], // Team 1 (players 0,2) and Team 2 (players 1,3)
    cardsInPlay: [],
    viraCard: { suit: "hearts", value: "K", isRevealed: true },
    gameStatus: "playing", // playing, waiting, finished
    lastAction: null,
  });

  useEffect(() => {
    // Simulate loading game data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    // Cleanup function
    return () => clearTimeout(timer);
  }, [gameId]);

  // Handle game actions
  const handleGameAction = (action, data) => {
    // This would connect to your game logic/socket.io
    console.log(`Action: ${action}`, data);

    // Example of updating game state based on action
    switch (action) {
      case "playCard":
        // Logic for playing a card
        break;
      case "callTruco":
        // Logic for calling truco
        break;
      case "acceptCall":
        // Logic for accepting a truco/6/9/12 call
        break;
      case "declineCall":
        // Logic for declining a call
        break;
      default:
        break;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-full bg-green-900">
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-white border-t-transparent rounded-full"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="ml-4 text-white text-xl font-bold"
        >
          Carregando jogo...
        </motion.p>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-green-900 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-grow relative"
      >
        <GameBoard
          gameId={gameId as string}
          players={gameState.players.map((p, i) => ({
            id: p.id,
            name: p.name,
            avatar: p.avatar,
            isCurrentPlayer: p.isCurrentTurn,
            team: i % 2 === 0 ? "A" : "B",
            position:
              i === 0 ? "bottom" : i === 1 ? "left" : i === 2 ? "top" : "right",
          }))}
          currentTurn={gameState.players.find((p) => p.isCurrentTurn)?.id || ""}
          roundNumber={gameState.currentRound}
          trucoLevel={gameState.currentStakes as 1 | 3 | 6 | 9 | 12}
          onPlayCard={(cardId) => handleGameAction("playCard", { cardId })}
          onCallTruco={(level) => handleGameAction("callTruco", { level })}
          onRespondToTruco={(accept) =>
            handleGameAction(accept ? "acceptCall" : "declineCall", {})
          }
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full md:w-80 lg:w-96 border-l border-green-700"
      >
        <GameStatusPanel gameState={gameState} gameId={gameId} />
      </motion.div>
    </div>
  );
}
