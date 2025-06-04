"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, MessageSquare, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ScoreBoard } from "./ScoreBoard";
import { ChatPanel } from "./ChatPanel";

interface GameStatusPanelProps {
  score?: {
    team1: number;
    team2: number;
  };
  round?: number;
  stakes?: number;
  history?: Array<{
    round: number;
    winner: string;
    points: number;
  }>;
  isMobile?: boolean;
}

export default function GameStatusPanel({
  score = { team1: 0, team2: 0 },
  round = 1,
  stakes = 1,
  history = [
    { round: 1, winner: "Team 1", points: 1 },
    { round: 2, winner: "Team 2", points: 1 },
    { round: 3, winner: "Team 1", points: 3 },
  ],
  isMobile = false,
}: GameStatusPanelProps) {
  const [chatOpen, setChatOpen] = useState(false);
  const [panelCollapsed, setPanelCollapsed] = useState(isMobile);

  const stakesLabel = () => {
    switch (stakes) {
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

  const stakesColor = () => {
    switch (stakes) {
      case 1:
        return "bg-slate-500";
      case 3:
        return "bg-blue-500";
      case 6:
        return "bg-yellow-500";
      case 9:
        return "bg-orange-500";
      case 12:
        return "bg-red-500";
      default:
        return "bg-slate-500";
    }
  };

  return (
    <motion.div
      className={`bg-card text-card-foreground ${isMobile ? "w-full" : "w-[300px]"} h-full flex flex-col shadow-lg`}
      initial={{ opacity: 0, x: isMobile ? 0 : 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      {isMobile ? (
        <motion.div
          className="w-full p-2 flex justify-center items-center cursor-pointer bg-primary/10"
          onClick={() => setPanelCollapsed(!panelCollapsed)}
        >
          {panelCollapsed ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
          <span className="ml-2 font-medium">
            {panelCollapsed ? "Show Game Status" : "Hide Game Status"}
          </span>
        </motion.div>
      ) : null}

      <AnimatePresence>
        {!panelCollapsed && (
          <motion.div
            className="flex-1 flex flex-col overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-4 flex-1 overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Game Status</h2>
                <Badge
                  variant="outline"
                  className={`${stakesColor()} text-white`}
                >
                  {stakesLabel()}
                </Badge>
              </div>

              <Card className="mb-4 overflow-hidden">
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">Score</h3>
                  <ScoreBoard
                    team1Score={score.team1}
                    team2Score={score.team2}
                  />
                </div>
              </Card>

              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Current Round</h3>
                <div className="flex items-center justify-center bg-muted rounded-md p-3">
                  <span className="text-2xl font-bold">{round}</span>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Game History</h3>
                <div className="bg-muted rounded-md p-3 max-h-[200px] overflow-y-auto">
                  {history.map((entry, index) => (
                    <div
                      key={index}
                      className={`mb-2 p-2 rounded-md ${index % 2 === 0 ? "bg-background" : "bg-muted"}`}
                    >
                      <div className="flex justify-between">
                        <span>Round {entry.round}</span>
                        <span className="font-medium">{entry.winner}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        +{entry.points} points
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 border-t">
              <Button
                variant="outline"
                className="w-full flex items-center justify-center"
                onClick={() => setChatOpen(!chatOpen)}
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                {chatOpen ? "Close Chat" : "Open Chat"}
              </Button>
            </div>

            <AnimatePresence>
              {chatOpen && (
                <motion.div
                  className="border-t"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "300px", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative h-full">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-2 h-6 w-6 p-0 rounded-full"
                      onClick={() => setChatOpen(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <ChatPanel />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
