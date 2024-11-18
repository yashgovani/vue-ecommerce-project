import "./assets/main.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Toast, { POSITION } from "vue-toastification"; // Import the Toast plugin
import "vue-toastification/dist/index.css";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);
library.add(faTrash, faPenToSquare);
app.component("font-awesome-icon", FontAwesomeIcon);

const vuetify = createVuetify({
  components,
  directives,
});

app.use(vuetify);
app.use(createPinia());
app.use(router);
app.use(Toast, {
  position: POSITION.BOTTOM_RIGHT, // Position of the toast notifications
  timeout: 5000, // How long the toast stays visible (in ms)
  closeOnClick: true, // Close toast on click
  pauseOnHover: true, // Pause the toast when hovered over
});

app.mount("#app");
