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
    difficulty: string;
    moves: number;
    score: number;
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
      penalty: 24
    },
];

export const GAME_MODES: IGameMode[] = [
    {
        slug: "emotes",
        theme: "Encontre os Emotes - Animais",
        card_classes: "bg-gradient-purple-dark",
        button_classes: "bg-accent-pupile",
        cards: [
            "/assets/cards/animals/bear.png",
            "/assets/cards/animals/bee.png",
            "/assets/cards/animals/bunny.png",
            "/assets/cards/animals/cat.png",
            "/assets/cards/animals/chicken.png",
            "/assets/cards/animals/cow.png",
            "/assets/cards/animals/dog.png",
            "/assets/cards/animals/fish.png",
            "/assets/cards/animals/fox.png",
            "/assets/cards/animals/hamster.png",
            "/assets/cards/animals/horse.png",
            "/assets/cards/animals/koala.png",
            "/assets/cards/animals/leon.png",
            "/assets/cards/animals/octopus.png",
            "/assets/cards/animals/panda.png",
            "/assets/cards/animals/pig.png",
            "/assets/cards/animals/tiger.png",
            "/assets/cards/animals/unicorn.png",
        ]
    }
];
