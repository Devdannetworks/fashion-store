import React, { useEffect, useState } from "react";
import HeadersComp from "../../Components/Headers";
import ButtonComp from "../../Components/Button";
import { MdArrowBack } from "react-icons/md";
import ProductContent from "./ProductContent";
import { cartProductsType } from "../../Utils/Store";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../Hooks/UseCart";
import { auth } from "../../Firebase/FirebaseConfig";
import { CreateCheckoutSession } from "../../stripe/stripe";
import toast from "react-hot-toast";

const CartClient: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const currentUser = auth.currentUser;

  const { cartItems, clearCart, totalAmount } = useCart();
  console.log(cartItems);

  const handleCheckout = async () => {
    setLoading(true);

    if (!currentUser) {
      navigate("/LogIn");
      setLoading(false);
      return toast.error("Log in to make a checkout");
    }
    if (cartItems) {
      try {
        toast("please wait redirecting to checkout!");
        await CreateCheckoutSession(cartItems);
        setLoading(false);
      } catch (error) {
        console.error("Error creating checkout session:", error);
        toast.error("Couldn't redirect to checkout");
        setLoading(false);
        return;
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <div className="mb-2">
        <HeadersComp label="Shopping cart" />
      </div>
      <div className="grid grid-cols-5 text-xs">
        <div className="col-span-2 justify-self-start">PRODUCT</div>
        <div className="justify-self-center">QUANTITY</div>
        <div className="justify-self-center">PRICE</div>
        <div className="justify-self-end">TOTAL</div>
      </div>
      <div>
        {cartItems &&
          cartItems.map((product: cartProductsType) => (
            <ProductContent key={product.id} product={product} />
          ))}
      </div>

      <div className="flex justify-between mt-4">
        <div>
          <ButtonComp
            onClick={() => clearCart()}
            label="Clear cart"
            outline
            small
          />
        </div>
        <div className="text-[13px] flex flex-col gap-1">
          <div className=" font-semibold text-base flex justify-between w-full ">
            <span>Subtotal</span>
            <span>Ksh: {totalAmount && totalAmount.toFixed(2)}</span>
          </div>
          <p className="text-slate-500">
            Taxes and shipping calculated at check-out
          </p>
          <div>
            <ButtonComp
              onClick={handleCheckout}
              label={loading ? "loading..." : "Checkout"}
            />
          </div>
          <div
            className="flex align-middle justify-start items-center cursor-pointer"
            onClick={() => navigate("/Popular")}
          >
            <div className="justify-self-start">
              <MdArrowBack />
            </div>
            <span>Continue shopping</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartClient;
