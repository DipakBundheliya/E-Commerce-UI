import React from "react";
import Cart from "../features/cart/Cart";
import UserOrders from "../features/user/components/UserOrders";
import Navbar from "../features/navbar/Navbar";

export default function UserOrdersPage() {
  return (
    <div>
      <Navbar>
        <h1 className="text-3xl my-5 font-bold tracking-tight text-gray-900">
          My Orders
        </h1>
        <UserOrders></UserOrders>
      </Navbar>
    </div>
  );
}
