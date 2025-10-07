import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { Orbitron, Rajdhani, Inter } from "./lib/fonts";

// Add font classes to the HTML document
document.documentElement.classList.add(
  Orbitron.variable,
  Rajdhani.variable,
  Inter.variable
);

createRoot(document.getElementById("root")!).render(<App />);
