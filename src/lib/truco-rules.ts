import { Card } from "@/types/game";

// Card values in Truco Paulista (ascending order)
const TRUCO_VALUES = {
  4: 1,
  5: 2,
  6: 3,
  7: 4,
  10: 5,
  11: 6,
  12: 7,
  13: 8,
  1: 9,
  2: 10,
  3: 11,
};

// Manilha order (strongest to weakest)
const MANILHA_ORDER = ["clubs", "hearts", "spades", "diamonds"];

export function createDeck(): Card[] {
  const suits: Card["suit"][] = ["hearts", "diamonds", "clubs", "spades"];
  const values = [1, 2, 3, 4, 5, 6, 7, 10, 11, 12, 13]; // No 8, 9 in Truco

  const deck: Card[] = [];

  for (const suit of suits) {
    for (const value of values) {
      deck.push({
        suit,
        value,
        trucoValue: TRUCO_VALUES[value as keyof typeof TRUCO_VALUES],
        isManilha: false,
      });
    }
  }

  return shuffleDeck(deck);
}

export function shuffleDeck(deck: Card[]): Card[] {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function setManilhas(deck: Card[], vira: Card): Card[] {
  const manilhaValue = vira.value === 13 ? 1 : vira.value + 1;

  return deck.map((card) => ({
    ...card,
    isManilha: card.value === manilhaValue,
    trucoValue:
      card.value === manilhaValue
        ? 12 + MANILHA_ORDER.indexOf(card.suit)
        : TRUCO_VALUES[card.value as keyof typeof TRUCO_VALUES],
  }));
}

export function compareCards(card1: Card, card2: Card): number {
  if (card1.isManilha && !card2.isManilha) return 1;
  if (!card1.isManilha && card2.isManilha) return -1;

  if (card1.trucoValue > card2.trucoValue) return 1;
  if (card1.trucoValue < card2.trucoValue) return -1;

  return 0; // Empate
}

export function getCardName(card: Card): string {
  const valueNames: { [key: number]: string } = {
    1: "Ás",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    10: "10",
    11: "Valete",
    12: "Dama",
    13: "Rei",
  };

  const suitNames = {
    hearts: "Copas",
    diamonds: "Ouros",
    clubs: "Paus",
    spades: "Espadas",
  };

  return `${valueNames[card.value]} de ${suitNames[card.suit]}`;
}

export function getCardSymbol(suit: Card["suit"]): string {
  const symbols = {
    hearts: "♥️",
    diamonds: "♦️",
    clubs: "♣️",
    spades: "♠️",
  };
  return symbols[suit];
}

export function calculateRoundWinner(
  playedCards: { playerId: string; card: Card }[],
): string {
  if (playedCards.length === 0) return "";

  let winner = playedCards[0];

  for (let i = 1; i < playedCards.length; i++) {
    if (compareCards(playedCards[i].card, winner.card) > 0) {
      winner = playedCards[i];
    }
  }

  return winner.playerId;
}
