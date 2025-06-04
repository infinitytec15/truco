"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Plus, LogIn, Gamepad2 } from "lucide-react";

export default function GameHomePage() {
  const router = useRouter();
  const [playerName, setPlayerName] = useState("");
  const [gameCode, setGameCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load player name from localStorage
    const savedName = localStorage.getItem("trucoPlayerName");
    if (savedName) {
      setPlayerName(savedName);
    }
  }, []);

  const generateGameCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const handleCreateGame = async () => {
    if (!playerName.trim()) {
      alert("Por favor, digite seu nome!");
      return;
    }

    setIsLoading(true);

    // Save player name
    localStorage.setItem("trucoPlayerName", playerName.trim());

    // Generate game code and redirect
    const newGameCode = generateGameCode();

    // Simulate API call delay
    setTimeout(() => {
      router.push(
        `/game/${newGameCode}?host=true&name=${encodeURIComponent(playerName.trim())}`,
      );
    }, 1000);
  };

  const handleJoinGame = async () => {
    if (!playerName.trim()) {
      alert("Por favor, digite seu nome!");
      return;
    }

    if (!gameCode.trim()) {
      alert("Por favor, digite o código da sala!");
      return;
    }

    setIsLoading(true);

    // Save player name
    localStorage.setItem("trucoPlayerName", playerName.trim());

    // Simulate API call delay
    setTimeout(() => {
      router.push(
        `/game/${gameCode.toUpperCase()}?name=${encodeURIComponent(playerName.trim())}`,
      );
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-800 via-green-700 to-green-900 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.1%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
      </div>

      <div className="relative z-10 w-full max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <motion.h1
            className="text-8xl font-black text-white mb-4 drop-shadow-2xl"
            animate={{
              textShadow: [
                "0 0 20px rgba(255,255,255,0.5)",
                "0 0 40px rgba(255,255,255,0.3)",
                "0 0 20px rgba(255,255,255,0.5)",
              ],
            }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            🃏 TRUCO PAULISTA 🃏
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-2xl text-green-100 font-semibold"
          >
            O autêntico jogo brasileiro online!
          </motion.p>
        </motion.div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Player Setup */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
                  <Gamepad2 className="w-8 h-8 text-green-600" />
                  Configuração do Jogador
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Seu Nome no Jogo
                  </label>
                  <Input
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    placeholder="Digite seu nome..."
                    className="text-lg font-semibold text-center"
                    maxLength={20}
                  />
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-bold text-blue-800 mb-2">
                    🎯 Como Jogar
                  </h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Crie uma sala ou entre com um código</li>
                    <li>• Aguarde outros jogadores (2-4 total)</li>
                    <li>• Jogue suas cartas estrategicamente</li>
                    <li>• Use "Truco!" para aumentar a aposta</li>
                    <li>• Primeiro a 12 pontos vence!</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Game Actions */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="space-y-6"
          >
            {/* Create Game */}
            <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0">
              <CardHeader className="text-center">
                <CardTitle className="text-xl font-bold text-gray-800 flex items-center justify-center gap-2">
                  <Plus className="w-6 h-6 text-green-600" />
                  Criar Nova Sala
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={handleCreateGame}
                  disabled={isLoading || !playerName.trim()}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 text-lg shadow-lg"
                  size="lg"
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1 }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                    />
                  ) : (
                    <Plus className="w-5 h-5 mr-2" />
                  )}
                  {isLoading ? "Criando Sala..." : "Criar Sala"}
                </Button>
                <p className="text-sm text-gray-600 text-center mt-2">
                  Você será o host da partida
                </p>
              </CardContent>
            </Card>

            {/* Join Game */}
            <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0">
              <CardHeader className="text-center">
                <CardTitle className="text-xl font-bold text-gray-800 flex items-center justify-center gap-2">
                  <LogIn className="w-6 h-6 text-blue-600" />
                  Entrar em Sala
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Código da Sala
                  </label>
                  <Input
                    value={gameCode}
                    onChange={(e) => setGameCode(e.target.value.toUpperCase())}
                    placeholder="Digite o código..."
                    className="text-lg font-mono text-center tracking-wider"
                    maxLength={6}
                  />
                </div>
                <Button
                  onClick={handleJoinGame}
                  disabled={isLoading || !playerName.trim() || !gameCode.trim()}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 text-lg shadow-lg"
                  size="lg"
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1 }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                    />
                  ) : (
                    <LogIn className="w-5 h-5 mr-2" />
                  )}
                  {isLoading ? "Entrando..." : "Entrar na Sala"}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <Card className="bg-white/90 backdrop-blur-sm shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-center gap-8 text-gray-600">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span className="font-semibold">Multiplayer Online</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🇧🇷</span>
                  <span className="font-semibold">100% Brasileiro</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🎮</span>
                  <span className="font-semibold">Gratuito</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
