export function addToCart(item) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(item),
      headers: { "content-type": "application/json" },
    });
    const data = response.json();
    resolve({ data });
  });
}

export function fetchItemsByUserId(id) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/cart?userid=${id}`);
    const data = response.json();
    resolve({ data });
  });
}

export function updateCart(item) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart/" + item.id, {
      method: "PATCH",
      body: JSON.stringify(item),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function deleteItemFromCart(itemId) {
  return new Promise(async (resolve, reject) => {
    const response = await fetch("http://localhost:8080/cart/" + itemId, {
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

export function resetCart(userID) {
  return new Promise(async (resolve) => {
    const response = await fetchItemsByUserId(userID);
    const items = await response.data;
    for (let item of items) {
      await deleteItemFromCart(item.id);
    }

    resolve({ data: { message: "success" } });
  });
}
