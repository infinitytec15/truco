"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Smile, Volume2, VolumeX, MessageSquare } from "lucide-react";

interface GameControlsProps {
  isPlayerTurn?: boolean;
  canCallTruco?: boolean;
  canCallSix?: boolean;
  canCallNine?: boolean;
  canCallTwelve?: boolean;
  onPlayCard?: (cardId: string) => void;
  onCallTruco?: () => void;
  onCallSix?: () => void;
  onCallNine?: () => void;
  onCallTwelve?: () => void;
  onAcceptCall?: () => void;
  onDeclineCall?: () => void;
  onToggleSound?: () => void;
  onToggleChat?: () => void;
  onSendEmoji?: (emoji: string) => void;
  isSoundOn?: boolean;
  currentCall?: "none" | "truco" | "six" | "nine" | "twelve";
  waitingForResponse?: boolean;
}

const GameControls: React.FC<GameControlsProps> = ({
  isPlayerTurn = true,
  canCallTruco = true,
  canCallSix = false,
  canCallNine = false,
  canCallTwelve = false,
  onPlayCard = () => {},
  onCallTruco = () => {},
  onCallSix = () => {},
  onCallNine = () => {},
  onCallTwelve = () => {},
  onAcceptCall = () => {},
  onDeclineCall = () => {},
  onToggleSound = () => {},
  onToggleChat = () => {},
  onSendEmoji = () => {},
  isSoundOn = true,
  currentCall = "none",
  waitingForResponse = false,
}) => {
  const [showEmojiMenu, setShowEmojiMenu] = useState(false);

  const emojis = [
    "😀",
    "😂",
    "😎",
    "😍",
    "🤔",
    "😱",
    "😡",
    "🤫",
    "👍",
    "👎",
    "🃏",
    "🎮",
  ];

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
    disabled: { opacity: 0.5 },
  };

  const callButtonVariants = {
    hover: {
      scale: 1.1,
      rotate: [-1, 1, -1, 0],
      transition: { duration: 0.3 },
    },
    tap: { scale: 0.9 },
    disabled: { opacity: 0.5 },
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 bg-green-900/80 rounded-lg shadow-lg border border-yellow-600/50 flex flex-wrap justify-between items-center gap-2">
      <div className="flex flex-wrap gap-2">
        {/* Call buttons */}
        {isPlayerTurn && (
          <div className="flex flex-wrap gap-2">
            {canCallTruco && (
              <motion.div
                variants={callButtonVariants}
                whileHover="hover"
                whileTap="tap"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Button
                  variant="destructive"
                  size="lg"
                  onClick={onCallTruco}
                  className="font-bold text-lg shadow-md"
                >
                  TRUCO!
                </Button>
              </motion.div>
            )}

            {canCallSix && (
              <motion.div
                variants={callButtonVariants}
                whileHover="hover"
                whileTap="tap"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Button
                  variant="destructive"
                  size="lg"
                  onClick={onCallSix}
                  className="font-bold text-lg shadow-md"
                >
                  SEIS!
                </Button>
              </motion.div>
            )}

            {canCallNine && (
              <motion.div
                variants={callButtonVariants}
                whileHover="hover"
                whileTap="tap"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Button
                  variant="destructive"
                  size="lg"
                  onClick={onCallNine}
                  className="font-bold text-lg shadow-md"
                >
                  NOVE!
                </Button>
              </motion.div>
            )}

            {canCallTwelve && (
              <motion.div
                variants={callButtonVariants}
                whileHover="hover"
                whileTap="tap"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Button
                  variant="destructive"
                  size="lg"
                  onClick={onCallTwelve}
                  className="font-bold text-lg shadow-md"
                >
                  DOZE!
                </Button>
              </motion.div>
            )}
          </div>
        )}

        {/* Response to calls */}
        {waitingForResponse && currentCall !== "none" && (
          <AlertDialog defaultOpen>
            <AlertDialogContent className="bg-green-800 border-2 border-yellow-500">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-yellow-400 text-2xl">
                  {currentCall === "truco" && "TRUCO!"}
                  {currentCall === "six" && "SEIS!"}
                  {currentCall === "nine" && "NOVE!"}
                  {currentCall === "twelve" && "DOZE!"}
                </AlertDialogTitle>
                <AlertDialogDescription className="text-white text-lg">
                  O adversário está chamando {currentCall}. Aceita o desafio?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="flex gap-4">
                <motion.div
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <AlertDialogCancel
                    onClick={onDeclineCall}
                    className="bg-red-600 text-white hover:bg-red-700"
                  >
                    Correr
                  </AlertDialogCancel>
                </motion.div>
                <motion.div
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <AlertDialogAction
                    onClick={onAcceptCall}
                    className="bg-green-600 text-white hover:bg-green-700"
                  >
                    Aceitar
                  </AlertDialogAction>
                </motion.div>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>

      {/* Utility buttons */}
      <div className="flex gap-2">
        {/* Emoji menu */}
        <Popover open={showEmojiMenu} onOpenChange={setShowEmojiMenu}>
          <PopoverTrigger asChild>
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Button
                variant="outline"
                size="icon"
                className="bg-yellow-600/80 text-white hover:bg-yellow-500"
              >
                <Smile className="h-5 w-5" />
              </Button>
            </motion.div>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-2 bg-green-800 border border-yellow-500">
            <div className="grid grid-cols-4 gap-2">
              {emojis.map((emoji, index) => (
                <motion.button
                  key={index}
                  className="text-2xl p-2 hover:bg-green-700 rounded-md"
                  onClick={() => {
                    onSendEmoji(emoji);
                    setShowEmojiMenu(false);
                  }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {emoji}
                </motion.button>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        {/* Chat toggle */}
        <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
          <Button
            variant="outline"
            size="icon"
            onClick={onToggleChat}
            className="bg-blue-600/80 text-white hover:bg-blue-500"
          >
            <MessageSquare className="h-5 w-5" />
          </Button>
        </motion.div>

        {/* Sound toggle */}
        <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
          <Button
            variant="outline"
            size="icon"
            onClick={onToggleSound}
            className="bg-purple-600/80 text-white hover:bg-purple-500"
          >
            {isSoundOn ? (
              <Volume2 className="h-5 w-5" />
            ) : (
              <VolumeX className="h-5 w-5" />
            )}
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default GameControls;
