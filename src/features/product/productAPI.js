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
    const response = await fetch(
      `https://e-commerce-back-end-three.vercel.app/products?${queryStr}`
    );
    const data = await response.json();
    const totalItems = await response.headers.get("X-Total-Count");
    resolve({ data: { products: data, totalItems: totalItems } });
  });
}

export function fetchAllBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "https://e-commerce-back-end-three.vercel.app/brands"
    );
    const data = response.json();
    resolve({ data });
  });
}

export function fetchAllCategories() {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "https://e-commerce-back-end-three.vercel.app/categories"
    );
    const data = response.json();
    resolve({ data });
  });
}
export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      `https://e-commerce-back-end-three.vercel.app/products/${id}`
    );
    const data = response.json();
    resolve({ data });
  });
}

// This api is used by admin to add products
export function createProduct(productData) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "https://e-commerce-back-end-three.vercel.app/products",
      {
        method: "POST",
        body: JSON.stringify(productData),
        headers: { "content-type": "application/json" },
      }
    );
    const data = response.json();
    resolve({ data });
  });
}

// This api is used by admin to edit products
export function updateProduct(productData) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "https://e-commerce-back-end-three.vercel.app/products/" + productData.id,
      {
        method: "PATCH",
        body: JSON.stringify(productData),
        headers: { "content-type": "application/json" },
      }
    );
    const data = await response.json();
    resolve({ data });
  });
}
