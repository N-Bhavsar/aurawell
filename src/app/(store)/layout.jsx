import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import CartProvider from "@/components/cart/CartProvider";

export default function StoreLayout({ children }) {
  return (
    <CartProvider>
      <Navbar />
      <main className="min-w-0">{children}</main>
      <Footer />
      <MobileBottomNav />
    </CartProvider>
  );
}
