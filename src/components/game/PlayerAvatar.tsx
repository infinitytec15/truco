"use client";

import { Player } from "@/types/game";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface PlayerAvatarProps {
  player: Player;
  isCurrentTurn: boolean;
  isCurrentPlayer: boolean;
}

export function PlayerAvatar({
  player,
  isCurrentTurn,
  isCurrentPlayer,
}: PlayerAvatarProps) {
  // Return null if player is undefined to prevent errors
  if (!player) {
    return null;
  }

  const getExpressionEmoji = () => {
    switch (player.expression) {
      case "happy":
        return "😄";
      case "angry":
        return "😠";
      case "bluffing":
        return "😏";
      case "surprised":
        return "😲";
      default:
        return "😐";
    }
  };

  const getAvatarUrl = () => {
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${player.id}&backgroundColor=b6e3f4,c0aede,d1d4f9`;
  };

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Player Name and Score */}
      <div className="text-center">
        <Badge
          variant={isCurrentPlayer ? "default" : "secondary"}
          className={cn(
            "text-xs font-bold",
            isCurrentPlayer && "bg-blue-600 text-white",
          )}
        >
          {player.name}
        </Badge>
        <div className="text-white text-sm font-bold mt-1">
          {player.score} pts
        </div>
      </div>

      {/* Avatar with Turn Indicator */}
      <motion.div
        className="relative"
        animate={
          isCurrentTurn
            ? {
                scale: [1, 1.1, 1],
                boxShadow: [
                  "0 0 0 0 rgba(59, 130, 246, 0.7)",
                  "0 0 0 10px rgba(59, 130, 246, 0)",
                  "0 0 0 0 rgba(59, 130, 246, 0)",
                ],
              }
            : {}
        }
        transition={{ repeat: isCurrentTurn ? Infinity : 0, duration: 2 }}
      >
        <Avatar
          className={cn(
            "w-16 h-16 border-4",
            isCurrentTurn ? "border-blue-400" : "border-white",
            isCurrentPlayer && "ring-2 ring-yellow-400",
          )}
        >
          <AvatarImage src={getAvatarUrl()} alt={player.name} />
          <AvatarFallback className="bg-blue-500 text-white font-bold">
            {player.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        {/* Expression Overlay */}
        <AnimatePresence>
          {player.expression !== "neutral" && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute -top-2 -right-2 text-2xl bg-white rounded-full p-1 shadow-lg"
            >
              {getExpressionEmoji()}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Ready Indicator */}
        {player.isReady && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2"
          >
            <Badge className="bg-green-500 text-white text-xs">✓ Pronto</Badge>
          </motion.div>
        )}
      </motion.div>

      {/* Card Count */}
      <div className="text-white text-xs bg-black/50 px-2 py-1 rounded">
        {player.cards.length} cartas
      </div>
    </div>
  );
}
