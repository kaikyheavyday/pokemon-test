import { Layout } from "antd";
import Navbar from "./Navbar/Navbar";
import { Outlet } from "react-router-dom";

const { Content, Footer } = Layout;
export default function LayoutPage() {
  return (
    <Layout className="min-h-screen">
      <Navbar />
      <Content className="lg:px-40 md:px-20 px-8  my-12">
        <Outlet />
      </Content>
      <Footer className="h-14 bg-black text-white flex justify-center items-center">
        Copyright © 2023 ChomCHOB. All Rights Reserved.
      </Footer>
    </Layout>
  );
}
