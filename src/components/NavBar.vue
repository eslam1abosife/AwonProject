<template>
    <div class="Dash_board">
        <v-container fluid>
            <div class="parent">
                <!-- First Row contain info & Add & Export Exel File -->
                <v-row>
                    <v-col cols="2"></v-col>
                    <v-col cols="5" class="d-flex align-center">
                        <h3
                            class="d-inline-block ml-5 mr-4"
                            style="
                                font-family: Space Grotesk;
                                font-size: 24px;
                                font-weight: 500;
                                line-height: 28px;
                            "
                        >
                            المحتاجين
                        </h3>
                        <span class="ml-2"
                            ><v-icon size="x-small"
                                >mdi-help-circle-outline</v-icon
                            ></span
                        >
                        <span
                            style="
                                color: #93312b;
                                font-family: Inter;
                                font-size: 12px;
                                font-weight: 500;
                                line-height: 18px;
                            "
                            >108</span
                        >
                    </v-col>
                    <v-col cols="5">
                        <v-btn-group
                            class="d-flex justify-end align-center ga-5 ml-12"
                        >
                            <v-btn
                                prepend-icon="mdi-chevron-down"
                                color="#4A3AFF"
                                text="أضافه محتاج جديد"
                                density="comfortable"
                                variant="outlined"
                                rounded-xl
                                style="
                                    font-family: DM Sans;
                                    font-size: 18px;
                                    font-weight: 700;
                                    line-height: 16.15px;
                                    width: 190px;
                                    height: 44px;
                                    padding: 10px 22px 33px 21px;
                                    border-radius: 30px;
                                    border: 2px solid #4a3aff;
                                "
                            ></v-btn>
                            <v-btn
                                style="
                                    position: relative;
                                    border-radius: 30px;
                                    width: 210px;
                                "
                                variant="text"
                            >
                                <label
                                    style="
                                        width: 100%;
                                        height: 100%;
                                        padding: 8px 32px;
                                        text-align: center;
                                        text-decoration: none;
                                        display: inline-block;
                                        font-size: 16px;
                                        margin: 4px 2px;
                                        cursor: pointer;
                                        background-color: white;
                                        color: black;
                                        border: 2px solid #ddd;
                                        border-radius: 15px;
                                    "
                                >
                                    <input type="file" hidden />
                                    <div
                                        class="btn-up"
                                        style="
                                            font-family: Inter;
                                            font-size: 14px;
                                            font-weight: 400;
                                            line-height: 20px;
                                            text-align: left;
                                        "
                                    >
                                        تصدير ملف اكسيل
                                        <v-icon>mdi-tray-arrow-down</v-icon>
                                    </div>
                                </label>
                            </v-btn>
                        </v-btn-group>
                    </v-col>
                </v-row>
                <!-- Seconed Row Contain محتاجين & جمعيات -->
                <v-row>
                    <v-col cols="2"></v-col>
                    <v-col cols="10">
                        <v-card variant="falt">
                            <v-tabs v-model="tab">
                                <v-tab value="one">المحتاجين</v-tab>
                                <v-tab value="two">الجمعيات</v-tab>
                            </v-tabs>
                        </v-card>
                    </v-col>
                </v-row>
            </div>
        </v-container>
    </div>
</template>
<script>
export default {
    name: "nav_bar",
    data: () => ({
        tab: null,
        text: "",
    }),
    methods: {
        search() {
            this.$emit("search");
        },
    },
};
</script>
<style lang="scss">
* {
    direction: rtl;
}

.v-field__input {
    top: 7px !important;
}
</style>
