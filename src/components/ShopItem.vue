<script setup>
import { useCategoryStore } from "@/stores/categoryStore";
import { useProductStore } from "@/stores/productStore";
import { storeToRefs } from "pinia";
import { onMounted, reactive, ref } from "vue";

// Reactive state for dialog visibility
const isActive = ref(false);
const shopItems = useProductStore();
const { products } = storeToRefs(shopItems);
const category = useCategoryStore();
const { categories } = storeToRefs(category);

const form = reactive({
  id: null,
  name: "",
  imageUrl: "",
  price: 0,
  categoryId: null,
});

onMounted(() => {
  shopItems.fetchAllShopItems();
  category.getProductCategory();
});

// Handler to open the dialog
const onAddProductHandler = () => {
  isActive.value = true;
  form.id = null;
  form.imageUrl = "";
  form.name = "";
  form.price = 0;
  form.categoryId = null;
};

const onModalCloseHandler = () => {
  isActive.value = false;
};

const onSubmitHandler = () => {
  const { id, name, imageUrl, categoryId, price } = form;
  if (name && imageUrl && price && categoryId) {
    if (id !== null) {
      shopItems.updateShopItemHandler({
        id,
        name,
        imageUrl,
        categoryId,
        price,
      });
    } else {
      shopItems.addShopItem({
        name,
        imageUrl,
        price,
        categoryId,
      });
    }
    isActive.value = false;
  } else {
    alert("Please fill in all fields");
  }
};

const onEditProductHandler = (product) => {
  isActive.value = true;
  form.id = product._id;
  form.name = product.name;
  form.imageUrl = product.imageUrl;
  form.price = product.price;
  form.categoryId = product.categoryId;
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
          <th class="text-left">Product Category</th>
          <th class="text-left">Image URL</th>
          <th class="text-left">Price</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in products" :key="product._id">
          <td>{{ index }}</td>
          <td>{{ product.name }}</td>
          <td>
            {{
              categories.find((cate) => cate._id === product.categoryId)
                ?.title ?? "-"
            }}
          </td>
          <td>{{ product.imageUrl }}</td>
          <td>$ {{ product.price ?? "0" }}</td>
          <td>
            <v-btn @click="onEditProductHandler(product)">
              <font-awesome-icon :icon="['fas', 'pen-to-square']" />
            </v-btn>
          </td>
          <td>
            <v-btn
              class="delete-button"
              @click="shopItems.removeShopItem(product._id)"
            >
              <font-awesome-icon :icon="['fas', 'trash']" />
            </v-btn>
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
              v-model="form.name"
            ></v-text-field>
          </v-sheet>
        </v-col>
        <v-col cols="12" sm="6">
          <v-sheet class="mx-2">
            <v-text-field
              label="Image URL"
              v-model="form.imageUrl"
              variant="outlined"
            ></v-text-field>
          </v-sheet>
        </v-col>
        <v-col cols="12" sm="6">
          <v-sheet class="mx-2">
            <v-text-field
              label="Price"
              v-model="form.price"
              variant="outlined"
            ></v-text-field>
          </v-sheet>
        </v-col>
        <v-col cols="12" sm="6">
          <v-sheet class="mx-2">
            <v-select
              label="Product Category"
              v-model="form.categoryId"
              :items="categories"
              item-value="_id"
              item-text="title"
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
        <v-btn text class="delete-button" @click="onSubmitHandler"
          >Submit</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
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

.delete-button {
  background-color: #293241;
}
</style>
