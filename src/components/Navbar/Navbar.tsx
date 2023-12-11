import { Badge, Divider, Input, Layout } from "antd";
import {
  CiLocationOn,
  CiDeliveryTruck,
  CiDiscount1,
  CiUser,
  CiSearch,
} from "react-icons/ci";
import { IoBagOutline } from "react-icons/io5";
const { Header } = Layout;
import Logo from "../../assets/logo.svg";
import { useStore } from "../../store/store";
import { useState } from "react";

export default function Navbar() {
  const { setSearch } = useStore();
  const [value, setValue] = useState("");
  return (
    <>
      <Header className="flex flex-wrap items-center bg-primary justify-between px-40">
        <p>Welcome to Pokemon shop!</p>
        <div className="flex flex-wrap items-center">
          <div className="flex gap-2 items-center">
            <CiLocationOn />
            <p>Contact 123456</p>
          </div>
          <Divider type="vertical" className="bg-black" />
          <div className="flex gap-2 items-center">
            <CiDeliveryTruck />
            <p>Track your order</p>
          </div>
          <Divider type="vertical" className="bg-black" />
          <div className="flex gap-2 items-center">
            <CiDiscount1 />
            <p>All Offers</p>
          </div>
        </div>
      </Header>

      <Header className="bg-white h-20 flex items-center justify-between px-40 shadow-lg">
        <img src={Logo} alt="logo" />
        <Input
          size="large"
          placeholder="Search name Pokémon ..."
          prefix={<CiSearch className="text-primary text-lg" />}
          className="w-2/5"
          allowClear
          value={value}
          onChange={(e) => {
            if (!e.target.value) {
              setSearch("");
              setValue("");
            } else {
              setValue(e.target.value);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setSearch(value);
            }
          }}
        />
        <div className="flex gap-3 items-center">
          <div className="flex gap-2 items-center">
            <CiUser className="text-primary text-2xl" />
            <p className="text-base text-grey">Username</p>
          </div>
          <Divider type="vertical" className="bg-black" />
          <div className="flex gap-2 items-center">
            <Badge color="black" count={1} size="small">
              <IoBagOutline className="text-primary text-2xl" />
            </Badge>
            <p className="text-base text-grey">Pocket</p>
          </div>
        </div>
      </Header>
    </>
  );
}
