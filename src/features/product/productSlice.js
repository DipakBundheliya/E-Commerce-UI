import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchProductsByFilter,
  fetchAllBrands,
  fetchAllCategories,
  fetchProductById,
  createProduct,
  updateProduct,
} from "./productAPI";

const initialState = {
  products: [],
  status: "idle",
  brands: [],
  categories: [],
  totalItems: 0,
  productById: null,
  productByIdStatus: "idle",
  pageNum: 1,
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.

export const fetchAllBrandsAsync = createAsyncThunk(
  "product/fetchAllBrands",
  async () => {
    const response = await fetchAllBrands();
    // The value we return becomes the `fulfilled` action payload

    return response.data;
  }
);
export const fetchAllCategoriesAsync = createAsyncThunk(
  "product/fetchAllCategories",
  async () => {
    const response = await fetchAllCategories();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const fetchProductsByFilterAsync = createAsyncThunk(
  "product/fetchProductsByFilter",
  async ({ filter, admin }) => {
    const response = await fetchProductsByFilter(filter, admin);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const fetchProductByIdAsync = createAsyncThunk(
  "product/fetchProductById",
  async (id) => {
    const response = await fetchProductById(id);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const createProductAsync = createAsyncThunk(
  "product/createProduct",
  async (data) => {
    const response = await createProduct(data);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const updateProductAsync = createAsyncThunk(
  "product/updateProduct",
  async (productData) => {
    const response = await updateProduct(productData);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setupPage: (state, action) => {
      state.pageNum = action.payload;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByFilterAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsByFilterAsync.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
        state.status = "idle";
      })
      .addCase(fetchAllBrandsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllBrandsAsync.fulfilled, (state, action) => {
        state.brands = action.payload;
        state.status = "idle";
      })
      .addCase(fetchAllCategoriesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllCategoriesAsync.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.status = "idle";
      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.productByIdStatus = "loading";
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.productById = action.payload;
        state.productByIdStatus = "idle";
      })
      .addCase(createProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.products.push(action.payload);
        state.status = "idle";
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.products.map((product, index) => {
          if (product.id === action.payload.id) {
            state.products.splice(index, 1, action.payload);
          }
        });
        state.status = "idle";
      });
  },
});

export const { setupPage } = productSlice.actions;

export const selectAllProducts = (state) => state.product.products;
export const selectTotalItems = (state) => state.product.totalItems;
export const selectTotalBrands = (state) => state.product.brands;
export const selectTotalCategories = (state) => state.product.categories;
export const selectedProductById = (state) => state.product.productById;
export const statusUpdate = (state) => state.product.status;
export const selectProductListStatus = (state) => state.product.status;
export const selectProductByIdStatus = (state) =>
  state.product.productByIdStatus;

export default productSlice.reducer;
