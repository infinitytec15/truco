"use client";

import { Card as CardType } from "@/types/game";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { getCardSymbol } from "@/lib/truco-rules";

interface CardProps {
  card: CardType;
  isPlayable?: boolean;
  onClick?: () => void;
  className?: string;
  suit?: string;
  value?: string;
  isFaceUp?: boolean;
  isVira?: boolean;
}

export function Card({
  card,
  isPlayable = false,
  onClick,
  className,
  suit,
  value,
  isFaceUp,
  isVira,
}: CardProps) {
  // Return a placeholder if card is undefined and no suit/value provided
  if (!card && (!suit || !value)) {
    return (
      <div className="w-16 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
        <span className="text-gray-400">?</span>
      </div>
    );
  }

  // If we have suit/value but no card object, create a temporary one
  const cardData = card || {
    suit: suit as "hearts" | "diamonds" | "clubs" | "spades",
    value:
      value === "A"
        ? 1
        : value === "J"
          ? 11
          : value === "Q"
            ? 12
            : value === "K"
              ? 13
              : parseInt(value || "0"),
    trucoValue: 0,
    isManilha: isVira || false,
  };

  const getCardDisplay = () => {
    const displayValue =
      cardData.value === 1
        ? "A"
        : cardData.value === 11
          ? "J"
          : cardData.value === 12
            ? "Q"
            : cardData.value === 13
              ? "K"
              : cardData.value.toString();
    return displayValue;
  };

  const isRed = cardData.suit === "hearts" || cardData.suit === "diamonds";
  const symbol = getCardSymbol(cardData.suit);

  return (
    <motion.div
      className={cn(
        "relative w-16 h-24 bg-white rounded-lg shadow-lg border-2 border-gray-300 cursor-pointer select-none",
        "flex flex-col items-center justify-between p-1",
        isPlayable && "hover:shadow-xl transition-shadow",
        cardData.isManilha && "ring-2 ring-yellow-400 ring-opacity-50",
        className,
      )}
      onClick={isPlayable ? onClick : undefined}
      whileHover={isPlayable ? { scale: 1.05, y: -5 } : {}}
      whileTap={isPlayable ? { scale: 0.95 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Top Left Corner */}
      <div
        className={cn(
          "text-xs font-bold flex flex-col items-center",
          isRed ? "text-red-600" : "text-black",
        )}
      >
        <span>{getCardDisplay()}</span>
        <span className="text-lg leading-none">{symbol}</span>
      </div>

      {/* Center Symbol */}
      <div className={cn("text-2xl", isRed ? "text-red-600" : "text-black")}>
        {symbol}
      </div>

      {/* Bottom Right Corner (Rotated) */}
      <div
        className={cn(
          "text-xs font-bold flex flex-col items-center transform rotate-180",
          isRed ? "text-red-600" : "text-black",
        )}
      >
        <span>{getCardDisplay()}</span>
        <span className="text-lg leading-none">{symbol}</span>
      </div>

      {/* Manilha Indicator */}
      {cardData.isManilha && (
        <motion.div
          className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <span className="text-xs font-bold text-yellow-900">M</span>
        </motion.div>
      )}
    </motion.div>
  );
}
