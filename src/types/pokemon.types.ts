interface IPokemon {
  name: string;
  id: number;
  image: string;
  types: IPokemonType[];
}

interface IPokemonType {
  slot: 1;
  type: {
    name: string;
    url: string;
  };
}
