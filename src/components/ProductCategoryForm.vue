<script setup>
import { useCategoryStore } from "@/stores/categoryStore";
import { storeToRefs } from "pinia";
import { onMounted, reactive, ref } from "vue";

const isActive = ref(false);
const category = useCategoryStore();
const { categories } = storeToRefs(category);

const form = reactive({
  id: null,
  title: "",
  imageUrl: "",
  size: null,
});

onMounted(() => {
  category.getProductCategory();
});

// Handler to open the dialog
const onAddProductHandler = () => {
  isActive.value = true;
  form.title = "";
  form.imageUrl = "";
  form.size = null;
};

const onModalCloseHandler = () => {
  isActive.value = false;
  form.id = null;
};

const onSubmitHandler = () => {
  if (form.title && form.imageUrl && form.size) {
    if (form.id !== null) {
      category.updateProductCategory({
        id: form.id,
        title: form.title,
        imageUrl: form.imageUrl,
        size: form.size,
      });
    } else {
      category.createProductCategory({
        title: form.title,
        imageUrl: form.imageUrl,
        size: form.size,
      });
    }
    form.id = null;
    isActive.value = false;
  } else {
    alert("Please fill in all fields");
  }
};

const onEditProductHandler = (product) => {
  isActive.value = true;
  form.id = product._id;
  form.title = product.title;
  form.imageUrl = product.imageUrl;
  form.size = product.size;
};
</script>

<template>
  <div class="container">
    <div class="header-item">
      <h2>Product Category</h2>
      <!-- Trigger button to show the dialog -->
      <button @click="onAddProductHandler">Add Product Category</button>
    </div>
    <v-table>
      <thead>
        <tr>
          <th class="text-left">Id</th>
          <th class="text-left">Product Title</th>
          <th class="text-left">Image URL</th>
          <th class="text-left">Size</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in categories" :key="product._id">
          <td>{{ product._id }}</td>
          <td>{{ product.title }}</td>
          <td>{{ product.imageUrl }}</td>
          <td>{{ product.size ?? "-" }}</td>
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
    <v-card title="Add Product Category">
      <v-row no-gutters>
        <v-col cols="12" sm="6">
          <v-sheet class="mx-2">
            <v-text-field
              label="Title"
              variant="outlined"
              v-model="form.title"
            ></v-text-field>
          </v-sheet>
        </v-col>
        <v-col cols="12" sm="6">
          <v-sheet class="mx-2">
            <v-text-field
              label="Image URL"
              variant="outlined"
              v-model="form.imageUrl"
            ></v-text-field>
          </v-sheet>
        </v-col>
        <v-col cols="12" sm="12">
          <v-sheet class="mx-2">
            <v-select
              label="Size"
              :items="['small', 'medium', 'large']"
              variant="outlined"
              v-model="form.size"
            >
            </v-select>
          </v-sheet>
        </v-col>
      </v-row>
      <v-card-actions>
        <v-spacer></v-spacer>
        <!-- Close button for the dialog -->
        <v-btn text @click="onModalCloseHandler">Close</v-btn>
        <v-btn text @click="onSubmitHandler">Submit</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.header-item {
  padding-top: 10px;
  display: flex;
  justify-content: space-between;
  margin: 0 2%;
}

button {
  background-color: #ee6c4d;
  color: #e0fbfc;
  padding: 8px;
  font-size: 12px;
  font-weight: bold;
  border-radius: 8px;
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
</style>
