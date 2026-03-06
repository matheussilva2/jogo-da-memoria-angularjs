export interface IGameDifficulty {
    key: "easy" | "medium" | "hard";
    label: string;
    icon: string;
    items_count: number;
    duration: number; // seconds
    penalty: number;
}

export interface IGameMode {
    slug: string;
    theme: string;
    card_classes: string;
    button_classes: string;
    cards: string[];
}

export interface ICard {
    content: string;
    isFlipped: boolean;
    isLocked: boolean;
}

export interface IGameStats {
    remaining_time: number,
    difficulty_key: string;
    difficulty: string;
    moves: number;
    score: number;
    theme: string;
    date: number;
    won: boolean;
}

export const GAME_DIFFICULTIES: IGameDifficulty[] = [
    {
      key: "easy",
      label: "Fácil",
      icon: "/assets/icons/level-1.svg",
      items_count: 6,
      duration: 30,
      penalty: 10
    },
    {
      key: "medium",
      label: "Médio",
      icon: "/assets/icons/level-2.svg",
      items_count: 12,
      duration: 90,
      penalty: 18
    },
    {
      key: "hard",
      label: "Difícil",
      icon: "/assets/icons/level-3.svg",
      items_count: 18,
      duration: 120,
      penalty: 10
    },
];

export const GAME_MODES: IGameMode[] = [
    {
        slug: "emotes",
        theme: "Encontre os Emotes - Animais",
        card_classes: "bg-gradient-purple-dark",
        button_classes: "bg-accent-pupile",
        cards: [
            "/assets/cards/animals/bat.webp",
            "/assets/cards/animals/bird.webp",
            "/assets/cards/animals/blowfish.webp",
            "/assets/cards/animals/crocodile.webp",
            "/assets/cards/animals/dog.webp",
            "/assets/cards/animals/goat.webp",
            "/assets/cards/animals/goose.webp",
            "/assets/cards/animals/horse.webp",
            "/assets/cards/animals/lottie.webp",
            "/assets/cards/animals/otter.webp",
            "/assets/cards/animals/peacock.webp",
            "/assets/cards/animals/phoenix.webp",
            "/assets/cards/animals/rabbit.webp",
            "/assets/cards/animals/rooster.webp",
            "/assets/cards/animals/snake.webp",
            "/assets/cards/animals/tiger.webp",
            "/assets/cards/animals/turtle.webp",
            "/assets/cards/animals/unicorn.webp",
        ]
    }
];
