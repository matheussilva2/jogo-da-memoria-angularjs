export interface IGameDifficulty {
    key: "easy" | "medium" | "hard";
    label: string;
    icon: string;
    items_count: number;
    time: number; // seconds
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

export const GAME_DIFFICULTIES: IGameDifficulty[] = [
    {
      key: "easy",
      label: "Fácil",
      icon: "/assets/icons/level-1.svg",
      items_count: 6,
      time: 30
    },
    {
      key: "medium",
      label: "Médio",
      icon: "/assets/icons/level-2.svg",
      items_count: 12,
      time: 90
    },
    {
      key: "hard",
      label: "Difícil",
      icon: "/assets/icons/level-3.svg",
      items_count: 18,
      time: 120
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
