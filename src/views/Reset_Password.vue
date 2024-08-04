<template>
    <div class="reset_password mt-16" style="height: 100vh !important">
        <v-container class="mt-16">
            <form
                ref="form"
                @submit.prevent="validateForm"
                class="ma-auto"
                action="post"
            >
                <h2 class="mt-16 mb-4">نسيت كلمة المرور</h2>
                <!--phone input-->
                <v-text-field
                    v-model="user.phone"
                    label="تليفون"
                    type="tel"
                    variant="outlined"
                    @input="v$.user.phone.$touch()"
                    :error-messages="
                        v$.user.phone.$errors.map((e) => e.$message)
                    "
                ></v-text-field>
                <v-text-field
                    v-model="user.email"
                    type="email"
                    placeholder="example@gmail.com"
                    variant="outlined"
                    label="الايميل"
                    class="mt-2"
                    @input="v$.user.email.$touch()"
                    @focus="isEmailFocused = true"
                    @blur="isEmailFocused = false"
                    :error-messages="
                        v$.user.email.$errors.map((e) => e.$message)
                    "
                ></v-text-field>

                <span
                    v-if="!isValidEmail1 && isEmailFocused"
                    style="
                        display: block;
                        margin-right: 15px;
                        font-size: small;
                        color: #af0829;
                    "
                    >ادخل ايميل صحيح</span
                >
                <v-btn
                    class="d-flex align-center mt-4 bg-blue-lighten-1 mb-10"
                    type="submit"
                    style="width: 100%; font-size: 25px; margin: auto"
                >
                    ارسال
                </v-btn>
            </form>
            <p>{{ message }}</p>
        </v-container>
    </div>
</template>

<script>
import axios from "axios";
import useVuelidate from "@vuelidate/core";
import { required, minLength, numeric, helpers } from "@vuelidate/validators";
export default {
    setup() {
        return {
            v$: useVuelidate(),
        };
    },
    data() {
        return {
            //ref to store the user data
            user: {
                phone: "",
                email: "",
            },
            message: "",
            isEmailFocused: false, // Track focus state of email input
        };
    },
    //form validation
    validations() {
        return {
            user: {
                email: {
                    required: helpers.withMessage("ادخل ايميل ", required),
                    isValidEmail: function (value) {
                        // Define your regex pattern for the email
                        const regexPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        const matchResult = regexPattern.test(value);
                        this.isValidEmail1 = matchResult;
                        return matchResult;
                    },
                },
                phone: {
                    required: helpers.withMessage("ادخل رقم ", required),
                    minLength: helpers.withMessage(
                        " ادخل رقم مكون من 8 أرقام على الأقل",
                        minLength(8)
                    ),
                    numeric: helpers.withMessage(" ادخل أرقام فقط", numeric),
                },
            },
        };
    },
    methods: {
        triggerToggleTheme() {
            this.$emit("execute-toggle-theme"); // إرسال حدث لتنفيذ دالة toggleTheme
        },
        checkDataExists() {
            // Perform comparison with existing data
            // Return true if data exists, false otherwise
            return !(this.user.email == "" && this.user.phone == "");
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
                    console.log("User", this.user);
                    this.sendResetRequest(); // Call the function to send reset request
                    this.v$.$reset();
                } else {
                    // If there are validation errors, handle them accordingly
                    console.log("Data not all filled Validation errors found");
                }
            } else {
                console.log("Data required");
            }
        },
        async sendResetRequest() {
            // Clear previous error messages
            this.message = "";

            // Send email
            try {
                const emailResponse = await axios.post("/send-email", {
                    email: this.user.email,
                });
                console.log(emailResponse.data);
                this.message = "Password reset email sent successfully!";
            } catch (error) {
                console.error("Error sending email:", error);
                this.message = "Error sending email";
            }

            // Send WhatsApp message
            try {
                const whatsappResponse = await axios.post("/send-whatsapp", {
                    phone: this.user.phone,
                });
                console.log(whatsappResponse.data);
                this.message += " WhatsApp message sent successfully!";
            } catch (error) {
                console.error("Error sending WhatsApp message:", error);
                this.message += " Error sending WhatsApp message";
            }
        },
    },
};
</script>

<style lang="scss" scoped>
form {
    width: 50% !important;
}
</style>
