import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../components/Card/Card";
import { Col, Radio, Row } from "antd";
import MenuIcon from "../../assets/icons/menu.svg";
import ListIcon from "../../assets/icons/list.svg";
import { useStore } from "../../store/query.store";
export default function Home() {
  const [pokemonList, setPokemonList] = useState<IPokemon[]>([]);

  const { query, setQuery } = useStore();

  useEffect(() => {
    setQuery({
      offset: 0,
      limit: 12,
    });
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
            };
          })
        );

        setPokemonList(updatedPokemonList);
      } catch (error) {
        console.error("Error fetching Pokemon data:", error);
      }
    };

    fetchPokemonData();
  }, []);
  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-base font-semibold">Products (12)</h2>
        <Radio.Group defaultValue="a">
          <Radio.Button value="a" style={{ paddingTop: "6px" }}>
            <img src={MenuIcon} alt="icon-menu" />
          </Radio.Button>
          <Radio.Button value="b" style={{ paddingTop: "6px" }}>
            <img src={ListIcon} alt="icon-list" />
          </Radio.Button>
        </Radio.Group>
      </div>
      <Row gutter={16}>
        {pokemonList.map((pokemon) => (
          <Col key={pokemon.id} className="gutter-row" span={6}>
            <Card pokemon={pokemon} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
