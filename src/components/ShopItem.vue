<script setup>
import { useCategoryStore } from "@/stores/categoryStore";
import { useProductStore } from "@/stores/productStore";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";

// Reactive state for dialog visibility
const isActive = ref(false);
const shopItems = useProductStore();
const { products } = storeToRefs(shopItems);
const category = useCategoryStore();
const { categories } = storeToRefs(category);

onMounted(() => {
  shopItems.fetchProducts();
});

// Handler to open the dialog
const onAddProductHandler = () => {
  isActive.value = true;
  category.getProductCategory();
};

const onModalCloseHandler = () => {
  isActive.value = false;
};
</script>

<template>
  <div class="container">
    <div class="header-item">
      <h2>Shop Items</h2>
      <!-- Trigger button to show the dialog -->
      <button @click="onAddProductHandler">Add Shop Items</button>
    </div>
    <v-table>
      <thead>
        <tr>
          <th class="text-left">Id</th>
          <th class="text-left">Product Name</th>
          <th class="text-left">Image URL</th>
          <th class="text-left">Price</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product._id">
          <td>{{ product._id }}</td>
          <td>{{ product.name }}</td>
          <td>{{ product.imageUrl }}</td>
          <td>$ {{ product.price ?? "0" }}</td>
          <td @click="onEditProductHandler(product)">
            <font-awesome-icon :icon="['fas', 'pen-to-square']" />
          </td>
          <td @click="category.removeProductCategory(product._id)">
            <font-awesome-icon :icon="['fas', 'trash']" />
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
  <!-- Dialog component controlled by isActive -->
  <v-dialog v-model="isActive" max-width="500">
    <v-card title="Add Shop Items">
      <v-row no-gutters>
        <v-col cols="12" sm="6">
          <v-sheet class="mx-2">
            <v-text-field
              label="Product Name"
              variant="outlined"
            ></v-text-field>
          </v-sheet>
        </v-col>
        <v-col cols="12" sm="6">
          <v-sheet class="mx-2">
            <v-text-field label="Image URL" variant="outlined"></v-text-field>
          </v-sheet>
        </v-col>
        <v-col cols="12" sm="6">
          <v-sheet class="mx-2">
            <v-text-field label="Price" variant="outlined"></v-text-field>
          </v-sheet>
        </v-col>
        <v-col cols="12" sm="6">
          <v-sheet class="mx-2">
            <v-select
              label="Product Category"
              :items="categories"
              variant="outlined"
            >
            </v-select>
          </v-sheet>
        </v-col>
      </v-row>
      <v-card-actions>
        <v-spacer></v-spacer>
        <!-- Close button for the dialog -->
        <v-btn text @click="onModalCloseHandler">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.header-item {
  padding-top: 10px;
  display: flex;
  justify-content: space-between;
}

h2 {
  margin-left: 2%;
}

.v-table {
  border-radius: 8px;
  margin: 10px 2% 0px 2%;
  height: 85%;
  overflow: auto;
}

thead th {
  position: sticky;
  top: 0;
  background-color: #ffffff;
  z-index: 1;
}

thead {
  background-color: #f7f7f7;
}

th {
  padding: 10px;
  text-align: left;
  font-weight: bold !important;
}

button {
  margin-right: 2%;
  background-color: #ee6c4d;
  color: #e0fbfc;
  padding: 8px;
  font-size: 12px;
  font-weight: bold;
  border-radius: 8px;
}
</style>
