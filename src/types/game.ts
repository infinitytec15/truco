export interface Card {
  suit: "hearts" | "diamonds" | "clubs" | "spades";
  value: number; // 1-13 (1=A, 11=J, 12=Q, 13=K)
  trucoValue: number; // Truco value (0-10)
  isManilha: boolean;
}

export interface Player {
  id: string;
  name: string;
  avatar: string;
  cards: Card[];
  score: number;
  isReady: boolean;
  expression: "neutral" | "happy" | "angry" | "bluffing" | "surprised";
}

export interface GameState {
  id: string;
  players: Player[];
  currentPlayer: number;
  round: number;
  vira: Card;
  playedCards: { playerId: string; card: Card }[];
  trucoLevel: 1 | 3 | 6 | 9 | 12;
  trucoRequester: string | null;
  gamePhase: "waiting" | "playing" | "truco" | "finished";
  winner: string | null;
  roundWinner: string | null;
}

export interface ChatMessage {
  id: string;
  playerId: string;
  message: string;
  type: "chat" | "truco" | "emoji";
  timestamp: number;
}

export interface GameAction {
  type:
    | "PLAY_CARD"
    | "REQUEST_TRUCO"
    | "ACCEPT_TRUCO"
    | "DECLINE_TRUCO"
    | "SEND_MESSAGE"
    | "SEND_EMOJI";
  payload: any;
  playerId: string;
}
