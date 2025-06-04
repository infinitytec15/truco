"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Users, Trophy, Zap } from "lucide-react";

export default function HomePage() {
  const router = useRouter();

  const handlePlayNow = () => {
    router.push("/game");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-800 via-green-700 to-green-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.1%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
      </div>

      {/* Floating Cards Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-6xl opacity-20"
            initial={{
              x: Math.random() * 1000, // Use a default width instead of window.innerWidth
              y: 1000, // Use a default height instead of window.innerHeight
              rotate: Math.random() * 360,
            }}
            animate={{
              y: -100,
              rotate: Math.random() * 360 + 360,
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          >
            {["🃏", "♠️", "♥️", "♦️", "♣️"][Math.floor(Math.random() * 5)]}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="text-center max-w-4xl">
          {/* Main Title */}
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-8"
          >
            <motion.h1
              className="text-9xl font-black text-white mb-6 drop-shadow-2xl"
              animate={{
                textShadow: [
                  "0 0 30px rgba(255,255,255,0.5)",
                  "0 0 60px rgba(255,255,255,0.3)",
                  "0 0 30px rgba(255,255,255,0.5)",
                ],
              }}
              transition={{ repeat: Infinity, duration: 4 }}
            >
              🃏 TRUCO PAULISTA 🃏
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-3xl text-green-100 font-bold mb-4"
            >
              O Autêntico Jogo Brasileiro Online!
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-xl text-green-200"
            >
              Desafie seus amigos no melhor Truco multiplayer da internet
            </motion.p>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="grid md:grid-cols-3 gap-6 mb-12"
          >
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardContent className="p-6 text-center">
                <Users className="w-12 h-12 mx-auto mb-4 text-blue-300" />
                <h3 className="text-xl font-bold mb-2">Multiplayer Online</h3>
                <p className="text-green-100">
                  Jogue com até 4 amigos em tempo real
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardContent className="p-6 text-center">
                <Zap className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
                <h3 className="text-xl font-bold mb-2">Efeitos Incríveis</h3>
                <p className="text-green-100">
                  Animações e sons que deixam o jogo épico
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardContent className="p-6 text-center">
                <Trophy className="w-12 h-12 mx-auto mb-4 text-amber-300" />
                <h3 className="text-xl font-bold mb-2">Regras Oficiais</h3>
                <p className="text-green-100">
                  Truco Paulista autêntico e tradicional
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
          >
            <Button
              onClick={handlePlayNow}
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white font-black text-2xl px-12 py-6 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-200"
            >
              <Play className="w-8 h-8 mr-4" />
              JOGAR AGORA!
            </Button>
          </motion.div>

          {/* Brazilian Flair */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-8 text-green-100"
          >
            <p className="text-lg font-semibold">
              🇧🇷 Feito com muito amor pelo Brasil 🇧🇷
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
