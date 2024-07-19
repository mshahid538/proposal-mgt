import { NavigationMenu, NavigationMenuLink, NavigationMenuList } from "@radix-ui/react-navigation-menu";
import Image from "next/image";
import Link from "next/link";
import { navigationMenuTriggerStyle } from "../ui/navigation-menu";
import { main as navData } from "@/constants/navigations.json";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center">
      {/* <Image src={""} alt="" /> */}
      <NavigationMenu>
        <NavigationMenuList>
          {navData.map((item, i) => (
            <Link href={item.link} key={i} legacyBehavior passHref>
              <NavigationMenuLink variant="link" className={navigationMenuTriggerStyle()}>
                {item.name}
              </NavigationMenuLink>
            </Link>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
};

export default Navbar;
