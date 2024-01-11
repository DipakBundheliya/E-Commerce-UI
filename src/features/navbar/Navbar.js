import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";

import {
  Bars3Icon,
  ShoppingCartIcon,
  HeartIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectItems } from "../cart/cartSlice";
import { selectUserInfo } from "../user/userSlice";
import { selectWishlistItems } from "../wishlist/wishlistSlice";
import ecommerceLogo from "../../images/ecommerceLogo.png";

const userIcon = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

const navigation = [
  { name: "Home", link: "/", user: true },
  { name: "Shop", link: "/shop", user: true },
  { name: "Service", link: "/services", user: true },
  { name: "Contact Us", link: "/contact", user: true },
  { name: "Admin", link: "/admin", admin: true },
  { name: "Orders", link: "/admin/orders", admin: true },
];
const userNavigation = [
  { name: "My Profile", link: "/user-profile" },
  { name: "My Orders", link: "/user-orders" },
  { name: "Sign out", link: "/logout" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const itemset = useSelector(selectItems);
  const wishlistItemSet = useSelector(selectWishlistItems);
  const user = useSelector(selectUserInfo);
  const [navIndex, setnavIndex] = useState(0);

  useEffect(() => {
    console.log(navIndex);
  }, [navIndex]);

  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-rose-800">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Link to="/">
                        <img
                          className="h-12 w-12"
                          src={ecommerceLogo}
                          alt="Your Company"
                        />
                      </Link>
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item, index) => (
                          <>
                            {item[user.role] && (
                              <Link
                                key={item.name}
                                to={item.link}
                                className={`rounded-md px-3 py-2 text-sm font-medium ${
                                  navIndex === index
                                    ? "bg-rose-600 text-white"
                                    : "text-rose-100 hover:bg-rose-600 hover:text-white"
                                }`}
                                onClick={() => {
                                  console.log("Before state update:", navIndex);
                                  setnavIndex((prevIndex) => index);
                                  console.log("After state update:", navIndex);
                                }}
                                aria-current={item.current ? "page" : undefined}
                              >
                                {item.name}
                              </Link>
                            )}
                          </>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      {/* for cart */}
                      <Link to="/cart">
                        <button
                          type="button"
                          className="z--1 relative rounded-full bg-rose-950 p-1 text-rose-100 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-rose-800"
                        >
                          <ShoppingCartIcon
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                        </button>
                      </Link>
                      {itemset.length ? (
                        <span className="z-0 inline-flex z-1 mb-7 -ml-[0.5rem] items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                          {itemset.length}
                        </span>
                      ) : null}
                      {/* For wishlisht */}
                      <Link to="/wishlist">
                        <button
                          type="button"
                          className="z--1 relative mx-2 rounded-full bg-rose-950 p-1 text-rose-100 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-rose-800"
                        >
                          <HeartIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </Link>
                      {wishlistItemSet.length ? (
                        <span className="z-0 inline-flex z-1 mb-7 -ml-[1rem] items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                          {wishlistItemSet.length}
                        </span>
                      ) : null}

                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-rose-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-rose-800">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-8 w-8 rounded-full object-cover object-top"
                              src={`${
                                user.image
                                  ? user.image
                                  : "https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg"
                              }`}
                              alt=""
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <Link
                                    to={`${item.link}`}
                                    href={item.href}
                                    className={classNames(
                                      active ? "bg-rose-100" : "",
                                      "block px-4 py-2 text-sm text-rose-700"
                                    )}
                                  >
                                    {item.name}
                                  </Link>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-rose-800 p-2 text-rose-400 hover:bg-rose-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-rose-800">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {navigation.map((item) => (
                    <>
                      {item[user.role] && (
                        <Link
                          key={item.name}
                          to={item.link}
                          as="a"
                          className={classNames(
                            item.current
                              ? "bg-rose-900 text-white"
                              : "text-rose-300 hover:bg-rose-700 hover:text-white",
                            "block rounded-md px-3 py-2 text-base font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </Link>
                      )}
                    </>
                  ))}
                </div>
                <div className="border-t border-rose-700 pb-3 pt-4">
                  <div className="flex relative items-center px-5">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={user.image}
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">
                        {userIcon.name}
                      </div>
                      <div className="text-sm font-medium leading-none text-rose-400">
                        {user.email}
                      </div>
                    </div>
                    <Link to="/cart" className="ml-auto">
                      <button
                        type="button"
                        className="z--1 relative flex-shrink-0 rounded-full bg-rose-800 p-1 text-rose-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-rose-800"
                      >
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">View notifications</span>
                        <ShoppingCartIcon
                          className="h-6 w-6"
                          aria-hidden="true"
                        />
                      </button>
                    </Link>
                    {itemset.length ? (
                      <span className="z-0 inline-flex z-1 mb-7 -ml-3 items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                        {itemset.length}
                      </span>
                    ) : null}
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    {userNavigation.map((item) => (
                      <Link to={`${item.link}`}>
                        <Disclosure.Button
                          key={item.name}
                          as="a"
                          href={item.href}
                          className="block rounded-md px-3 py-2 text-base font-medium text-rose-400 hover:bg-rose-700 hover:text-white"
                        >
                          {item.name}
                        </Disclosure.Button>
                      </Link>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        {/* <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-rose-900">
              E-Commerce
            </h1>
          </div>
        </header> */}
        {/* <main>
          <div className="mx-auto max-w-7xl">{children}</div>
        </main> */}
      </div>
    </>
  );
}
