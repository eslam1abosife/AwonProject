import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "tailwindcss/tailwind.css";
import "bootstrap/dist/css/bootstrap.css";
import "notyf/notyf.min.css";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
// pinia config
import { createPinia } from "pinia";

// Emitter configuration
import mitt from "mitt";
const Emitter = mitt();
//VueDraggable
import VueDraggable from "vue-draggable";
// Vuetify

import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
    theme: {
        defaultTheme: "myCustomLightTheme",
        themes: {
            myCustomLightTheme: {
                defaultTheme: "dark",
            },
        },
    },
    components,
    directives,
});

// Mdi_Fonts
import "@mdi/font/css/materialdesignicons.css";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";

library.add(faCoffee);

// تسجيل مكون FontAwesomeIcon
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
library.add(fab);
library.add(fas);

// Add firebase
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDF7ohgD5ohpCZwHQz1wmsPixR7dv19ETo",
    authDomain: "awn--project.firebaseapp.com",
    projectId: "awn--project",
    storageBucket: "awn--project.appspot.com",
    messagingSenderId: "477381368618",
    appId: "1:477381368618:web:8a62011671fc3a3eeb1c53",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
app;

createApp(App)
    //.use(store)
    .use(router)
    .use(vuetify)
    .use(VueDraggable)
    .component("font-awesome-icon", FontAwesomeIcon)
    .provide("Emitter", Emitter)
    .use(createPinia())
    .use(Toast, { position: "top-right", timeout: 3000 })
    .mount("#app");
