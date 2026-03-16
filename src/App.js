
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import StartPage from "./pages/StartPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import PaymentSuccess from "./pages/PaymentSuccess";

import AddProduct from "./pages/AddProduct";
import AdminLogin from "./pages/AdminLogin";

import AdminSidebar from "./admin/AdminSidebar";
import AdminDashboard from "./admin/AdminDashboard";

import AdminProducts from "./admin/AdminProducts";
import AdminUsers from "./admin/AdminUsers";
import AdminOrders from "./admin/AdminOrders";
import AdminPayments from "./admin/AdminPayments";

import MyOrders from "./pages/MyOrders";




import { CartProvider } from "./context/CartContext";
import AdminFeedback from "./admin/AdminFeedback";

function App() {

  const [category, setCategory] = useState("All");

  return (
    <CartProvider>
      <BrowserRouter>

        <Navbar setCategory={setCategory} />

        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home category={category} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/ordersuccess" element={<OrderSuccess />} />
          <Route path="/paymentsuccess" element={<PaymentSuccess />} />
       
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          

          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin-sidebar" element={<AdminSidebar />}/>
          <Route path="admin/payments" element={<AdminPayments />} />
          <Route path="admin/feedback" element={<AdminFeedback/>}/>
          

<Route path="/home" element={<Home />} />
   
   <Route path="/my-orders" element={<MyOrders />} />
          
        </Routes>

      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
