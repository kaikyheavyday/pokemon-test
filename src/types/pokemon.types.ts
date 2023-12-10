interface IPokemon {
  name: string;
  id: number;
  image: string;
  types: IPokemonType[];
  abilities: IPokemonAbility[];
  stats: IPokemonStats[];
}

interface IPokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}
interface IPokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

interface IPokemonStats {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}
