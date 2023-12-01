import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchLoggedInUserOrderAsync, selectUserInfo } from "../userSlice";
import { Link } from "react-router-dom";
import { discoutPrice } from "../../../app/constants";

export default function UserOrders() {
  const user = useSelector(selectUserInfo);
  const orders = user.orders;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchLoggedInUserOrderAsync(user.id));
  }, [user.id]);

  return (
    <>
      {orders &&
        orders.map((order) => (
          <div>
            <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <h1 className="text-3xl my-5 font-bold tracking-tight text-gray-900">
                  Order #{order.id}
                </h1>
                <h2 className="text-xl my-5 font-bold tracking-tight text-red-700">
                  Order status : {order.status}
                </h2>

                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {order.itemset.map((productinfo) => (
                      <li key={productinfo.product.id} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={productinfo.product.thumbnail}
                            alt={productinfo.product.thumbnail}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <a href={productinfo.product.href}>
                                  {productinfo.product.title}
                                </a>
                              </h3>
                              <p className="ml-4">
                                $
                                {discoutPrice(
                                  productinfo.product.price,
                                  productinfo.product.discountPercentage
                                ) * productinfo.quantity}
                              </p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              {productinfo.product.brand}
                            </p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <div className="text-gray-500">
                              <label
                                htmlFor="quantity"
                                className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                              >
                                Qty : {productinfo.quantity}
                              </label>
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
                  <p>${order.subTotal}</p>
                </div>
                <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                  <p>Total items</p>
                  <p>${order.totalItems}</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  Shipping Address :
                </p>
                <li className="flex mt-5 justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200">
                  <div className="flex gap-x-4">
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        {order.selectAddress.name}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {order.selectAddress.state}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {order.selectAddress.pinCode}
                      </p>
                    </div>
                  </div>
                  <div className="hidden sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-6 text-gray-900">
                      Phone: {order.selectAddress.phone}
                    </p>
                    <p className="text-sm leading-6 text-gray-500">
                      {order.selectAddress.city}
                    </p>
                  </div>
                </li>
              </div>
            </div>
          </div>
        ))}
    </>
  );
}
