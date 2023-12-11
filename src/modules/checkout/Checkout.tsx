import { Button, Col, Row, Table, message } from "antd";
import { useStore } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";

export default function Checkout() {
  const { cart, setCart } = useStore();
  const navigate = useNavigate();

  const columns = [
    {
      title: "Product name",
      dataIndex: "Pokemon",
      key: "pokemon",
      render: (_: unknown, record: ICart) => (
        <div className="flex gap-4" key={record.pokemon.id}>
          <img
            src={record.pokemon.image}
            alt={record.pokemon.name}
            width={64}
          />
          <div>
            <div className="text-base font-semibold capitalize">
              {record.pokemon.name}
              <div className="flex gap-2 mt-2">
                {record.pokemon.types.map((type: IPokemonType) => {
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
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      render: (_: unknown, record: ICart, index: number) => (
        <div
          className="cursor-pointer"
          key={record.pokemon.id}
          onClick={() => deleteCart(index)}
        >
          <MdDeleteOutline />
        </div>
      ),
    },
  ];

  const deleteCart = (index: number) => {
    const resultCart = cart.splice(index, 1);
    setCart(resultCart);
    if (cart.length === 0) {
      setCart([]);
      // navigate("/");
    }
  };
  return (
    <>
      <Row gutter={16}>
        <Col span={18}>
          <div className="bg-white mr-9 rounded-lg">
            <h2 className="p-4 text-base font-semibold">
              Pocket list ({cart.length})
            </h2>
            <Table columns={columns} dataSource={cart} pagination={false} />
          </div>
        </Col>
        <Col span={6}>
          <div className="shadow-lg rounded-b-lg">
            <h2 className="bg-orange-100 rounded-t-lg p-3">
              <p className="text-base font-semibold">Order Summary</p>
            </h2>
            <div className="flex flex-col gap-2 rounded-b-lg bg-white p-3">
              <div className="flex justify-between w-full">
                <p className="text-grey">Subtotal</p>
                <p className="font-bold text-black">
                  {cart.length} <span className="ml-1">Product</span>
                </p>
              </div>
              <div className="flex justify-between w-full">
                <p className="text-grey">Quantity</p>
                <p className="font-bold text-black">
                  {cart.reduce((acc, cur) => {
                    return acc + cur.quantity;
                  }, 0)}
                  <span className="ml-1">Quantity</span>
                </p>
              </div>
              <Button
                type="primary"
                size="large"
                danger
                className="w-full mt-5"
                onClick={() => {
                  message.success("Checkout success");
                  setCart([]);
                  navigate("/");
                }}
              >
                Proceed to checkout
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
}
