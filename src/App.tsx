import "./styles/base.css";

import { Routing } from "./Routing";
import { Header } from "./Header";

export const App = () => (
  <div className="min-h-screen flex flex-grow flex-col text-gray-300 font-sans">
    <Header />
    <Routing />
  </div>
);
