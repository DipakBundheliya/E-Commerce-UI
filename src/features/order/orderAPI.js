// A mock function to mimic making an async request for data
export function createOrder(orderData) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "https://e-commerce-back-end-xx27.vercel.app/orders",
      {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(orderData),
        headers: { "content-type": "application/json" },
      }
    );
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchAllOrders({ pagination, sort }) {
  // TODO: Server will filter deleted products in case of non admin
  pagination = { ...pagination, ...sort };
  let queryStr = "";
  Object.keys(pagination).forEach((key) => {
    queryStr += `${key}=${pagination[key]}&`;
  });

  return new Promise(async (resolve) => {
    const response = await fetch(
      `https://e-commerce-back-end-xx27.vercel.app/orders?${queryStr}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const data = await response.json();
    const totalOrders = await response.headers.get("X-Total-Count");
    resolve({ data: { orders: data, totalOrders: totalOrders } });
  });
}

// This api is used by admin to edit status of order
export function updateOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "https://e-commerce-back-end-xx27.vercel.app/orders/" + order.id,
      {
        method: "PATCH",
        credentials: "include",
        body: JSON.stringify(order),
        headers: { "content-type": "application/json" },
      }
    );
    const data = await response.json();
    resolve({ data });
  });
}

// This api is used by admin to delete order from set of orders
export function deleteOrder(orderId) {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(
      "https://e-commerce-back-end-xx27.vercel.app/orders/" + orderId,
      {
        method: "DELETE",
        credentials: "include",
        headers: { "content-type": "application/json" },
      }
    );
    const data = await response.json();
    if (data.acknowledged) {
      resolve({ data: { id: orderId } });
    } else {
      reject({ error: data });
    }
  });
}
