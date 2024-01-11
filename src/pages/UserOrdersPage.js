import React from "react";
import Cart from "../features/cart/Cart";
import UserOrders from "../features/user/components/UserOrders";
import Navbar from "../features/navbar/Navbar";

export default function UserOrdersPage() {
  return (
    <div>
      <Navbar></Navbar>
      <UserOrders></UserOrders>
    </div>
  );
}
