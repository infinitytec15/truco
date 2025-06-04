"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, Users, Play, Settings } from "lucide-react";
import { Player } from "@/types/game";
import { PlayerAvatar } from "./PlayerAvatar";

interface GameLobbyProps {
  gameId: string;
  players: Player[];
  isHost: boolean;
  onStartGame: () => void;
  onLeaveGame: () => void;
  maxPlayers?: number;
}

export function GameLobby({
  gameId,
  players,
  isHost,
  onStartGame,
  onLeaveGame,
  maxPlayers = 4,
}: GameLobbyProps) {
  const [copied, setCopied] = useState(false);
  const [playerName, setPlayerName] = useState("");

  const gameUrl = `${window.location.origin}/game/${gameId}`;
  const canStart = players.length >= 2 && players.every((p) => p.isReady);

  const copyGameLink = async () => {
    try {
      await navigator.clipboard.writeText(gameUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-800 via-green-700 to-green-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <h1 className="text-6xl font-black text-white mb-4 drop-shadow-lg">
            🃏 TRUCO PAULISTA 🃏
          </h1>
          <p className="text-xl text-green-100">
            Sala de Espera - Aguardando jogadores...
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Game Info */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-white/95 backdrop-blur-sm shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Informações da Sala
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Game ID */}
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Código da Sala
                  </label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      value={gameId}
                      readOnly
                      className="font-mono text-lg font-bold text-center"
                    />
                    <Button
                      onClick={copyGameLink}
                      variant="outline"
                      size="sm"
                      className={copied ? "bg-green-100 text-green-700" : ""}
                    >
                      <Copy className="w-4 h-4" />
                      {copied ? "Copiado!" : "Copiar"}
                    </Button>
                  </div>
                </div>

                {/* Game Link */}
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Link para Compartilhar
                  </label>
                  <div className="mt-1 p-2 bg-gray-100 rounded text-xs font-mono break-all">
                    {gameUrl}
                  </div>
                </div>

                {/* Game Rules */}
                <div className="bg-blue-50 p-3 rounded-lg">
                  <h4 className="font-bold text-blue-800 mb-2">
                    📋 Regras do Jogo
                  </h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• 2 a 4 jogadores</li>
                    <li>• Primeiro a 12 pontos vence</li>
                    <li>• Manilhas dinâmicas</li>
                    <li>• Truco, 6, 9 e 12 pontos</li>
                    <li>• Melhor de 3 rodadas</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Players */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-white/95 backdrop-blur-sm shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Jogadores
                  </div>
                  <Badge variant="secondary">
                    {players.length}/{maxPlayers}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {Array.from({ length: maxPlayers }).map((_, index) => {
                    const player = players[index];
                    return (
                      <motion.div
                        key={index}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.1 * index }}
                        className={`
                          p-4 rounded-lg border-2 border-dashed 
                          ${
                            player
                              ? "border-green-300 bg-green-50"
                              : "border-gray-300 bg-gray-50"
                          }
                        `}
                      >
                        {player ? (
                          <div className="text-center">
                            <PlayerAvatar
                              player={player}
                              isCurrentTurn={false}
                              isCurrentPlayer={false}
                            />
                            <div className="mt-2">
                              <div className="font-bold text-sm">
                                {player.name}
                              </div>
                              {player.isReady ? (
                                <Badge className="bg-green-500 text-white text-xs mt-1">
                                  ✓ Pronto
                                </Badge>
                              ) : (
                                <Badge
                                  variant="outline"
                                  className="text-xs mt-1"
                                >
                                  Aguardando...
                                </Badge>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="text-center text-gray-400">
                            <div className="w-16 h-16 mx-auto mb-2 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center">
                              <Users className="w-6 h-6" />
                            </div>
                            <div className="text-sm">Aguardando jogador...</div>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  {isHost ? (
                    <Button
                      onClick={onStartGame}
                      disabled={!canStart}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3"
                      size="lg"
                    >
                      <Play className="w-5 h-5 mr-2" />
                      {canStart
                        ? "Iniciar Jogo!"
                        : `Aguardando ${players.filter((p) => !p.isReady).length} jogador(es)`}
                    </Button>
                  ) : (
                    <div className="flex-1 text-center py-3 text-gray-600">
                      Aguardando o host iniciar o jogo...
                    </div>
                  )}

                  <Button
                    onClick={onLeaveGame}
                    variant="outline"
                    className="px-6"
                  >
                    Sair
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Instructions */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center"
        >
          <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
            <CardContent className="p-4">
              <p className="text-gray-600">
                💡 <strong>Dica:</strong> Compartilhe o código da sala ou o link
                com seus amigos para eles entrarem na partida!
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
