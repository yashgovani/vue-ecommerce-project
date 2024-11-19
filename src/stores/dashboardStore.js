import { fetchDashboardData } from "@/utility/utility";
import { defineStore } from "pinia";

export const useDashboardStore = defineStore("dashboardStore", {
  // Defining Initial State
  state: () => ({
    productCategoryCount: 0,
    shopItemCount: 0,
    categoryDistribution: [],
  }),
  // Defining Actions
  actions: {
    async getDashboardData() {
      try {
        const fetchResponse = await fetchDashboardData();

        this.productCategoryCount = fetchResponse.data.productCategoryCount;
        this.shopItemCount = fetchResponse.data.shopItemCount;
        this.categoryDistribution = [
          ...fetchResponse.data.categoryDistribution,
        ];
      } catch (error) {
        console.error("Error while fetching dashboard data", error);
      }
    },
  },
});
