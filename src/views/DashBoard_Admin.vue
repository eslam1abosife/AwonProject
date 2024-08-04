<template>
    <div class="Dash_board">
        <!-- NavBar  -->
        <img
            style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 245px;
            "
            v-if="loading"
            src="../assets/images/Spinner@1x-1.0s-200px-200px.svg"
            alt=""
        />
        <v-container fluid v-if="!loading">
            <v-row>
                <v-col>
                    <div
                        class="d-flex justify-space-between align-end flex-wrap"
                        style="padding: 0px 90px; height: 115px"
                    >
                        <h1
                            style="
                                color: var(--main-color) !important;
                                font-weight: bold !important;
                            "
                        >
                            {{ tab }}
                        </h1>
                    </div>
                </v-col>
            </v-row>
        </v-container>
        <div class="container" v-if="!loading">
            <v-card style="width: 96.5% !important; margin: auto !important">
                <v-tabs
                    v-model="tab"
                    style="background: var(--secound-color) !important"
                >
                    <v-tab
                        style="
                            color: var(--main-color) !important;
                            font-weight: bold !important;
                            font-size: 20px !important;
                        "
                        value="المحتاجين"
                        >المحتاجين</v-tab
                    >
                    <v-tab
                        style="
                            color: var(--main-color) !important;
                            font-weight: bold !important;
                            font-size: 20px !important;
                        "
                        value="الجمعيات"
                        >الجمعيات</v-tab
                    >
                </v-tabs>
            </v-card>
            <v-window v-model="tab" v-if="!loading">
                <v-window-item value="المحتاجين">
                    <Offline_error>
                        <template v-slot:default>
                            <Empty_error v-if="empty === true" :text="text0" />
                            <div
                                class="cases"
                                v-if="(empty === false, !loading)"
                            >
                                <div
                                    class="box"
                                    :class="'box ' + Case.id"
                                    v-for="(Case, index) in paginatedCases"
                                    :key="Case.id"
                                >
                                    <div class="feat">
                                        <span>
                                            <div class="number">
                                                {{
                                                    (currentPage - 1) * 5 +
                                                    index +
                                                    1
                                                }}
                                            </div>
                                            <div class="name">
                                                {{ Case.personal_info.name }}
                                            </div>
                                        </span>
                                        <img
                                            src="../assets/images/trash.gif"
                                            alt=""
                                            width="25px"
                                            style="cursor: pointer"
                                            @click="deleteCase(Case.id)"
                                        />
                                    </div>
                                    <div class="body">
                                        <div class="feat">
                                            <div class="number">
                                                {{
                                                    Case.financial_info
                                                        .required || 0
                                                }}
                                            </div>
                                            <div class="title">المطلوب</div>
                                        </div>
                                        <div class="feat">
                                            <div class="number">
                                                {{
                                                    Case.financial_info.incom ||
                                                    0
                                                }}
                                            </div>
                                            <div class="title">الدخل</div>
                                        </div>
                                        <div class="feat">
                                            <div class="small_box">
                                                <div>
                                                    <!-- Progress circular -->
                                                    <div
                                                        class="progress-circular"
                                                    >
                                                        <v-progress-circular
                                                            class="mt-0"
                                                            bg-color="var(--secound-color)"
                                                            :rotate="360"
                                                            :size="70"
                                                            :width="20"
                                                            color="var(--main-color)"
                                                            style="
                                                                font-size: 13px;
                                                            "
                                                            :model-value="
                                                                Math.round(
                                                                    ((parseInt(
                                                                        Case
                                                                            .financial_info
                                                                            .incom
                                                                    ) || 0) /
                                                                        (parseInt(
                                                                            Case
                                                                                .financial_info
                                                                                .required
                                                                        ) ||
                                                                            0)) *
                                                                        100
                                                                ) || 0
                                                            "
                                                        >
                                                            <template #default>
                                                                <strong>
                                                                    {{
                                                                        Math.round(
                                                                            ((parseInt(
                                                                                Case
                                                                                    .financial_info
                                                                                    .incom
                                                                            ) ||
                                                                                0) /
                                                                                (parseInt(
                                                                                    Case
                                                                                        .financial_info
                                                                                        .required
                                                                                ) ||
                                                                                    0)) *
                                                                                100
                                                                        ) || 0
                                                                    }}%
                                                                </strong>
                                                            </template>
                                                        </v-progress-circular>
                                                        <p>
                                                            نسبة إكمال المطلوب
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="feat">
                                            <div class="number">لا</div>
                                            <div class="title">
                                                حالة مشتركة؟
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        class="details"
                                        @click="Case_Information(Case)"
                                    >
                                        <img
                                            src="../assets/images/info.gif"
                                            alt=""
                                            style="
                                                background-color: white;
                                                border: solid 2px white;
                                                border-radius: 50%;
                                                filter: hue-rotate(41deg);
                                            "
                                            width="25px"
                                        />
                                        <div>التفاصيل</div>
                                        <!--this a dialog to show the case's data-->
                                        <v-dialog
                                            activator="parent"
                                            width="100%"
                                            scrollable
                                        >
                                            <template
                                                v-slot:default="{ isActive }"
                                            >
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
                                                    <v-stepper
                                                        editable
                                                        :ripple="false"
                                                        v-model="e1"
                                                        alt-labels
                                                        style="
                                                            padding: 20px;
                                                            overflow: auto;
                                                        "
                                                    >
                                                        <template
                                                            v-slot:default="{
                                                                prev,
                                                                next,
                                                            }"
                                                        >
                                                            <v-stepper-header
                                                                class="stepper_head m-2"
                                                            >
                                                                <template
                                                                    v-for="n in steps"
                                                                    :key="`${n}-step`"
                                                                >
                                                                    <v-stepper-item
                                                                        :ripple="
                                                                            false
                                                                        "
                                                                        style="
                                                                            font-size: 15px;
                                                                            font-weight: bold;
                                                                        "
                                                                        :title="
                                                                            title[
                                                                                n
                                                                            ]
                                                                        "
                                                                        :complete="
                                                                            e1 >
                                                                            n
                                                                        "
                                                                        :step="`Step ${n}`"
                                                                        :value="
                                                                            n
                                                                        "
                                                                        ref="stepperItems"
                                                                    >
                                                                        <template
                                                                            v-slot:default
                                                                        >
                                                                            <v-icon
                                                                                v-if="
                                                                                    n ===
                                                                                    1
                                                                                "
                                                                                style="
                                                                                    font-size: 40px;
                                                                                "
                                                                                >mdi-account</v-icon
                                                                            >
                                                                            <v-icon
                                                                                v-if="
                                                                                    n ===
                                                                                    2
                                                                                "
                                                                                ><font-awesome-icon
                                                                                    icon="hand-holding-dollar"
                                                                            /></v-icon>
                                                                            <v-icon
                                                                                v-if="
                                                                                    n ===
                                                                                    3
                                                                                "
                                                                                ><font-awesome-icon
                                                                                    icon="briefcase-medical"
                                                                            /></v-icon>
                                                                            <v-icon
                                                                                v-if="
                                                                                    n ===
                                                                                    4
                                                                                "
                                                                                ><font-awesome-icon
                                                                                    icon="house-user"
                                                                            /></v-icon>
                                                                            <v-icon
                                                                                v-if="
                                                                                    n ===
                                                                                    5
                                                                                "
                                                                                ><font-awesome-icon
                                                                                    icon="people-line"
                                                                            /></v-icon>
                                                                        </template>
                                                                    </v-stepper-item>

                                                                    <v-divider
                                                                        v-if="
                                                                            n !==
                                                                            steps
                                                                        "
                                                                        :key="n"
                                                                    ></v-divider>
                                                                </template>
                                                            </v-stepper-header>

                                                            <v-stepper-window>
                                                                <div
                                                                    v-if="
                                                                        e1 === 1
                                                                    "
                                                                >
                                                                    <!-- Show empty error if no data -->
                                                                    <Empty_error
                                                                        v-if="
                                                                            Personal_Information.length ===
                                                                            0
                                                                        "
                                                                        :text="
                                                                            text
                                                                        "
                                                                    />
                                                                    <div
                                                                        v-else-if="
                                                                            Personal_Information.length !==
                                                                            0
                                                                        "
                                                                        class="form"
                                                                    >
                                                                        <div>
                                                                            <div
                                                                                class="mt-2 d-flex flex-column"
                                                                                style="
                                                                                    width: 100%;
                                                                                "
                                                                            >
                                                                                <v-text-field
                                                                                    v-model="
                                                                                        Personal_Information.name
                                                                                    "
                                                                                    label="الاسم ثلاثي"
                                                                                    variant="outlined"
                                                                                    style="
                                                                                        width: 100%;
                                                                                    "
                                                                                    placeholder="الاسم ثلاثي"
                                                                                ></v-text-field>
                                                                            </div>
                                                                            <div
                                                                                class="mt-2 d-flex flex-column"
                                                                                style="
                                                                                    width: 100%;
                                                                                "
                                                                            >
                                                                                <v-text-field
                                                                                    v-model="
                                                                                        Personal_Information.nick_name
                                                                                    "
                                                                                    label="اسم الشهره"
                                                                                    variant="outlined"
                                                                                    style="
                                                                                        width: 100%;
                                                                                    "
                                                                                    placeholder="اسم الشهره"
                                                                                ></v-text-field>
                                                                            </div>
                                                                        </div>
                                                                        <div>
                                                                            <div
                                                                                class="mt-2 d-flex flex-column"
                                                                                style="
                                                                                    width: 100%;
                                                                                "
                                                                            >
                                                                                <v-text-field
                                                                                    v-model="
                                                                                        Personal_Information.national_id
                                                                                    "
                                                                                    label="رقم البطاقه"
                                                                                    variant="outlined"
                                                                                    class="mt-2"
                                                                                    style="
                                                                                        width: 100%;
                                                                                    "
                                                                                    placeholder="رقم البطاقه"
                                                                                ></v-text-field>
                                                                            </div>
                                                                            <div
                                                                                class="mt-2 d-flex flex-column"
                                                                                style="
                                                                                    width: 100%;
                                                                                "
                                                                            >
                                                                                <v-select
                                                                                    v-model="
                                                                                        Personal_Information.governorate
                                                                                    "
                                                                                    label="المحافظه"
                                                                                    class="mt-2"
                                                                                    style="
                                                                                        width: 100%;
                                                                                    "
                                                                                    variant="outlined"
                                                                                    placeholder="المحافظه"
                                                                                    :items="
                                                                                        Governorates
                                                                                    "
                                                                                ></v-select>
                                                                            </div>
                                                                        </div>
                                                                        <div>
                                                                            <div
                                                                                class="mt-2 d-flex flex-column"
                                                                                style="
                                                                                    width: 100%;
                                                                                "
                                                                            >
                                                                                <v-textarea
                                                                                    v-model="
                                                                                        Personal_Information.detailed_address
                                                                                    "
                                                                                    class="mt-2"
                                                                                    style="
                                                                                        width: 100%;
                                                                                    "
                                                                                    label=" العنوان"
                                                                                    variant="outlined"
                                                                                    placeholder=" العنوان"
                                                                                    auto-grow
                                                                                ></v-textarea>
                                                                            </div>
                                                                        </div>
                                                                        <div>
                                                                            <div
                                                                                class="mt-2 d-flex flex-column"
                                                                                style="
                                                                                    width: 100%;
                                                                                "
                                                                            >
                                                                                <v-text-field
                                                                                    v-model="
                                                                                        Personal_Information.house_number
                                                                                    "
                                                                                    style="
                                                                                        width: 100%;
                                                                                    "
                                                                                    label="رقم المنزل"
                                                                                    variant="outlined"
                                                                                    placeholder="رقم المنزل"
                                                                                ></v-text-field>
                                                                            </div>
                                                                            <div
                                                                                class="d-flex flex-column"
                                                                                style="
                                                                                    width: 100%;
                                                                                "
                                                                            >
                                                                                <v-text-field
                                                                                    v-model="
                                                                                        Personal_Information.floor_number
                                                                                    "
                                                                                    label="رقم الدور"
                                                                                    class="mt-2"
                                                                                    style="
                                                                                        width: 100%;
                                                                                    "
                                                                                    variant="outlined"
                                                                                    placeholder="رقم الدور"
                                                                                ></v-text-field>
                                                                            </div>
                                                                        </div>

                                                                        <div>
                                                                            <div
                                                                                class="mt-2 d-flex flex-column"
                                                                                style="
                                                                                    width: 100%;
                                                                                "
                                                                            >
                                                                                <v-select
                                                                                    variant="outlined"
                                                                                    v-model="
                                                                                        Personal_Information.marital_status
                                                                                    "
                                                                                    class="mt-2"
                                                                                    style="
                                                                                        width: 100%;
                                                                                    "
                                                                                    :items="
                                                                                        SocialStatuss
                                                                                    "
                                                                                    label="الحاله الجتماعيه  "
                                                                                ></v-select>
                                                                            </div>
                                                                            <div
                                                                                class="mt-2 d-flex flex-column"
                                                                                style="
                                                                                    width: 100%;
                                                                                "
                                                                            >
                                                                                <v-text-field
                                                                                    v-model="
                                                                                        Personal_Information.phone
                                                                                    "
                                                                                    class="mt-2"
                                                                                    style="
                                                                                        width: 100%;
                                                                                    "
                                                                                    label="رقم التليفون"
                                                                                    variant="outlined"
                                                                                    placeholder="رقم التليفون"
                                                                                ></v-text-field>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    v-if="
                                                                        e1 === 2
                                                                    "
                                                                >
                                                                    <!-- Show empty error if no data -->
                                                                    <Empty_error
                                                                        v-if="
                                                                            Financial_Information.length ===
                                                                            0
                                                                        "
                                                                        :text="
                                                                            text1
                                                                        "
                                                                    />
                                                                    <div
                                                                        v-else-if="
                                                                            Financial_Information.length !==
                                                                            0
                                                                        "
                                                                        class="form"
                                                                    >
                                                                        <div>
                                                                            <div
                                                                                class="d-flex flex-column"
                                                                                style="
                                                                                    width: 100%;
                                                                                "
                                                                            >
                                                                                <v-text-field
                                                                                    v-model="
                                                                                        Financial_Information.required
                                                                                    "
                                                                                    label="المطلوب "
                                                                                    class="mt-2"
                                                                                    style="
                                                                                        width: 100%;
                                                                                    "
                                                                                    variant="outlined"
                                                                                    placeholder="المطلوب "
                                                                                ></v-text-field>
                                                                            </div>
                                                                            <div
                                                                                class="d-flex flex-column"
                                                                                style="
                                                                                    width: 100%;
                                                                                "
                                                                            >
                                                                                <v-text-field
                                                                                    v-model="
                                                                                        Financial_Information.incom
                                                                                    "
                                                                                    label="الداخل "
                                                                                    class="mt-2"
                                                                                    style="
                                                                                        width: 100%;
                                                                                    "
                                                                                    variant="outlined"
                                                                                    placeholder="الداخل "
                                                                                ></v-text-field>
                                                                            </div>
                                                                        </div>
                                                                        <div>
                                                                            <div
                                                                                class="d-flex flex-column"
                                                                                style="
                                                                                    width: 100%;
                                                                                "
                                                                            >
                                                                                <v-text-field
                                                                                    v-model="
                                                                                        Financial_Information.deficit
                                                                                    "
                                                                                    label="العجز "
                                                                                    class="mt-2"
                                                                                    style="
                                                                                        width: 100%;
                                                                                        pointer-events: none;
                                                                                    "
                                                                                    :value="
                                                                                        Financial_Information.required -
                                                                                        Financial_Information.incom
                                                                                    "
                                                                                    variant="outlined"
                                                                                    placeholder="العجز "
                                                                                ></v-text-field>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    v-if="
                                                                        e1 === 3
                                                                    "
                                                                >
                                                                    <!-- Show empty error if no data -->
                                                                    <Empty_error
                                                                        v-if="
                                                                            Disease_Information.length ===
                                                                            0
                                                                        "
                                                                        :text="
                                                                            text2
                                                                        "
                                                                    />
                                                                    <div v-else>
                                                                        <div
                                                                            v-for="info in Disease_Information"
                                                                            :key="
                                                                                info
                                                                            "
                                                                        >
                                                                            <div
                                                                                class="bg-[#eee]"
                                                                            >
                                                                                <div
                                                                                    class="mt-2 d-flex flex-column"
                                                                                    style="
                                                                                        width: 100%;
                                                                                    "
                                                                                >
                                                                                    <v-text-field
                                                                                        v-model="
                                                                                            info.patien_name
                                                                                        "
                                                                                        label="اسم المريض"
                                                                                        variant="outlined"
                                                                                        style="
                                                                                            width: 100%;
                                                                                        "
                                                                                        placeholder="اسم المريض"
                                                                                    ></v-text-field>
                                                                                </div>
                                                                                <div
                                                                                    class="d-flex flex-column"
                                                                                    style="
                                                                                        width: 100%;
                                                                                    "
                                                                                >
                                                                                    <v-text-field
                                                                                        v-model="
                                                                                            info.disease
                                                                                        "
                                                                                        label="  المرض "
                                                                                        variant="outlined"
                                                                                        class="mt-2"
                                                                                        style="
                                                                                            width: 100%;
                                                                                        "
                                                                                        placeholder=" المرض"
                                                                                    ></v-text-field>
                                                                                </div>
                                                                                <div
                                                                                    class="mt-2 d-flex flex-column"
                                                                                    style="
                                                                                        width: 100%;
                                                                                    "
                                                                                >
                                                                                    <v-text-field
                                                                                        v-model="
                                                                                            info.get_treatment
                                                                                        "
                                                                                        label="كيفيه الحصول علي العلاج"
                                                                                        variant="outlined"
                                                                                        class="mt-2"
                                                                                        style="
                                                                                            width: 100%;
                                                                                        "
                                                                                        placeholder="كيفيه الحصول علي العلاج "
                                                                                    ></v-text-field>
                                                                                </div>
                                                                                <div
                                                                                    class="mt-2 d-flex flex-column"
                                                                                    style="
                                                                                        width: 100%;
                                                                                    "
                                                                                >
                                                                                    <v-text-field
                                                                                        v-model="
                                                                                            info.not_available
                                                                                        "
                                                                                        label=" السبب في عدم العلاج علي نفقه الدولة"
                                                                                        variant="outlined"
                                                                                        class="mt-2"
                                                                                        style="
                                                                                            width: 100%;
                                                                                        "
                                                                                        placeholder="السبب في عدم العلاج علي نفقه الدولة"
                                                                                    ></v-text-field>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div
                                                                    v-if="
                                                                        e1 === 4
                                                                    "
                                                                >
                                                                    <!-- Show empty error if no data -->
                                                                    <Empty_error
                                                                        v-if="
                                                                            Housing_Condition.length ===
                                                                            0
                                                                        "
                                                                        :text="
                                                                            text3
                                                                        "
                                                                    />
                                                                    <div
                                                                        v-else-if="
                                                                            Housing_Condition.length !==
                                                                            0
                                                                        "
                                                                        class="form"
                                                                    >
                                                                        <div>
                                                                            <div
                                                                                class="d-flex flex-column"
                                                                                style="
                                                                                    width: 100%;
                                                                                "
                                                                            >
                                                                                <v-select
                                                                                    variant="outlined"
                                                                                    v-model="
                                                                                        Housing_Condition.number_rooms
                                                                                    "
                                                                                    :items="
                                                                                        number_rooms
                                                                                    "
                                                                                    class="mt-2"
                                                                                    style="
                                                                                        width: 100%;
                                                                                    "
                                                                                    label=" عدد الغرف"
                                                                                ></v-select>
                                                                            </div>
                                                                            <div
                                                                                class="d-flex flex-column"
                                                                                style="
                                                                                    width: 100%;
                                                                                "
                                                                            >
                                                                                <v-select
                                                                                    variant="outlined"
                                                                                    v-model="
                                                                                        Housing_Condition.house_type
                                                                                    "
                                                                                    :items="
                                                                                        items
                                                                                    "
                                                                                    class="mt-2"
                                                                                    style="
                                                                                        width: 100%;
                                                                                    "
                                                                                    label="الشقه ملك ام ايجار"
                                                                                ></v-select>
                                                                            </div>
                                                                        </div>
                                                                        <div>
                                                                            <div
                                                                                class="d-flex flex-column"
                                                                                style="
                                                                                    width: 100%;
                                                                                "
                                                                            >
                                                                                <v-select
                                                                                    variant="outlined"
                                                                                    v-model="
                                                                                        Housing_Condition.bathroom_type
                                                                                    "
                                                                                    :items="
                                                                                        amam
                                                                                    "
                                                                                    class="mt-2"
                                                                                    style="
                                                                                        width: 100%;
                                                                                    "
                                                                                    label="الحمام خاص ام مشترك"
                                                                                ></v-select>
                                                                            </div>
                                                                            <div
                                                                                class="d-flex flex-column"
                                                                                style="
                                                                                    width: 100%;
                                                                                "
                                                                            >
                                                                                <v-select
                                                                                    variant="outlined"
                                                                                    v-model="
                                                                                        Housing_Condition.floor_type
                                                                                    "
                                                                                    :items="
                                                                                        kitchen
                                                                                    "
                                                                                    class="mt-2"
                                                                                    style="
                                                                                        width: 100%;
                                                                                    "
                                                                                    label="  نوع الارضيه "
                                                                                ></v-select>
                                                                            </div>
                                                                        </div>
                                                                        <div>
                                                                            <div
                                                                                class="d-flex flex-column"
                                                                                style="
                                                                                    width: 100%;
                                                                                "
                                                                            >
                                                                                <v-text-field
                                                                                    v-model="
                                                                                        Housing_Condition.description_kitchen
                                                                                    "
                                                                                    label="  وصف شامل للمطبخ "
                                                                                    class="mt-2"
                                                                                    style="
                                                                                        width: 100%;
                                                                                    "
                                                                                    variant="outlined"
                                                                                    placeholder="وصف شامل للمطبخ"
                                                                                ></v-text-field>
                                                                            </div>
                                                                            <div
                                                                                class="d-flex flex-column"
                                                                                style="
                                                                                    width: 100%;
                                                                                "
                                                                            >
                                                                                <v-text-field
                                                                                    v-model="
                                                                                        Housing_Condition.DescriptionRoom1
                                                                                    "
                                                                                    label="  وصف سريع للغرفه رقم 1 "
                                                                                    variant="outlined"
                                                                                    class="mt-2"
                                                                                    style="
                                                                                        width: 100%;
                                                                                    "
                                                                                    placeholder="وصف سريع للغرفه رقم 1 "
                                                                                ></v-text-field>
                                                                            </div>
                                                                        </div>
                                                                        <div>
                                                                            <div
                                                                                class="d-flex flex-column"
                                                                                style="
                                                                                    width: 100%;
                                                                                "
                                                                            >
                                                                                <v-text-field
                                                                                    v-model="
                                                                                        Housing_Condition.DescriptionRoom2
                                                                                    "
                                                                                    v-show="
                                                                                        Housing_Condition.number_rooms >
                                                                                        1
                                                                                    "
                                                                                    label="  وصف سريع للغرفه رقم 2 "
                                                                                    class="mt-2"
                                                                                    style="
                                                                                        width: 100%;
                                                                                    "
                                                                                    variant="outlined"
                                                                                    placeholder="وصف سريع للغرفه رقم 2 "
                                                                                ></v-text-field>
                                                                            </div>

                                                                            <v-text-field
                                                                                v-model="
                                                                                    Housing_Condition.DescriptionRoom3
                                                                                "
                                                                                label="  وصف سريع للغرفه رقم 3 "
                                                                                v-show="
                                                                                    Housing_Condition.number_rooms >
                                                                                    2
                                                                                "
                                                                                class="mt-2"
                                                                                style="
                                                                                    width: 100%;
                                                                                "
                                                                                variant="outlined"
                                                                                placeholder="وصف سريع للغرفه رقم 3 "
                                                                            ></v-text-field>
                                                                        </div>

                                                                        <div>
                                                                            <div
                                                                                class="d-flex flex-column"
                                                                                style="
                                                                                    width: 100%;
                                                                                "
                                                                            >
                                                                                <v-text-field
                                                                                    v-model="
                                                                                        Housing_Condition.DescriptionRoom2
                                                                                    "
                                                                                    v-show="
                                                                                        Housing_Condition.number_rooms >
                                                                                        3
                                                                                    "
                                                                                    label="  وصف سريع للغرفه رقم 4 "
                                                                                    class="mt-2"
                                                                                    style="
                                                                                        width: 100%;
                                                                                    "
                                                                                    variant="outlined"
                                                                                    placeholder="وصف سريع للغرفه رقم 4 "
                                                                                ></v-text-field>
                                                                            </div>

                                                                            <v-text-field
                                                                                v-model="
                                                                                    Housing_Condition.DescriptionRoom3
                                                                                "
                                                                                label="  وصف سريع للغرفه رقم 5 "
                                                                                v-show="
                                                                                    Housing_Condition.number_rooms >
                                                                                    4
                                                                                "
                                                                                class="mt-2"
                                                                                style="
                                                                                    width: 100%;
                                                                                "
                                                                                variant="outlined"
                                                                                placeholder="وصف سريع للغرفه رقم 5 "
                                                                            ></v-text-field>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    v-if="
                                                                        e1 === 5
                                                                    "
                                                                >
                                                                    <!-- Show empty error if no data -->
                                                                    <Empty_error
                                                                        style="
                                                                            color: #0088ff;
                                                                        "
                                                                        v-if="
                                                                            Case_FamilyNeeds.length ===
                                                                            0
                                                                        "
                                                                        :text="
                                                                            text4
                                                                        "
                                                                    />
                                                                    <div
                                                                        v-else-if="
                                                                            Case_FamilyNeeds.length !==
                                                                            0
                                                                        "
                                                                        class="form"
                                                                    >
                                                                        <div
                                                                            class="d-flex"
                                                                        >
                                                                            <div
                                                                                style="
                                                                                    width: 100%;
                                                                                "
                                                                            >
                                                                                <v-checkbox
                                                                                    v-model="
                                                                                        Case_FamilyNeeds
                                                                                    "
                                                                                    label="طبي"
                                                                                    value="طبي"
                                                                                ></v-checkbox>
                                                                            </div>

                                                                            <div
                                                                                style="
                                                                                    width: 100%;
                                                                                "
                                                                            >
                                                                                <v-checkbox
                                                                                    v-model="
                                                                                        Case_FamilyNeeds
                                                                                    "
                                                                                    label="زوج"
                                                                                    value="زوج"
                                                                                ></v-checkbox>
                                                                            </div>
                                                                            <div
                                                                                class="d-flex flex-column"
                                                                                style="
                                                                                    width: 100%;
                                                                                "
                                                                            >
                                                                                <v-checkbox
                                                                                    v-model="
                                                                                        Case_FamilyNeeds
                                                                                    "
                                                                                    label="ملابس"
                                                                                    value="ملابس"
                                                                                ></v-checkbox>
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            class="d-flex"
                                                                        >
                                                                            <div
                                                                                class="d-flex flex-column"
                                                                                style="
                                                                                    width: 50%;
                                                                                "
                                                                            >
                                                                                <v-checkbox
                                                                                    v-model="
                                                                                        Case_FamilyNeeds
                                                                                    "
                                                                                    label="مرتبات"
                                                                                    value="مرتبات"
                                                                                ></v-checkbox>
                                                                            </div>

                                                                            <div
                                                                                class="d-flex flex-column"
                                                                                style="
                                                                                    width: 50%;
                                                                                "
                                                                            >
                                                                                <v-checkbox
                                                                                    v-model="
                                                                                        Case_FamilyNeeds
                                                                                    "
                                                                                    label="بطاطين"
                                                                                    value="بطاطين"
                                                                                ></v-checkbox>
                                                                            </div>
                                                                            <div
                                                                                class="d-flex flex-column"
                                                                                style="
                                                                                    width: 50%;
                                                                                "
                                                                            >
                                                                                <v-checkbox
                                                                                    v-model="
                                                                                        Case_FamilyNeeds
                                                                                    "
                                                                                    label="شنطه غذائيه"
                                                                                    value="شنطه غذائيه"
                                                                                ></v-checkbox>
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            class="d-flex"
                                                                        >
                                                                            <div
                                                                                class="d-flex flex-column"
                                                                                style="
                                                                                    width: 50%;
                                                                                "
                                                                            >
                                                                                <v-checkbox
                                                                                    v-model="
                                                                                        Case_FamilyNeeds
                                                                                    "
                                                                                    label="كفاله شهريه"
                                                                                    value="كفاله شهريه"
                                                                                ></v-checkbox>
                                                                            </div>

                                                                            <div
                                                                                class="d-flex flex-column"
                                                                                style="
                                                                                    width: 50%;
                                                                                "
                                                                            >
                                                                                <v-checkbox
                                                                                    v-model="
                                                                                        Case_FamilyNeeds
                                                                                    "
                                                                                    label="اجهزه منزليه"
                                                                                    value="اجهزه منزليه"
                                                                                ></v-checkbox>
                                                                            </div>
                                                                            <div
                                                                                class="d-flex flex-column"
                                                                                style="
                                                                                    width: 50%;
                                                                                "
                                                                            >
                                                                                <v-checkbox
                                                                                    v-model="
                                                                                        Case_FamilyNeeds
                                                                                    "
                                                                                    label="كفاله "
                                                                                    value="كفاله "
                                                                                ></v-checkbox>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        class="btn_add"
                                                                    >
                                                                        <v-btn
                                                                            style="
                                                                                font-family: Cairo !important;
                                                                                font-size: 20px !important;
                                                                            "
                                                                            class="btn"
                                                                            @click="
                                                                                Add_Cases
                                                                            "
                                                                            color="#fff"
                                                                            append-icon="mdi-account-plus"
                                                                            ><span
                                                                                >أضف
                                                                                الحالة</span
                                                                            >
                                                                        </v-btn>
                                                                    </div>
                                                                </div>
                                                            </v-stepper-window>

                                                            <v-stepper-actions
                                                                class="d-flex justify-center ga-5"
                                                                :disabled="
                                                                    disabled
                                                                "
                                                                @click:next="
                                                                    next
                                                                "
                                                                @click:prev="
                                                                    prev
                                                                "
                                                                type="submit"
                                                            >
                                                                <template
                                                                    #prev="{
                                                                        props,
                                                                    }"
                                                                >
                                                                    <v-btn
                                                                        class="prev"
                                                                        style="
                                                                            background-color: #eee;
                                                                        "
                                                                        @click="
                                                                            () =>
                                                                                props.onClick(
                                                                                    'prev'
                                                                                )
                                                                        "
                                                                        rounded="lg"
                                                                        size="x-large"
                                                                    >
                                                                        <span
                                                                            class="icon2 ml-3"
                                                                            ><font-awesome-icon
                                                                                icon="circle-chevron-right"
                                                                                size="lg"
                                                                        /></span>
                                                                        <span>
                                                                            رجوع</span
                                                                        >
                                                                    </v-btn>
                                                                </template>
                                                                <template
                                                                    #next="{
                                                                        props,
                                                                    }"
                                                                >
                                                                    <div>
                                                                        <v-btn
                                                                            @click="
                                                                                () =>
                                                                                    props.onClick(
                                                                                        'next'
                                                                                    )
                                                                            "
                                                                            rounded="lg"
                                                                            size="x-large"
                                                                        >
                                                                            <span>
                                                                                التالي</span
                                                                            >
                                                                            <span
                                                                                class="icon1 mr-4"
                                                                            >
                                                                                <font-awesome-icon
                                                                                    icon="circle-chevron-left"
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
                                    </div>
                                </div>
                            </div>
                            <div class="text-center" v-if="(!empty, !loading)">
                                <v-pagination
                                    v-if="!empty"
                                    v-model="currentPage"
                                    next-icon="mdi-menu-left"
                                    prev-icon="mdi-menu-right"
                                    :length="
                                        Math.ceil(filteredCases.length / 5)
                                    "
                                    :total-visible="5"
                                ></v-pagination>
                            </div>
                        </template>
                    </Offline_error>
                </v-window-item>

                <v-window-item
                    value="الجمعيات"
                    style="width: 96.5% !important; margin: auto !important"
                >
                    <CharityView @child-result1="handleChildResult1">
                        <template v-slot:default>
                            <!-- Display statistics -->
                            <div class="statistics">
                                <div class="title">
                                    <img
                                        src="../assets/images/analytics.gif"
                                        alt=""
                                        width="50px"
                                        style="filter: grayscale(1)"
                                    />
                                    <div>إحصائياتك</div>
                                </div>
                                <div class="main_box">
                                    <div class="small_box">
                                        <div class="number">
                                            {{ Cases.length || 0 }}
                                        </div>
                                        <span>حالة</span>
                                    </div>
                                    <div class="small_box">
                                        <div class="number">
                                            {{ childResult1 || 0 }}
                                        </div>
                                        <span>جمعية</span>
                                    </div>
                                </div>
                            </div>
                            <div class="use">
                                <div class="title">
                                    <div class="right">
                                        <img
                                            src="../assets/images/charity.gif"
                                            alt=""
                                            width="50px"
                                            style="filter: grayscale(1)"
                                            bg-color="var(--secound-color)"
                                        />
                                        <div>الجمعيات</div>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </CharityView>
                </v-window-item>
            </v-window>
        </div>
    </div>
</template>

<script scoped>
import Offline_error from "@/components/Offline_error.vue";
import Empty_error from "@/components/Empty_error.vue";
import { ref } from "vue";
// Get  data
import {
    getFirestore,
    getDocs,
    collection,
    deleteDoc,
    doc,
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
// import Components
import CharityView from "@/components/Charity_View.vue";
//import DashboardCharitys from "@/components/DashboardCharitys.vue";
//import Side_Bar from "@/components/Side_Bar.vue";

export default {
    inject: ["Emitter"],
    name: "Dash_board",

    components: {
        Empty_error,
        Offline_error,
        //DashboardCharitys,
        //Side_Bar,
        CharityView,
    },
    data() {
        return {
            search: "",
            childResult1: null,
            isActive: false,
            Personal_Information: "",
            knowledge: 33,
            knowledge_1: 66,
            value: 50,
            FinancialInformation: "",
            SickCases: "",
            HousingCondition: "",
            FamilyNeeds: "",
            text0: "لا توجد بيانات",
            text: "لا توجد معلومات شخصية",
            text1: "لا توجد معلومات مالية",
            text2: "لا توجد أمراض ",
            text3: "لا توجد معلومات عن المسكن",
            text4: "لا توجد معلومات عن احتياجات الأسرة",
            tab: null,
            loading: true, // Loading state
            currentPage: 1, // Current page
            pageSize: 5, // Number of cases per page
            Cases_length: 0,
            Cases: [],
            originalCases: [], // Store the original cases
            form: 1,
            isGridView: false,
            newVegetables: [],
            family_needs: ref(["كفالة", "إطعام"]),
            Byasc: [],
            Governorates: [
                "القاهرة",
                "الإسكندرية",
                "الجيزة",
                "القليوبية",
                "بورسعيد",
                "السويس",
                "أسيوط",
                "الإسماعيلية",
                "أسوان",
                "الفيوم",
                "دمياط",
                "الدقهلية",
                "الأقصر",
                "البحيرة",
                "المنيا",
                "قنا",
                "الشرقية",
                "سوهاج",
                "المنوفية",
                "الغربية",
                "مطروح",
                "كفر الشيخ",
                "شمال سيناء",
                "الوادي الجديد",
                "البحر الأحمر",
                "جنوب سيناء",
            ],

            items: ["ملك", "ايجار"],
            amam: ["مشترك", "خاص"],
            SocialStatuss: [
                "متزوج",
                "مطلق",
                "أعزب",
                "أرمل",
                "مطلقة",
                "عزباء",
                "أرملة",
            ],
            kitchen: ["بلاط", "سراميك", "بورسلين"],
            currentStep: 1,
            e1: 1,
            steps: 5,
            title: [
                "",
                "المعلومات الشخصية",
                "المعلومات المالية",
                "الأمراض",
                "حالة المسكن",
                "إحتياجات الأسرة",
            ],
            number_rooms: [1, 2, 3, 4, 5],
            empty: false,
        };
    },

    computed: {
        disabled() {
            return this.e1 === 1 ? "prev" : this.e1 === 5 ? "next" : undefined;
        },
        // Calculate total number of pages based on number of cases and page size
        totalPages() {
            return Math.ceil(this.filteredCases.length / this.pageSize);
        },
        // Filtered cases based on search term
        filteredCases() {
            if (!this.search.trim()) return this.Cases; // If search term is empty, return original Cases
            return this.Cases.filter((Case) =>
                Case.personal_info.name.includes(this.search.trim())
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
    mounted() {
        this.Get_data();
    },
    methods: {
        // Method to check internet connection status
        startInternetCheckerUse() {
            this.Emitter.emit("startInternetChecker");
        },
        async Get_data() {
            try {
                this.loading = true; // Set loading to true before fetching data
                this.Cases = [];
                const querySnapshot = await getDocs(collection(db, "Cases"));
                querySnapshot.forEach((doc) => {
                    this.Cases.push(doc.data());
                    this.originalCases = this.Cases;
                });
                this.Cases_length = this.Cases.length;
                console.log("this.Cases", this.Cases);
                if (this.Cases.length === 0) {
                    this.empty = true;
                    // Method to check internet connection status
                    this.startInternetCheckerUse();
                } else {
                    this.empty = false;
                }
                this.$emit("child-result", this.Cases_length);
                this.loading = false; // Set loading to false after data is loaded
            } catch (error) {
                console.error("Error adding document: ", error);
            }
        },
        async deleteCase(caseId) {
            try {
                // Log before attempting to delete
                console.log("Deleting case from Firestore:", caseId);

                // Delete the document from Firestore
                await deleteDoc(doc(db, "Cases", caseId));
                // Log after successful deletion
                console.log(
                    "Case deleted from Firestore successfully:",
                    caseId
                );
                // Find the index of the Case in the Cases array
                const index = this.Cases.findIndex(
                    (Case) => Case.id === caseId
                );

                // If the Case is found in the Cases array, remove it
                if (index !== -1) {
                    this.Cases.splice(index, 1);
                    console.log("Case deleted successfully from Cases array");
                } else {
                    console.log("Case not found in Cases array");
                }
            } catch (error) {
                console.error("Error deleting case:", error);
                // Check if Firestore returned any specific error message
                if (error.code === "permission-denied") {
                    console.error("Permission denied. Check Firestore rules.");
                } else {
                    console.error("Unknown Firestore error:", error);
                }
            }
        },
        //get the data for each case
        Case_Information(Case) {
            this.Personal_Information = Case.personal_info;
            console.log(this.Personal_Information.national_id);
            this.Financial_Information = Case.financial_info;

            this.Disease_Information = Case.diseases;

            this.Housing_Condition = Case.housing_condition;
            this.Case_FamilyNeeds = Case.family_needs;
        },
        // Define handleChildResult1 method to handle events from another child component
        handleChildResult1(result) {
            this.childResult1 = result;
            console.log("Received result from child:", this.childResult1);
        },
    },
};
</script>
<style lang="scss" scoped>
label input[type="file"] {
    display: none;
}
label span {
    cursor: pointer;
    background: #ddd;
    border: 2px solid #ddd;
    border-radius: 4px;
    padding: 10px 20px;
    display: flex;
    align-items: flex-start;
    align-content: space-around;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    height: 65px;
}
label span:hover {
    border-color: #09f;
}
label span:active {
    box-shadow: 1px 1px 0 #012;
}

.cases {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px;
    .box {
        display: flex;
        flex-direction: column;
        gap: 10px;
        border: 1px solid var(--secound-color);
        padding: 20px;
        border-radius: 5px;
        box-shadow: 0 0 10px #ddd;
        width: 100%;

        & > .feat:first-child {
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: relative;
            margin-bottom: 30px;
            &::before {
                content: "";
                position: absolute;
                bottom: -15px;
                height: 3px;
                width: 100%;
                background: var(--secound-color);
            }
            span {
                display: flex;
                align-items: center;
                gap: 10px;
                .number {
                    width: 30px;
                    height: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: var(--main-color);
                    color: #fff;
                    border-radius: 5px;
                    font-size: 20px;
                    font-weight: bold;
                }
                .name {
                    color: var(--therd-color);
                    font-weight: bold;
                }
            }
        }
        .body {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: center;
            gap: 10px;

            .feat {
                width: 23%;
                border: 1px solid var(--secound-color);
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                gap: 10px;
                padding: 10px;
                border-radius: 5px;
                height: 126px;
                .number {
                    height: 70px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 25px;
                    font-weight: bold;
                    color: var(--therd-color);
                }
                .title {
                    color: var(--main-color);
                    font-weight: bold;
                }
            }
            & > .feat:first-child {
                .number {
                    color: var(--main-color);
                }
                .title {
                    color: var(--therd-color);
                }
            }
        }
        .progress-circular {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 10px;
            p {
                font-weight: bold;
                color: var(--therd-color);
                text-align: center;
            }
        }
        .details {
            background: var(--main-color);
            border-radius: 5px;
            color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 10px;
            gap: 5px;
            font-weight: bold;
            margin-top: 10px;
            cursor: pointer;
        }
    }
}
.use {
    width: 100%;
    margin: auto;
    .title {
        margin-top: 40px;
        background: var(--secound-color);
        padding: 15px 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 3px;
        border-radius: 5px;
        color: var(--main-color);
        font-weight: bold;
        font-size: 20px;
        & > div {
            display: flex;
            align-items: center;
            gap: 4px;
        }
    }
}
.statistics {
    .title {
        padding: 20px;
        border-radius: 5px;
        display: flex;
        align-items: center;
        gap: 10px;
        box-shadow: 0 0 10px #ddd;
        font-size: 20px;
        color: var(--main-color);
        font-weight: bold;
    }
    .main_box {
        display: flex;
        align-items: center;
        gap: 20px;
        flex-wrap: wrap;
        margin-top: 25px;
        justify-content: center;
        .small_box {
            width: 15%;
            box-shadow: 0 0 10px #ddd;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            height: 155px;
            border-radius: 5px;
            border: 1px solid #ddd;
            .number {
                font-size: 35px;
                font-weight: bold;
                height: 90px;
                display: flex;
                justify-content: center;
                align-items: center;
                color: var(--main-color);
            }
            span {
                font-weight: bold;
                color: var(--therd-color);
            }
        }
    }
}
@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
@media (max-width: 768px) {
    .cases .box .body .feat {
        height: 145px;
        width: 48%;
    }
}
@media (max-width: 1060px) {
    .statistics .main_box .small_box {
        width: 47%;
    }
}
@media (max-width: 500px) {
    .chip_info[data-v-d1ccef3e] {
        padding: 5px !important;
        font-size: 16px !important;
    }
    .cases .box .body .feat {
        height: 145px;
        width: 100%;
        text-align: center;
    }
}
.stepper_head {
    border-radius: 5px 50px 5px 50px;
}
@media screen and (max-width: 1000px) {
    .v-stepper--alt-labels .v-stepper-header {
        display: grid !important;
        grid-template-columns: repeat(5, 1fr) !important;
    }
}
@media screen and (max-width: 700px) {
    .v-window,
    .v-window-item,
    .v-card,
    .container {
        padding: 0px !important;
        width: 100% !important;
    }
    .v-container div {
        padding: 0px 20px !important;
    }
    .v-stepper--alt-labels .v-stepper-header {
        display: flex !important;
        flex-direction: column !important;
    }
    .form > div[data-v-2ee767a5] {
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important  ;
    }
    .v-input__control,
    .mt-2.d-flex.flex-column,
    .d-flex.flex-column {
        width: 90% !important;
    }
}
@media screen and (max-width: 500px) {
    .v-container div {
        padding: 0px !important;
    }
}
.v-stepper-item {
    font-family: "Cairo", sans-serif !important;
}
.v-stepper-item.v-stepper-item--selected {
    color: #fff !important;
}
// All Used Animations
// Animation Fadein
@keyframes fadeIn {
    from {
        transform: scale(1);
        // transform: translateY(0px);
    }
    to {
        transform: scale(1.2);
        // transform: translateY(10px);
    }
}
// Ani MoveOn
@keyframes moveRight {
    from {
        transform: translateX(0);
        // transform: translateY(0px);
    }
    to {
        transform: translateX(-5px);
        // transform: translateY(10px);
    }
}
@keyframes moveLift {
    from {
        transform: translateX(0);
    }
    to {
        transform: translateX(5px);
    }
}
@keyframes Scale3d {
    from {
        transform: scaleY(1);
    }
    to {
        transform: scaleY(1.1);
    }
}
// for Box Focus
button.v-stepper-item.v-stepper-item--selected {
    background-color: #0088ff !important;
    border-radius: 5px 50px 5px 50px;
    transition: 1s;
    .v-icon.notranslate.v-theme--.v-icon--size-default,
    .v-stepper--alt-labels .v-stepper-item {
        color: #fff !important;
    }
    .v-icon.notranslate.v-theme--myCustomLightTheme.v-icon--size-default[data-v-2ee767a5] {
        color: #eee !important;
        animation: fadeIn 1s infinite ease-in-out alternate;
    }
    .v-icon.notranslate.v-theme--myCustomLightTheme.v-icon--size-default[data-v-5f88210f] {
        color: #fff;
    }
    .v-icon.notranslate.v-theme--myCustomLightTheme.v-icon--size-default[data-v-d1ccef3e] {
        color: #ddd;
    }
}
// Styling Form >> Add Casess personal info
::v-deep.v-input--density-default .v-field--variant-outlined,
::v-deep.v-input--density-default .v-field--single-line,
::v-deep.v-input--density-default .v-field--no-label {
    border-radius: 50px !important ;
    height: 70px !important;
    font-size: 20px !important;
    font-family: cairo;
}
.v-sheet.v-theme--myCustomLightTheme.v-stepper.v-stepper--alt-labels {
    min-height: 100%;
}
// Btn Steppers
.v-btn {
    display: flex;
    width: 150px;
    padding: 10px;
    transition: background-color 0.3s, color 0.3s;
    span {
        margin-right: 5px;
    }
    font-family: "Cairo";
}
.v-btn:hover {
    transition: 0.5;
    background-color: #eee !important;
    color: #0088ff !important;
}
.v-btn.prev:hover {
    background: #5c5c5c !important;
    color: #fff !important;
    transition: 0.5;
}
.icon2.ml-3 {
    font-size: 20px;
}
.v-btn:hover .icon2.ml-3 {
    animation: moveRight 0.5s infinite ease-in-out alternate;
}
.v-btn:hover .icon1.mr-4 {
    animation: moveLift 0.5s infinite ease-in-out alternate;
}
// div.Addbtn {
//     display: block !important;
// }
.Addbtn .v-btn {
    transition: 0.4s;
}
.Addbtn:hover .v-btn {
    background-color: #0088ff !important;
    color: #fff !important;
    // transition: 3s;
}
.v-checkbox {
    font-size: 20px;
}
::v-deep .v-label--clickable {
    width: 150px !important;
    font-size: 22px !important;
    margin: 15px !important;
    font-family: "Cairo" !important;
}
.btn_add {
    width: 200px;
    display: flex;
    justify-content: left;
    margin: 50px 0 0 0;
}
.btn_add .v-btn {
    width: 200px !important;
    height: 60px !important;
    padding: 10px !important;
    font-size: 20px !important;
    font-family: "Cairo" !important;
    border: 1px solid #0088ff;
    color: #0088ff !important;
    position: relative;
    overflow: hidden;
}
.btn_add:hover .v-btn {
    transition: 0.5s;
    background-color: #0088ff !important;
    color: #fff !important;
}
.text-h5.ps-2.text-primary {
    font-family: Cairo !important;
}
</style>
