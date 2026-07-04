export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface PokemonEvolutionStage {
  name: string;
  imageUrl: string;
  displayName?: string;
  forms?: PokemonEvolutionStage[];
}

export interface PokemonSpeciesSummary {
  flavorText: string;
  genus: string;
  habitat: string;
  evolution: PokemonEvolutionStage[];
  cryUrl: string | null;
}

export interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  sprites: {
    front_default: string | null;
    other?: {
      "official-artwork"?: {
        front_default: string | null;
      };
    };
  };
  types: PokemonType[];
  stats: Array<{
    base_stat: number;
    stat: {
      name: string;
    };
  }>;
  abilities: PokemonAbility[];
  species: PokemonSpeciesSummary;
}
