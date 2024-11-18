import axios from "axios";
import { defineStore } from "pinia";

export const useProductStore = defineStore("productStore", {
  // Defining Initial State
  state: () => ({
    products: [],
  }),
  // Defining Actions
  actions: {
    // Defining asynchronous function for API call
    async fetchProducts() {
      try {
        const fetchResponse = await axios.get(
          "http://localhost:3000/shop-items"
        );
        this.products = fetchResponse.data.shopItems;
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    },
  },
});
