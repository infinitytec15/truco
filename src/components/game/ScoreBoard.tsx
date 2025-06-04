"use client";

import { GameState } from "@/types/game";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ScoreBoardProps {
  gameState: GameState;
  className?: string;
}

export function ScoreBoard({ gameState, className }: ScoreBoardProps) {
  // Return a placeholder if gameState is undefined
  if (!gameState) {
    return (
      <Card
        className={cn("w-64 bg-white/90 backdrop-blur-sm shadow-lg", className)}
      >
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-bold text-center text-gray-800">
            Placar do Truco
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-gray-500">Carregando...</div>
        </CardContent>
      </Card>
    );
  }

  const getTrucoLevelText = () => {
    switch (gameState.trucoLevel) {
      case 1:
        return "Normal";
      case 3:
        return "Truco";
      case 6:
        return "Seis";
      case 9:
        return "Nove";
      case 12:
        return "Doze";
      default:
        return "Normal";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 10) return "text-red-600 font-bold";
    if (score >= 8) return "text-orange-600 font-semibold";
    return "text-green-600";
  };

  return (
    <Card
      className={cn("w-64 bg-white/90 backdrop-blur-sm shadow-lg", className)}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold text-center text-gray-800">
          Placar do Truco
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Current Truco Level */}
        <div className="text-center">
          <Badge
            variant={gameState.trucoLevel > 1 ? "destructive" : "secondary"}
            className="text-sm font-bold"
          >
            {getTrucoLevelText()} ({gameState.trucoLevel} pt
            {gameState.trucoLevel !== 1 ? "s" : ""})
          </Badge>
        </div>

        {/* Players Scores */}
        <div className="space-y-2">
          {gameState.players.map((player, index) => {
            const isCurrentTurn =
              typeof gameState.currentPlayer === "number"
                ? gameState.currentPlayer === index
                : gameState.currentPlayer === player.id;

            return (
              <motion.div
                key={player.id}
                className={cn(
                  "flex items-center justify-between p-2 rounded-lg",
                  isCurrentTurn
                    ? "bg-blue-100 border-2 border-blue-300"
                    : "bg-gray-50",
                )}
                animate={
                  isCurrentTurn
                    ? {
                        scale: [1, 1.02, 1],
                      }
                    : {}
                }
                transition={{
                  repeat: isCurrentTurn ? Infinity : 0,
                  duration: 2,
                }}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      "w-3 h-3 rounded-full",
                      isCurrentTurn ? "bg-blue-500" : "bg-gray-300",
                    )}
                  />
                  <span className="font-medium text-gray-800">
                    {player.name}
                  </span>
                </div>
                <div
                  className={cn(
                    "text-xl font-bold",
                    getScoreColor(player.score),
                  )}
                >
                  {player.score}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Round Info */}
        <div className="text-center text-sm text-gray-600 border-t pt-2">
          <div>Rodada {gameState.round}</div>
          <div className="text-xs text-gray-500 mt-1">
            Primeiro a chegar em 12 pontos vence!
          </div>
        </div>

        {/* Game Status */}
        {gameState.gamePhase === "truco" && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-center p-2 bg-red-100 rounded-lg border border-red-300"
          >
            <div className="text-red-700 font-bold text-sm">
              🔥 TRUCO PEDIDO! 🔥
            </div>
            <div className="text-red-600 text-xs">Aguardando resposta...</div>
          </motion.div>
        )}

        {gameState.winner && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-center p-3 bg-green-100 rounded-lg border border-green-300"
          >
            <div className="text-green-700 font-bold">🏆 VITÓRIA! 🏆</div>
            <div className="text-green-600 text-sm">
              {gameState.players.find((p) => p.id === gameState.winner)?.name}{" "}
              venceu!
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
