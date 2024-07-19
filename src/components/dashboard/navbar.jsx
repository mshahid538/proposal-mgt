import { NavigationMenu, NavigationMenuLink, NavigationMenuList } from "@radix-ui/react-navigation-menu";
import { navigationMenuTriggerStyle } from "../ui/navigation-menu";
import Sidebar from "./sidebar";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const Navbar = () => {
  return (
    <nav className="flex flex-col justify-between p-2">
      <Card className="w-full py-2 px">
        <NavigationMenu>
          <NavigationMenuList className="flex justify-between">
            <Sidebar />
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="" />
              <AvatarFallback>PP</AvatarFallback>
            </Avatar>
          </NavigationMenuList>
        </NavigationMenu>
      </Card>
    </nav>
  );
};

export default Navbar;
