"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send, Smile } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatPanelProps {
  onSendMessage: (message: string) => void;
  onSendEmoji: (emoji: string) => void;
  className?: string;
}

const TRUCO_PHRASES = [
  "Tem coragem?",
  "Fugiu?",
  "Tô com um jogo!",
  "Vai encarar?",
  "Corre que é ladrão!",
  "Essa é minha!",
  "Vamo que vamo!",
  "Tá com medo?",
  "Desce mais uma!",
  "Segura essa!",
];

const EMOJIS = ["😂", "😡", "😱", "🤫", "🤔", "👏", "🔥", "💪", "😎", "🤯"];

export function ChatPanel({
  onSendMessage,
  onSendEmoji,
  className,
}: ChatPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [showEmojis, setShowEmojis] = useState(false);
  const [showPhrases, setShowPhrases] = useState(false);

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handlePhraseClick = (phrase: string) => {
    onSendMessage(phrase);
    setShowPhrases(false);
  };

  const handleEmojiClick = (emoji: string) => {
    onSendEmoji(emoji);
    setShowEmojis(false);
  };

  return (
    <div className={cn("relative", className)}>
      {/* Chat Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-12 h-12 shadow-lg"
        size="sm"
      >
        <MessageCircle size={20} />
      </Button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-16 right-0 w-80 bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-blue-600 text-white p-3 flex items-center justify-between">
              <span className="font-bold">Chat do Truco</span>
              <Button
                onClick={() => setIsOpen(false)}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-blue-700 h-6 w-6 p-0"
              >
                ×
              </Button>
            </div>

            {/* Quick Actions */}
            <div className="p-3 border-b border-gray-200">
              <div className="flex gap-2 mb-2">
                <Button
                  onClick={() => setShowPhrases(!showPhrases)}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                >
                  💬 Frases
                </Button>
                <Button
                  onClick={() => setShowEmojis(!showEmojis)}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                >
                  <Smile size={14} />
                </Button>
              </div>

              {/* Truco Phrases */}
              <AnimatePresence>
                {showPhrases && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="grid grid-cols-2 gap-1 mb-2"
                  >
                    {TRUCO_PHRASES.map((phrase, index) => (
                      <Button
                        key={index}
                        onClick={() => handlePhraseClick(phrase)}
                        variant="ghost"
                        size="sm"
                        className="text-xs h-8 justify-start p-2 hover:bg-blue-50"
                      >
                        {phrase}
                      </Button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Emojis */}
              <AnimatePresence>
                {showEmojis && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="flex flex-wrap gap-1 mb-2"
                  >
                    {EMOJIS.map((emoji, index) => (
                      <Button
                        key={index}
                        onClick={() => handleEmojiClick(emoji)}
                        variant="ghost"
                        size="sm"
                        className="text-lg h-8 w-8 p-0 hover:bg-blue-50"
                      >
                        {emoji}
                      </Button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Message Input */}
            <div className="p-3">
              <div className="flex gap-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 text-sm"
                  maxLength={100}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Send size={14} />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
