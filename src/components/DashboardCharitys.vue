<template>
    <div style="width: 100%">
        <v-container>
            <v-text-field
                v-model="search"
                label="أبحث"
                hide-details
                style="
                    font-family: 'Inter', sans-serif;
                    font-weight: 500;
                    line-height: 18px;
                    text-align: center;
                "
            ></v-text-field>
            <div class="boxes">
                <div
                    class="box"
                    v-for="(Case, index) in paginatedCases"
                    :key="Case"
                >
                    <v-row class="row_chys" style="width: 100%">
                        <v-col
                            style="
                                display: flex;
                                justify-content: start;
                                align-items: center;
                            "
                            class="col_chys"
                            lg="4"
                            sm="12"
                            md="6"
                        >
                            <div class="About">
                                <div class="index">
                                    {{ (currentPage - 1) * 5 + index + 1 }}
                                </div>
                                <div class="name">
                                    {{ Case.personal_info.name }}
                                </div>
                            </div>
                        </v-col>
                        <v-col lg="4" md="6" sm="12" class="col_chys">
                            <div class="Financial_details">
                                <div class="required">
                                    <span
                                        >{{ Case.financial_info.required }}
                                    </span>
                                    <div>مطلوب</div>
                                </div>
                                <div class="incom">
                                    <span
                                        >{{ Case.financial_info.incom }}
                                    </span>
                                    <div>دخل</div>
                                </div>
                                <div class="deficit">
                                    <span
                                        >{{ Case.financial_info.deficit }}
                                    </span>
                                    <div>عجز</div>
                                </div>
                            </div></v-col
                        >
                        <v-col
                            lg="4"
                            md="12"
                            sm="12"
                            class="col_chys"
                            style="
                                display: flex;
                                justify-content: end;
                                align-items: center;
                            "
                        >
                            <div
                                class="details"
                                @click="openStatusInformation(Case)"
                            >
                                <font-awesome-icon
                                    :icon="['fas', 'circle-info']"
                                />
                                <div>التفاصيل</div>
                                <!--this a dialog to show the case's data-->
                                <v-dialog activator="parent" max-width="900">
                                    <template v-slot:default="{ isActive }">
                                        <v-card rounded="lg">
                                            <v-card-title
                                                class="d-flex justify-space-between align-center"
                                            >
                                                <div
                                                    class="text-h5 ps-2 text-primary"
                                                >
                                                    تفاصيل الحالة
                                                </div>
                                                <v-btn
                                                    class="text-primary"
                                                    icon="mdi-close"
                                                    variant="text"
                                                    @click="
                                                        isActive.value = false
                                                    "
                                                ></v-btn>
                                            </v-card-title>
                                            <!--tabs to toggle between the windows-->
                                            <v-tabs
                                                v-model="tab"
                                                bg-color="primary"
                                            >
                                                <v-tab value="المعلومات الشخصية"
                                                    >المعلومات الشخصية</v-tab
                                                >
                                                <v-tab value="المعلومات المالية"
                                                    >المعلومات المالية</v-tab
                                                >
                                                <v-tab value="الأمراض"
                                                    >الأمراض</v-tab
                                                >
                                                <v-tab value="حالة المسكن"
                                                    >حالة المسكن</v-tab
                                                >
                                                <v-tab value="إحتياجات الأسرة"
                                                    >إحتياجات الأسرة</v-tab
                                                >
                                            </v-tabs>
                                            <v-window
                                                v-model="tab"
                                                class="pa-5"
                                            >
                                                <!--window to show the personal_info-->
                                                <v-window-item
                                                    value="المعلومات الشخصية"
                                                >
                                                    <span>الاسم: </span>
                                                    {{
                                                        Case.personal_info.name
                                                    }}
                                                    <br />
                                                    <br />
                                                    <span>اسم الشهرة: </span>
                                                    {{
                                                        Case.personal_info
                                                            .nick_name
                                                    }}
                                                    <br />
                                                    <br />
                                                    <span>الرقم القومي: </span>
                                                    {{
                                                        Case.personal_info
                                                            .national_id
                                                    }}
                                                    <br />
                                                    <br />
                                                    <span>المحافظة: </span>
                                                    {{
                                                        Case.personal_info
                                                            .governorate
                                                    }}
                                                    <br />
                                                    <br />
                                                    <span>العنوان: </span>
                                                    {{
                                                        Case.personal_info
                                                            .detailed_address
                                                    }}
                                                    <br />
                                                    <br />
                                                    <span>رقم المنزل: </span>
                                                    {{
                                                        Case.personal_info
                                                            .house_number
                                                    }}
                                                    <br />
                                                    <br />
                                                    <span>الدور: </span>
                                                    {{
                                                        Case.personal_info
                                                            .floor_number
                                                    }}
                                                    <br />
                                                    <br />
                                                    <span
                                                        >الحالة الاجتماعيه:
                                                    </span>
                                                    {{
                                                        Case.personal_info
                                                            .marital_status
                                                    }}
                                                    <br />
                                                    <br />
                                                    <span>تليفون: </span>
                                                    {{
                                                        Case.personal_info.phone
                                                    }}
                                                </v-window-item>
                                                <!--window to show the financial_info-->
                                                <v-window-item
                                                    value="المعلومات المالية"
                                                >
                                                    <span>المطلوب : </span>
                                                    {{
                                                        Case.financial_info
                                                            .required
                                                    }}
                                                    <br />
                                                    <br />
                                                    <span>الدخل : </span>
                                                    {{
                                                        Case.financial_info
                                                            .incom
                                                    }}
                                                    <br />
                                                    <br />
                                                    <span>العجز: </span>
                                                    {{
                                                        Case.financial_info
                                                            .deficit
                                                    }}
                                                </v-window-item>
                                                <!--window to show the diseases-->
                                                <v-window-item value="الأمراض">
                                                    <span>اسم المريض : </span>
                                                    {{
                                                        Case.diseases
                                                            .patient_name
                                                    }}
                                                    <br />
                                                    <br />
                                                    <span>المرض: </span>
                                                    {{ Case.diseases.disease }}
                                                    <br />
                                                    <br />
                                                    <span
                                                        >كيفية الحصول على العلاج
                                                        :
                                                    </span>
                                                    {{
                                                        Case.diseases
                                                            .get_treatment
                                                    }}
                                                    <br />
                                                    <br />
                                                    <span
                                                        >السبب في عدم العلاج على
                                                        نفقة الدولة :
                                                    </span>
                                                    {{
                                                        Case.diseases
                                                            .not_available
                                                    }}
                                                </v-window-item>
                                                <!--window to show the housing_condition-->
                                                <v-window-item
                                                    value="حالة المسكن"
                                                >
                                                    <span>عدد الغرف: </span>
                                                    {{
                                                        Case.housing_condition
                                                            .number_rooms
                                                    }}
                                                    <br />
                                                    <br />
                                                    <span>ملكية المنزل: </span>
                                                    {{
                                                        Case.housing_condition
                                                            .house_type
                                                    }}
                                                    <br />
                                                    <br />
                                                    <span>نوع الارضيه : </span>
                                                    {{
                                                        Case.housing_condition
                                                            .floor_type
                                                    }}
                                                    <br />
                                                    <br />
                                                    <span>وصف للمطبخ : </span>
                                                    {{
                                                        Case.housing_condition
                                                            .description_kitchen
                                                    }}
                                                    <br />
                                                    <br />
                                                    <span>نوع الحمام : </span>
                                                    {{
                                                        Case.housing_condition
                                                            .bathroom_type
                                                    }}
                                                    <br />
                                                    <br />
                                                    <span>
                                                        وصف للغرفة 1 :
                                                    </span>
                                                    {{
                                                        Case.housing_condition
                                                            .DescriptionRoom1
                                                    }}
                                                    <br />
                                                    <span>وصف للغرفة 2 : </span>
                                                    {{
                                                        Case.housing_condition
                                                            .DescriptionRoom2
                                                    }}
                                                    <br />
                                                    <span>وصف للغرفة 3 : </span>
                                                    {{
                                                        Case.housing_condition
                                                            .DescriptionRoom3
                                                    }}
                                                    <br />
                                                    <span>وصف للغرفة 4 : </span>
                                                    {{
                                                        Case.housing_condition
                                                            .DescriptionRoom4
                                                    }}
                                                    <br />
                                                    <span>وصف للغرفة 5 : </span>
                                                    {{
                                                        Case.housing_condition
                                                            .DescriptionRoom5
                                                    }}
                                                </v-window-item>
                                                <!--window to show the family_needs-->
                                                <v-window-item
                                                    value="إحتياجات الأسرة"
                                                >
                                                    <v-container
                                                        class="text-right d-flex align-center flex-wrap justify-around"
                                                        ><span
                                                            class="text-right d-flex align-center flex-wrap justify-around"
                                                        >
                                                            إحتياجات الأسرة :
                                                        </span>
                                                        <v-card
                                                            elevation="0"
                                                            class="ma-2 pa-3"
                                                            rounded="lg"
                                                            :value="
                                                                family_needs
                                                            "
                                                            v-for="(
                                                                family_needs,
                                                                index_1
                                                            ) in Case.family_needs"
                                                            :key="index_1"
                                                        >
                                                            {{ family_needs }}
                                                        </v-card></v-container
                                                    >
                                                </v-window-item>
                                            </v-window>
                                        </v-card>
                                    </template>
                                </v-dialog>
                            </div></v-col
                        >
                    </v-row>
                </div>
            </div>
        </v-container>
        <div class="text-center">
            <v-pagination
                v-model="currentPage"
                next-icon="mdi-menu-left"
                prev-icon="mdi-menu-right"
                :length="Math.ceil(Cases.length / 5)"
                :total-visible="5"
            ></v-pagination>
        </div>
    </div>
</template>
<script>
import { ref } from "vue";
// Get  data
import { getFirestore, getDocs, collection } from "@firebase/firestore";
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
    inject: ["Emitter"],
    data: () => ({
        tab: null,
        currentPage: 1, // Current page
        pageSize: 5, // Number of cases per page
        Cases_length: 0,
        Cases: [],
        isGridView: false,
        search: "",
        newVegetables: [],
        family_needs: ref(["كفالة", "إطعام"]),
        Byasc: [],
        props: ["filteredVegetables"],
        headers: [
            { title: "الترتيب", key: "id" },
            { title: "الاسم", key: "name" },
            { title: "مطلوب", key: "calories" },
            { title: "داخل", key: "fat" },
            { title: "عجز", key: "carbs" },
            { title: "التفاصيل", key: "protein" },
        ],

        vegetables: [
            {
                id: 1,
                name: "اسلام ابوسيف",
                calories: 5000,
                fat: 3000,
                carbs: 2000,
                protein: 2.9,
                iron: "15%",
                personalInformation: [
                    { namea: "اسلام ابوسيف" },
                    { nameb: "اسلام ابوسيف" },
                    { cardNumber: 124445788987 },
                    { Region: "البحيره" },
                    { HouseNumber: 4 },
                    { FloorNumber: 2 },
                    { theAddress: "دوله مصر - محافظه البحيره - مركز ابوحمص" },
                    { SocialStatus: "اعزب" },
                    { phoneNumber: "01201253897" },
                ],
                FinancialInformation: [
                    { Required: 2000 },
                    { Inside: 1000 },
                    { Impotence: 500 },
                    { TreatmentExpenses: 200 },
                ],
                SickCases: [
                    { PatientName: "اسلام علاء" },
                    { theDisease: "السكري" },
                    { treatment: "المستشفي" },
                    { Reasontreatment: "عدم القدره الماليه" },
                ],
                HousingCondition: [
                    { numberRooms: 3 },
                    { ApartmentType: "ايجار" },
                    { BathroomType: "مشترك" },
                    { FloorType: "بلاط" },
                    { Descriptionkitchen: "صغير" },
                    { DescriptionRoom1: "صغر" },
                    { DescriptionRoom2: "صغر" },
                    { DescriptionRoom3: "صفر" },
                ],
                FamilyNeeds: [
                    { medical: "صفر" },
                    { Husband: "صفر" },
                    { clothes: "صفر" },
                    { salaries: "صفر" },
                    { Blankets: "صفر" },
                    { FoodBag: "صفر" },
                    { MonthlyWarranty: "صفر" },
                    { Appliances: "صفر" },
                ],
            },
            {
                id: 2,
                name: "بهاء احمد",
                calories: 3,
                fat: 300,
                carbs: 2000,
                protein: 2.9,
                iron: "15%",
                personalInformation: [
                    { namea: " محمد احمد " },
                    { nameb: "اسلام ابوسيف" },
                    { cardNumber: 124445788987 },
                    { Region: "Albuhayra" },
                    { HouseNumber: 4 },
                    { FloorNumber: 2 },
                    { theAddress: "دوله مصر - محافظه البحيره - مركز ابوحمص" },
                    { SocialStatus: "اعزب" },
                    { phoneNumber: "01201253897" },
                ],
                FinancialInformation: [
                    { Required: 2000 },
                    { Inside: 1000 },
                    { Impotence: 500 },
                    { TreatmentExpenses: 200 },
                ],
                SickCases: [
                    { PatientName: "اسلام علاء" },
                    { theDisease: "السكري" },
                    { treatment: "المستشفي" },
                    { Reasontreatment: "عدم القدره الماليه" },
                ],
                HousingCondition: [
                    { numberRooms: 3 },
                    { ApartmentType: "ايجار" },
                    { BathroomType: "مشترك" },
                    { FloorType: "بلاط" },
                    { Descriptionkitchen: "صغير" },
                    { DescriptionRoom1: "صغر" },
                    { DescriptionRoom2: "صغر" },
                    { DescriptionRoom3: "صفر" },
                ],
                FamilyNeeds: [
                    { medical: "صفر" },
                    { Husband: "صفر" },
                    { clothes: "صفر" },
                    { salaries: "صفر" },
                    { Blankets: "صفر" },
                    { FoodBag: "صفر" },
                    { MonthlyWarranty: "صفر" },
                    { Appliances: "صفر" },
                ],
            },
            {
                id: 3,
                name: "جمال علي",
                calories: 23,
                fat: 400,
                carbs: 3000,
                protein: 2.9,
                iron: "15%",
                personalInformation: [
                    { namea: "خالد علي" },
                    { nameb: "اسلام ابوسيف" },
                    { cardNumber: 124445788987 },
                    { Region: "Albuhayra" },
                    { HouseNumber: 4 },
                    { FloorNumber: 2 },
                    { theAddress: "دوله مصر - محافظه البحيره - مركز ابوحمص" },
                    { SocialStatus: "اعزب" },
                    { phoneNumber: "01201253897" },
                ],
                FinancialInformation: [
                    { Required: 2000 },
                    { Inside: 1000 },
                    { Impotence: 500 },
                    { TreatmentExpenses: 200 },
                ],
                SickCases: [
                    { PatientName: "خالد علي" },
                    { theDisease: "السكري" },
                    { treatment: "المستشفي" },
                    { Reasontreatment: "عدم القدره الماليه" },
                ],
                HousingCondition: [
                    { numberRooms: 3 },
                    { ApartmentType: "ايجار" },
                    { BathroomType: "مشترك" },
                    { FloorType: "بلاط" },
                    { Descriptionkitchen: "صغير" },
                    { DescriptionRoom1: "صغر" },
                    { DescriptionRoom2: "صغر" },
                    { DescriptionRoom3: "صفر" },
                ],
                FamilyNeeds: [
                    { medical: "صفر" },
                    { Husband: "صفر" },
                    { clothes: "صفر" },
                    { salaries: "صفر" },
                    { Blankets: "صفر" },
                    { FoodBag: "صفر" },
                    { MonthlyWarranty: "صفر" },
                    { Appliances: "صفر" },
                ],
            },
            {
                id: 4,
                name: "على ابراهيم",
                calories: 32,
                fat: 500,
                carbs: 4000,
                protein: 2.9,
                iron: "15%",
                personalInformation: [
                    { namea: "محمد ابراهيم " },
                    { nameb: "اسلام ابوسيف" },
                    { cardNumber: 124445788987 },
                    { Region: "Albuhayra" },
                    { HouseNumber: 4 },
                    { FloorNumber: 2 },
                    { theAddress: "دوله مصر - محافظه البحيره - مركز ابوحمص" },
                    { SocialStatus: "اعزب" },
                    { phoneNumber: "01201253897" },
                ],
                FinancialInformation: [
                    { Required: 2000 },
                    { Inside: 1000 },
                    { Impotence: 500 },
                    { TreatmentExpenses: 200 },
                ],
                SickCases: [
                    { PatientName: "اسلام علاء" },
                    { theDisease: "السكري" },
                    { treatment: "المستشفي" },
                    { Reasontreatment: "عدم القدره الماليه" },
                ],
                HousingCondition: [
                    { numberRooms: 3 },
                    { ApartmentType: "ايجار" },
                    { BathroomType: "مشترك" },
                    { FloorType: "بلاط" },
                    { Descriptionkitchen: "صغير" },
                    { DescriptionRoom1: "صغر" },
                    { DescriptionRoom2: "صغر" },
                    { DescriptionRoom3: "صفر" },
                ],
                FamilyNeeds: [
                    { medical: "صفر" },
                    { Husband: "صفر" },
                    { clothes: "صفر" },
                    { salaries: "صفر" },
                    { Blankets: "صفر" },
                    { FoodBag: "صفر" },
                    { MonthlyWarranty: "صفر" },
                    { Appliances: "صفر" },
                ],
            },
            {
                id: 5,
                name: "كريم محمود",
                calories: 50,
                fat: 600,
                carbs: 5000,
                protein: 2.9,
                iron: "15%",
                personalInformation: [
                    { namea: "خالد محمود" },
                    { nameb: "اسلام ابوسيف" },
                    { cardNumber: 124445788987 },
                    { Region: "Albuhayra" },
                    { HouseNumber: 4 },
                    { FloorNumber: 2 },
                    { theAddress: "دوله مصر - محافظه البحيره - مركز ابوحمص" },
                    { SocialStatus: "اعزب" },
                    { phoneNumber: "01201253897" },
                ],
                FinancialInformation: [
                    { Required: 2000 },
                    { Inside: 1000 },
                    { Impotence: 500 },
                    { TreatmentExpenses: 200 },
                ],
                SickCases: [
                    { PatientName: "اسلام علاء" },
                    { theDisease: "السكري" },
                    { treatment: "المستشفي" },
                    { Reasontreatment: "عدم القدره الماليه" },
                ],
                HousingCondition: [
                    { numberRooms: 3 },
                    { ApartmentType: "ايجار" },
                    { BathroomType: "مشترك" },
                    { FloorType: "بلاط" },
                    { Descriptionkitchen: "صغير" },
                    { DescriptionRoom1: "صغر" },
                    { DescriptionRoom2: "صغر" },
                    { DescriptionRoom3: "صفر" },
                ],
                FamilyNeeds: [
                    { medical: "صفر" },
                    { Husband: "صفر" },
                    { clothes: "صفر" },
                    { salaries: "صفر" },
                    { Blankets: "1" },
                    { FoodBag: "صفر" },
                    { MonthlyWarranty: "صفر" },
                    { Appliances: "صفر" },
                ],
            },
            {
                id: 6,
                name: "سعيد محمود",
                calories: 20,
                fat: 700,
                carbs: 6000,
                protein: 2.9,
                iron: "15%",
                personalInformation: [
                    { namea: " سعيد محمود" },
                    { nameb: "اسلام ابوسيف" },
                    { cardNumber: 124445788987 },
                    { Region: "Albuhayra" },
                    { HouseNumber: 4 },
                    { FloorNumber: 2 },
                    { theAddress: "دوله مصر - محافظه البحيره - مركز ابوحمص" },
                    { SocialStatus: "اعزب" },
                    { phoneNumber: "01201253897" },
                ],
                FinancialInformation: [
                    { Required: 2000 },
                    { Inside: 1000 },
                    { Impotence: 500 },
                    { TreatmentExpenses: 200 },
                ],
                SickCases: [
                    { PatientName: "اسلام علاء" },
                    { theDisease: "السكري" },
                    { treatment: "المستشفي" },
                    { Reasontreatment: "عدم القدره الماليه" },
                ],
                HousingCondition: [
                    { numberRooms: 3 },
                    { ApartmentType: "ايجار" },
                    { BathroomType: "مشترك" },
                    { FloorType: "بلاط" },
                    { Descriptionkitchen: "صغير" },
                    { DescriptionRoom1: "صغر" },
                    { DescriptionRoom2: "صغر" },
                    { DescriptionRoom3: "صفر" },
                ],
                FamilyNeeds: [
                    { medical: "صفر" },
                    { Husband: "صفر" },
                    { clothes: "صفر" },
                    { salaries: "صفر" },
                    { Blankets: "1" },
                    { FoodBag: "صفر" },
                    { MonthlyWarranty: "صفر" },
                    { Appliances: "صفر" },
                ],
            },
            {
                id: 7,
                name: "عبد الرحمن شاهين",
                calories: 8,
                fat: 700,
                carbs: 7000,
                protein: 2.9,
                iron: "15%",
                personalInformation: [
                    { namea: "محمد شاهين" },
                    { nameb: "اسلام ابوسيف" },
                    { cardNumber: 124445788987 },
                    { Region: "Albuhayra" },
                    { HouseNumber: 4 },
                    { FloorNumber: 2 },
                    { theAddress: "دوله مصر - محافظه البحيره - مركز ابوحمص" },
                    { SocialStatus: "اعزب" },
                    { phoneNumber: "01201253897" },
                ],
                FinancialInformation: [
                    { Required: 2000 },
                    { Inside: 1000 },
                    { Impotence: 500 },
                    { TreatmentExpenses: 200 },
                ],
                SickCases: [
                    { PatientName: "اسلام علاء" },
                    { theDisease: "السكري" },
                    { treatment: "المستشفي" },
                    { Reasontreatment: "عدم القدره الماليه" },
                ],
                HousingCondition: [
                    { numberRooms: 3 },
                    { ApartmentType: "ايجار" },
                    { BathroomType: "مشترك" },
                    { FloorType: "بلاط" },
                    { Descriptionkitchen: "صغير" },
                    { DescriptionRoom1: "صغر" },
                    { DescriptionRoom2: "صغر" },
                    { DescriptionRoom3: "صفر" },
                ],
                FamilyNeeds: [
                    { medical: "صفر" },
                    { Husband: "صفر" },
                    { clothes: "صفر" },
                    { salaries: "صفر" },
                    { Blankets: "1" },
                    { FoodBag: "صفر" },
                    { MonthlyWarranty: "صفر" },
                    { Appliances: "صفر" },
                ],
            },
            {
                id: 8,
                name: "يزيد سمير",
                calories: 40,
                fat: 800,
                carbs: 8000,
                protein: 2.9,
                iron: "15%",
                personalInformation: [
                    { namea: "محمد سمير" },
                    { nameb: "اسلام ابوسيف" },
                    { cardNumber: 124445788987 },
                    { Region: "Albuhayra" },
                    { HouseNumber: 4 },
                    { FloorNumber: 2 },
                    { theAddress: "دوله مصر - محافظه البحيره - مركز ابوحمص" },
                    { SocialStatus: "اعزب" },
                    { phoneNumber: "01201253897" },
                ],
                FinancialInformation: [
                    { Required: 2000 },
                    { Inside: 1000 },
                    { Impotence: 500 },
                    { TreatmentExpenses: 200 },
                ],
                SickCases: [
                    { PatientName: "اسلام علاء" },
                    { theDisease: "السكري" },
                    { treatment: "المستشفي" },
                    { Reasontreatment: "عدم القدره الماليه" },
                ],
                HousingCondition: [
                    { numberRooms: 3 },
                    { ApartmentType: "ايجار" },
                    { BathroomType: "مشترك" },
                    { FloorType: "بلاط" },
                    { Descriptionkitchen: "صغير" },
                    { DescriptionRoom1: "صغر" },
                    { DescriptionRoom2: "صغر" },
                    { DescriptionRoom3: "صفر" },
                ],
                FamilyNeeds: [
                    { medical: "صفر" },
                    { Husband: "صفر" },
                    { clothes: "صفر" },
                    { salaries: "صفر" },
                    { Blankets: "1" },
                    { FoodBag: "صفر" },
                    { MonthlyWarranty: "صفر" },
                    { Appliances: "صفر" },
                ],
            },
            {
                id: 9,
                name: "انس علي",
                calories: 30,
                fat: 900,
                carbs: 2000,
                protein: 2.9,
                iron: "15%",
                personalInformation: [
                    { namea: "محمد علي " },
                    { nameb: "اسلام ابوسيف" },
                    { cardNumber: 124445788987 },
                    { Region: "Albuhayra" },
                    { HouseNumber: 4 },
                    { FloorNumber: 2 },
                    { theAddress: "دوله مصر - محافظه البحيره - مركز ابوحمص" },
                    { SocialStatus: "اعزب" },
                    { phoneNumber: "01201253897" },
                ],
                FinancialInformation: [
                    { Required: 2000 },
                    { Inside: 1000 },
                    { Impotence: 500 },
                    { TreatmentExpenses: 200 },
                ],
                SickCases: [
                    { PatientName: "اسلام علاء" },
                    { theDisease: "السكري" },
                    { treatment: "المستشفي" },
                    { Reasontreatment: "عدم القدره الماليه" },
                ],
                HousingCondition: [
                    { numberRooms: 3 },
                    { ApartmentType: "ايجار" },
                    { BathroomType: "مشترك" },
                    { FloorType: "بلاط" },
                    { Descriptionkitchen: "صغير" },
                    { DescriptionRoom1: "صغر" },
                    { DescriptionRoom2: "صغر" },
                    { DescriptionRoom3: "صفر" },
                ],
                FamilyNeeds: [
                    { medical: "صفر" },
                    { Husband: "صفر" },
                    { clothes: "صفر" },
                    { salaries: "صفر" },
                    { Blankets: "1" },
                    { FoodBag: "صفر" },
                    { MonthlyWarranty: "صفر" },
                    { Appliances: "66" },
                ],
            },

            {
                id: 10,
                name: "محمد سمير",
                calories: 28,
                fat: 500,
                carbs: 900,
                protein: 2.9,
                iron: "15%",
                personalInformation: [
                    { namea: "محمد سمير" },
                    { nameb: "اسلام ابوسيف" },
                    { cardNumber: 124445788987 },
                    { Region: "Albuhayra" },
                    { HouseNumber: 4 },
                    { FloorNumber: 2 },
                    { theAddress: "دوله مصر - محافظه البحيره - مركز ابوحمص" },
                    { SocialStatus: "اعزب" },
                    { phoneNumber: "01201253897" },
                ],
                FinancialInformation: [
                    { Required: 2000 },
                    { Inside: 1000 },
                    { Impotence: 500 },
                    { TreatmentExpenses: 200 },
                ],
                SickCases: [
                    { PatientName: "اسلام علاء" },
                    { theDisease: "السكري" },
                    { treatment: "المستشفي" },
                    { Reasontreatment: "عدم القدره الماليه" },
                ],
                HousingCondition: [
                    { numberRooms: 3 },
                    { ApartmentType: "ايجار" },
                    { BathroomType: "مشترك" },
                    { FloorType: "بلاط" },
                    { Descriptionkitchen: "صغير" },
                    { DescriptionRoom1: "صغر" },
                    { DescriptionRoom2: "صغر" },
                    { DescriptionRoom3: "صفر" },
                ],
                FamilyNeeds: [
                    { medical: "صفر" },
                    { Husband: "صفر" },
                    { clothes: "صفر" },
                    { salaries: "صفر" },
                    { Blankets: "1" },
                    { FoodBag: "صفر" },
                    { MonthlyWarranty: "صفر" },
                    { Appliances: "صفر" },
                ],
            },
            {
                id: 11,
                name: "   اكرم علي",
                calories: 33,
                fat: 300,
                carbs: 300,
                protein: 2.9,
                iron: "15%",
                personalInformation: [
                    { namea: "محمد علي " },
                    { nameb: "اسلام ابوسيف" },
                    { cardNumber: 124445788987 },
                    { Region: "Albuhayra" },
                    { HouseNumber: 4 },
                    { FloorNumber: 2 },
                    { theAddress: "دوله مصر - محافظه البحيره - مركز ابوحمص" },
                    { SocialStatus: "اعزب" },
                    { phoneNumber: "01201253897" },
                ],
                FinancialInformation: [
                    { Required: 2000 },
                    { Inside: 1000 },
                    { Impotence: 500 },
                    { TreatmentExpenses: 200 },
                ],
                SickCases: [
                    { PatientName: "اسلام علاء" },
                    { theDisease: "السكري" },
                    { treatment: "المستشفي" },
                    { Reasontreatment: "عدم القدره الماليه" },
                ],
                HousingCondition: [
                    { numberRooms: 3 },
                    { ApartmentType: "ايجار" },
                    { BathroomType: "مشترك" },
                    { FloorType: "بلاط" },
                    { Descriptionkitchen: "صغير" },
                    { DescriptionRoom1: "صغر" },
                    { DescriptionRoom2: "صغر" },
                    { DescriptionRoom3: "صفر" },
                ],
                FamilyNeeds: [
                    { medical: "صفر" },
                    { Husband: "صفر" },
                    { clothes: "صفر" },
                    { salaries: "صفر" },
                    { Blankets: "1" },
                    { FoodBag: "صفر" },
                    { MonthlyWarranty: "صفر" },
                    { Appliances: "66" },
                ],
            },
        ],
    }),
    // Search Fun
    computed: {
        // Calculate total number of pages based on number of cases and page size
        totalPages() {
            return Math.ceil(this.filteredCases.length / this.pageSize);
        },
        filteredVegetables() {
            return this.vegetables.filter((vege) => {
                return vege.name
                    .toLowerCase()
                    .includes(this.search.toLowerCase());
            });
        },
        // Filtered cases based on search term
        filteredCases() {
            return this.Cases.filter((Case) =>
                Case.personal_info.name.includes(this.search)
            );
        },
        // Paginated cases based on current page and page size
        paginatedCases() {
            const startIndex = (this.currentPage - 1) * this.pageSize;
            return this.filteredCases.slice(
                startIndex,
                startIndex + this.pageSize
            );
        },
    },
    methods: {
        // Method to handle pagination input change
        paginate(page) {
            this.currentPage = page;
        },

        Send_Function_To_Perant() {
            this.$emit("Send_Function_To_Perant", this.Get_data());
        },
        async Get_data() {
            this.Cases = [];
            const querySnapshot = await getDocs(collection(db, "Cases"));
            querySnapshot.forEach((doc) => {
                this.Cases.push(doc.data());
            });
            console.log("this.Cases", this.Cases);
            this.Cases_length = this.Cases.length;
            this.$emit("child-result", this.Cases_length);
        },
        // change view
        change_view() {
            document.querySelector(".boxes ").classList.toggle("Change_View");
        },
        openStatusInformation(product) {
            this.Emitter.emit("openStatusInformation", product);
        },
        filterData() {
            const filteredData = this.vegetables.filter();

            this.vegetables = filteredData;
        },
    },
    mounted() {
        // change view
        this.Emitter.on("change_view", () => {
            this.change_view();
        });

        // -----------------------------------------------------------------------------

        // Firts Function ordered By >>>> Swap BT Latest && Oldest
        // this.Emitter.on("FunLatest", () => {
        //     this.vegetables.sort((a, b) => (b[name] > a[name] ? 1 : -1));
        // });
        // / Seconed  Function ordered By >>>> A To Z
        this.Emitter.on("FunATZ", () => {
            this.vegetables.sort((a, b) => (a.name > b.name ? 1 : -1));
        });
        // / Third  Function ordered By >>>> Z To A
        this.Emitter.on("FunZTA", () => {
            this.vegetables.sort((a, b) => (b.name > a.name ? 1 : -1));
        });

        // ---------------------------------------------------------------------------
        // / Fourth  Function ordered By Cards >>>> S T L
        this.Emitter.on("CardsAscending", () => {
            this.newVegetables = this.vegetables.sort(
                (a, b) => a.carbs - b.carbs
            );
        });
        // / Fivth  Function ordered By Cards >>>> L T S
        this.Emitter.on("CardsDesaending", () => {
            this.newVegetables = this.vegetables.sort(
                (a, b) => b.carbs - a.carbs
            );
        });
        // / Sixth  Function ordered Fat >>>> S T L
        this.Emitter.on("FatAscending", () => {
            this.newVegetables = this.vegetables.sort((a, b) => a.fat - b.fat);
        });
        // / seventh  Function ordered Fat >>>> L T Z
        this.Emitter.on("fatDesaending", () => {
            this.newVegetables = this.vegetables.sort((a, b) => b.fat - a.fat);
        });
        // / Eight  Function ordered calories >>>>S T L
        this.Emitter.on("caloriesAscending", () => {
            this.newVegetables = this.vegetables.sort((a, b) => a.fat - b.fat);
        });
        // / nine  Function ordered calories >>>>S T L
        this.Emitter.on("caloriesDesaending", () => {
            this.newVegetables = this.vegetables.sort(
                (a, b) => b.calories - a.calories
            );
        });
    },
};
</script>
<style lang="scss" scoped>
.Table {
    display: table;
    width: 100%;
}
.Title {
    display: table-caption;
    text-align: center;
    font-weight: bold;
    font-size: larger;
}
.Heading {
    display: table-row;
    font-weight: bold;
    text-align: center;
}
.Row {
    display: table-row;
}
.Cell {
    display: table-cell;
    border: solid;
    border-width: thin;
    padding-left: 5px;
    padding-right: 5px;
}
/* Grid */
.grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: 10px;
}

.grid-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
    border: 1px solid #ccc;
}

.grid-cell {
    padding: 5px;
}
.boxes {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    margin: 10px auto;
    &.Change_View {
        flex-direction: row;
        flex-wrap: wrap;

        .box {
            width: 32%;
            flex-direction: column !important;
            gap: 20px;
            .row_chys {
                flex-direction: column !important;
                flex-wrap: nowrap;
                .col_chys {
                    max-width: 100% !important;
                    flex: 0;
                }
            }
            .About {
                width: 100%;
                justify-content: start;
            }
            .details {
                width: 100%;
            }
        }
    }
    .box {
        width: 100%;
        border: 1px solid #eee;
        border-radius: 5px;
        box-shadow: 0 0 10px #ddd;
        padding: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-family: system-ui;

        .About {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px;
            .index {
                padding: 5px 15px;
                border-radius: 5px;
                background: #eee;
                font-weight: bold;
            }
            .name {
                font-size: 20px;
                color: #767676;
                font-weight: bold;
                width: 250px;
            }
        }
        .Financial_details {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 30px;
            & > div {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                background: #fafafa;
                padding: 10px 15px;
                border-radius: 5px;
                div {
                    font-size: 12px;
                    font-weight: bold;
                    color: #767676;
                }
                span {
                    color: #0088ff;
                    font-weight: bold;
                    font-size: 20px;
                    width: 70px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: 5px;
                }
            }
        }
        .details {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            background: #0088ff;
            padding: 7px;
            border-radius: 5px;
            color: #fff;
            width: 50% !important;
            font-weight: bold;
            cursor: pointer;
        }
    }
}
@media (max-width: 768px) {
    .boxes .box .details {
        width: 50% !important;
    }
}
@media (max-width: 1400px) {
    .boxes.Change_View .box {
        width: 48% !important;
    }
}
@media (max-width: 800px) {
    .boxes.Change_View .box {
        width: 100% !important;
    }
}
@media (max-width: 900px) {
    .boxes .box .Financial_details > div[data-v-5f88210f] {
        padding: 0 !important;
        gap: 4px;
    }
    .boxes .box .row_chys .col_chys .details {
        width: 100% !important;
    }
    .boxes .box .row_chys .col_chys .Financial_details {
        gap: 4px !important;
    }
}
@media (max-width: 400px) {
    .chip_info[data-v-d1ccef3e] {
        padding: 5px !important;
        font-size: 16px !important;
    }
}
</style>
