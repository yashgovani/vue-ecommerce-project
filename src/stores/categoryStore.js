import {
  fetchCategories,
  addProdcutCategory,
  updateProductCategory,
  deleteProductCategory,
} from "@/utility/utility";
import { defineStore } from "pinia";
import { useToast } from "vue-toastification";
const toast = useToast();

export const useCategoryStore = defineStore("categoryStore", {
  state: () => ({
    categories: [],
  }),
  actions: {
    async getProductCategory() {
      try {
        const response = await fetchCategories();
        this.categories = response.data.productCategories;
      } catch (error) {
        console.error("Fetch while loading category", error);
      }
    },
    async createProductCategory(category) {
      try {
        const response = await addProdcutCategory(category);
        toast.success(response.data.message);

        this.categories.push(response.data.product);
      } catch (error) {
        console.error("Failed while creating category", error);
      }
    },
    async updateProductCategory(category) {
      try {
        const fetchResponse = await updateProductCategory(category);
        toast.success(fetchResponse.data.message);
        const index = this.categories.findIndex((p) => category.id === p._id);
        if (index !== -1) {
          this.categories.splice(index, 1, fetchResponse.data.productCategory);
        }
      } catch (error) {
        console.error("Failed to update product", error);
      }
    },
    async removeProductCategory(id) {
      try {
        const response = await deleteProductCategory(id);
        toast.success(response.data.message);
        this.categories = this.categories.filter(
          (category) => category._id !== id
        );
      } catch (error) {
        console.error("Failed to delete product", error);
      }
    },
  },
});
