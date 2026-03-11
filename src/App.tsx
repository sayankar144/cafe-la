import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/lib/cart-context";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Index from "./pages/Index";
import MenuPage from "./pages/MenuPage";
import OrderPage from "./pages/OrderPage";
import ReservationPage from "./pages/ReservationPage";
import GalleryPage from "./pages/GalleryPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import TableQRHandler from "./pages/TableQRHandler";
import OrderStatusPage from "./pages/OrderStatusPage";
import KitchenDashboard from "./pages/KitchenDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AdminMenuPage from "./pages/AdminMenuPage";
import StaffLogin from "./pages/StaffLogin";
import ProtectedRoute from "./components/ProtectedRoute";
import { TableProvider } from "@/lib/table-context";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <TableProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <ScrollToTop />
            <Navbar />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/table/:id" element={<TableQRHandler />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/order" element={<OrderPage />} />
              <Route path="/order/table/:id" element={<OrderPage />} />
              <Route path="/order/:orderId" element={<OrderStatusPage />} />
              <Route path="/reservation" element={<ReservationPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/staff/login" element={<StaffLogin />} />

              <Route element={<ProtectedRoute />}>
                <Route path="/admin/kitchen" element={<KitchenDashboard />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/menu" element={<AdminMenuPage />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </CartProvider>
      </TableProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
