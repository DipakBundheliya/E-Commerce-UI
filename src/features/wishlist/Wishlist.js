import React, { useState, Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link, Navigate } from "react-router-dom";
import { discoutPrice } from "../../app/constants";
import Modals from "../common/Modals";
import {
  deleteItemFromWishlistAsync,
  fetchWishItemsByUserIdAsync,
  selectWishlistItems,
} from "./wishlistSlice";

export default function Wishlist() {
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const itemset = useSelector(selectWishlistItems);
  const dispatch = useDispatch();
  const [dangerId, setDangerId] = useState(null);
  // const subTotal = itemset.reduce(
  //   (amount, item) =>
  //     amount +
  //     discoutPrice(item.product.price, item.product.discountPercentage) *
  //       item.quantity,
  //   0
  // );
  // const totalItems = itemset.reduce((total, item) => total + item.quantity, 0);

  function dangerAction() {
    dispatch(deleteItemFromWishlistAsync(dangerId));
  }

  useEffect(() => {
    console.log(itemset);
  }, [itemset]);

  return (
    <>
      <h1 className="flex items-center justify-center w-full h-20 text-sm  bg-rose-50 my-10">
        <Link to="/">
          <span className="mr-4 text-gray-700 hover:text-gray-900 font-semibold cursor-pointer">
            HOME
          </span>{" "}
        </Link>
        / <span className="ml-4 font-semibold">WISHLIST</span>
      </h1>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div>
            <h2 className="text-2xl font-semibold leading-tight">
              Your wishlist items
            </h2>
          </div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      IMAGE
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      PRODUCT NAME
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      PRICE
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      ADD TO CART
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      ACTION
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {itemset.map((item) => (
                    <tr>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="flex items-center justify-center">
                          <div className="flex-shrink-0 w-20 h-20">
                            <img
                              className="w-full h-full rounded-md object-cover"
                              src={item.product.thumbnail}
                              alt=""
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {item.product.title}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                        <p className="text-gray-900 whitespace-no-wrap">
                          ${item.product.price}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                        <span className="relative inline-block px-3 py-1 font-semibold text-white leading-tight">
                          <span
                            aria-hidden=""
                            className="absolute inset-0 bg-rose-600  rounded-full"
                          />
                          <span className="relative">Buy now</span>
                        </span>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="flex items-center justify-center ">
                          <XMarkIcon
                            className="w-4 h-4 stroke-[4px] text-gray-600 cursor-pointer"
                            onClick={() => {
                              dispatch(deleteItemFromWishlistAsync(item.id));
                            }}
                          ></XMarkIcon>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                <span className="text-xs xs:text-sm text-gray-900">
                  Showing 1 to {itemset.length} of {itemset.length} Entries
                </span>
                <div className="inline-flex mt-2 xs:mt-0">
                  <button className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l">
                    Prev
                  </button>
                  <button className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
