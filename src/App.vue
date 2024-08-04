<template>
    <nav>
        <TheHeader />
    </nav>

    <router-view style="margin-top: 150px !important" />
</template>

<script>
import TheHeader from "@/components/TheHeader.vue";
import "bootstrap/dist/css/bootstrap.css";

export default {
    data() {
        return {
            theme: "",
            modtheme: true,
        };
    },
    components: {
        TheHeader,
    },
    methods: {
        toggleTheme() {
            if (this.modtheme) {
                this.theme = "dark";
                this.modtheme = false;
            } else {
                this.theme = "Light";
                this.modtheme = true;
            }
        },
    },
};
</script>

<style lang="scss">
* {
    direction: rtl !important;
}
:root {
    --main-color: #0088ff;
    --secound-color: #eee;
    --therd-color: #7a7a7a;
}
body {
    direction: rtl;
    font-family: "Cairo", sans-serif;
    font-variation-settings: "slnt" 0;
    font-optical-sizing: auto;
    font-weight: 400;
    font-style: normal;
}
ul {
    margin: 0;
    list-style: none;
    padding: 0;
}
a {
    text-decoration: none;
}
.container {
    width: 90%;
    margin: auto;
}
/* أنماط CSS للثيم المظلم */
.dark-theme {
    background-color: #333;
    color: #fff;
}

/* أنماط CSS للثيم الفاتح */
.light-theme {
    background-color: #fff;
    color: #333;
}
.dach_cher {
    display: none;
    background-color: #ffdddd;
    color: #d8000c;
    border: 1px solid #d8000c;
    padding: 10px;
    margin: 20px 0;
    text-align: center;
    border-radius: 5px;
    font-size: 16px;
}

.dach_cher.show {
    display: block;
    animation: fadeIn 0.5s;
}
p {
    margin: 0;
}
input:focus {
    outline: none;
}
@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
.Vue-Toastification__toast--success {
    background: var(--main-color) !important;
    color: white !important;
    z-index: 1000000000000000000000000000000;
}
body.dark-mode {
    background-color: #072756;
    color: #ffffff;
}
body.dark-mode .header {
    background: #072756;
    box-shadow: 0 0 10px;
    color: black;
    opacity: 0.9;
}
// .v-field {
//     color: var(--main-color);
// }
body.dark-mode .v-field {
    color: white;
}
body.dark-mode .v-navigation-drawer {
    background: #072756 !important;
}
body.dark-mode .v-navigation-drawer__content {
    background-color: #072756;
    color: #ffffff;
}
body.dark-mode .v-tabs {
    background-color: #082c62 !important;
    color: #ffffff;
}
body.dark-mode .v-divider {
    // background-color: ;
    color: #465a75 !important;
}
body.dark-mode .container_0 {
    background: #1a355a;
    color: #ffffff;
}
body.dark-mode .box {
    background: #082c62 !important;
    color: #ffffff;
}
body.dark-mode .box .name,
body.dark-mode .box .permissions_1 {
    color: #ffffff !important;
}
body.dark-mode .v-card {
    background: #082c62 !important;
    color: #ffffff;
}
body.dark-mode .salheat .v-field__field,
body.dark-mode .salheat .v-field__append-inner i {
    color: #465a75 !important;
}
.salheat .v-field__field,
.salheat .v-field__append-inner i {
    color: var(--main-color) !important;
}
body.dark-mode .User_box {
    background: #082c62 !important;
}
body.dark-mode .svg-inline--fa.fa-users {
    color: white !important;
}
body.dark-mode .masaaed {
    color: white !important;
}
body.dark-mode hr {
    color: #082c62 !important;
}

body.dark-mode .Vue-Toastification__toast--success {
    background: #072756 !important;
    color: white !important;
    z-index: 1000000000000000000000000000000;
}
// body.dark-mode .v-field {
// }
body.dark-mode .v-sheet {
    background: #072756 !important;
    color: white !important;
}
body.dark-mode .tafasel {
    color: white !important;
}
body.dark-mode .details {
    background: #072756 !important;
}
.v-slide-group__next,
.v-slide-group__prev {
    display: none !important;
}
body.dark-mode .profile::before {
    background: none !important;
}
body.dark-mode .nav_sin {
    background: #072756 !important;
    color: white !important;
}
body.dark-mode .the_header::before {
    background: #072756 !important;
}
body.dark-mode .v-form .salheat {
    color: white !important;
}
body.dark-mode .v-form .salheat .v-field {
    background: none !important;
}
body.dark-mode .v-form .salheat .v-label.v-field-label {
    color: white !important;
}
body.dark-mode .v-form .salheat .mdi-menu-down {
    color: white !important;
}
body.dark-mode .v-form .add {
    background: #082c62;
    color: #fff;

    &:hover {
        background: #072756;

        color: #fff;
    }
}
body.dark-mode .permissions_2 {
    background: #072756 !important;
    color: #fff !important;
}
body.dark-mode .box {
    .Row {
        &:last-child::before {
            background: #072756 !important;
        }
        span {
            .number {
                background: #072756 !important;
                color: #ddd;
                box-shadow: 0 0 10px #ddd;
            }
            .name {
                font-weight: bold;
                color: var(--therd-color);
            }
        }
    }
}
body.dark-mode .mahtagn_tap {
    color: white !important;
}
body.dark-mode #menu-activator {
    color: white !important;
}
body.dark-mode .v-card {
    color: white !important;
}
body.dark-mode .v-select__selection {
    color: white !important;
    background: #072756 !important;
    border-radius: 20px !important;
}
body.dark-mode .text-h5 {
    color: white !important;
}
body.dark-mode .login,
body.dark-mode .register {
    color: white !important;
    background: #072756 !important;
}
body.dark-mode .use .title {
    color: white !important;
    background: #072756 !important;
}
.body.dark-mode .right {
    color: white !important;
}
ul.v-pagination__list {
    display: inline-flex;
    list-style-type: none;
    justify-content: center;
    width: 90%;
    margin: 0 auto;
    overflow: hidden;
}
</style>
