import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IUser, ProductType } from "../../Interface";
import BaseAxios from "../../Api/requsetToken";

export const getApiProducts = createAsyncThunk<ProductType>(
  "products",
  async () => {
    const response = await BaseAxios.get(
      "http://localhost:9000/api/v1/products"
    );
    return response.data;
  }
);
export const getApiCategories = createAsyncThunk<any>(
  "categories",
  async () => {
    const response = await BaseAxios.get(
      "http://localhost:9000/api/v1/categories"
    );
    return response.data;
  }
);
export const getApiBrands = createAsyncThunk<any>("brands", async () => {
  const response = await BaseAxios.get("http://localhost:9000/api/v1/brands");
  return response.data;
});
export const getApiProductSizes = createAsyncThunk<any>(
  "productSizes",
  async () => {
    const response = await BaseAxios.get(
      "http://localhost:9000/api/v1/productSizes"
    );
    return response.data;
  }
);
export const getCartByUser = createAsyncThunk<any>(
  "getCartByUser",
  async () => {
    const response = await BaseAxios.get(
      "http://localhost:9000/api/v1/carts/detail"
    );
    return response.data;
  }
);
export const getApiSizes = createAsyncThunk<any>("sizes", async () => {
  const response = await BaseAxios.get("http://localhost:9000/api/v1/sizes");
  return response.data;
});
export const getApiUsers = createAsyncThunk<IUser>("users", async () => {
  const response = await BaseAxios.get("http://localhost:9000/api/v1/users");
  return response.data;
});
export const getApiOrderItems = createAsyncThunk<any>(
  "orderItems",
  async () => {
    const response = await BaseAxios.get(
      "http://localhost:9000/api/v1/orderItems"
    );
    return response.data;
  }
);
export const getApiBank = createAsyncThunk<any>("banks", async () => {
  const response = await BaseAxios.get("http://localhost:9000/api/v1/banks");
  return response.data;
});
export const getDetailProduct = createAsyncThunk<any, any>(
  "getDetailProduct",
  async (id: any) => {
    const response = await BaseAxios.get(
      `http://localhost:9000/api/v1/products/${id}`
    );
    return response.data;
  }
);
export const getDetailUser = createAsyncThunk("getDetailUser", async () => {
  const response = await BaseAxios.get(`http://localhost:9000/api/v1/users/me`);
  return response.data;
});

export const getOrderApi = createAsyncThunk<any>("getOrderApi", async () => {
  const response = await BaseAxios.get("http://localhost:9000/api/v1/orders");
  return response.data;
});
export const getPayments = createAsyncThunk<any>("getPayments", async () => {
  const response = await BaseAxios.get("http://localhost:9000/api/v1/payments");
  return response.data;
});

export const getHistoryOrders = createAsyncThunk<any>(
  "getHistoryOrders",
  async () => {
    const response = await BaseAxios.get(
      "http://localhost:9000/api/v1/historyOrders"
    );
    return response.data;
  }
);
