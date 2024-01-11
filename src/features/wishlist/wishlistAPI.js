export function addToWishlist(item) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/wishlist", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(item),
      headers: { "content-type": "application/json" },
    });
    const data = response.json();
    resolve({ data });
  });
}

export function fetchWishItemsByUserId(id) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/wishlist?userid=${id}`);
    const data = response.json();
    resolve({ data });
  });
}

export function deleteItemFromWishlist(itemId) {
  return new Promise(async (resolve, reject) => {
    const response = await fetch("http://localhost:8080/wishlist/" + itemId, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    if (data.acknowledged) {
      resolve({ data: { id: itemId } });
    } else {
      reject({ error: data });
    }
  });
}
