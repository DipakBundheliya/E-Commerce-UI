import { useEffect, useState } from "react";
import { ITEM_PER_PAGE } from "../../../app/constants";
import {
  deleteOrderAsync,
  fetchAllOrdersAsync,
  selectOrder,
  selectTotalOrders,
  updateOrderAsync,
} from "../../order/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  StarIcon,
} from "@heroicons/react/20/solid";
import Modals from "../../common/Modals";

function AdminOrders() {
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState({});
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const orders = useSelector(selectOrder);
  const totalOrders = useSelector(selectTotalOrders);
  const [editableOrderId, setEditableOrderId] = useState(-1);
  const [dangerId, setDangerId] = useState(null);

  useEffect(() => {
    // display limited items per page
    pagination[`_page`] = [page];
    pagination[`_limit`] = [ITEM_PER_PAGE];
    setPagination({ ...pagination });
    dispatch(fetchAllOrdersAsync({ pagination, sort }));
  }, [sort, page]);

  function handleShow() {
    console.log("show handle");
  }
  function handleSort(sortOption) {
    // const _sort=sortOption
    const sort = { _sort: sortOption.sort, _order: sortOption.order };
    setSort(sort);
  }
  function dangerAction() {
    dispatch(deleteOrderAsync(dangerId));
  }

  function handleUpdateStatus(e, order) {
    const newOrder = { id: order.id, status: e.target.value };
    dispatch(updateOrderAsync(newOrder));
    setEditableOrderId(-1);
  }
  function chooseColor(status) {
    switch (status) {
      case "pending":
        return "bg-purple-200 text-purple-600";
      case "dispatched":
        return "bg-yellow-200 text-yellow-600";
      case "delivered":
        return "bg-green-200 text-green-600";
      case "cancel":
        return "bg-red-200 text-red-600";
      case "default":
        return "bg-purple-200 text-purple-600";
    }
  }

  return (
    <div className="overflow-x-auto">
      <div className="min-w-screen bg-gray-100 flex items-center justify-center bg-gray-100 font-sans overflow-hidden">
        <div className="w-full ">
          <div className="bg-white shadow-md rounded my-6">
            <table className=" w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th
                    className="flex whitespace-nowrap cursor-pointer  py-3 px-6 text-left"
                    onClick={() =>
                      handleSort({
                        sort: "_id",
                        order: sort?._order === "desc" ? "asc" : "desc",
                      })
                    }
                  >
                    ORDER ID{" "}
                    {sort._sort === "_id" &&
                      (sort._order === "desc" ? (
                        <ArrowDownIcon className="h-5 w-5" aria-hidden="true" />
                      ) : (
                        <ArrowUpIcon className="h-5 w-5" aria-hidden="true" />
                      ))}
                  </th>
                  <th className="py-3 px-6 text-left">ITEMS</th>
                  <th
                    className="flex whitespace-nowrap cursor-pointer py-3 px-6 text-center"
                    onClick={() =>
                      handleSort({
                        sort: "subTotal",
                        order: sort?._order === "desc" ? "asc" : "desc",
                      })
                    }
                  >
                    TOTAL AMOUNT{" "}
                    {sort._sort === "subTotal" &&
                      (sort._order === "desc" ? (
                        <ArrowDownIcon
                          className=" h-5 w-5"
                          aria-hidden="true"
                        />
                      ) : (
                        <ArrowUpIcon className=" h-5 w-5" aria-hidden="true" />
                      ))}
                  </th>
                  <th className="py-3 px-6 text-center">SHIPPING ADDRESS</th>
                  <th className="py-3 px-6 text-center">STATUS</th>
                  <th className="py-3 px-6 text-center">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {orders.map((order) => (
                  <tr className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="font-medium">{order.id}</span>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-left">
                      {order.itemset.map((item) => (
                        <div className="flex my-5 items-center">
                          <div className="mr-2">
                            <img
                              className="w-8 h-8 rounded-full"
                              src={item.product.thumbnail}
                            />
                          </div>
                          <span>{item.product.title}</span>
                        </div>
                      ))}
                    </td>
                    <td className="py-3 px-6 text-center">${order.subTotal}</td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex flex-col">
                        <span>
                          <strong>{order.selectAddress.name}</strong>
                        </span>
                        <span>{order.selectAddress.street}</span>
                        <span>{order.selectAddress.city}</span>
                        <span>{order.selectAddress.state}</span>
                        <span>{order.selectAddress.pinCode}</span>
                        <span>{order.selectAddress.phone}</span>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-center">
                      {editableOrderId === order.id ? (
                        <select
                          className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                          onChange={(e) => handleUpdateStatus(e, order)}
                          value={order.status}
                        >
                          <option value="pending">Pending</option>
                          <option value="dispatched">Dispatched</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancel">Cancel</option>
                        </select>
                      ) : (
                        <span
                          className={`${chooseColor(
                            order.status
                          )} py-1 px-3 rounded-full text-xs`}
                        >
                          {order.status}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex item-center justify-center">
                        <div className="w-[18px] mr-2 transform hover:text-purple-500 hover:scale-110">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            onClick={() => handleShow()}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        </div>
                        <div className="w-[18px] mr-2 transform hover:text-purple-500 hover:scale-110">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            onClick={() => setEditableOrderId(order.id)}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                            />
                          </svg>
                        </div>
                        {showModal && (
                          <Modals
                            title="Delete Cart Item"
                            message="Are you sure you want to delete this item?"
                            dangerOption="Delete"
                            dangerAction={dangerAction}
                            CancelOption="Cancel"
                            showModal={showModal}
                            setShowModal={setShowModal}
                          ></Modals>
                        )}
                        <div className="w-[18px] mr-2 transform hover:text-purple-500 hover:scale-110">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            onClick={(e) => {
                              setDangerId(order.id);
                              setShowModal(showModal === false ? true : false);
                            }}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              page={page}
              setPage={setPage}
              dispatch={dispatch}
              totalOrders={totalOrders}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminOrders;

function Pagination({ page, setPage, dispatch, totalOrders }) {
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <div
          onClick={() => {
            if (page > 1) dispatch(setPage(page - 1));
          }}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </div>
        <div
          onClick={() => {
            if (page < Math.ceil(totalOrders / ITEM_PER_PAGE))
              dispatch(setPage(page + 1));
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
              {totalOrders >= page * ITEM_PER_PAGE
                ? (page - 1) * ITEM_PER_PAGE + 1
                : totalOrders - (page - 1) * ITEM_PER_PAGE > 0
                ? (page - 1) * ITEM_PER_PAGE + 1
                : 0}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {totalOrders > page * ITEM_PER_PAGE
                ? page * ITEM_PER_PAGE
                : totalOrders - (page - 1) * ITEM_PER_PAGE > 0
                ? totalOrders
                : 0}
            </span>{" "}
            of <span className="font-medium">{totalOrders}</span> results
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
                if (page > 1) setPage(page - 1);
              }}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </div>
            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
            {Array.from({ length: Math.ceil(totalOrders / ITEM_PER_PAGE) }).map(
              (el, index) => (
                <div
                  key={index}
                  onClick={(e) => {
                    setPage(index + 1);
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
                if (page < Math.ceil(totalOrders / ITEM_PER_PAGE)) {
                  setPage(page + 1);
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
