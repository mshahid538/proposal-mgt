import Hero from "./hero";
import Navbar from "./navbar";

const Header = () => {
  return (
    <header className="px py-2">
      <Navbar />
      <Hero />
    </header>
  );
};

export default Header;
