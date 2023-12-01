import React, { useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link, Navigate } from "react-router-dom";
import {
  deleteItemFromCartAsync,
  selectItems,
  updateCartAsync,
} from "./cartSlice";
import { discoutPrice } from "../../app/constants";
import Modals from "../common/Modals";

export default function Cart() {
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const itemset = useSelector(selectItems);
  const dispatch = useDispatch();
  const [dangerId, setDangerId] = useState(null);
  const subTotal = itemset.reduce(
    (amount, item) =>
      amount +
      discoutPrice(item.product.price, item.product.discountPercentage) *
        item.quantity,
    0
  );
  const totalItems = itemset.reduce((total, item) => total + item.quantity, 0);

  function dangerAction() {
    dispatch(deleteItemFromCartAsync(dangerId));
  }

  return (
    <>
      {!itemset.length && <Navigate to={"/"} replace={true}></Navigate>}
      <div>
        <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
              Cart
            </h1>
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {itemset.map((itemdata) => (
                  <li key={itemdata.product.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={itemdata.product.thumbnail}
                        alt={itemdata.product.thumbnail}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <a href={itemdata.product.href}>
                              {itemdata.product.title}
                            </a>
                          </h3>
                          <p className="ml-4">
                            $
                            {discoutPrice(
                              itemdata.product.price,
                              itemdata.product.discountPercentage
                            ) * itemdata.quantity}
                          </p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {itemdata.product.brand}
                        </p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="text-gray-500">
                          <label
                            htmlFor="quantity"
                            className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                          >
                            Qty
                          </label>
                          <select
                            className="p-2 border-solid border border-black"
                            onChange={(e) => {
                              dispatch(
                                updateCartAsync({
                                  id: itemdata.id,
                                  quantity: Number(e.target.value),
                                })
                              );
                            }}
                            value={itemdata.quantity}
                          >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                          </select>
                        </div>
                        {
                          <Modals
                            title="Delete Cart Item"
                            message="Are you sure you want to delete this item?"
                            dangerOption="Delete"
                            dangerAction={dangerAction}
                            CancelOption="Cancel"
                            showModal={showModal}
                            setShowModal={setShowModal}
                          ></Modals>
                        }

                        <div className="flex">
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={(e) => {
                              setDangerId(itemdata.id);
                              setShowModal(showModal === false ? true : false);
                            }}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>${subTotal}</p>
            </div>
            <div className="flex justify-between my-2 text-base font-medium text-gray-900">
              <p>Total items</p>
              <p>${totalItems}</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="mt-6">
              <Link
                to="/checkout"
                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Checkout
              </Link>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                or
                <Link to="/">
                  <button
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                    onClick={() => setOpen(false)}
                  >
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </button>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
