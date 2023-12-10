import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./App.css";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ConfigProvider
        theme={{
          components: {
            Input: {
              activeBorderColor: "#FFCB05",
              hoverBorderColor: "#FFCB05",
              activeShadow: "0px 0px 10px 0px rgba(255, 203, 5, 0.10)",
            },
            Button: {
              textHoverBg: "#FFCB05",
              colorText: "#fff",
            },
          },
        }}
      >
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>
);
