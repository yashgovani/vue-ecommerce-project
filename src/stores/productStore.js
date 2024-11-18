import {
  createProducts,
  deleteProducts,
  fetchProducts,
  updateProducts,
} from "@/utility/utility";
import { useToast } from "vue-toastification";
import { defineStore } from "pinia";

const toast = useToast();

export const useProductStore = defineStore("productStore", {
  // Defining Initial State
  state: () => ({
    products: [],
  }),
  // Defining Actions
  actions: {
    // Defining asynchronous function for API call
    async fetchAllShopItems() {
      try {
        const fetchResponse = await fetchProducts();
        this.products = fetchResponse.data.shopItems;
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    },

    async addShopItem(product) {
      try {
        const response = await createProducts(product);
        toast.success(response.data.message);
        this.products.push(response.data.shopItem);
      } catch (error) {
        console.error("Error while adding shop item", error);
      }
    },

    async removeShopItem(productId) {
      try {
        const fetchResponse = await deleteProducts(productId);
        toast.success(fetchResponse.data.message);

        this.products = this.products.filter(
          (product) => product._id !== productId
        );
      } catch (error) {
        console.error("Error while deleting products", error);
      }
    },

    async updateShopItemHandler(product) {
      try {
        const fetchResponse = await updateProducts(product);
        toast.success(fetchResponse.data.message);

        const index = this.products.findIndex((p) => product.id === p._id);
        if (index !== -1) {
          this.products.splice(index, 1, fetchResponse.data.shopItem);
        }
      } catch (error) {
        console.error("Error while updating the data", error);
      }
    },
  },
});
