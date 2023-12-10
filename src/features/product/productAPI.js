// A mock function to mimic making an async request for data

export function fetchProductsByFilter(filter, admin) {
  // TODO: Server will filter deleted products in case of non admin
  let queryStr = "";
  Object.keys(filter).forEach((key) => {
    filter[key].forEach((val) => {
      queryStr += `${key}=${val}&`;
    });
  });
  if (admin) {
    queryStr += `admin=true`;
  }

  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/products?${queryStr}`, {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    const totalItems = await response.headers.get("X-Total-Count");
    resolve({ data: { products: data, totalItems: totalItems } });
  });
}

export function fetchAllBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/brands", {
      method: "GET",
      credentials: "include",
    });
    const data = response.json();
    resolve({ data });
  });
}

export function fetchAllCategories() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/categories", {
      method: "GET",
      credentials: "include",
    });
    const data = response.json();
    resolve({ data });
  });
}
export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/products/${id}`, {
      method: "GET",
      credentials: "include",
    });
    const data = response.json();
    resolve({ data });
  });
}

// This api is used by admin to add products
export function createProduct(productData) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/products", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(productData),
      headers: { "content-type": "application/json" },
    });
    const data = response.json();
    resolve({ data });
  });
}

// This api is used by admin to edit products
export function updateProduct(productData) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8080/products/" + productData.id,
      {
        method: "PATCH",
        credentials: "include",
        body: JSON.stringify(productData),
        headers: { "content-type": "application/json" },
      }
    );
    const data = await response.json();
    resolve({ data });
  });
}
