import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useParams } from "react-router-dom";
import { resetCurrentOrder } from "../features/order/orderSlice";
import { resetCartAsync } from "../features/cart/cartSlice";
import { selectUserInfo } from "../features/user/userSlice";

function OrderSuccessPage() {
  const dispatch = useDispatch();
  const params = useParams();
  const user = useSelector(selectUserInfo);

  useEffect(() => {
    dispatch(resetCartAsync(user.id));
    dispatch(resetCurrentOrder());
  }, [user]);

  return (
    <>
      {!params.id && <Navigate to={"/"} replace={true}></Navigate>}
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-rose-600">
            Order Successfully Placed
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Order Number #{params.id}
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            You can check your order in My Account and My Orders
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/"
              className="rounded-md bg-rose-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
            >
              Go back home
            </Link>
            <a href="#" className="text-sm font-semibold text-gray-900">
              Contact support <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </main>
    </>
  );
}

export default OrderSuccessPage;
