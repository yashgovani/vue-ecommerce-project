<script setup>
import { useDashboardStore } from "@/stores/dashboardStore";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

const dashboardData = useDashboardStore();
const { categoryDistribution, productCategoryCount, shopItemCount } =
  storeToRefs(dashboardData);

onMounted(() => {
  dashboardData.getDashboardData();
});
</script>
<template>
  <div class="container">
    <div class="header-item">
      <h2>Dashboard</h2>
    </div>
    <v-row>
      <v-col cols="12" md="6" sm="6">
        <div class="card">
          <div>Product Category</div>
          <div>{{ productCategoryCount }}</div>
        </div>
      </v-col>
      <v-col cols="12" md="6" sm="6">
        <div class="card">
          <div>Shop Items</div>
          <div>{{ shopItemCount }}</div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column; /* Stack the content vertically */
  justify-content: center; /* Vertically center the content */
  align-items: center; /* Horizontally center the content */
  background-color: #e0fbfc;
  height: 200px;
  border-radius: 8px;
  margin: 5px 2%;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px,
    rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;
}

.card div {
  font-size: 16px;
  font-weight: bold;
  color: #293241;
}
</style>
