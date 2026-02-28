export interface IGameDifficulty {
    key: "easy" | "medium" | "hard";
    label: string;
    icon: string;
}

export interface IGameMode {
    slug: string;
    theme: string;
    card_classes: string;
    button_classes: string;
}

export const GAME_DIFFICULTIES: IGameDifficulty[] = [
    {
      key: "easy",
      label: "Fácil",
      icon: "/assets/icons/level-1.svg"
    },
    {
      key: "medium",
      label: "Médio",
      icon: "/assets/icons/level-2.svg"
    },
    {
      key: "hard",
      label: "Difícil",
      icon: "/assets/icons/level-3.svg"
    },
];

export const GAME_MODES: IGameMode[] = [
    {
        slug: "linguagens-de-programacao",
        theme: "Linguagens de Programação",
        card_classes: "bg-gradient-purple-dark",
        button_classes: "bg-accent-pupile"
    },
    {
        slug: "frameworks-e-bibliotecas",
        theme: "Frameworks e Bibliotecas",
        card_classes: "bg-gradient-blue-dark",
        button_classes: "bg-accent-blue"
    },
    {
        slug: "ferramentas-e-desenvolvimento",
        theme: "Ferramentas e Desenvolvimento",
        card_classes: "bg-gradient-cyan-dark",
        button_classes: "bg-accent-cyan"
    },
];