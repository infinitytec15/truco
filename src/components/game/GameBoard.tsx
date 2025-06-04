"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "./Card";
import { PlayerAvatar } from "./PlayerAvatar";
import { TrucoEffects } from "./TrucoEffects";
import GameControls from "./GameControls";
import { Player } from "@/types/game";

interface GameBoardProps {
  gameId?: string;
  players?: Array<{
    id: string;
    name: string;
    avatar: string;
    isCurrentPlayer: boolean;
    team: "A" | "B";
    position: "top" | "right" | "bottom" | "left";
  }>;
  cardsInPlay?: Array<{
    id: string;
    suit: string;
    value: string;
    playerId: string;
    position: "top" | "right" | "bottom" | "left";
  }>;
  currentTurn?: string;
  roundNumber?: number;
  trucoLevel?: 1 | 3 | 6 | 9 | 12;
  vira?: {
    suit: string;
    value: string;
  };
  onPlayCard?: (cardId: string) => void;
  onCallTruco?: (level: 3 | 6 | 9 | 12) => void;
  onRespondToTruco?: (accept: boolean) => void;
}

export function GameBoard({
  gameId = "demo-game",
  players = [
    {
      id: "p1",
      name: "You",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=player1",
      isCurrentPlayer: true,
      team: "A",
      position: "bottom",
    },
    {
      id: "p2",
      name: "Player 2",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=player2",
      isCurrentPlayer: false,
      team: "B",
      position: "left",
    },
    {
      id: "p3",
      name: "Player 3",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=player3",
      isCurrentPlayer: false,
      team: "A",
      position: "top",
    },
    {
      id: "p4",
      name: "Player 4",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=player4",
      isCurrentPlayer: false,
      team: "B",
      position: "right",
    },
  ],
  cardsInPlay = [],
  currentTurn = "p1",
  roundNumber = 1,
  trucoLevel = 1,
  vira = { suit: "hearts", value: "Q" },
  onPlayCard = () => {},
  onCallTruco = () => {},
  onRespondToTruco = () => {},
}: GameBoardProps) {
  const [showTrucoEffect, setShowTrucoEffect] = useState<boolean>(false);
  const [effectType, setEffectType] = useState<
    "truco" | "6" | "9" | "12" | null
  >(null);
  const [playerHand, setPlayerHand] = useState<
    Array<{ id: string; suit: string; value: string }>
  >([]);

  // Mock player hand for demonstration
  useEffect(() => {
    setPlayerHand([
      { id: "card1", suit: "hearts", value: "A" },
      { id: "card2", suit: "spades", value: "2" },
      { id: "card3", suit: "clubs", value: "7" },
    ]);
  }, []);

  // Simulate truco effect for demonstration
  const triggerTrucoEffect = (type: "truco" | "6" | "9" | "12") => {
    setEffectType(type);
    setShowTrucoEffect(true);
    setTimeout(() => setShowTrucoEffect(false), 2000);
  };

  const handlePlayCard = (cardId: string) => {
    onPlayCard(cardId);
    setPlayerHand(playerHand.filter((card) => card.id !== cardId));
  };

  return (
    <div className="relative w-full h-full bg-green-800 rounded-xl overflow-hidden shadow-2xl">
      {/* Game table with felt texture */}
      <div className="absolute inset-0 bg-green-800 bg-opacity-90">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1585314062604-1a357de8b000?w=800&q=80')] bg-cover opacity-20"></div>
      </div>

      {/* Vira card (turned card) */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
          <Card
            suit={vira.suit}
            value={vira.value}
            isFaceUp={true}
            isVira={true}
          />
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-xs">
            Vira
          </div>
        </div>
      </div>

      {/* Round and truco level indicator */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-60 text-white px-4 py-2 rounded-lg flex items-center space-x-4">
        <div>
          <span className="text-xs opacity-70">Round</span>
          <div className="text-xl font-bold">{roundNumber}</div>
        </div>
        <div>
          <span className="text-xs opacity-70">Stakes</span>
          <div className="text-xl font-bold">
            {trucoLevel} {trucoLevel > 1 && "points"}
          </div>
        </div>
      </div>

      {/* Players around the table */}
      <div className="absolute inset-0">
        {players.map((player) => {
          // Position players around the table
          const positionClasses = {
            top: "top-2 left-1/2 transform -translate-x-1/2",
            right: "right-2 top-1/2 transform -translate-y-1/2",
            bottom: "bottom-2 left-1/2 transform -translate-x-1/2",
            left: "left-2 top-1/2 transform -translate-y-1/2",
          }[player.position];

          // Create a player object that matches the PlayerAvatar props
          const playerObj: Player = {
            id: player.id,
            name: player.name,
            avatar: player.avatar,
            cards: [],
            score: 0,
            isReady: true,
            expression: "neutral",
          };

          return (
            <div key={player.id} className={`absolute ${positionClasses}`}>
              <PlayerAvatar
                player={playerObj}
                isCurrentTurn={currentTurn === player.id}
                isCurrentPlayer={player.isCurrentPlayer}
              />
            </div>
          );
        })}
      </div>

      {/* Cards in play */}
      <div className="absolute inset-0">
        {cardsInPlay.map((card) => {
          // Position cards based on which player played them
          const positionClasses = {
            top: "top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
            right:
              "right-1/4 top-1/2 transform translate-y-1/2 -translate-y-1/2",
            bottom:
              "bottom-1/4 left-1/2 transform -translate-x-1/2 translate-y-1/2",
            left: "left-1/4 top-1/2 transform -translate-y-1/2",
          }[card.position];

          return (
            <motion.div
              key={card.id}
              className={`absolute ${positionClasses}`}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Card suit={card.suit} value={card.value} isFaceUp={true} />
            </motion.div>
          );
        })}
      </div>

      {/* Player's hand */}
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 flex justify-center space-x-2">
        {playerHand.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1, type: "spring" }}
            whileHover={{ y: -20, scale: 1.05 }}
            onClick={() => handlePlayCard(card.id)}
            className="cursor-pointer"
          >
            <Card suit={card.suit} value={card.value} isFaceUp={true} />
          </motion.div>
        ))}
      </div>

      {/* Game controls */}
      <div className="absolute bottom-0 left-0 right-0">
        <GameControls
          isPlayerTurn={currentTurn === "p1"}
          canCallTruco={currentTurn === "p1" && trucoLevel === 1}
          canCallSix={currentTurn === "p1" && trucoLevel === 3}
          canCallNine={currentTurn === "p1" && trucoLevel === 6}
          canCallTwelve={currentTurn === "p1" && trucoLevel === 9}
          onPlayCard={() => {}}
          onCallTruco={() => triggerTrucoEffect("truco")}
          onCallSix={() => triggerTrucoEffect("6")}
          onCallNine={() => triggerTrucoEffect("9")}
          onCallTwelve={() => triggerTrucoEffect("12")}
          onAcceptCall={() => onRespondToTruco(true)}
          onDeclineCall={() => onRespondToTruco(false)}
        />
      </div>

      {/* Truco effects overlay */}
      {showTrucoEffect && effectType && <TrucoEffects type={effectType} />}
    </div>
  );
}

// Export as default for compatibility
export default GameBoard;
