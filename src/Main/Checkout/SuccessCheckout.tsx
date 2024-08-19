import { useEffect, useState } from "react";

import { doc, updateDoc, Timestamp } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../Firebase/FirebaseConfig";
import { Container } from "@mui/material";
import Empty from "../../Components/Empty";
import { MdArrowBack } from "react-icons/md";
import Footer from "../../Footer/Footer";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../Hooks/UseCart";

const SuccessCheckout = () => {
  const [loading, setLoading] = useState(true);
  const [orderId, setOrderId] = useState<string | null>(null);
  const navigate = useNavigate();
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
    // Get orderId from URL
    const params = new URLSearchParams(window.location.search);
    const orderIdFromUrl = params.get("order_id");
    setOrderId(orderIdFromUrl);

    if (!orderIdFromUrl) {
      console.error("No order ID provided.");
      setLoading(false);
      return;
    }

    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Call the function to update the order status
        updateOrderStatus(orderIdFromUrl, user.uid);
      } else {
        console.error("User not authenticated");
      }
      setLoading(false); // Hide loading state once auth is checked
    });

    // Clean up the auth state listener when the component unmounts
    return () => unsubscribe();
  }, [clearCart]);

  const updateOrderStatus = async (orderId: string, userId: string) => {
    try {
      const ordersRef = doc(db, "orders", orderId);
      await updateDoc(ordersRef, {
        paymentStatus: "paid",
        updatedAt: Timestamp.now(),
      });

      console.log(`Order ${orderId} updated to paid.`);
    } catch (error) {
      console.error("Error updating order status", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!orderId) {
    return <div>No order ID provided.</div>;
  }
  return (
    <div className="flex flex-col min-h-screen">
      <Container className="flex-grow">
        <Empty
          heading="Successfully completed your checkout!"
          icon={MdArrowBack}
          details="view orders"
          onClick={() => navigate("/orders")}
        />
      </Container>
      <Footer />
    </div>
  );
};

export default SuccessCheckout;
