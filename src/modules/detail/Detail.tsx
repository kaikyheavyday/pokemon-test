import { Button, InputNumber } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaPlus, FaMinus } from "react-icons/fa";
import { IoBagOutline } from "react-icons/io5";
import { useStore } from "../../store/store";

export default function PokemonDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [pokemon, setPokemon] = useState<IPokemon | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { cart, setCart } = useStore();

  const fetchPokemon = async () => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id}`
      );
      const result = {
        id: response.data.id,
        name: response.data.name,
        image: response.data.sprites.front_default,
        types: response.data.types,
        abilities: response.data.abilities,
        stats: response.data.stats,
      };
      setPokemon(result);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setCart(cart);
    fetchPokemon();
  }, []);

  const addToCart = () => {
    let cartList = cart;
    let checkCartIndex = cartList.findIndex(
      (item: any) => item.pokemon.id == id
    );
    if (pokemon) {
      if (checkCartIndex !== -1) {
        cartList[checkCartIndex].quantity =
          cartList[checkCartIndex].quantity + quantity;
      } else {
        cartList.push({
          pokemon,
          quantity,
        });
      }
    }
    setCart(cartList);
    navigate("/checkout");
  };

  return (
    <>
      <div className="bg-white p-4 gap-20 flex h-80">
        <img src={pokemon?.image} alt="" />
        <div>
          <p className="text-base capitalize font-semibold">{pokemon?.name}</p>
          <div className="flex gap-2 mt-2">
            {pokemon?.types.map((type: IPokemonType) => {
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
          <p className="text-xs text-grey mt-4">
            Stats :
            <span className="ml-1">
              {pokemon?.stats
                .map((stats: IPokemonStats) => {
                  return stats.stat.name;
                })
                .join(", ")}
            </span>
          </p>
          <p className="text-xs text-grey mt-2">
            Abilities :
            <span className="ml-1 capitalize">
              {pokemon?.abilities
                .map((ability: IPokemonAbility) => {
                  return ability.ability.name;
                })
                .join(", ")}
            </span>
          </p>
          <div className="flex items-center my-6 gap-8">
            <p className="text-xs text-black">Quantity :</p>
            <div className="flex rounded-lg border border-grey w-fit ">
              <div
                className="w-12 border-r border-r-grey flex align-center justify-center text-center cursor-pointer pt-2"
                onClick={() => {
                  if (quantity <= 1) return;
                  setQuantity(quantity - 1);
                }}
              >
                <FaMinus className="text-xs" />
              </div>
              <InputNumber
                className="w-12 text-center centered-text-input"
                disabled
                value={quantity}
                bordered={false}
              />
              <div
                className="w-12 border-l border-l-grey flex align-center justify-center cursor-pointer pt-2"
                onClick={() => {
                  setQuantity(quantity + 1);
                }}
              >
                <FaPlus />
              </div>
            </div>
          </div>
          <Button
            icon={<IoBagOutline />}
            type="primary"
            danger
            size="large"
            className="w-48"
            onClick={addToCart}
          >
            Add to pocket
          </Button>
        </div>
      </div>
    </>
  );
}
