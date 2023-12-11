import { Button } from "antd";
import { useNavigate } from "react-router-dom";

type PropsType = {
  pokemon: IPokemon;
};
export default function Card({ pokemon }: PropsType) {
  const navigate = useNavigate();
  return (
    <div className="shadow-lg rounded-lg">
      <img src={pokemon.image} alt={pokemon.name} className="w-full" />
      <div className="p-3">
        <h4 className="font-bold capitalize">{pokemon.name}</h4>
        <div className="flex gap-2 mt-2">
          {pokemon.types.map((type: IPokemonType) => {
            return (
              <div
                key={type.slot}
                className="bg-primaryLight text-primaryText rounded-lg font-bold capitalize px-2 py-1"
              >
                {type.type.name}
              </div>
            );
          })}
        </div>
        <Button
          type="text"
          className="mt-4 w-full text-white bg-black hover:bg-primary rounded-lg font-semibold"
          onClick={() => {
            navigate(`/pokemon/${pokemon.id}`);
          }}
        >
          Detail
        </Button>
      </div>
    </div>
  );
}
