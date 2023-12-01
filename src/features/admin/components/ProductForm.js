import React, { useEffect, useState } from "react";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  createProductAsync,
  fetchProductByIdAsync,
  selectTotalBrands,
  selectTotalCategories,
} from "../../product/productSlice";
import { useForm } from "react-hook-form";
import { Navigate, useParams } from "react-router-dom";

export default function ProductForm() {
  const brands = useSelector(selectTotalBrands);
  const categories = useSelector(selectTotalCategories);
  const dispatch = useDispatch();
  const [productAdded, setProductAdded] = useState(false);
  const params = useParams();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  function handleAddProduct(data) {
    const images = [
      data.image1,
      data.image2,
      data.image3,
      data.image4,
      data.image5,
    ];
    const newProduct = { ...data, images };
    for (let index = 1; index <= 5; index++) {
      delete newProduct[`image${index}`];
    }
    dispatch(createProductAsync(newProduct));
    setProductAdded(true);
  }

  return (
    <>
      {productAdded && <Navigate to={"/admin"} replace={true}></Navigate>}
      <form
        className=" bg-white mx-40 my-5 px-20 py-10 rounded-xl"
        noValidate
        onSubmit={handleSubmit((data) => {
          handleAddProduct(data);
        })}
      >
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-xl font-bold leading-7 text-gray-900">
              Add product details
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              This information will be displayed publicly so be careful what you
              share.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-full">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product name
                </label>
                <div className="mt-2">
                  <input
                    id="title"
                    {...register("title", {
                      required: "Title is required",
                    })}
                    type="title"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.title && (
                    <span className="mt-2 text-sm text-red-500">
                      {errors.title.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="Description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    rows={3}
                    {...register("description", {
                      required: "Description is required",
                    })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                  />
                  {errors.description && (
                    <span className="mt-2 text-sm text-red-500">
                      {errors.description.message}
                    </span>
                  )}
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Write a few sentences about your product.
                </p>
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Category
                </label>
                <div className="mt-2">
                  <select
                    id="category"
                    {...register("category", {
                      required: "Category is required",
                    })}
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value="">--choose category--</option>
                    {categories.map((category) => (
                      <option value={category.value}>{category.label}</option>
                    ))}
                  </select>
                  {errors.category && (
                    <span className="mt-2 text-sm text-red-500">
                      {errors.category.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="brand"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Brand
                </label>
                <div className="mt-2">
                  <select
                    id="brand"
                    {...register("brand", {
                      required: "Brand is required",
                    })}
                    className="block w-full rounded-md border-0 px-2login py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value="">--choose brand--</option>
                    {brands.map((brand) => (
                      <option value={brand.value}>{brand.label}</option>
                    ))}
                  </select>
                  {errors.brand && (
                    <span className="mt-2 text-sm text-red-500">
                      {errors.brand.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Price
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    {...register("price", {
                      required: "Price is required",
                      min: "0",
                      max: "100000",
                    })}
                    id="price"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.price && (
                    <span className="mt-2 text-sm text-red-500">
                      {errors.price.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="discount"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Discount
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    {...register("discountPercentage", {
                      required: "Discount percentage is required",
                      min: "0",
                      max: "100",
                    })}
                    id="discount"
                    min="0"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.discountPercentage && (
                    <span className="mt-2 text-sm text-red-500">
                      {errors.discountPercentage.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="stock"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Stock
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    {...register("stock", {
                      required: "Stock is required",
                      min: "0",
                    })}
                    id="stock"
                    min="1"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.stock && (
                    <span className="mt-2 text-sm text-red-500">
                      {errors.stock.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="sm:col-span-full">
                <label
                  htmlFor="thumbnail"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Thumbnail
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    {...register("thumbnail", {
                      required: "Thumbnail is required",
                    })}
                    id="thumbnail"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />

                  {errors.thumbnail && (
                    <span className="mt-2 text-sm text-red-500">
                      {errors.thumbnail.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="sm:col-span-full">
                <label
                  htmlFor="image1"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image 1
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    {...register("image1", {
                      required: "Image1 is required",
                    })}
                    id="image1"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.image1 && (
                    <span className="mt-2 text-sm text-red-500">
                      {errors.image1.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="sm:col-span-full">
                <label
                  htmlFor="image2"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image 2
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    {...register("image2", {
                      required: "Image2 is required",
                    })}
                    id="image2"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.image2 && (
                    <span className="mt-2 text-sm text-red-500">
                      {errors.image2.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="sm:col-span-full">
                <label
                  htmlFor="image3"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image 3
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    {...register("image3", {
                      required: "Image3 is required",
                    })}
                    id="image3"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.image3 && (
                    <span className="mt-2 text-sm text-red-500">
                      {errors.image3.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="sm:col-span-full">
                <label
                  htmlFor="image4"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image 4
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    {...register("image4", {
                      required: "Image4 is required",
                    })}
                    id="image3"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.image4 && (
                    <span className="mt-2 text-sm text-red-500">
                      {errors.image4.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="sm:col-span-full">
                <label
                  htmlFor="image5"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image 5
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    {...register("image5", {
                      required: "Image5 is required",
                    })}
                    id="image5"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.image5 && (
                    <span className="mt-2 text-sm text-red-500">
                      {errors.image5.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
            onClick={() => setProductAdded(true)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
}
