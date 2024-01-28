import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../components/Card/Card";
import { Col, Row } from "antd";
import MenuIcon from "../../assets/icons/menu.svg";
import ListIcon from "../../assets/icons/list.svg";
import { useStore } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { MdOutlineSearchOff } from "react-icons/md";
export default function Home() {
  const [pokemonList, setPokemonList] = useState<IPokemon[]>([]);
  const navigate = useNavigate();
  const { query, setQuery, search, isMenu, setIsMenu } = useStore();

  useEffect(() => {
    setQuery({
      offset: 0,
      limit: 12,
    });
    if (search) {
      setPokemonList([]);
      fetchSearchPokemon();
    } else {
      fetchPokemonData();
    }
  }, [search]);

  const fetchPokemonData = async () => {
    console.log("test")
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?offset=${query.offset}&limit=${query.limit}&search=pi`
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

  const fetchSearchPokemon = async () => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`
      );
      let pokemonLists = [];
      const pokemonDetail = {
        id: response.data.id,
        name: response.data.name,
        image: response.data.sprites.front_default,
        types: response.data.types,
        abilities: response.data.abilities,
        stats: response.data.stats,
      };
      pokemonLists.push(pokemonDetail);
      setPokemonList(pokemonLists);
    } catch (error) {
      console.error("Error fetching Pokemon data:", error);
    }
  };
  return (
    <div>
      <div className="flex justify-between mb-10">
        <h2 className="text-base font-semibold">
          Products ({pokemonList.length})
        </h2>
        <div className="flex rounded-lg shadow-lg w-fit ">
          <div
            className={`w-10 h-8 flex align-center justify-center text-center rounded-l-lg cursor-pointer ${
              isMenu && "bg-primary"
            }`}
            onClick={() => {
              setIsMenu(true);
            }}
          >
            <img src={MenuIcon} alt="icon-menu" width={16} />
          </div>
          <div
            className={`w-10 h-8 flex align-center justify-center text-center rounded-r-lg cursor-pointer ${
              !isMenu && "bg-primary"
            }`}
            onClick={() => {
              setIsMenu(false);
            }}
          >
            <img src={ListIcon} alt="icon-list" width={16} />
          </div>
        </div>
      </div>
      {pokemonList.length > 0 ? (
        <>
          {isMenu ? (
            <Row gutter={12}>
              {pokemonList.map((pokemon) => (
                <Col key={pokemon.id} className="gutter-row" xs={12} lg={6}>
                  <Card pokemon={pokemon} />
                </Col>
              ))}
            </Row>
          ) : (
            <div>
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
                    <h2 className="text-base capitalize font-semibold">
                      {pokemon.name}
                    </h2>
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
            </div>
          )}
        </>
      ) : (
        <div className="mx-auto text-center w-80 flex flex-col items-center gap-2">
          <MdOutlineSearchOff className=" text-4xl text-center" />
          <p className="text-grey">
            Oops! Nothing was found for “{search}” Please try to search for
            something else.
          </p>
        </div>
      )}
    </div>
  );
}
