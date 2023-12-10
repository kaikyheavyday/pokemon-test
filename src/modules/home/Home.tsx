import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../components/Card/Card";
import { Col, Radio, Row } from "antd";
import MenuIcon from "../../assets/icons/menu.svg";
import ListIcon from "../../assets/icons/list.svg";
import { useStore } from "../../store/query.store";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [pokemonList, setPokemonList] = useState<IPokemon[]>([]);
  const [isMenu, setIsMemu] = useState(false);
  const navigate = useNavigate();
  const { query, setQuery } = useStore();

  useEffect(() => {
    setQuery({
      offset: 0,
      limit: 12,
    });
    fetchPokemonData();
  }, []);

  const fetchPokemonData = async () => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?offset=${query.offset}&limit=${query.limit}`
      );
      const results = response.data.results;

      const updatedPokemonList = await Promise.all(
        results.map(async (pokemon: { name: string; url: string }) => {
          const pokemonDetails = await axios.get(pokemon.url);
          return {
            id: pokemonDetails.data.id,
            name: pokemonDetails.data.name,
            image: pokemonDetails.data.sprites.front_default,
            types: pokemonDetails.data.types,
            abilities: pokemonDetails.data.abilities,
            stats: pokemonDetails.data.stats,
          };
        })
      );
      setPokemonList(updatedPokemonList);
    } catch (error) {
      console.error("Error fetching Pokemon data:", error);
    }
  };
  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-base font-semibold">Products (12)</h2>
        <Radio.Group
          defaultValue={isMenu}
          onChange={(e) => setIsMemu(e.target.value)}
        >
          <Radio.Button value={true} style={{ paddingTop: "6px" }}>
            <img src={MenuIcon} alt="icon-menu" />
          </Radio.Button>
          <Radio.Button value={false} style={{ paddingTop: "6px" }}>
            <img src={ListIcon} alt="icon-list" />
          </Radio.Button>
        </Radio.Group>
      </div>
      {isMenu ? (
        <Row gutter={16}>
          {pokemonList.map((pokemon) => (
            <Col key={pokemon.id} className="gutter-row" span={6}>
              <Card pokemon={pokemon} />
            </Col>
          ))}
        </Row>
      ) : (
        <>
          {pokemonList.map((pokemon) => (
            <div
              className="flex cursor-pointer bg-white h-28 my-2 rounded-lg shodow-lg p-3"
              key={pokemon.id}
              onClick={() => {
                navigate(`/pokemon/${pokemon.id}`);
              }}
            >
              <img src={pokemon.image} alt={pokemon.name} width={80} />
              <div className="pl-2">
                <p className="text-base capitalize font-semibold">
                  {pokemon.name}
                </p>
                <div className="flex gap-2 mt-2">
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
                <p className="text-xs text-grey mt-2">
                  Abilities :
                  <span className="ml-1 capitalize">
                    {pokemon.abilities
                      .map((ability: IPokemonAbility) => {
                        return ability.ability.name;
                      })
                      .join(", ")}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
