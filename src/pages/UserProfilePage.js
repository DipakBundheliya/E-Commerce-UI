import React from "react";
import Cart from "../features/cart/Cart";
import Navbar from "../features/navbar/Navbar";
import UserProfile from "../features/user/components/UserProfile";

export default function UserProfilePage() {
  return (
    <div>
      <Navbar>
        <h1 className="text-3xl my-5 font-bold tracking-tight text-gray-900">
          My Profile
        </h1>
        <UserProfile></UserProfile>
      </Navbar>
    </div>
  );
}
