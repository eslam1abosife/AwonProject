<template>
    <v-dialog activator="parent" max-width="90%">
        <template v-slot:default="{ isActive }">
            <v-card class="popup" rounded="lg">
                <v-card-title class="d-flex justify-space-between align-center">
                    <div class="text-h5 ps-2" style="color: var(--main-color)">
                        تسجيل دخول
                    </div>
                    <v-btn
                        style="color: var(--main-color)"
                        icon="mdi-close"
                        variant="text"
                        @click="isActive.value = false"
                    ></v-btn>
                </v-card-title>

                <div class="The_Signin">
                    <v-container class="form_container mt-4">
                        <Offline_error>
                            <template v-slot:default>
                                <span class="pr-8">{{ selectedRole }}</span>
                                <!--get the data from the Charities using v-model-->

                                <form
                                    ref="form"
                                    @submit.prevent="validateForm"
                                    class="ma-auto"
                                    action="post"
                                >
                                    <v-select
                                        v-model="selectedRole"
                                        :items="roles"
                                        label="أختر صلاحية الدخول"
                                        variant="outlined"
                                        @blur="handleroles"
                                        @click="handleroles"
                                    ></v-select>

                                    <v-text-field
                                        v-show="show"
                                        v-model="user.nationalID"
                                        variant="outlined"
                                        label="الرقم القومي"
                                        class="mt-2"
                                        :error-messages="
                                            v$.user.nationalID.$errors.map(
                                                (e) => e.$message
                                            )
                                        "
                                    ></v-text-field>
                                    <v-text-field
                                        v-show="show"
                                        v-model="user.password"
                                        :type="inputType"
                                        variant="outlined"
                                        label="الباسورد"
                                        placeholder="ادخل كلمة سر من 8 حروف أرقام وحرف واحد كبير على الأقل"
                                        class="mt-2"
                                        @focus="isFocused = true"
                                        @blur="isFocused = false"
                                        :error-messages="
                                            v$.user.password.$errors.map(
                                                (e) => e.$message
                                            )
                                        "
                                        :append-inner-icon="
                                            showPassword
                                                ? 'mdi-eye'
                                                : 'mdi-eye-off'
                                        "
                                        @click:append-inner="toggleShowPassword"
                                    ></v-text-field>
                                    <span
                                        class="hint"
                                        v-if="!regex1 && isFocused"
                                        style="
                                            display: block;
                                            margin-right: 15px;
                                            margin-bottom: 15px;
                                            font-size: small;
                                            color: #af0829;
                                        "
                                    >
                                        ادخل كلمة سر من 8 حروف أرقام وحرف واحد
                                        كبير على الأقل
                                    </span>
                                    <a
                                        class="ms-2 mb-1 cursor-pointer"
                                        style="color: var(--main-color)"
                                        @click.stop="isActive.value = false"
                                        @click="$router.push('/Reset_Password')"
                                    >
                                        هل نسيت كلمة المرور؟
                                    </a>
                                    <v-btn
                                        class="d-flex align-center mt-4 mb-10"
                                        type="submit"
                                        style="
                                            background-color: var(--main-color);
                                            width: 100%;
                                            color: white;
                                            font-size: 16px;
                                            margin: auto;
                                        "
                                        @click="Sing_In"
                                    >
                                        تسجيل الدخول
                                    </v-btn>
                                    <v-divider></v-divider>
                                    <!-- create account -->
                                    <v-col
                                        cols="12"
                                        class="text-center text-base d-flex align-center justify-space-between flex-wrap mt-4 mb-4"
                                    >
                                        <span style="color: var(--therd-color)"
                                            >هل أنت جديد على منصتنا؟
                                        </span>
                                        <div
                                            class="register cursor-pointer"
                                            style="color: var(--main-color)"
                                            @click="openRegistrationDialog"
                                        >
                                            حساب جديد
                                        </div>
                                        <TheRegister />
                                    </v-col>
                                </form>
                            </template>
                        </Offline_error>
                    </v-container>
                </div>
            </v-card>
        </template>
    </v-dialog>
</template>

<script>
import Offline_error from "@/components/Offline_error.vue";
import TheRegister from "@/components/The_Register.vue";
import useVuelidate from "@vuelidate/core";
import { required, minLength, numeric, helpers } from "@vuelidate/validators";

// firebase
// Import the functions you need from the SDKs you need
import { initializeApp } from "@firebase/app";
import { getFirestore, getDocs, collection } from "firebase/firestore";

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
    components: { TheRegister, Offline_error },
    props: ["Check_User"],
    inject: ["Emitter"],
    setup() {
        return {
            v$: useVuelidate(),
        };
    },
    data() {
        return {
            showPassword: false,
            selectedRole: null,
            regex1: true,
            show: false,
            active: this.IsActive,
            roles: ["مشرف", "مالك", "مساعد"],
            isActive: { value: true }, // Assuming this controls visibility of something else
            showRegistrationDialog: false,
            isVisible: false, // Initially hide the v-select
            user: {
                nationalID: "",
                password: "Mo-on-1000",
                type: "",
            },
        };
    },
    //form validation
    validations() {
        return {
            user: {
                nationalID: {
                    required: helpers.withMessage(
                        "ادخل الرقم القومي ",
                        required
                    ),
                    numeric: helpers.withMessage("ادخل أرقام فقط", numeric),
                    minLength: helpers.withMessage(
                        "ادخل عنوان مكون من 14 أرقام على الأقل",
                        minLength(14)
                    ),
                },
                password: {
                    required: helpers.withMessage("ادخل باسورد", required),
                    regex1: function (value) {
                        const regexPattern =
                            /^(?=.\d)(?=.[a-z])(?=.[A-Z])(?=.[a-zA-Z]).{8,}$/;
                        const matchResult = regexPattern.test(value);
                        this.regex1 = matchResult;
                        return matchResult;
                    },
                },
            },
        };
    },
    computed: {
        inputType() {
            return this.showPassword ? "text" : "password";
        },
    },
    mounted() {
        // Method to check internet connection status
        this.startInternetCheckerUse();
    },
    methods: {
        // Method to check internet connection status
        startInternetCheckerUse() {
            this.Emitter.emit("startInternetChecker");
        },
        handleroles() {
            console.log("Handleroles function called on blur");
            if (this.selectedRole === "مشرف") {
                this.user.type = "admin";
                this.user.nationalID = "12345678901111";
            } else if (this.selectedRole === "مالك") {
                this.user.type = "owner";
                this.user.nationalID = "876898746783876";
            } else if (this.selectedRole === "مساعد") {
                this.user.type = "assistant";
                this.user.nationalID = "876898741083876";
            }
        },
        openRegistrationDialog() {
            this.showRegistrationDialog = true;
        },
        closeRegistrationDialog() {
            this.showRegistrationDialog = false;
        },
        handleForgotPasswordClick() {
            // Close the signin dialog
            this.$emit("update:isActive", false);
            // Navigate to the reset password page
            this.$router.push("/Reset_Password");
        },
        toggleShowPassword() {
            this.showPassword = !this.showPassword;
        },
        checkDataExists() {
            return !(this.user.nationalID == "" && this.user.password == "");
        },
        async validateForm() {
            const dataExists = this.checkDataExists();
            this.v$.$validate();
            if (dataExists) {
                this.v$.$validate();
                await this.$nextTick();
                if (!this.v$.$error) {
                    console.log("Data filled and Form submitted successfully");
                    console.log("User", this.user);
                    this.isActive = false; // Close the dialog
                    this.v$.$reset();
                } else {
                    console.log("Data not all filled Validation errors found");
                }
            } else {
                console.log("Data required");
            }
        },
        async Sing_In() {
            const querySnapshot = await getDocs(collection(db, "Users"));
            querySnapshot.forEach((doc) => {
                if (
                    doc.data().nationalID === this.user.nationalID &&
                    doc.data().password === this.user.password
                ) {
                    console.log(doc.id, " => ", doc.data().charity_ID);
                    localStorage.setItem("id", doc.id);
                    localStorage.setItem("charity_ID", doc.data().charity_ID);
                    setTimeout(() => {
                        this.Check_User();
                    }, 100);
                    this.isActive = false; // Close the dialog
                    this.v$.$reset();
                }
            });
        },
    },
};
</script>

<style lang="scss" scoped>
form {
    width: 100% !important;
}
.popup {
    padding: 20px;
    font-family: "Cairo", sans-serif !important;
    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #fafafa;
        border-radius: 5px;
        padding: 10px;
        font-size: 21px;
        color: #0088ff;
        font-weight: bold;
    }
}
</style>
