import React, { useState, Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProductsByFilterAsync,
  fetchAllProductsAsync,
  selectAllProducts,
  selectTotalItems,
  selectTotalBrands,
  selectTotalCategories,
  fetchAllCategoriesAsync,
  fetchAllBrandsAsync,
  setupPage,
  selectProductListStatus,
} from "../productSlice";

// Tailwind
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  AdjustmentsHorizontalIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  StarIcon,
} from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { ITEM_PER_PAGE, discoutPrice } from "../../../app/constants";
import { Bars } from "react-loader-spinner";

const sortOptions = [
  { name: "Best Rating", sort: "rating", order: "desc", current: false },
  { name: "Price: Low to High", sort: "price", order: "asc", current: false },
  { name: "Price: High to Low", sort: "price", order: "desc", current: false },
];
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductList() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filter, setfilter] = useState({});
  const products = useSelector(selectAllProducts);
  const totalItems = useSelector(selectTotalItems);
  const totalBrands = useSelector(selectTotalBrands);
  const totalCategories = useSelector(selectTotalCategories);
  const dispatch = useDispatch();
  const page = useSelector((state) => state.product.pageNum);
  const status = useSelector(selectProductListStatus);

  const filters = [
    {
      id: "category",
      name: "Category",
      options: totalCategories,
    },
    {
      id: "brand",
      name: "Brand",
      options: totalBrands,
    },
  ];

  useEffect(() => {
    dispatch(fetchAllCategoriesAsync());
    dispatch(fetchAllBrandsAsync());
    // filter[`_page`] = [page];
    // filter[`_limit`] = [ITEM_PER_PAGE];
    // setfilter(filter);
  }, []);

  useEffect(() => {
    // display limited items per page
    filter[`_page`] = [page];
    filter[`_limit`] = [ITEM_PER_PAGE];
    setfilter({ ...filter });
    dispatch(fetchProductsByFilterAsync({ filter }));
  }, [page]);

  function handleFilter(section, option, e) {
    if (e.target.checked) {
      if (section.id in filter) {
        filter[`${section.id}`].push(option.value);
      } else {
        filter[`${section.id}`] = [option.value];
      }
    } else {
      Object.keys(filter).forEach((key) => {
        if (key === section.id) {
          filter[key].splice(filter[key].indexOf(option.value), 1);
        }
      });
    }
    setfilter({ ...filter });
    dispatch(fetchProductsByFilterAsync({ filter }));
    // here use effect is call
  }

  function handleSort(option, e) {
    filter[`_sort`] = [option.sort];
    filter[`_order`] = [option.order];
    setfilter({ ...filter });

    dispatch(fetchProductsByFilterAsync({ filter }));
  }

  return (
    <>
      <div className="bg-white">
        <div>
          {/* Mobile filter dialog */}
          <MobileFilter
            filter={filter}
            filters={filters}
            mobileFiltersOpen={mobileFiltersOpen}
            setMobileFiltersOpen={setMobileFiltersOpen}
            handleFilter={handleFilter}
            page={page}
            dispatch={dispatch}
          />

          <main className="mx-auto max-w-7xl p-4 sm:px-6 lg:px-8">
            <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-10">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
                All products
              </h1>

              <div className="flex items-center">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                      Sort
                      <ChevronDownIcon
                        className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
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
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        {sortOptions.map((option) => (
                          <Menu.Item key={option.name}>
                            {({ active }) => (
                              <p
                                onClick={(e) => {
                                  handleSort(option, e);
                                }}
                                className={classNames(
                                  option.current
                                    ? "font-medium text-gray-900"
                                    : "text-gray-500",
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                {option.name}
                              </p>
                            )}
                          </Menu.Item>
                        ))}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>

                <button
                  type="button"
                  className="-m-2 ml-1 sm:ml-3  p-2 text-gray-600 hover:text-gray-500 sm:ml-2"
                >
                  <span className="sr-only">View grid</span>
                  <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="-m-2 ml-1 p-2 text-gray-600 hover:text-gray-500 sm:ml-3 "
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <span className="sr-only">Filters</span>

                  <AdjustmentsHorizontalIcon
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>

            <section aria-labelledby="products-heading" className="pb-24 pt-6">
              <h2 id="products-heading" className="sr-only">
                Products
              </h2>

              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                {/* Filters
                <DesktopFilter
                  filter={filter}
                  filters={filters}
                  handleFilter={handleFilter}
                  page={page}
                  dispatch={dispatch}
                /> */}

                {/* Product grid */}
                <ProductGrid products={products} status={status} />
              </div>
            </section>

            {/*  */}
            <Pagination
              page={page}
              dispatch={dispatch}
              totalItems={totalItems}
            />
          </main>
        </div>
      </div>
    </>
  );
}

function MobileFilter({
  filter,
  filters,
  mobileFiltersOpen,
  setMobileFiltersOpen,
  handleFilter,
  page,
  dispatch,
}) {
  function checkSelectFilter(sectionId, filtervalue) {
    if (sectionId === "category" && filter.category) {
      const selectedCategory = filter.category.filter(
        (category) => filtervalue === category
      );
      if (selectedCategory.length) return true;
    }
    if (sectionId === "brand" && filter.brand) {
      const selectedBrand = filter.brand.filter(
        (brand) => filtervalue === brand
      );
      if (selectedBrand.length) return true;
    }

    return false;
  }

  return (
    <Transition.Root show={mobileFiltersOpen} as={Fragment}>
      <Dialog as="div" className="relative z-40" onClose={setMobileFiltersOpen}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 border-t border-gray-200">
                {filters.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="border-t border-gray-200 px-4 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-mx-2 -my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              {section.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-6">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  id={`filter-mobile-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  defaultChecked={checkSelectFilter(
                                    section.id,
                                    option.value
                                  )}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  onChange={(e) => {
                                    dispatch(setupPage(1));
                                    handleFilter(section, option, e);
                                  }}
                                />
                                <label
                                  htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                  className="ml-3 min-w-0 flex-1 text-gray-500"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
function DesktopFilter({ filter, filters, handleFilter, dispatch }) {
  function checkSelectFilter(sectionId, filtervalue) {
    if (sectionId === "category" && filter.category) {
      filter.category.map((category) => {
        if (filtervalue === category) return true;
      });
    }
    if (sectionId === "brand" && filter.brand) {
      filter.brand.map((brand) => {
        if (filtervalue === brand) return true;
      });
    }

    return false;
  }
  return (
    <>
      <form className="hidden lg:block">
        {filters.map((section) => (
          <Disclosure
            as="div"
            key={section.id}
            className="border-b border-gray-200 py-6"
          >
            {({ open }) => (
              <>
                <h3 className="-my-3 flow-root">
                  <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                    <span className="font-medium text-gray-900">
                      {section.name}
                    </span>
                    <span className="ml-6 flex items-center">
                      {open ? (
                        <MinusIcon className="h-5 w-5" aria-hidden="true" />
                      ) : (
                        <PlusIcon className="h-5 w-5" aria-hidden="true" />
                      )}
                    </span>
                  </Disclosure.Button>
                </h3>
                <Disclosure.Panel className="pt-6">
                  <div className="space-y-4">
                    {section.options.map((option, optionIdx) => (
                      <div key={option.value} className="flex items-center">
                        <input
                          id={`filter-${section.id}-${optionIdx}`}
                          name={`${section.id}[]`}
                          defaultValue={option.value}
                          type="checkbox"
                          defaultChecked={checkSelectFilter(
                            section.id,
                            option.value
                          )}
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          onChange={(e) => {
                            dispatch(setupPage(1));
                            handleFilter(section, option, e);
                          }}
                        />
                        <label
                          htmlFor={`filter-${section.id}-${optionIdx}`}
                          className="ml-3 text-sm text-gray-600"
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </form>
    </>
  );
}
function ProductGrid({ products, status }) {
  return (
    <>
      <div className="lg:col-span-4">
        {/*  This is our product list */}
        <div className="bg-white">
          {status === "loading" ? (
            <div className="flex justify-center items-center mt-20">
              <Bars
                height="60"
                width="60"
                color="rgb(79,70,229)"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            </div>
          ) : (
            <div className="mx-auto max-w-2xl sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
              <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4 xl:gap-x-8">
                {products.map((product) => (
                  <Link key={product.id} to={`/product-detail/${product.id}`}>
                    <div className="group relative border-solid border-1 bg-gray-100 ">
                      <div className="h-44 sm:h-60 aspect-h-1 aspect-w-1 w-full overflow-hidden p-4 transition ease-in-out duration-700 group-hover:opacity-75 lg:aspect-none lg:h-60 ">
                        <img
                          src={product.thumbnail}
                          alt={product.title}
                          className="w-full h-full object-cover object-center rounded-md shadow-inner shadow-lg shadow-indigo-500/50 transition ease-in-out duration-700  group-hover:scale-110 lg:h-full lg:w-full "
                        />
                      </div>
                      <div className="mt-2 px-2 sm:px-4 py-2 flex justify-between">
                        <div>
                          <h3 className="text-[13px] sm:text-[15px] font-semibold text-gray-700">
                            <div href={product.thumbnail}>
                              <span
                                aria-hidden="true"
                                className="absolute inset-0"
                              />
                              {product.title}
                            </div>
                          </h3>
                          <p className="mt-1 text-[13px] sm:text-[14px] text-gray-500">
                            <StarIcon className="inline w-5 h-5 mr-1  fill-[#FF9900]"></StarIcon>
                            <span className="align-bottom">
                              {product.rating}
                            </span>
                          </p>
                        </div>
                        <div>
                          <p className="text-[15px] sm:text-[16px] font-medium text-[#C20004]">
                            $
                            {discoutPrice(
                              product.price,
                              product.discountPercentage
                            )}
                          </p>
                          <p className="text-[13px] sm:text-[14px] mt-1 line-through font-medium text-gray-400">
                            ${product.price}
                          </p>
                        </div>
                      </div>
                      {product.deleted && (
                        <span className="mt-2 text-sm text-red-500">
                          Product deleted
                        </span>
                      )}
                      {product.stock <= 0 && (
                        <span className="mt-2 text-sm text-red-500">
                          Out of stock
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
function Pagination({ page, dispatch, totalItems }) {
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <div
          onClick={() => {
            if (page > 1) dispatch(setupPage(page - 1));
          }}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </div>
        <div
          onClick={() => {
            if (page < Math.ceil(totalItems / ITEM_PER_PAGE))
              dispatch(setupPage(page + 1));
          }}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </div>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">
              {totalItems >= page * ITEM_PER_PAGE
                ? (page - 1) * ITEM_PER_PAGE + 1
                : totalItems - (page - 1) * ITEM_PER_PAGE > 0
                ? (page - 1) * ITEM_PER_PAGE + 1
                : 0}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {totalItems > page * ITEM_PER_PAGE
                ? page * ITEM_PER_PAGE
                : totalItems - (page - 1) * ITEM_PER_PAGE > 0
                ? totalItems
                : 0}
            </span>{" "}
            of <span className="font-medium">{totalItems}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <div
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              onClick={() => {
                if (page > 1) dispatch(setupPage(page - 1));
              }}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </div>
            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
            {Array.from({ length: Math.ceil(totalItems / ITEM_PER_PAGE) }).map(
              (el, index) => (
                <div
                  key={index}
                  onClick={(e) => {
                    dispatch(setupPage(index + 1));
                  }}
                  aria-current="page"
                  className={`relative inline-flex items-center  px-4 py-2 text-sm font-semibold  ${
                    page === index + 1
                      ? "z-10 bg-indigo-600 text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  }`}
                >
                  {index + 1}
                </div>
              )
            )}

            <div
              onClick={() => {
                if (page < Math.ceil(totalItems / ITEM_PER_PAGE)) {
                  dispatch(setupPage(page + 1));
                }
              }}
              className="relative inline-flex items-center cursor-pointer rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
