import { Link } from "react-router-dom";
import { ShoppingCart, Menu, User, Store, Gift, TrendingUp, HelpCircle, Heart, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageToggle } from "@/components/LanguageToggle";
import { SearchBar } from "@/components/SearchBar";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCart } from "@/context/CartContext";

export const Header = () => {
  const { cartCount } = useCart();

  const NavLinks = () => (
    <>
      <Link to="/products">
        <Button variant="ghost">Products</Button>
      </Link>
      <Link to="/buzz">
        <Button variant="ghost" className="gap-2">
          <TrendingUp className="h-4 w-4" />
          Buzz
        </Button>
      </Link>
      <Link to="/gifts">
        <Button variant="ghost" className="gap-2">
          <Gift className="h-4 w-4" />
          Gifts
        </Button>
      </Link>
      <Link to="/wishlist">
        <Button variant="ghost" className="gap-2">
          <Heart className="h-4 w-4" />
          Wishlist
        </Button>
      </Link>
      
      {/* More dropdown for additional pages */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="gap-2">
            <MoreHorizontal className="h-4 w-4" />
            More
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48 bg-popover">
          <DropdownMenuItem asChild>
            <Link to="/barter" className="w-full cursor-pointer">
              Barter Corner
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/sell" className="w-full cursor-pointer flex items-center gap-2">
              <Store className="h-4 w-4" />
              Sell Items
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/seller-dashboard" className="w-full cursor-pointer">
              Seller Dashboard
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/help" className="w-full cursor-pointer flex items-center gap-2">
              <HelpCircle className="h-4 w-4" />
              Help & Support
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/profile" className="w-full cursor-pointer flex items-center gap-2">
              <User className="h-4 w-4" />
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/login" className="w-full cursor-pointer">
              Login
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <span className="text-primary">Shopping</span>
            <span>Ghar</span>
          </Link>

          {/* Desktop Search - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-xl mx-4">
            <SearchBar />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            <NavLinks />
            <LanguageToggle />
            <ThemeToggle />
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <Badge 
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                    variant="default"
                  >
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu */}
          <div className="flex md:hidden items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <Badge 
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                    variant="default"
                  >
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <nav className="flex flex-col gap-4 mt-8">
                  <NavLinks />
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <SearchBar />
        </div>
      </div>
    </header>
  );
};
