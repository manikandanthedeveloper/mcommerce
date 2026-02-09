'use client';

import CartItemsList from "@/components/cart/CartItemsList";
import CartTotals from "@/components/cart/CartTotals";
import Container from "@/components/global/Container";
import SectionTitle from "@/components/global/SectionTitle";
import { useAppSelector } from "@/store/hooks";
import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

function CartPage() {
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const { userId } = useAuth();

  if (!userId) {
    redirect("/");
  }

  if (cartItems.length === 0) {
    return <SectionTitle title="Your cart is empty" />;
  }

  return (
    <Container className="my-5">
      <SectionTitle title="Your Cart" />
      <div className='mt-8 grid gap-4 lg:grid-cols-12'>
        <div className='lg:col-span-8'>
          <CartItemsList cartItems={cartItems} />
        </div>
        <div className='lg:col-span-4'>
          <CartTotals />
        </div>
      </div>
    </Container>
  );
}

export default CartPage;