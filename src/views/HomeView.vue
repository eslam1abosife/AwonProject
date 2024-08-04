<template>
    <div
        style="
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 86.5vh;
            margin-top: 125px !important;
        "
    >
        <div class="container">
            <div class="right">
                <p class="landing">
                    مرحبًا بك في منصة <strong>عون</strong>! نود إعلامك بأن هذا
                    الموقع حاليًا في طور الإصدار التجريبي وللعرض فقط. نسعى
                    لتقديم أفضل تجربة للمستخدمين ونرحب بملاحظاتكم واقتراحاتكم
                    لتحسين خدماتنا. شكرًا لزيارتكم، ونتطلع لتقديم حلول مبتكرة
                    تلبي احتياجاتكم في المستقبل القريب.
                </p>
                <div class="The_Signin">
                    <div>
                        <Offline_error>
                            <template v-slot:default>
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
                                        v-if="User.User_State"
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

                                    <v-btn
                                        class="d-flex align-center mt-4 mb-10"
                                        type="submit"
                                        style="
                                            background-color: var(--main-color);
                                            width: 100%;
                                            color: white;
                                            font-size: 16px;
                                            margin: auto;
                                            padding: 25px 20px;
                                        "
                                        @click="Sing_In"
                                        v-if="User.User_State"
                                    >
                                        تسجيل الدخول
                                    </v-btn>
                                    <v-btn
                                        class="d-flex align-center mt-4 mb-10"
                                        type="submit"
                                        style="
                                            background-color: var(--main-color);
                                            width: 100%;
                                            color: white;
                                            font-size: 16px;
                                            margin: auto;
                                            padding: 20px;
                                        "
                                        @click="Sign_Out"
                                        v-if="!User.User_State"
                                    >
                                        تسجيل الخروج
                                    </v-btn>
                                </form>
                            </template>
                        </Offline_error>
                    </div>
                </div>
            </div>
        </div>
        <!-- footer & cta start -->
        <section class="footer bg-light mt-5" style="padding: 50px 0px 0">
            <div class="pb-0" id="contact">
                <div class="container" style="padding-bottom: 40px">
                    <div class="contact-item">
                        <div class="row align-items-center">
                            <div class="contact-info">
                                <div class="mb-4">
                                    <h2
                                        style="
                                            color: var(--main-color);
                                            font-weight: bold;
                                        "
                                    >
                                        لنتواصل
                                    </h2>
                                    <p class="text-muted mb-0 mt-3">
                                        منصة عون هي الشريك المثالي لكل جمعية
                                        تسعى لتحسين نظامها الإداري وتقديم أفضل
                                        الخدمات لمستفيديها. انضم إلى منصة عون
                                        اليوم واستفد من التكنولوجيا المتقدمة
                                        لخدمة مجتمعك بفعالية وكفاءة.
                                    </p>
                                </div>
                                <hr />
                                <div class="contact_details">
                                    <div
                                        class="info-content"
                                        style="
                                            display: flex;
                                            align-items: center;
                                            gap: 5px;
                                        "
                                    >
                                        <i
                                            class="mdi mdi-phone-outline fs-24"
                                            style="color: var(--main-color)"
                                        ></i>
                                        <h6>رقم الهاتف :</h6>
                                        <div class="d-flex">
                                            <div class="icon"></div>
                                            <div class="icon-content ms-3">
                                                <p
                                                    class="mb-0 fs-15"
                                                    id="email"
                                                >
                                                    01010350080
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- end container -->
            <div
                class="copyright"
                style="
                    background-color: var(--main-color);
                    color: #fff;
                    font-size: 14px;
                    text-align: center;
                    padding: 10px;
                    font-weight: bold;
                "
            >
                جميع الحقوق محفوظة ©
                <a
                    href="https://salem-team.com"
                    style="
                        color: #fff;
                        font-size: 14px;
                        text-align: center;
                        font-weight: bold;
                    "
                    >سالم تيم</a
                >
                2024
            </div>
        </section>
    </div>
</template>

<script>
import Offline_error from "@/components/Offline_error.vue";
import useVuelidate from "@vuelidate/core";
import { required, minLength, numeric, helpers } from "@vuelidate/validators";

// firebase
// Import the functions you need from the SDKs you need
import { initializeApp } from "@firebase/app";
import {
    getFirestore,
    getDocs,
    collection,
    doc,
    getDoc,
} from "firebase/firestore";

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
// import TheHeader from "@/components/TheHeader.vue";
export default {
    components: { Offline_error },
    props: ["Check_user"],
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
            roles: ["مشرف", "مالك جمعية", "مساعد"],
            showRegistrationDialog: false,
            isVisible: false, // Initially hide the v-select
            user: {
                nationalID: "",
                password: "Mo-on-1000",
                type: "",
            },
            User: {
                User_State: true,
                User_name: "",
                User_FullName: "",
                type: "",
            },
            isFocused: false,
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
        this.Check_User();
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
            } else if (this.selectedRole === "مالك جمعية") {
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
            querySnapshot.forEach(async (doc) => {
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
                    window.location.reload();
                }
            });
        },
        async Sign_Out() {
            localStorage.removeItem("id");
            localStorage.removeItem("charity_ID");
            this.User.User_State = true;
            await this.$router.push("/"); // استخدام await مع push
            this.Check_User();
            this.v$.$reset();
            window.location.reload();
        },
        async Check_User() {
            if (localStorage.getItem("id")) {
                const docRef = doc(db, "Users", localStorage.getItem("id"));
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    this.User.User_State = false;
                    let name = docSnap.data().name;
                    this.User_FullName = docSnap.data().name;
                    if (docSnap.data().type === "owner") {
                        this.User.type = "owner";
                        console.log(this.User.type);
                    } else if (docSnap.data().type === "admin") {
                        this.User.type = "admin";
                    } else if (docSnap.data().type === "assistant") {
                        this.User.type = "assistant";
                    }
                    this.User.User_name = name
                        .split(" ")
                        .map(function (name) {
                            return name.charAt(0);
                        })
                        .join(" ");
                } else {
                    // docSnap.data() will be undefined in this case
                    console.log("No such document!");
                }
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.container {
    display: flex;
    align-items: center;
    .right {
        width: 100%;
    }
}

.footer {
    position: relative;
    padding: 200px 0 50px;
}

.footer .footer-nav li {
    padding: 6px 0;
}

.footer .footer-nav li .footer-link {
    color: #6c757d;
    position: relative;
    -webkit-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
}

.footer .footer-nav li .footer-link::after {
    content: "";
    background-color: var(--primary-color);
    position: absolute;
    top: 14px;
    left: 0;
    height: 5px;
    width: 0px;
    border-radius: 10px;
    -webkit-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
}

.footer .footer-nav li .footer-link:hover {
    color: #343a40;
    padding-left: 12px;
}

.footer .footer-nav li .footer-link:hover::after {
    width: 05px;
}

.footer .cta-content .subscribe-form .form-control:focus {
    -webkit-box-shadow: none;
    box-shadow: none;
}

.footer .cta-content .subscribe-form .form-control::-webkit-input-placeholder {
    color: #fff;
    opacity: 0.3;
}

.footer .cta-content .subscribe-form .form-control:-ms-input-placeholder {
    color: #fff;
    opacity: 0.3;
}

.footer .cta-content .subscribe-form .form-control::-ms-input-placeholder {
    color: #fff;
    opacity: 0.3;
}

.footer .cta-content .subscribe-form .form-control::placeholder {
    color: #fff;
    opacity: 0.3;
}

.custom-form textarea.form-control {
    height: auto;
}
p.landing {
    font-size: 24px;
    margin-bottom: 50px;
    color: var(--bs-secondary-color) !important;
    position: relative;
    &::before {
        content: "";
        position: absolute;
        bottom: -25px;
        width: 100%;
        left: 0;
        height: 3px;
        background: #eee;
    }
    strong {
        color: var(--main-color);
    }
}
h2.title {
    font-weight: bold;
}
</style>
