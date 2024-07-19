"use client";

import { useState } from "react";
import { NavigationMenu, NavigationMenuLink, NavigationMenuList } from "@radix-ui/react-navigation-menu";
import { Button } from "../ui/button";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { dashboard as navData } from "@/constants/navigations.json";
import Link from "next/link";
import { navigationMenuTriggerStyle } from "../ui/navigation-menu";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" onClick={() => setIsOpen(true)}>
          Menu
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <nav className="flex-grow flex flex-col justify-between">
          <NavigationMenu>
            <NavigationMenuList className="flex flex-col gap-2">
              {navData.map((item, i) => (
                <Link href={item.link} key={i} legacyBehavior passHref>
                  <NavigationMenuLink asChild className={navigationMenuTriggerStyle()} onClick={handleLinkClick}>
                    <a>{item.name}</a>
                  </NavigationMenuLink>
                </Link>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="destructive">Logout</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
