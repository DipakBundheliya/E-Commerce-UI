// A mock function to mimic making an async request for data
export function fetchLoggedInUserOrder(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "https://e-commerce-back-end-xx27.vercel.app/ordersOfUser?id=" + userId,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const data = await response.json();

    resolve({ data });
  });
}
export function fetchLoggedInUser(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "https://e-commerce-back-end-xx27.vercel.app/users/" + userId,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const data = response.json();
    resolve({ data });
  });
}
// This api is called in checkout page , store addresses
export function updateUser(user) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "https://e-commerce-back-end-xx27.vercel.app/users/" + user.id,
      {
        method: "PATCH",
        credentials: "include",
        body: JSON.stringify(user),
        headers: { "content-type": "application/json" },
      }
    );
    const data = await response.json();
    resolve({ data });
  });
}
