<template>
    <v-dialog class="dialog" activator="parent" max-width="90%" v-if="isActive">
        <template v-slot:default="{ isActive }">
            <v-card class="popup" width="100%" rounded="lg">
                <v-card-title class="d-flex justify-space-between align-center">
                    <div class="text-h5 ps-2" style="color: var(--main-color)">
                        حساب جديد
                    </div>
                    <v-btn
                        style="color: var(--main-color)"
                        icon="mdi-close"
                        variant="text"
                        @click="isActive.value = false"
                    ></v-btn>
                </v-card-title>
                <v-stepper
                    v-model="e1"
                    alt-labels
                    style="overflow: auto"
                    width="100%"
                >
                    <template v-slot:default="{ prev, next }">
                        <v-stepper-header>
                            <template v-for="n in steps" :key="`${n}-step`">
                                <v-stepper-item
                                    style="color: var(--therd-color)"
                                    :title="title[n]"
                                    :complete="e1 > n"
                                    :step="`Step {{ n }}`"
                                    :value="n"
                                    color="var(--main-color)"
                                ></v-stepper-item>

                                <v-divider
                                    color="var(--main-color)"
                                    v-if="n !== steps"
                                    :key="n"
                                ></v-divider>
                            </template>
                        </v-stepper-header>

                        <v-stepper-window style="height: 830px !important">
                            <Offline_error>
                                <template v-slot:default>
                                    <div v-if="e1 === 1">
                                        <!--get the data from the Charities using v-model-->
                                        <form
                                            @submit.prevent="validateForm"
                                            class="ma-auto"
                                            action="post"
                                        >
                                            <!--title input-->
                                            <v-text-field
                                                v-model="Charities.title"
                                                variant="outlined"
                                                label="اسم الجمعية"
                                                class="mt-2"
                                                :error-messages="
                                                    v$.Charities.title.$errors.map(
                                                        (e) => e.$message
                                                    )
                                                "
                                            ></v-text-field>
                                            <!--phone input-->
                                            <v-text-field
                                                v-model="Charities.phone"
                                                label="تليفون الجمعية"
                                                type="tel"
                                                variant="outlined"
                                                :error-messages="
                                                    v$.Charities.phone.$errors.map(
                                                        (e) => e.$message
                                                    )
                                                "
                                            ></v-text-field>
                                            <!--describetion input-->
                                            <v-textarea
                                                row-height="15"
                                                auto-grow
                                                rows="3"
                                                variant="outlined"
                                                v-model="Charities.descripetion"
                                                :error-messages="
                                                    v$.Charities.descripetion.$errors.map(
                                                        (e) => e.$message
                                                    )
                                                "
                                                label="وصف قصير للجمعية"
                                            ></v-textarea>
                                            <!--address input-->
                                            <v-text-field
                                                variant="outlined"
                                                label="العنوان"
                                                v-model="Charities.address"
                                                :error-messages="
                                                    v$.Charities.address.$errors.map(
                                                        (e) => e.$message
                                                    )
                                                "
                                            ></v-text-field>

                                            <!--Fame_number input-->
                                            <v-text-field
                                                variant="outlined"
                                                v-model="Charities.Fame_number"
                                                :error-messages="
                                                    v$.Charities.Fame_number.$errors.map(
                                                        (e) => e.$message
                                                    )
                                                "
                                                label="رقم الشهره"
                                            ></v-text-field>
                                            <!--year input-->
                                            <v-text-field
                                                variant="outlined"
                                                name="year"
                                                v-model="Charities.Fame_year"
                                                :error-messages="
                                                    v$.Charities.Fame_year.$errors.map(
                                                        (e) => e.$message
                                                    )
                                                "
                                                label="لسنة"
                                            ></v-text-field>
                                            <!--the Charities can add another email box if needed by clicking the plus button-->
                                            <div
                                                class="d-flex align-center flex-wrap mb-2"
                                            >
                                                <label for="link"
                                                    >لينكات منصات التواصل</label
                                                >
                                                <v-spacer></v-spacer>
                                                <v-btn
                                                    icon="mdi-plus"
                                                    variant="text"
                                                    @click="social++"
                                                    style="
                                                        background-color: var(
                                                            --main-color
                                                        );
                                                        color: white;
                                                    "
                                                    size="small"
                                                ></v-btn>
                                            </div>
                                            <!--Social_media input-->
                                            <v-text-field
                                                id="link"
                                                v-for="(
                                                    social, index
                                                ) in social"
                                                :key="index"
                                                v-model="
                                                    Charities.Social_media[
                                                        index
                                                    ]
                                                "
                                                label="منصات التواصل"
                                                type="text"
                                                variant="outlined"
                                            ></v-text-field>
                                            <p class="mb-2 text-right">
                                                أنشطة الجمعية ( حدد خيار أو
                                                أكثر)
                                            </p>
                                            <!--the Charities can select multiple items from the group and it will be displayed in a paragraph-->
                                            <v-chip-group
                                                selected-class="bg-primary"
                                                multiple
                                                mandatory
                                                class="text-right"
                                                v-model="
                                                    Charities.Charities_specialty
                                                "
                                                :error-messages="
                                                    v$.Charities.Charities_specialty.$errors.map(
                                                        (e) => e.$message
                                                    )
                                                "
                                            >
                                                <v-chip
                                                    style="
                                                        color: var(
                                                            --main-color
                                                        );
                                                    "
                                                    elevation="2"
                                                    v-for="(
                                                        activity, index
                                                    ) in activities"
                                                    :key="index"
                                                    class="ma-2"
                                                    rounded="lg"
                                                    size="x-large"
                                                    :value="activity"
                                                    filter
                                                    >{{ activity }}</v-chip
                                                >
                                            </v-chip-group>
                                            <p class="mb-4 text-right">
                                                {{
                                                    Charities.Charities_specialty
                                                }}
                                            </p>
                                            <!--
                            <p class="mb-2 text-right">أنواع الباقات</p>
                            <v-chip-group
                                selected-class="bg-grey-lighten-1"
                                mandatory
                                class="text-right d-flex"
                                v-model="Charities.Package_type"
                            >
                                <v-chip
                                    elevation="2"
                                    v-for="(Packages, index) in Packages"
                                    :key="index"
                                    class="ma-2"
                                    rounded="lg"
                                    size="x-large"
                                    :value="Packages"
                                    filter
                                    >{{ Packages }}</v-chip
                                >
                            </v-chip-group>
                            <p class="mb-4 text-right">
                                {{ Charities.Package_type }}
                            </p>
                            -->
                                        </form>
                                    </div>
                                    <div v-if="e1 === 2">
                                        <form
                                            @submit.prevent="validateForm"
                                            class="ma-auto"
                                            action="post"
                                        >
                                            <p class="mb-2 text-right">
                                                إضافة مشرف
                                            </p>
                                            <!--title input-->
                                            <v-text-field
                                                v-model="user.name"
                                                variant="outlined"
                                                label="اسم"
                                                class="mt-2"
                                                :error-messages="
                                                    v$.user.name.$errors.map(
                                                        (e) => e.$message
                                                    )
                                                "
                                            ></v-text-field>
                                            <v-chip-group
                                                selected-class="bg-primary"
                                                mandatory
                                                class="text-right d-flex"
                                                v-model="user.gender"
                                            >
                                                <p class="mt-5 text-right">
                                                    الجنس :
                                                </p>
                                                <v-chip
                                                    style="
                                                        color: var(
                                                            --main-color
                                                        );
                                                    "
                                                    elevation="2"
                                                    class="ma-2"
                                                    rounded="lg"
                                                    size="x-large"
                                                    filter
                                                    value="ذكر"
                                                    >ذكر</v-chip
                                                >
                                                <v-chip
                                                    style="
                                                        color: var(
                                                            --main-color
                                                        );
                                                    "
                                                    elevation="2"
                                                    class="ma-2"
                                                    rounded="lg"
                                                    filter
                                                    size="x-large"
                                                    value="أنثى"
                                                    >أنثى</v-chip
                                                >
                                            </v-chip-group>
                                            <!--phone input-->
                                            <div
                                                class="d-flex align-center flex-wrap mb-2"
                                            >
                                                <label for="phone"
                                                    >تليفون</label
                                                >
                                                <v-spacer></v-spacer>
                                                <v-btn
                                                    icon="mdi-plus"
                                                    variant="text"
                                                    @click="tel++"
                                                    style="
                                                        background-color: var(
                                                            --main-color
                                                        );
                                                        color: white;
                                                    "
                                                    size="small"
                                                ></v-btn>
                                            </div>
                                            <!--Phone input-->
                                            <v-text-field
                                                id="phone"
                                                v-for="(tel, index) in tel"
                                                :key="index"
                                                v-model="user.phones[index]"
                                                label="تليفون"
                                                type="tel"
                                                variant="outlined"
                                                :error-messages="
                                                    v$.user.phones.$errors.map(
                                                        (e) => e.$message
                                                    )
                                                "
                                            ></v-text-field>

                                            <v-text-field
                                                v-model="user.birthday"
                                                type="date"
                                                variant="outlined"
                                                label="تاريخ الميلاد"
                                                class="mt-2"
                                                :error-messages="
                                                    v$.user.birthday.$errors.map(
                                                        (e) => e.$message
                                                    )
                                                "
                                            ></v-text-field>
                                            <v-text-field
                                                v-model="user.email"
                                                type="email"
                                                placeholder="example@gmail.com"
                                                variant="outlined"
                                                label="الايميل"
                                                class="mt-2"
                                                :error-messages="
                                                    v$.user.email.$errors.map(
                                                        (e) => e.$message
                                                    )
                                                "
                                            ></v-text-field>

                                            <v-text-field
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
                                                @click:append-inner="
                                                    toggleShowPassword
                                                "
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
                                                ادخل كلمة سر من 8 حروف أرقام
                                                وحرف واحد كبير على الأقل
                                            </span>
                                            <div
                                                class="btn mt-4 mb-10"
                                                @click="validateForm"
                                                style="
                                                    background-color: var(
                                                        --main-color
                                                    );
                                                    color: white;
                                                    width: 100%;
                                                    font-size: 25px;
                                                    margin: auto;
                                                "
                                            >
                                                تم
                                            </div>
                                        </form>
                                    </div>
                                </template>
                            </Offline_error>
                        </v-stepper-window>
                        <v-stepper-actions
                            style="color: var(--main-color)"
                            type="submit"
                            class="d-flex justify-center ga-5"
                            :disabled="disabled"
                            @click:next="next"
                            @click:prev="prev"
                        >
                            <template #prev="{ props }">
                                <v-btn
                                    class="prev"
                                    style="background-color: #eee"
                                    @click="() => props.onClick('prev')"
                                    rounded="lg"
                                    size="large"
                                >
                                    <span class="icon2 ml-3"
                                        ><font-awesome-icon
                                            icon="chevron-right"
                                            size="lg"
                                    /></span>
                                    <span> رجوع</span>
                                </v-btn>
                            </template>
                            <template #next="{ props }">
                                <div>
                                    <v-btn
                                        @click="
                                            () => {
                                                props.onClick('next');
                                            }
                                        "
                                        rounded="lg"
                                        size="large"
                                    >
                                        <span> التالي</span>
                                        <span class="icon1 mr-4">
                                            <font-awesome-icon
                                                icon="chevron-left"
                                                size="lg"
                                        /></span>
                                    </v-btn>
                                </div>
                            </template>
                        </v-stepper-actions>
                    </template>
                </v-stepper>
            </v-card>
        </template>
    </v-dialog>
</template>

<script scoped>
import { ref } from "vue";
import Offline_error from "@/components/Offline_error.vue";
import useVuelidate from "@vuelidate/core";
import {
    required,
    maxLength,
    minLength,
    numeric,
    helpers,
} from "@vuelidate/validators";

// Add data
import {
    collection,
    addDoc,
    getFirestore,
    updateDoc,
} from "@firebase/firestore";
// Import the functions you need from the SDKs you need
import { initializeApp } from "@firebase/app";

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
    components: { Offline_error },
    inject: ["Emitter"],
    setup() {
        return {
            v$: useVuelidate(),
        };
    },
    data() {
        return {
            currentStep: 1,
            regex1: true,
            e1: 1,
            steps: 2,
            isActive: { value: true },
            title: ["", "اضافة جمعية", "اضافة مشرف"],
            showPassword: false, // define showPassword
            tel: ref(1),
            //ref to add another email box
            social: ref(1),
            //activities
            activities: ref(["إطعام", "كفالة", "زواج", "علاج"]),
            Packages: ref([
                "1000 جنية مصري  500 حالة",
                "2000 جنية مصري  1000 حالة",
                "3000 جنية مصري  200 حالة أو أكثر",
            ]),
            //ref to store the Charities data
            Charities: {
                title: "الرحمن الرحيم",
                Social_media: [],
                phone: "01099877866",
                descripetion: "جمعية خيرية لمساعدة المحتاجين",
                address: "شارع الطيران - مدينة نصر",
                Fame_number: "3566",
                Charities_specialty: ["إطعام"],
                Package_type: "1000 جنية مصري  500 حالة",
                Fame_year: "2020",
            },
            //ref to store the user data
            user: {
                name: "محمود سامي",
                gender: "ذكر",
                phones: ["01011199200"],
                birthday: "2024-04-24",
                email: "mas@gmail.com",
                nationalID: "876898746783876",
                password: "Mo-on-1000",
                charity_ID: "",
            },
        };
    },
    //form validation
    validations() {
        return {
            Charities: {
                title: {
                    required: helpers.withMessage("ادخل اسم ", required),
                    minLength: helpers.withMessage(
                        " ادخل اسم مكون من 3 حروف على الأقل",
                        minLength(3)
                    ),
                },
                phone: {
                    required: helpers.withMessage("ادخل رقم ", required),
                    minLength: helpers.withMessage(
                        " ادخل رقم مكون من 8 أرقام على الأقل",
                        minLength(8)
                    ),
                    numeric: helpers.withMessage(" ادخل أرقام فقط", numeric),
                },
                address: {
                    required: helpers.withMessage("ادخل عنوان", required),
                    maxLength: helpers.withMessage(
                        " ادخل عنوان لا يزيد عن 50 حرف",
                        maxLength(50)
                    ),
                    minLength: helpers.withMessage(
                        " ادخل عنوان مكون من 6 حروف على الأقل",
                        minLength(6)
                    ),
                },
                descripetion: {
                    required: helpers.withMessage("ادخل وصف", required),
                    maxLength: helpers.withMessage(
                        " ادخل وصف لا يزيد عن 250 حرف",
                        maxLength(250)
                    ),
                    minLength: helpers.withMessage(
                        " ادخل وصف مكون من 10 حروف على الأقل",
                        minLength(10)
                    ),
                },
                Fame_number: {
                    required: helpers.withMessage("ادخل رقم", required),
                    minLength: helpers.withMessage(
                        " ادخل رقم مكون من 3 أرقام على الأقل",
                        minLength(3)
                    ),
                    numeric: helpers.withMessage(" ادخل أرقام فقط", numeric),
                },
                Charities_specialty: {
                    required,
                },
                Fame_year: {
                    required: helpers.withMessage("ادخل تاريخ", required),
                    minLength: helpers.withMessage(
                        " ادخل تاريخ مكون من 4 أرقام على الأقل",
                        minLength(4)
                    ),
                    maxLength: helpers.withMessage(
                        " ادخل تاريخ لا يزيد عن 8 أرقام",
                        maxLength(8)
                    ),
                    numeric: helpers.withMessage(
                        " ادخل تاريخ يحتوي على أرقام فقط",
                        numeric
                    ),
                },
            },
            user: {
                name: {
                    required: helpers.withMessage("ادخل اسم ", required),
                    maxLength: helpers.withMessage(
                        " ادخل اسم لا يزيد عن 20 حرف",
                        maxLength(20)
                    ),
                    minLength: helpers.withMessage(
                        " ادخل اسم مكون من 3 حروف على الأقل",
                        minLength(3)
                    ),
                },
                email: {
                    required: helpers.withMessage("ادخل ايميل ", required),
                    isValidEmail(value) {
                        // Define your regex pattern for the email
                        const regexPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        return regexPattern.test(value);
                    },
                },
                phones: {
                    required: helpers.withMessage("ادخل رقم ", required),
                },
                nationalID: {
                    required: helpers.withMessage(
                        "ادخل الرقم القومي ",
                        required
                    ),
                    numeric: helpers.withMessage(" ادخل أرقام فقط", numeric),
                    minLength: helpers.withMessage(
                        " ادخل عنوان مكون من 14 أرقام على الأقل",
                        minLength(14)
                    ),
                },
                birthday: {
                    required: helpers.withMessage(
                        "ادخل تاريخ الميلاد",
                        required
                    ),
                },
                gender: {
                    required,
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
        disabled() {
            return this.e1 === 1 ? "prev" : this.e1 === 2 ? "next" : undefined;
        },
        // Define a computed property to determine the input type based on showPassword
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
        // Define a method to toggle the showPassword flag when the append icon is clicked
        toggleShowPassword() {
            this.showPassword = !this.showPassword;
        },
        async Add_Users() {
            try {
                // Add a new document with a generated id.
                const docRef = await addDoc(collection(db, "Users"), {
                    name: this.user.name,
                    birthday: this.user.birthday,
                    gender: this.user.gender,
                    email: this.user.email,
                    nationalID: this.user.nationalID,
                    phones: this.user.phones,
                    password: this.user.password,
                    type: "owner",
                });

                // Update the document with the generated ID
                await updateDoc(docRef, {
                    id: docRef.id,
                    charity_ID: this.user.charity_ID,
                });
                localStorage.setItem("id", docRef.id);
            } catch (error) {
                console.error("Error adding document: ", error);
            }
        },
        async Add_Charities() {
            try {
                // Add a new document with a generated id.
                const docRef = await addDoc(collection(db, "Charities"), {
                    title: this.Charities.title,
                    description: this.Charities.descripetion,
                    address: this.Charities.address,
                    Package_type: this.Charities.Package_type,
                    Charities_specialty: this.Charities.Charities_specialty,
                    Fame_number: this.Charities.Fame_number,
                    Fame_year: this.Charities.Fame_year,
                    phone: this.Charities.phone,
                    Social_media: this.Charities.Social_media,
                });

                // Update the document with the generated ID
                await updateDoc(docRef, { id: docRef.id });
                this.user.charity_ID = docRef.id;
                // Add  Add_Users
                if (this.user.charity_ID) {
                    this.Add_Users();
                    this.isActive = false;
                }
            } catch (error) {
                console.error("Error adding document: ", error);
            }
        },

        checkDataExists() {
            // Perform comparison with existing data
            // Return true if data exists, false otherwise
            return !(
                this.Charities.title == "" &&
                this.Charities.descripetion == "" &&
                this.Charities.address == "" &&
                this.Charities.Charities_specialty == "" &&
                this.Charities.Social_media == "" &&
                this.Charities.phone == "" &&
                this.Charities.Fame_number == "" &&
                this.Charities.Fame_year == "" &&
                this.user.name == "" &&
                this.user.gender == "" &&
                this.user.birthday == "" &&
                this.user.email == "" &&
                this.user.nationalID == "" &&
                this.user.phones == "" &&
                this.user.password == ""
            );
        },
        async validateForm() {
            const dataExists = this.checkDataExists();
            this.v$.$validate();
            if (dataExists) {
                this.v$.$validate();
                await this.$nextTick();
                if (!this.v$.$error) {
                    // If no errors, proceed with further processing
                    console.log("Data filled and Form submitted successfully");
                    console.log("Charities", this.Charities);
                    console.log("User", this.user);
                    this.Add_Charities();
                    // close The_Register
                    console.log("Closing dialog...");
                    this.isActive = false; // Close the dialog
                    console.log("Dialog closed.");
                    this.v$.$reset();
                } else {
                    // If there are validation errors, handle them accordingly
                    console.log("Data not all filled Validation errors found");
                    this.e1 = 1;
                }
            } else {
                console.log("Data required");
            }
        },
    },
};
</script>
<style lang="scss" scoped>
@media screen and (max-width: 500px) {
    .v-chip {
        font-size: 16px !important;
        padding: 10px !important;
    }
}
@media screen and (max-width: 400px) {
    .v-chip {
        font-size: 13px !important;
        padding: 7px !important;
    }
}
.dialog {
    height: 600px !important;
}
form {
    width: 100% !important;
}
.popup {
    padding-top: 20px;
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
.v-stepper {
    padding: 20px;
    width: 100% !important;
}
</style>
