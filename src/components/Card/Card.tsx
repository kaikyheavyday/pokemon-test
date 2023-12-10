import { Button } from "antd";

type PropsType = {
  pokemon: IPokemon;
};
export default function Card({ pokemon }: PropsType) {
  return (
    <div className="shadow-lg rounded-lg">
      <img src={pokemon.image} alt={pokemon.name} className="w-full" />
      <div className="p-3">
        <h4 className="font-bold capitalize">{pokemon.name}</h4>
        <div className="flex gap-2">
          {pokemon.types.map((type: IPokemonType) => {
            return (
              <div
                key={type.slot}
                className="bg-primaryLight text-primaryText font-bold capitalize px-2 py-1"
              >
                {type.type.name}
              </div>
            );
          })}
        </div>
        <Button
          type="text"
          className="mt-2 w-full text-white bg-black hover:bg-primary rounded-lg font-semibold"
        >
          Detail
        </Button>
      </div>
    </div>
  );
}
