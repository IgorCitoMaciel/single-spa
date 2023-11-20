import { CSSProperties, useEffect } from "react";
import * as singleSpa from "single-spa";

export default function NavBar() {
  useEffect(() => {
    console.log("Minha rota");
  }, []);

  const meuBotaoStyle: CSSProperties = {
    backgroundColor: "#8458E4",
    color: "#ffff",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginRight: "10px",
    marginLeft: "10px",
  };

  const meuNavStyle: CSSProperties = {
    display: "flex",
    backgroundColor: "#121214",
    height: 70,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
  };

  return (
    <div style={meuNavStyle}>
      <button
        style={meuBotaoStyle}
        onClick={() => singleSpa.navigateToUrl("/app-home")}
      >
        Home
      </button>
      <button
        style={meuBotaoStyle}
        onClick={() => singleSpa.navigateToUrl("/app1")}
      >
        App1
      </button>

      <button
        style={meuBotaoStyle}
        onClick={() => singleSpa.navigateToUrl("/app2")}
      >
        App2
      </button>
    </div>
  );
}
