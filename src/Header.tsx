import { Link } from "react-router-dom";

export const Header = () => (
  <div>
    <div>Quicrypt</div>
    <div>
      <Link to="/encrypt">Encrypt</Link>
    </div>
    <div>
      <Link to="/decrypt">Decrypt</Link>
    </div>
    <div>
      <Link to="/about">About</Link>
    </div>
  </div>
);
