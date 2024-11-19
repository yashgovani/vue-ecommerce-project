import { createRouter, createWebHistory } from "vue-router";
import ProductCategoryForm from "@/components/ProductCategoryForm.vue";
import Welcome from "@/components/Welcome.vue";
import ShopItem from "@/components/ShopItem.vue";
import Dashboard from "@/components/Dashboard.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: Welcome,
    },
    {
      path: "/product-category",
      name: "product-category-form",
      component: ProductCategoryForm,
    },
    {
      path: "/shop-items",
      name: "shop-items",
      component: ShopItem,
    },
    {
      path: "/dashboard",
      component: Dashboard,
    },
  ],
});

export default router;
