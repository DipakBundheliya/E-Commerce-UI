// A mock function to mimic making an async request for data
export function fetchLoggedInUserOrder(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8080/ordersOfUser?id=" + userId,
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
    const response = await fetch("http://localhost:8080/users/" + userId, {
      method: "GET",
      credentials: "include",
    });
    const data = response.json();
    resolve({ data });
  });
}
// This api is called in checkout page , store addresses
export function updateUser(user) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/users/" + user.id, {
      method: "PATCH",
      credentials: "include",
      body: JSON.stringify(user),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}
