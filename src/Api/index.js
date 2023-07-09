import axios from "axios";
import { notification } from "antd";


export const getAllPrducts = async () => {
  try {
    const response = await axios.get("https://dummyjson.com/products");
    if (!response) {
      throw new Error("No Products Found");
    }
    return response.data;
  } catch (error) {
    notification.open({
      message: "Error",
      description: error,
      duration: 3,
      placement: "topRight",
    });
  }
};

export const getProductsByCategory = async (category) => {
  try {
    const response = await axios.get(
      `https://dummyjson.com/products/category/${category}`
    );
    if (!response) {
      throw new Error("No Products Found");
    }
    return response.data;
  } catch (error) {
    notification.open({
      message: "Error",
      description: error,
      duration: 3,
      placement: "topRight",
    });
  }
};
export const addToCartHandler = async (id) => {
  try {
    const response = await axios.post("https://dummyjson.com/carts/add", {
      userId: 1,
      products: [
        {
          id: id,
          quantity: 1,
        },
      ],
    });
    if (!response) {
      throw new Error("Cannot Add Item To The Cart");
    }
    return response.data;
  } catch (error) {
    notification.open({
      message: "Error",
      description: error,
      duration: 3,
      placement: "topRight",
    });
  }
};

export const getCartItem = async () => {
  try {
    const response = await axios.get("https://dummyjson.com/carts/1");
    if (!response) {
      throw new Error("Your Cart Is Empty, Please Add Some");
    }
    return await response.data;
    
  } catch (error) {
    notification.open({
      message: "Error",
      description: error,
      duration: 3,
      placement: "topRight",
    });
  }
};
