import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchLoggedInUserOrderAsync,
  selectUserInfo,
  selectUserOrders,
  updateUserAsync,
} from "../userSlice";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  AcademicCapIcon,
  EnvelopeIcon,
  IdentificationIcon,
} from "@heroicons/react/24/outline";

export default function UserProfile() {
  const user = useSelector(selectUserInfo);
  const dispatch = useDispatch();
  const [selectedEditIndex, setselectedEditIndex] = useState(-1);
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  // We will add payment section when we work on backend

  useEffect(() => {
    dispatch(fetchLoggedInUserOrderAsync(user.id));
  }, [user.id]);

  function handleRemove(e, index) {
    const newUser = { ...user, addresses: [...user.addresses] };
    newUser.addresses.splice(index, 1);
    dispatch(updateUserAsync(newUser));
  }
  function handleEditForm(index) {
    setselectedEditIndex(index);
    const editAddress = user.addresses[index];
    setValue("name", editAddress.name);
    setValue("email", editAddress.email);
    setValue("city", editAddress.city);
    setValue("phone", editAddress.phone);
    setValue("pinCode", editAddress.pinCode);
    setValue("state", editAddress.state);
    setValue("street", editAddress.street);
    setValue("country", editAddress.country);
  }
  function handleEdit(data, index) {
    setselectedEditIndex(-1);
    const newUser = { ...user, addresses: [...user.addresses] };
    newUser.addresses.splice(index, 1, data);
    dispatch(updateUserAsync(newUser));
  }
  function handleAddAddress(data) {
    setShowAddAddressForm(false);
    const newUser = { ...user, addresses: [...user.addresses, data] };
    dispatch(updateUserAsync(newUser));
  }
  function handleAddAddressForm() {
    setShowAddAddressForm(true);
    setselectedEditIndex(-1);

    setValue("name", "");
    setValue("email", "");
    setValue("city", "");
    setValue("phone", "");
    setValue("pinCode", "");
    setValue("state", "");
    setValue("country", "");
  }

  return (
    <>
      <>
        {/* component */}
        <main className="profile-page my-8">
          <section className="relative py-4 bg-blueGray-200">
            <div className="container mx-auto px-4">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg ">
                <div className="px-6">
                  <div className="flex ">
                    <div className="w-52 h-52  flex justify-center mx-10 ">
                      {/* <div className="relative"> */}
                      {user.image ? (
                        <img
                          alt="..."
                          src={`${
                            user.image
                              ? user.image
                              : "https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg"
                          }`}
                          className="shadow-xl object-cover object-top rounded-full h-auto align-middle border-none  w-full "
                        />
                      ) : (
                        <img
                          alt="..."
                          src="https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg"
                          className="shadow-xl object-cover object-top rounded-full h-auto align-middle border-none  w-full "
                        />
                      )}
                    </div>
                    {/* </div> */}
                    <div className="flex flex-col gap-2  ">
                      <h3 className="text-2xl font-medium leading-normal mb-2 text-blueGray-700">
                        {user.name}
                      </h3>
                      <div className="flex items-center text-base leading-normal  mb-2 text-blueGray-400 font-medium ">
                        <EnvelopeIcon className="h-5 w-5 mr-2"></EnvelopeIcon>
                        {user.email}
                      </div>
                      <h3 className="flex justify-center items-center  text-base leading-normal  mb-2 text-blueGray-400 font-normal">
                        <AcademicCapIcon className="h-6 w-6 mr-2"></AcademicCapIcon>
                        {user.about}
                      </h3>
                      <div>
                        <button
                          onClick={() => handleAddAddressForm()}
                          className="bg-rose-500 active:bg-rose-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                          type="button"
                        >
                          ADD NEW ADDRESS
                        </button>
                      </div>
                    </div>
                    <div className="ml-auto mr-16">
                      <Link to={"/user-editprofile"}>
                        <button
                          className="bg-green-500 active:bg-green-500 hover:bg-green-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150 "
                          type="button"
                        >
                          edit profile
                        </button>
                      </Link>
                    </div>
                  </div>

                  {user.addresses && (
                    <div className="mx-auto mt-4 mb-12 bg-white max-w-7xl px-4 sm:px-12 lg:px-16">
                      {showAddAddressForm ? (
                        <form
                          className="bg-white px-5 py-12"
                          noValidate
                          onSubmit={handleSubmit((data) => {
                            handleAddAddress(data);
                          })}
                        >
                          <div className="space-y-12">
                            <div className="border-b border-gray-900/10 pb-12">
                              <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                                Personal Information
                              </h2>
                              <p className="mt-1 text-sm leading-6 text-gray-600">
                                Use a permanent address where you can receive
                                mail.
                              </p>

                              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-4">
                                  <label
                                    htmlFor="name"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    Full name
                                  </label>
                                  <div className="mt-2">
                                    <input
                                      type="text"
                                      name="name"
                                      id="name"
                                      {...register("name", {
                                        required: "Full name is required",
                                      })}
                                      autoComplete="given-name"
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6"
                                    />
                                    {errors.name && (
                                      <span className="mt-2 text-sm text-red-500">
                                        {errors.name.message}
                                      </span>
                                    )}
                                  </div>
                                </div>

                                <div className="sm:col-span-4">
                                  <label
                                    htmlFor="email"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    Email address
                                  </label>
                                  <div className="mt-2">
                                    <input
                                      id="email"
                                      name="email"
                                      type="email"
                                      autoComplete="email"
                                      {...register("email", {
                                        required: "Email is required",
                                      })}
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6"
                                    />
                                    {errors.email && (
                                      <span className="mt-2 text-sm text-red-500">
                                        {errors.email.message}
                                      </span>
                                    )}
                                  </div>
                                </div>

                                <div className="sm:col-span-3">
                                  <label
                                    htmlFor="country"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    Country
                                  </label>
                                  <div className="mt-2">
                                    <select
                                      id="country"
                                      name="country"
                                      {...register("country", {
                                        required: "country is required",
                                      })}
                                      autoComplete="country-name"
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                    >
                                      <option>India</option>
                                      <option>United States</option>
                                      <option>Canada</option>
                                      <option>Mexico</option>
                                    </select>
                                  </div>
                                </div>

                                <div className="sm:col-span-3">
                                  <label
                                    htmlFor="country"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    Phone
                                  </label>
                                  <div className="mt-2">
                                    <input
                                      id="phone"
                                      name="phone"
                                      type="tel"
                                      autoComplete="phone"
                                      {...register("phone", {
                                        required: "phone number is required",
                                      })}
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6"
                                    />
                                    {errors.phone && (
                                      <span className="mt-2 text-sm text-red-500">
                                        {errors.phone.message}
                                      </span>
                                    )}
                                  </div>
                                </div>

                                <div className="col-span-full">
                                  <label
                                    htmlFor="street"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    Street address
                                  </label>
                                  <div className="mt-2">
                                    <input
                                      type="text"
                                      name="street"
                                      id="street"
                                      {...register("street", {
                                        required: "street address is required",
                                      })}
                                      autoComplete="street-address"
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6"
                                    />
                                    {errors.street && (
                                      <span className="mt-2 text-sm text-red-500">
                                        {errors.street.message}
                                      </span>
                                    )}
                                  </div>
                                </div>

                                <div className="sm:col-span-2 sm:col-start-1">
                                  <label
                                    htmlFor="city"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    City
                                  </label>
                                  <div className="mt-2">
                                    <input
                                      type="text"
                                      name="city"
                                      id="city"
                                      {...register("city", {
                                        required: "city is required",
                                      })}
                                      autoComplete="address-level2"
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6"
                                    />
                                    {errors.city && (
                                      <span className="mt-2 text-sm text-red-500">
                                        {errors.city.message}
                                      </span>
                                    )}
                                  </div>
                                </div>

                                <div className="sm:col-span-2">
                                  <label
                                    htmlFor="state"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    State / Province
                                  </label>
                                  <div className="mt-2">
                                    <input
                                      type="text"
                                      name="state"
                                      id="state"
                                      {...register("state", {
                                        required: "state is required",
                                      })}
                                      autoComplete="address-level1"
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6"
                                    />
                                    {errors.state && (
                                      <span className="mt-2 text-sm text-red-500">
                                        {errors.state.message}
                                      </span>
                                    )}
                                  </div>
                                </div>

                                <div className="sm:col-span-2">
                                  <label
                                    htmlFor="pinCode"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    ZIP / Postal code
                                  </label>
                                  <div className="mt-2">
                                    <input
                                      type="text"
                                      name="pinCode"
                                      id="pinCode"
                                      {...register("pinCode", {
                                        required: "Pin code is required",
                                      })}
                                      autoComplete="pinCode"
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6"
                                    />
                                    {errors.pinCode && (
                                      <span className="mt-2 text-sm text-red-500">
                                        {errors.pinCode.message}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="mt-6 flex items-center justify-end gap-x-6">
                              <button
                                onClick={() => setShowAddAddressForm(false)}
                                type="button"
                                className="text-sm font-semibold leading-6 text-gray-900"
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                className="rounded-md bg-rose-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
                              >
                                Add Address
                              </button>
                            </div>
                          </div>
                        </form>
                      ) : null}
                      {user.addresses.length ? (
                        <p className="mt-8 text-lg text-gray-700  font-semibold flex  align-center">
                          Your Address :-
                        </p>
                      ) : null}
                      {user.addresses.map((address, index) => (
                        <>
                          {selectedEditIndex === index ? (
                            <form
                              className="bg-white px-5 py-12"
                              noValidate
                              onSubmit={handleSubmit((data) => {
                                handleEdit(data, index);
                              })}
                            >
                              <div className="space-y-12">
                                <div className="border-b border-gray-900/10 pb-12">
                                  <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                                    Personal Information
                                  </h2>
                                  <p className="mt-1 text-sm leading-6 text-gray-600">
                                    Use a permanent address where you can
                                    receive mail.
                                  </p>

                                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-4">
                                      <label
                                        htmlFor="name"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                      >
                                        Full name
                                      </label>
                                      <div className="mt-2">
                                        <input
                                          type="text"
                                          name="name"
                                          id="name"
                                          {...register("name", {
                                            required: "Full name is required",
                                          })}
                                          autoComplete="given-name"
                                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6"
                                        />
                                        {errors.name && (
                                          <span className="mt-2 text-sm text-red-500">
                                            {errors.name.message}
                                          </span>
                                        )}
                                      </div>
                                    </div>

                                    <div className="sm:col-span-4">
                                      <label
                                        htmlFor="email"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                      >
                                        Email address
                                      </label>
                                      <div className="mt-2">
                                        <input
                                          id="email"
                                          name="email"
                                          type="email"
                                          autoComplete="email"
                                          {...register("email", {
                                            required: "Email is required",
                                          })}
                                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6"
                                        />
                                        {errors.email && (
                                          <span className="mt-2 text-sm text-red-500">
                                            {errors.email.message}
                                          </span>
                                        )}
                                      </div>
                                    </div>

                                    <div className="sm:col-span-3">
                                      <label
                                        htmlFor="country"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                      >
                                        Country
                                      </label>
                                      <div className="mt-2">
                                        <select
                                          id="country"
                                          name="country"
                                          {...register("country", {
                                            required: "country is required",
                                          })}
                                          autoComplete="country-name"
                                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                        >
                                          <option>India</option>
                                          <option>United States</option>
                                          <option>Canada</option>
                                          <option>Mexico</option>
                                        </select>
                                      </div>
                                    </div>

                                    <div className="sm:col-span-3">
                                      <label
                                        htmlFor="country"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                      >
                                        Phone
                                      </label>
                                      <div className="mt-2">
                                        <input
                                          id="phone"
                                          name="phone"
                                          type="tel"
                                          autoComplete="phone"
                                          {...register("phone", {
                                            required:
                                              "phone number is required",
                                          })}
                                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6"
                                        />
                                        {errors.phone && (
                                          <span className="mt-2 text-sm text-red-500">
                                            {errors.phone.message}
                                          </span>
                                        )}
                                      </div>
                                    </div>

                                    <div className="col-span-full">
                                      <label
                                        htmlFor="street"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                      >
                                        Street address
                                      </label>
                                      <div className="mt-2">
                                        <input
                                          type="text"
                                          name="street"
                                          id="street"
                                          {...register("street", {
                                            required:
                                              "street address is required",
                                          })}
                                          autoComplete="street-address"
                                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6"
                                        />
                                        {errors.state && (
                                          <span className="mt-2 text-sm text-red-500">
                                            {errors.street.message}
                                          </span>
                                        )}
                                      </div>
                                    </div>

                                    <div className="sm:col-span-2 sm:col-start-1">
                                      <label
                                        htmlFor="city"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                      >
                                        City
                                      </label>
                                      <div className="mt-2">
                                        <input
                                          type="text"
                                          name="city"
                                          id="city"
                                          {...register("city", {
                                            required: "city is required",
                                          })}
                                          autoComplete="address-level2"
                                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6"
                                        />
                                        {errors.city && (
                                          <span className="mt-2 text-sm text-red-500">
                                            {errors.city.message}
                                          </span>
                                        )}
                                      </div>
                                    </div>

                                    <div className="sm:col-span-2">
                                      <label
                                        htmlFor="state"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                      >
                                        State / Province
                                      </label>
                                      <div className="mt-2">
                                        <input
                                          type="text"
                                          name="state"
                                          id="state"
                                          {...register("state", {
                                            required: "state is required",
                                          })}
                                          autoComplete="address-level1"
                                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6"
                                        />
                                        {errors.state && (
                                          <span className="mt-2 text-sm text-red-500">
                                            {errors.state.message}
                                          </span>
                                        )}
                                      </div>
                                    </div>

                                    <div className="sm:col-span-2">
                                      <label
                                        htmlFor="pinCode"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                      >
                                        ZIP / Postal code
                                      </label>
                                      <div className="mt-2">
                                        <input
                                          type="text"
                                          name="pinCode"
                                          id="pinCode"
                                          {...register("pinCode", {
                                            required: "Pin code is required",
                                          })}
                                          autoComplete="pinCode"
                                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6"
                                        />
                                        {errors.pinCode && (
                                          <span className="mt-2 text-sm text-red-500">
                                            {errors.pinCode.message}
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="mt-6 flex items-center justify-end gap-x-6">
                                  <button
                                    onClick={() => setselectedEditIndex(-1)}
                                    type="button"
                                    className="text-sm font-semibold leading-6 text-gray-900"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    type="submit"
                                    className="rounded-md bg-rose-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
                                  >
                                    Edit Address
                                  </button>
                                </div>
                              </div>
                            </form>
                          ) : null}
                          <li className="flex mt-5 justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200">
                            <div className="flex gap-x-4">
                              <div className="min-w-0 flex-auto">
                                <p className="text-sm font-semibold leading-6 text-gray-900">
                                  {address.name}
                                </p>
                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                  {address.state}
                                </p>
                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                  {address.pinCode}
                                </p>
                              </div>
                            </div>
                            <div className="hidden sm:flex sm:flex-col sm:items-end">
                              <p className="text-sm leading-6 text-gray-900">
                                Phone: {address.phone}
                              </p>
                              <p className="text-sm leading-6 text-gray-500">
                                {address.city}
                              </p>
                            </div>
                            <div className="flex gap-x-4 min-w-0 flex-col items-end">
                              <button
                                type="button"
                                className="font-medium text-rose-600 hover:text-rose-500"
                                onClick={() => {
                                  handleEditForm(index);
                                  setShowAddAddressForm(false);
                                }}
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                className="font-medium text-rose-600 hover:text-rose-500"
                                onClick={(e) => handleRemove(e, index)}
                              >
                                Remove
                              </button>
                            </div>
                          </li>
                        </>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </main>
      </>

      {/* Links */}
    </>
  );
}
