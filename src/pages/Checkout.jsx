



import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

function Checkout() {
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);

    const totalPrice = savedCart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    setTotal(totalPrice);
  }, []);

  const placeOrder = async () => {
    if (!address) {
      alert("Enter Address");
      return;
    }

    if (!paymentMethod) {
      alert("Select Payment Method");
      return;
    }

    const userId = localStorage.getItem("userId") || 1;

    const orderData = {
      userId: userId,
      totalAmount: total,
      productName: cart.map((c) => c.name).join(", "),
      quantity: cart.reduce((sum, c) => sum + c.quantity, 0),
      status: "PLACED",
      feedback: "",
    };

    try {
      // ORDER SAVE
      await fetch("http://localhost:8080/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      // PAYMENT SAVE
      await fetch(`http://localhost:8080/api/admin/payments/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: 1,
          amount: total,
          method: paymentMethod === "Cash on Delivery" ? "COD" : "UPI",
          category: "Electronics",
        }),
      });

      alert("Order Successful");

      // ✅ SEND DATA TO SUCCESS PAGE
      const orderDetails = {
        address,
        paymentMethod,
        total,
      };

      localStorage.setItem("lastOrder", JSON.stringify(orderDetails));

      localStorage.removeItem("cart");

      navigate("/paymentsuccess", { state: orderDetails });

    } catch (err) {
      console.log(err);
      alert("Order Failed");
    }
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      <div className="checkout-section">
        <h3>Delivery Address</h3>
        <textarea
          rows="4"
          placeholder="Enter your address..."
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <div className="checkout-section">
        <h3>Payment Method</h3>

        <label>
          <input
            type="radio"
            name="pay"
            value="Cash on Delivery"
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          Cash on Delivery
        </label>

        <label>
          <input
            type="radio"
            name="pay"
            value="UPI"
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          Online Payment
        </label>
      </div>

      <div className="total-amount">Total Amount: ₹{total}</div>

      <button className="pay-btn" onClick={placeOrder}>
        Pay Now
      </button>
    </div>
  );
}

export default Checkout;