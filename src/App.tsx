import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Sell from "./pages/Sell";
import SellerDashboard from "./pages/SellerDashboard";
import Profile from "./pages/Profile";
import BarterCorner from "./pages/BarterCorner";
import ServiceHub from "./pages/ServiceHub";
import About from "./pages/About";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Buzz from "./pages/Buzz";
import SpinWheel from "./pages/SpinWheel";
import Gifts from "./pages/Gifts";
import FeedbackHelp from "./pages/FeedbackHelp";
import Wishlist from "./pages/Wishlist";
import UploadProduct from "./pages/UploadProduct";
import UserProfile from "./pages/UserProfile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="flex flex-col min-h-screen pb-16 md:pb-0">
              <Header />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/sell" element={<Sell />} />
                  <Route path="/seller-dashboard" element={<SellerDashboard />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/profile/:username" element={<UserProfile />} />
                  <Route path="/upload-product" element={<UploadProduct />} />
                  <Route path="/barter" element={<BarterCorner />} />
                  <Route path="/service-hub" element={<ServiceHub />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/buzz" element={<Buzz />} />
                  <Route path="/spin" element={<SpinWheel />} />
                  <Route path="/gifts" element={<Gifts />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/help" element={<FeedbackHelp />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
              <MobileBottomNav />
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
