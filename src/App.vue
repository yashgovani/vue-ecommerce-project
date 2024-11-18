<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <div class="logo">
          <img alt="Vue logo" src="@/assets/logo.png" width="125" height="40" />
        </div>
        <div class="nav-links">
          <router-link to="/">Home</router-link>
          <router-link to="/product-category">Product Category</router-link>
          <router-link to="/shop-items">Shop Items</router-link>
        </div>
      </nav>
    </div>
  </header>
  <RouterView />
</template>

<style scoped>
header {
  position: sticky;
  top: 0;
  width: 100%;
  background-color: #98c1d9;
}

nav {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  justify-items: center;
  align-items: center;
}

nav .logo {
  padding-left: 2%;
}

nav .nav-links {
  display: flex;
}

nav .nav-links a {
  background-color: #293241;
  color: #e0fbfc;
  padding: 8px;
  font-size: 12px;
  font-weight: bold;
  text-decoration: none;
  border-radius: 8px;
  margin-right: 15px;
}

.router-link-exact-active {
  background-color: white !important;
  color: black !important;
}
</style>
