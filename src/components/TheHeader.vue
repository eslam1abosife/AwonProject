<template>
    <header class="header" :theme="triggerToggleTheme">
        <div class="container">
            <div class="logo">
                <router-link to="/">
                    <img
                        style="width: 75px; filter: hue-rotate(25deg)"
                        src="../assets/images/new-logo.png"
                        alt="Logo"
                    />
                </router-link>
            </div>

            <div class="Login_Register">
                <div class="login">
                    <router-link
                        to="/"
                        style="color: var(--main-color); font-weight: bold"
                    >
                        الرئيسية
                    </router-link>
                </div>

                <div
                    class="User_box"
                    style="color: var(--main-color); font-weight: bold"
                    v-if="!User.User_State"
                    @click="drawer = !drawer"
                >
                    <div
                        @click="Box_User = !Box_User"
                        @click.stop="drawer = !drawer"
                        id="menu-activator"
                    >
                        {{ User.User_name }}
                    </div>
                    <div class="User_box">
                        <v-menu
                            transition="scale-transition"
                            activator="#menu-activator"
                        >
                            <v-list nav class="nav_sin">
                                <v-list-item>
                                    مرحباً {{ User_FullName }}
                                </v-list-item>
                                <v-list-item
                                    v-if="User.type === 'owner'"
                                    @click="
                                        $router.push('/DashBoard_charities')
                                    "
                                >
                                    إدارة الحالات
                                </v-list-item>
                                <v-list-item
                                    v-if="User.type === 'admin'"
                                    @click="$router.push('/DashBoard_Admin')"
                                >
                                    إدارة الموقع
                                </v-list-item>

                                <v-list-item
                                    v-if="User.type === 'owner'"
                                    link
                                    @click="$router.push('/Settings_Admin')"
                                >
                                    الاعدادات
                                </v-list-item>
                                <!-- <v-list-item @click="Sign_Out">
                                    <v-icon>mdi-export</v-icon> تسجيل خروج
                                </v-list-item> -->
                            </v-list>
                        </v-menu>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
import { ref } from "vue";
// firebase
import { initializeApp } from "@firebase/app";
import { doc, getDoc, getFirestore } from "@firebase/firestore";

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
const db = getFirestore(app);
export default {
    name: "TheHeader",
    inject: ["Emitter"],

    mounted() {
        this.Check_User();
    },
    data() {
        return {
            triggerToggleTheme: false,
            drawer: ref(false),
            Box_User: null,
            isChecked: false,
            User_FullName: "",
            User: {
                User_State: true,
                User_name: "",
                User_FullName: "",
                type: "",
            },
        };
    },
    methods: {
        toggleTheme() {
            document.body.classList.toggle("dark-mode", this.isChecked);
        },
        async Check_User() {
            console.log("Check_User");
            if (localStorage.getItem("id")) {
                const docRef = doc(db, "Users", localStorage.getItem("id"));
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    console.log("Document data:", docSnap.data());
                    this.User.User_State = false;
                    const userData = docSnap.data();
                    this.User_FullName = userData.name;
                    this.User.type = userData.type || "";
                    this.User.User_name = userData.name
                        .split(" ")
                        .map((name) => name.charAt(0))
                        .join(" ");
                    console.log("this.User.User_name", this.User.User_name);
                } else {
                    console.log("No such document!");
                }
            }
        },
        Sign_Out() {
            localStorage.removeItem("id");
            localStorage.removeItem("charity_ID");
            this.User.User_State = true;
            this.$router.push("/");
        },
    },
};
</script>

<style lang="scss" scoped>
.header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: white;
    box-shadow: 0 0 10px #ddd;
    z-index: 10;
    .container {
        padding: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .logo {
            width: 100px;
        }
        .Login_Register {
            display: flex;
            gap: 10px;
            align-items: center;
            & > div {
                background: #eee;
                padding: 10px;
                border-radius: 5px;
                cursor: pointer;
            }
        }
    }
}

.switch {
    font-size: 17px;
    position: relative;
    display: inline-block;
    width: 64px;
    height: 34px;
}

.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #73c0fc;
    transition: 0.4s;
    border-radius: 30px;
}

.slider:before {
    position: absolute;
    content: "";
    height: 30px;
    width: 30px;
    border-radius: 20px;
    left: 2px;
    bottom: 2px;
    z-index: 2;
    background-color: #e8e8e8;
    transition: 0.4s;
}

.sun svg {
    position: absolute;
    top: 6px;
    left: 36px;
    z-index: 1;
    width: 24px;
    height: 24px;
}

.moon svg {
    fill: #73c0fc;
    position: absolute;
    top: 5px;
    left: 5px;
    z-index: 1;
    width: 24px;
    height: 24px;
}

.sun svg {
    animation: rotate 15s linear infinite;
}

@keyframes rotate {
    0% {
        transform: rotate(0);
    }
    100% {
        transform: rotate(360deg);
    }
}

.moon svg {
    animation: tilt 5s linear infinite;
}

@keyframes tilt {
    0% {
        transform: rotate(0deg);
    }
    25% {
        transform: rotate(-10deg);
    }
    75% {
        transform: rotate(10deg);
    }
    100% {
        transform: rotate(0deg);
    }
}

.input:checked + .slider {
    background-color: #183153;
}

.input:focus + .slider {
    box-shadow: 0 0 1px #183153;
}

.input:checked + .slider:before {
    transform: translateX(30px);
}
.header .slider {
    background-color: var(--main-color);
}
</style>
