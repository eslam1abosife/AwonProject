<template>
    <!-- <v-dialog v-model="dialog"> -->
    <v-container style="direction: rtl">
        <v-row>
            <v-col>
                <v-card>
                    <v-toolbar>
                        <template v-slot:extension>
                            <v-tabs
                                v-model="tab"
                                align-tabs="title"
                                color="primary"
                                style="direction: ltr"
                            >
                                <v-tab
                                    v-for="head in headers"
                                    :key="head.title"
                                    :value="head.id"
                                    class="tabtest"
                                >
                                    <h1>{{ head.title }}</h1>
                                </v-tab>
                            </v-tabs>
                        </template>
                    </v-toolbar>

                    <v-window v-model="tab">
                        <v-window-item>
                            <form @submit.prevent="validateForm1">
                                <div class="card d-flex">
                                    <h1 class="w-25">الاسم ثلاثي</h1>
                                    <v-text-field
                                        v-model="form1.namea"
                                        label="الاسم ثلاثي"
                                        variant="outlined"
                                        class="mt-2"
                                        style="width: 45%"
                                        placeholder="الاسم ثلاثي"
                                        :class="[
                                            `${
                                                v$.form1.$errors.find(
                                                    (err) =>
                                                        err.$property == 'namea'
                                                )
                                                    ? 'danger'
                                                    : ''
                                            }`,
                                        ]"
                                    ></v-text-field>
                                </div>
                                <span
                                    v-for="err in v$.$errors"
                                    :key="err.$uid"
                                    style="
                                        display: block;
                                        margin-right: 273px;
                                        margin-bottom: 17px;
                                        color: red;
                                    "
                                >
                                    <span v-if="err.$property == 'namea'">{{
                                        err.$message
                                    }}</span>
                                </span>
                                <div class="card d-flex">
                                    <h1 class="w-25">اسم الشهره</h1>
                                    <v-text-field
                                        v-model="form1.nameb"
                                        label="اسم الشهره"
                                        variant="outlined"
                                        class="mt-2"
                                        style="width: 45%"
                                        placeholder="اسم الشهره"
                                        :class="[
                                            `${
                                                v$.form1.$errors.find(
                                                    (err) =>
                                                        err.$property == 'nameb'
                                                )
                                                    ? 'danger'
                                                    : ''
                                            }`,
                                        ]"
                                    >
                                    </v-text-field>
                                </div>
                                <span
                                    v-for="err in v$.$errors"
                                    :key="err.$uid"
                                    style="
                                        display: block;
                                        margin-right: 273px;
                                        margin-bottom: 17px;
                                        color: red;
                                    "
                                >
                                    <span v-if="err.$property == 'nameb'">{{
                                        err.$message
                                    }}</span>
                                </span>

                                <div class="card d-flex">
                                    <h1 class="w-25">رقم البطاقه</h1>
                                    <v-text-field
                                        v-model="form1.cardNumber"
                                        label="رقم البطاقه"
                                        variant="outlined"
                                        class="mt-2"
                                        style="width: 45%"
                                        placeholder="رقم البطاقه"
                                        :class="[
                                            `${
                                                v$.form1.$errors.find(
                                                    (err) =>
                                                        err.$property ==
                                                        'cardNumber'
                                                )
                                                    ? 'danger'
                                                    : ''
                                            }`,
                                        ]"
                                    ></v-text-field>
                                </div>
                                <span
                                    v-for="err in v$.$errors"
                                    :key="err.$uid"
                                    style="
                                        display: block;
                                        margin-right: 273px;
                                        margin-bottom: 17px;
                                        color: red;
                                    "
                                >
                                    <span
                                        v-if="err.$property == 'cardNumber'"
                                        >{{ err.$message }}</span
                                    >
                                </span>
                                <div class="card d-flex">
                                    <h1 class="w-25">المحافظه</h1>
                                    <v-text-field
                                        v-model="form1.Region"
                                        label="المحافظه"
                                        class="mt-2"
                                        style="width: 45%"
                                        variant="outlined"
                                        placeholder="المحافظه"
                                        :class="[
                                            `${
                                                v$.form1.$errors.find(
                                                    (err) =>
                                                        err.$property ==
                                                        'Region'
                                                )
                                                    ? 'danger'
                                                    : ''
                                            }`,
                                        ]"
                                    ></v-text-field>
                                </div>
                                <span
                                    v-for="err in v$.$errors"
                                    :key="err.$uid"
                                    style="
                                        display: block;
                                        margin-right: 273px;
                                        margin-bottom: 17px;
                                        color: red;
                                    "
                                >
                                    <span v-if="err.$property == 'Region'">{{
                                        err.$message
                                    }}</span>
                                </span>
                                <div class="card d-flex">
                                    <h1 class="w-25">رقم المنزل</h1>
                                    <v-text-field
                                        v-model="form1.HouseNumber"
                                        class="mt-2"
                                        style="width: 45%"
                                        label="رقم المنزل"
                                        variant="outlined"
                                        placeholder="رقم المنزل"
                                        :class="[
                                            `${
                                                v$.form1.$errors.find(
                                                    (err) =>
                                                        err.$property ==
                                                        'HouseNumber'
                                                )
                                                    ? 'danger'
                                                    : ''
                                            }`,
                                        ]"
                                    ></v-text-field>
                                </div>
                                <span
                                    v-for="err in v$.$errors"
                                    :key="err.$uid"
                                    style="
                                        display: block;
                                        margin-right: 273px;
                                        margin-bottom: 17px;
                                        color: red;
                                    "
                                >
                                    <span
                                        v-if="err.$property == 'HouseNumber'"
                                        >{{ err.$message }}</span
                                    >
                                </span>
                                <div class="card d-flex">
                                    <h1 class="w-25">رقم الدور</h1>
                                    <v-text-field
                                        v-model="form1.FloorNumber"
                                        label="رقم الدور"
                                        class="mt-2"
                                        style="width: 45%"
                                        variant="outlined"
                                        placeholder="رقم الدور"
                                        :class="[
                                            `${
                                                v$.form1.$errors.find(
                                                    (err) =>
                                                        err.$property ==
                                                        'FloorNumber'
                                                )
                                                    ? 'danger'
                                                    : ''
                                            }`,
                                        ]"
                                    ></v-text-field>
                                </div>
                                <span
                                    v-for="err in v$.$errors"
                                    :key="err.$uid"
                                    style="
                                        display: block;
                                        margin-right: 273px;
                                        margin-bottom: 17px;
                                        color: red;
                                    "
                                >
                                    <span
                                        v-if="err.$property == 'FloorNumber'"
                                        >{{ err.$message }}</span
                                    >
                                </span>
                                <div class="card d-flex">
                                    <h1 class="w-25">العنوان</h1>
                                    <v-text-field
                                        v-model="form1.theAddress"
                                        class="mt-2"
                                        style="width: 45%"
                                        label=" العنوان"
                                        variant="outlined"
                                        placeholder=" العنوان"
                                        :class="[
                                            `${
                                                v$.form1.$errors.find(
                                                    (err) =>
                                                        err.$property ==
                                                        'theAddress'
                                                )
                                                    ? 'danger'
                                                    : ''
                                            }`,
                                        ]"
                                    ></v-text-field>
                                </div>
                                <span
                                    v-for="err in v$.$errors"
                                    :key="err.$uid"
                                    style="
                                        display: block;
                                        margin-right: 273px;
                                        margin-bottom: 17px;
                                        color: red;
                                    "
                                >
                                    <span
                                        v-if="err.$property == 'theAddress'"
                                        >{{ err.$message }}</span
                                    >
                                </span>
                                <div class="card d-flex">
                                    <h1 class="w-25">الحاله الجتماعيه</h1>

                                    <v-select
                                        v-model="form1.SocialStatus"
                                        class="mt-2"
                                        style="width: 45%"
                                        :items="SocialStatuss"
                                        label="الحاله الجتماعيه  "
                                    ></v-select>
                                </div>
                                <span
                                    v-for="err in v$.$errors"
                                    :key="err.$uid"
                                    style="
                                        display: block;
                                        margin-right: 273px;
                                        margin-bottom: 17px;
                                        color: red;
                                    "
                                >
                                    <span
                                        v-if="err.$property == 'SocialStatus'"
                                        >{{ err.$message }}</span
                                    >
                                </span>
                                <div class="card d-flex">
                                    <h1 class="w-25">رقم التليفون</h1>
                                    <v-text-field
                                        v-model="form1.phoneNumber"
                                        class="mt-2"
                                        style="width: 45%"
                                        label="رقم التليفون"
                                        variant="outlined"
                                        placeholder="رقم التليفون"
                                        :class="[
                                            `${
                                                v$.form1.$errors.find(
                                                    (err) =>
                                                        err.$property ==
                                                        'phoneNumber'
                                                )
                                                    ? 'danger'
                                                    : ''
                                            }`,
                                        ]"
                                    ></v-text-field>
                                </div>
                                <span
                                    v-for="err in v$.$errors"
                                    :key="err.$uid"
                                    style="
                                        display: block;
                                        margin-right: 273px;
                                        margin-bottom: 17px;
                                        color: red;
                                    "
                                >
                                    <span
                                        v-if="err.$property == 'phoneNumber'"
                                        >{{ err.$message }}</span
                                    >
                                </span>
                                <div class="card w-50 mx-auto">
                                    <v-btn
                                        class="mt-2 bg-red"
                                        style="padding: 32px"
                                        type="submit"
                                        block
                                        >Submit</v-btn
                                    >
                                </div>
                            </form>
                        </v-window-item>
                        <v-window-item>
                            <form @submit.prevent="validateForm2">
                                <div class="card d-flex">
                                    <h1 class="w-25">المطلوب</h1>
                                    <v-text-field
                                        v-model="form2.Required"
                                        label="المطلوب "
                                        variant="outlined"
                                        placeholder="المطلوب "
                                        :class="[
                                            `${
                                                v$.form2.$errors.find(
                                                    (err) =>
                                                        err.$property ==
                                                        'Required'
                                                )
                                                    ? 'danger'
                                                    : ''
                                            }`,
                                        ]"
                                    ></v-text-field>
                                </div>
                                <span
                                    v-for="err in v$.$errors"
                                    :key="err.$uid"
                                    style="
                                        display: block;
                                        margin-right: 273px;
                                        margin-bottom: 17px;
                                        color: red;
                                    "
                                >
                                    <span v-if="err.$property == 'Required'">{{
                                        err.$message
                                    }}</span>
                                </span>
                                <div class="card d-flex">
                                    <h1 class="w-25">الداخل</h1>
                                    <v-text-field
                                        v-model="form2.Inside"
                                        label="الداخل "
                                        variant="outlined"
                                        placeholder="الداخل "
                                        :class="[
                                            `${
                                                v$.form2.$errors.find(
                                                    (err) =>
                                                        err.$property ==
                                                        'Inside'
                                                )
                                                    ? 'danger'
                                                    : ''
                                            }`,
                                        ]"
                                    ></v-text-field>
                                </div>
                                <span
                                    v-for="err in v$.$errors"
                                    :key="err.$uid"
                                    style="
                                        display: block;
                                        margin-right: 273px;
                                        margin-bottom: 17px;
                                        color: red;
                                    "
                                >
                                    <span v-if="err.$property == 'Inside'">{{
                                        err.$message
                                    }}</span>
                                </span>
                                <div class="card d-flex">
                                    <h1 class="w-25">العجز</h1>
                                    <v-text-field
                                        v-model="form2.Impotence"
                                        label="العجز "
                                        variant="outlined"
                                        placeholder="العجز "
                                        :class="[
                                            `${
                                                v$.form2.$errors.find(
                                                    (err) =>
                                                        err.$property ==
                                                        'Impotence'
                                                )
                                                    ? 'danger'
                                                    : ''
                                            }`,
                                        ]"
                                    ></v-text-field>
                                </div>
                                <span
                                    v-for="err in v$.$errors"
                                    :key="err.$uid"
                                    style="
                                        display: block;
                                        margin-right: 273px;
                                        margin-bottom: 17px;
                                        color: red;
                                    "
                                >
                                    <span v-if="err.$property == 'Impotence'">{{
                                        err.$message
                                    }}</span>
                                </span>
                                <div class="card d-flex">
                                    <h1 class="w-25">مصروفات العلاج</h1>
                                    <v-text-field
                                        v-model="form2.TreatmentExpenses"
                                        label=" مصروفات العلاج "
                                        variant="outlined"
                                        placeholder="  مصروفات العلاج  "
                                        :class="[
                                            `${
                                                v$.form2.$errors.find(
                                                    (err) =>
                                                        err.$property ==
                                                        'TreatmentExpenses'
                                                )
                                                    ? 'danger'
                                                    : ''
                                            }`,
                                        ]"
                                    ></v-text-field>
                                </div>
                                <span
                                    v-for="err in v$.$errors"
                                    :key="err.$uid"
                                    style="
                                        display: block;
                                        margin-right: 273px;
                                        margin-bottom: 17px;
                                        color: red;
                                    "
                                >
                                    <span
                                        v-if="
                                            err.$property == 'TreatmentExpenses'
                                        "
                                        >{{ err.$message }}</span
                                    >
                                </span>
                                <div class="card w-50 mx-auto">
                                    <v-btn
                                        class="mt-2 bg-red"
                                        style="padding: 32px"
                                        type="submit"
                                        block
                                        >Submit</v-btn
                                    >
                                </div>
                            </form>
                        </v-window-item>
                        <v-window-item>
                            <form @submit.prevent="validateForm3">
                                <div class="card d-flex">
                                    <h1 class="w-25">اسم المريض</h1>
                                    <v-text-field
                                        v-model="form3.PatientName"
                                        label=" اسم المريض "
                                        variant="outlined"
                                        placeholder="اسم المريض"
                                        :class="[
                                            `${
                                                v$.form1.$errors.find(
                                                    (err) =>
                                                        err.$property ==
                                                        'PatientName'
                                                )
                                                    ? 'danger'
                                                    : ''
                                            }`,
                                        ]"
                                    ></v-text-field>
                                </div>
                                <span
                                    v-for="err in v$.$errors"
                                    :key="err.$uid"
                                    style="
                                        display: block;
                                        margin-right: 273px;
                                        margin-bottom: 17px;
                                        color: red;
                                    "
                                >
                                    <span
                                        v-if="err.$property == 'PatientName'"
                                        >{{ err.$message }}</span
                                    >
                                </span>
                                <div class="card d-flex">
                                    <h1 class="w-25">المرض</h1>
                                    <v-text-field
                                        v-model="form3.theDisease"
                                        label="  المرض "
                                        variant="outlined"
                                        class="mt-2"
                                        style="width: 45%"
                                        placeholder=" المرض"
                                        :class="[
                                            `${
                                                v$.form1.$errors.find(
                                                    (err) =>
                                                        err.$property ==
                                                        'theDisease'
                                                )
                                                    ? 'danger'
                                                    : ''
                                            }`,
                                        ]"
                                    ></v-text-field>
                                </div>
                                <span
                                    v-for="err in v$.$errors"
                                    :key="err.$uid"
                                    style="
                                        display: block;
                                        margin-right: 273px;
                                        margin-bottom: 17px;
                                        color: red;
                                    "
                                >
                                    <span
                                        v-if="err.$property == 'theDisease'"
                                        >{{ err.$message }}</span
                                    >
                                </span>
                                <div class="card d-flex">
                                    <h1 class="w-25">
                                        كيفيه الحصول علي العلاج
                                    </h1>
                                    <v-text-field
                                        v-model="form3.treatment"
                                        label="كيفيه الحصول علي العلاج"
                                        variant="outlined"
                                        class="mt-2"
                                        style="width: 45%"
                                        placeholder="كيفيه الحصول علي العلاج "
                                        :class="[
                                            `${
                                                v$.form1.$errors.find(
                                                    (err) =>
                                                        err.$property ==
                                                        'treatment'
                                                )
                                                    ? 'danger'
                                                    : ''
                                            }`,
                                        ]"
                                    ></v-text-field>
                                </div>
                                <span
                                    v-for="err in v$.$errors"
                                    :key="err.$uid"
                                    style="
                                        display: block;
                                        margin-right: 273px;
                                        margin-bottom: 17px;
                                        color: red;
                                    "
                                >
                                    <span v-if="err.$property == 'treatment'">{{
                                        err.$message
                                    }}</span>
                                </span>
                                <div class="card d-flex">
                                    <h1 class="w-25">
                                        السبب في عد العلاج علي نفقه الدوله
                                    </h1>
                                    <v-text-field
                                        v-model="form3.Reasontreatment"
                                        label=" السبب في عد العلاج علي نفقه الدوله"
                                        variant="outlined"
                                        class="mt-2"
                                        style="width: 45%"
                                        placeholder="السبب في عد العلاج علي نفقه الدوله"
                                        :class="[
                                            `${
                                                v$.form1.$errors.find(
                                                    (err) =>
                                                        err.$property ==
                                                        'Reasontreatment'
                                                )
                                                    ? 'danger'
                                                    : ''
                                            }`,
                                        ]"
                                    ></v-text-field>
                                </div>
                                <span
                                    v-for="err in v$.$errors"
                                    :key="err.$uid"
                                    style="
                                        display: block;
                                        margin-right: 273px;
                                        margin-bottom: 17px;
                                        color: red;
                                    "
                                >
                                    <span
                                        v-if="
                                            err.$property == 'Reasontreatment'
                                        "
                                        >{{ err.$message }}</span
                                    >
                                </span>
                                <div class="card w-50 mx-auto">
                                    <v-btn
                                        class="mt-2 bg-red"
                                        style="padding: 32px"
                                        type="submit"
                                        block
                                        >Submit</v-btn
                                    >
                                </div>
                            </form>
                        </v-window-item>
                        <v-window-item>
                            <form @submit.prevent="validateForm4">
                                <div class="card d-flex">
                                    <h1 class="w-25">عدد الغرف</h1>
                                    <v-text-field
                                        v-model="form4.numberRooms"
                                        label="  عدد الغرف "
                                        variant="outlined"
                                        class="mt-2"
                                        style="width: 45%"
                                        placeholder=" عدد الغرف"
                                    ></v-text-field>
                                </div>
                                <span
                                    v-for="err in v$.$errors"
                                    :key="err.$uid"
                                    style="
                                        display: block;
                                        margin-right: 273px;
                                        margin-bottom: 17px;
                                        color: red;
                                    "
                                >
                                    <span
                                        v-if="err.$property == 'numberRooms'"
                                        >{{ err.$message }}</span
                                    >
                                </span>
                                <div class="card d-flex">
                                    <h1 class="w-25">الشقه ملك ام ايجار</h1>
                                    <v-select
                                        v-model="form4.ApartmentType"
                                        :items="items"
                                        class="mt-2"
                                        style="width: 45%"
                                        label="الشقه ملك ام ايجار"
                                    ></v-select>
                                </div>
                                <span
                                    v-for="err in v$.$errors"
                                    :key="err.$uid"
                                    style="
                                        display: block;
                                        margin-right: 273px;
                                        margin-bottom: 17px;
                                        color: red;
                                    "
                                >
                                    <span
                                        v-if="err.$property == 'ApartmentType'"
                                        >{{ err.$message }}</span
                                    >
                                </span>
                                <div class="card d-flex">
                                    <h1 class="w-25">الحمام خاص ام مشترك</h1>
                                    <v-select
                                        v-model="form4.BathroomType"
                                        :items="amam"
                                        class="mt-2"
                                        style="width: 45%"
                                        label="الحمام خاص ام مشترك"
                                    ></v-select>
                                </div>
                                <span
                                    v-for="err in v$.$errors"
                                    :key="err.$uid"
                                    style="
                                        display: block;
                                        margin-right: 273px;
                                        margin-bottom: 17px;
                                        color: red;
                                    "
                                >
                                    <span
                                        v-if="err.$property == 'BathroomType'"
                                        >{{ err.$message }}</span
                                    >
                                </span>
                                <div class="card d-flex">
                                    <h1 class="w-25">نوع الارضيه</h1>
                                    <v-select
                                        v-model="form4.FloorType"
                                        :items="kitchen"
                                        class="mt-2"
                                        style="width: 45%"
                                        label="  نوع الارضيه "
                                    ></v-select>
                                </div>
                                <span
                                    v-for="err in v$.$errors"
                                    :key="err.$uid"
                                    style="
                                        display: block;
                                        margin-right: 273px;
                                        margin-bottom: 17px;
                                        color: red;
                                    "
                                >
                                    <span v-if="err.$property == 'FloorType'">{{
                                        err.$message
                                    }}</span>
                                </span>
                                <div class="card d-flex">
                                    <h1 class="w-25">وصف شامل للمطبخ</h1>
                                    <v-text-field
                                        v-model="form4.Descriptionkitchen"
                                        label="  وصف شامل للمطبخ "
                                        class="mt-2"
                                        style="width: 45%"
                                        variant="outlined"
                                        placeholder="وصف شامل للمطبخ"
                                    ></v-text-field>
                                </div>
                                <span
                                    v-for="err in v$.$errors"
                                    :key="err.$uid"
                                    style="
                                        display: block;
                                        margin-right: 273px;
                                        margin-bottom: 17px;
                                        color: red;
                                    "
                                >
                                    <span
                                        v-if="
                                            err.$property ==
                                            'Descriptionkitchen'
                                        "
                                        >{{ err.$message }}</span
                                    >
                                </span>
                                <div class="card d-flex">
                                    <h1 class="w-25">وصف سريع للغرفه رقم 1</h1>
                                    <v-text-field
                                        v-model="form4.DescriptionRoom1"
                                        label="  وصف سريع للغرفه رقم 1 "
                                        variant="outlined"
                                        class="mt-2"
                                        style="width: 45%"
                                        placeholder="وصف سريع للغرفه رقم 1 "
                                    ></v-text-field>
                                </div>
                                <span
                                    v-for="err in v$.$errors"
                                    :key="err.$uid"
                                    style="
                                        display: block;
                                        margin-right: 273px;
                                        margin-bottom: 17px;
                                        color: red;
                                    "
                                >
                                    <span
                                        v-if="
                                            err.$property == 'DescriptionRoom1'
                                        "
                                        >{{ err.$message }}</span
                                    >
                                </span>
                                <v-btn
                                    style="
                                        display: block;
                                        margin-bottom: 25px;
                                        margin-right: 400px;
                                    "
                                    v-if="!showDiv1"
                                    @click="toggleDiv1"
                                    icon="mdi-plus"
                                    size="x-large"
                                >
                                </v-btn>
                                <div class="card d-flex" v-if="showDiv1">
                                    <h1 class="w-25">وصف سريع للغرفه رقم 2</h1>
                                    <v-text-field
                                        v-model="form4.DescriptionRoom2"
                                        label="  وصف سريع للغرفه رقم 2 "
                                        class="mt-2"
                                        style="width: 45%"
                                        variant="outlined"
                                        placeholder="وصف سريع للغرفه رقم 2 "
                                    ></v-text-field>
                                </div>
                                <span
                                    v-for="err in v$.$errors"
                                    :key="err.$uid"
                                    style="
                                        display: block;
                                        margin-right: 273px;
                                        margin-bottom: 17px;
                                        color: red;
                                    "
                                    v-show="showDiv1"
                                >
                                    <span
                                        v-if="
                                            err.$property == 'DescriptionRoom2'
                                        "
                                        >{{ err.$message }}</span
                                    >
                                </span>
                                <v-btn
                                    style="
                                        display: block;
                                        margin-bottom: 25px;
                                        margin-right: 400px;
                                    "
                                    v-show="showDiv1"
                                    v-if="!showDiv2"
                                    @click="toggleDiv2"
                                    icon="mdi-plus"
                                    size="x-large"
                                >
                                </v-btn>
                                <div class="card d-flex" v-if="showDiv2">
                                    <h1 class="w-25">وصف سريع للغرفه رقم 3</h1>
                                    <v-text-field
                                        v-model="form4.DescriptionRoom3"
                                        label="  وصف سريع للغرفه رقم 3 "
                                        class="mt-2"
                                        style="width: 45%"
                                        variant="outlined"
                                        placeholder="وصف سريع للغرفه رقم 3 "
                                    ></v-text-field>
                                </div>
                                <span
                                    v-show="showDiv2"
                                    v-for="err in v$.$errors"
                                    :key="err.$uid"
                                    style="
                                        display: block;
                                        margin-right: 273px;
                                        margin-bottom: 17px;
                                        color: red;
                                    "
                                >
                                    <span
                                        v-if="
                                            err.$property == 'DescriptionRoom3'
                                        "
                                        >{{ err.$message }}</span
                                    >
                                </span>
                                <div class="card w-50 mx-auto">
                                    <v-btn
                                        class="mt-2 bg-red"
                                        style="padding: 32px"
                                        type="submit"
                                        block
                                        >Submit</v-btn
                                    >
                                </div>
                            </form>
                        </v-window-item>
                        <v-window-item>
                            <form @submit.prevent="validateForm5">
                                <div class="card d-flex">
                                    <h1 class="w-25">طبي</h1>

                                    <v-checkbox
                                        v-model="form5.medical"
                                        label="طبي"
                                        value="طبي"
                                    ></v-checkbox>
                                </div>
                                <span
                                    v-for="err in v$.$errors"
                                    :key="err.$uid"
                                    style="
                                        display: block;
                                        margin-right: 273px;
                                        margin-bottom: 17px;
                                        color: red;
                                    "
                                >
                                    <span v-if="err.$property == 'medical'">{{
                                        err.$message
                                    }}</span>
                                </span>
                                <div class="card d-flex">
                                    <h1 class="w-25">زوج</h1>
                                    <v-checkbox
                                        v-model="form5.Husband"
                                        label="زوج"
                                        value="زوج"
                                    ></v-checkbox>
                                </div>
                                <span
                                    v-for="err in v$.$errors"
                                    :key="err.$uid"
                                    style="
                                        display: block;
                                        margin-right: 273px;
                                        margin-bottom: 17px;
                                        color: red;
                                    "
                                >
                                    <span v-if="err.$property == 'Husband'">{{
                                        err.$message
                                    }}</span>
                                </span>
                                <div class="card d-flex">
                                    <h1 class="w-25">ملابس</h1>
                                    <v-checkbox
                                        v-model="form5.clothes"
                                        label="ملابس"
                                        value="ملابس"
                                    ></v-checkbox>
                                </div>
                                <span
                                    v-for="err in v$.$errors"
                                    :key="err.$uid"
                                    style="
                                        display: block;
                                        margin-right: 273px;
                                        margin-bottom: 17px;
                                        color: red;
                                    "
                                >
                                    <span v-if="err.$property == 'clothes'">{{
                                        err.$message
                                    }}</span>
                                </span>
                                <div class="card d-flex">
                                    <h1 class="w-25">مرتبات</h1>
                                    <v-checkbox
                                        v-model="form5.salaries"
                                        label="مرتبات"
                                        value="مرتبات"
                                    ></v-checkbox>
                                </div>
                                <span
                                    v-for="err in v$.$errors"
                                    :key="err.$uid"
                                    style="
                                        display: block;
                                        margin-right: 273px;
                                        margin-bottom: 17px;
                                        color: red;
                                    "
                                >
                                    <span v-if="err.$property == 'salaries'">{{
                                        err.$message
                                    }}</span>
                                </span>
                                <div class="card d-flex">
                                    <h1 class="w-25">بطاطين</h1>
                                    <v-checkbox
                                        v-model="form5.Blankets"
                                        label="بطاطين"
                                        value="بطاطين"
                                    ></v-checkbox>
                                </div>
                                <span
                                    v-for="err in v$.$errors"
                                    :key="err.$uid"
                                    style="
                                        display: block;
                                        margin-right: 273px;
                                        margin-bottom: 17px;
                                        color: red;
                                    "
                                >
                                    <span v-if="err.$property == 'Blankets'">{{
                                        err.$message
                                    }}</span>
                                </span>
                                <div class="card d-flex">
                                    <h1 class="w-25">شنطه غذائيه</h1>
                                    <v-checkbox
                                        v-model="form5.FoodBag"
                                        label="شنطه غذائيه"
                                        value="شنطه غذائيه"
                                    ></v-checkbox>
                                </div>
                                <span
                                    v-for="err in v$.$errors"
                                    :key="err.$uid"
                                    style="
                                        display: block;
                                        margin-right: 273px;
                                        margin-bottom: 17px;
                                        color: red;
                                    "
                                >
                                    <span v-if="err.$property == 'FoodBag'">{{
                                        err.$message
                                    }}</span>
                                </span>
                                <div class="card d-flex">
                                    <h1 class="w-25">كفاله شهريه</h1>
                                    <v-checkbox
                                        v-model="form5.MonthlyWarranty"
                                        label="كفاله شهريه"
                                        value="كفاله شهريه"
                                    ></v-checkbox>
                                </div>
                                <span
                                    v-for="err in v$.$errors"
                                    :key="err.$uid"
                                    style="
                                        display: block;
                                        margin-right: 273px;
                                        margin-bottom: 17px;
                                        color: red;
                                    "
                                >
                                    <span
                                        v-if="
                                            err.$property == 'MonthlyWarranty'
                                        "
                                        >{{ err.$message }}</span
                                    >
                                </span>
                                <div class="card d-flex">
                                    <h1 class="w-25">اجهزه منزليه</h1>
                                    <v-checkbox
                                        v-model="form5.Appliances"
                                        label="اجهزه منزليه"
                                        value="اجهزه منزليه"
                                    ></v-checkbox>
                                </div>
                                <span
                                    v-for="err in v$.$errors"
                                    :key="err.$uid"
                                    style="
                                        display: block;
                                        margin-right: 273px;
                                        margin-bottom: 17px;
                                        color: red;
                                    "
                                >
                                    <span
                                        v-if="err.$property == 'Appliances'"
                                        >{{ err.$message }}</span
                                    >
                                </span>
                                <div class="card w-50 mx-auto">
                                    <v-btn
                                        class="mt-2 bg-red"
                                        style="padding: 32px"
                                        type="submit"
                                        block
                                        >Submit</v-btn
                                    >
                                </div>
                            </form>
                        </v-window-item>
                        <v-window-item>
                            <v-fade-transition hide-on-leave>
                                <v-card
                                    class="mx-auto"
                                    elevation="16"
                                    max-width="500"
                                >
                                    <v-divider></v-divider>

                                    <div class="py-12 text-center">
                                        <v-icon
                                            class="mb-6"
                                            color="success"
                                            icon="mdi-check-circle-outline"
                                            size="128"
                                        ></v-icon>

                                        <div class="text-h4 font-weight-bold">
                                            تم ارسال البيانات
                                        </div>
                                    </div>

                                    <v-divider></v-divider>

                                    <div class="pa-4 text-center">
                                        <v-btn
                                            class="text-none"
                                            color="medium-emphasis"
                                            min-width="92"
                                            variant="outlined"
                                            rounded
                                            @click="reloadPage"
                                        >
                                            Close
                                        </v-btn>
                                    </div>
                                </v-card>
                            </v-fade-transition>
                        </v-window-item>
                    </v-window>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
    <!-- </v-dialog
    > -->
</template>
<script>
import useVuelidate from "@vuelidate/core";
import {
    required,
    minLength,
    maxLength,
    // alpha,
    numeric,
    // regex,
    // between,
    helpers,
} from "@vuelidate/validators";
export default {
    inject: ["Emitter"],
    setup() {
        return { v$: useVuelidate() };
    },
    data: () => ({
        showDiv1: false,
        showDiv2: false,
        form1: {
            namea: "",
            nameb: "",
            cardNumber: "",
            Region: "",
            HouseNumber: "",
            FloorNumber: "",
            theAddress: "",
            SocialStatus: "",
            phoneNumber: "",
        },
        form2: {
            Required: "",
            Inside: "",
            Impotence: "",
            TreatmentExpenses: "",
        },

        form3: {
            PatientName: "",
            theDisease: "",
            treatment: "",
            Reasontreatment: "",
        },
        form4: {
            numberRooms: "",
            ApartmentType: "",
            BathroomType: "",
            FloorType: "",
            Descriptionkitchen: "",
            DescriptionRoom1: "",
            DescriptionRoom2: "",
            DescriptionRoom3: "",
        },
        form5: {
            medical: "",
            Husband: "",
            clothes: "",
            salaries: "",
            Blankets: "",
            FoodBag: "",
            MonthlyWarranty: "",
            Appliances: "",
        },
        items: ["ملك", "ايجار"],
        amam: ["مشترك", "خاص"],
        SocialStatuss: ["متزوج", "اعزب"],
        kitchen: ["بلاط", "سراميك", "بورسلين"],
        dialog: false,
        headers: [
            { title: "المعلومات الشخصيه", id: 0 },
            { title: "المعلومات الماليه", id: 1 },
            { title: "الحالات المرضيه", id: 2 },
            { title: "حاله المسكن", id: 3 },
            { title: "احتياجات الاسره", id: 4 },
            { title: " تم", id: 5 },
        ],

        tab: null,
        testform1: [],
        testform2: [],
        testform3: [],
        testform4: [],
        testform5: [],
        tab1: 0,
        fff: "3",
    }),
    validations() {
        return {
            form1: {
                namea: {
                    required: helpers.withMessage(
                        "لا يجب تركها فارغه",
                        required
                    ),
                    minLength: helpers.withMessage(
                        "لا يجب ان تقل عن 10 حروف ",
                        minLength(10)
                    ),
                    maxLength: helpers.withMessage(
                        "لا يجب ان تذيد عن 100 حروف ",
                        maxLength(100)
                    ),

                    regex: helpers.withMessage(
                        "يجب أن تحتوي على حروف عربية فقط",
                        /[\u0600-\u06FF\s]+/
                    ),
                },
                nameb: {
                    required: helpers.withMessage(
                        "لا يجب تركها فارغه",
                        required
                    ),
                    regex: helpers.withMessage(
                        "يجب أن تحتوي على حروف عربية فقط",
                        /[\u0600-\u06FF\s]+/
                    ),
                    minLength: helpers.withMessage(
                        "لا يجب ان تقل عن 3 حروف ",
                        minLength(3)
                    ),
                    maxLength: helpers.withMessage(
                        "لا يجب ان تذيد عن 100 حروف ",
                        maxLength(100)
                    ),
                },
                cardNumber: {
                    required: helpers.withMessage(
                        "لا يجب تركها فارغه",
                        required
                    ),
                    numeric: helpers.withMessage(
                        "  يجب ان تكون ارقام فقط",
                        numeric
                    ),
                },
                Region: {
                    required: helpers.withMessage(
                        "لا يجب تركها فارغه",
                        required
                    ),
                    regex: helpers.withMessage(
                        "يجب أن تحتوي على حروف عربية فقط",
                        /[\u0600-\u06FF\s]+/
                    ),
                },
                HouseNumber: {
                    required: helpers.withMessage(
                        "لا يجب تركها فارغه",
                        required
                    ),
                    numeric: helpers.withMessage(
                        "  يجب ان تكون ارقام فقط",
                        numeric
                    ),
                },
                FloorNumber: {
                    required: helpers.withMessage(
                        "لا يجب تركها فارغه",
                        required
                    ),
                    numeric: helpers.withMessage(
                        "  يجب ان تكون ارقام فقط",
                        numeric
                    ),
                },
                theAddress: {
                    required: helpers.withMessage(
                        "لا يجب تركها فارغه",
                        required
                    ),
                    regex: helpers.withMessage(
                        "يجب أن تحتوي على حروف عربية فقط",
                        /[\u0600-\u06FF\s]+/
                    ),
                },
                SocialStatus: {
                    required: helpers.withMessage(
                        "لا يجب تركها فارغه",
                        required
                    ),
                },
                phoneNumber: {
                    required: helpers.withMessage(
                        "لا يجب تركها فارغه",
                        required
                    ),
                    // between: between(, 120),
                    numeric: helpers.withMessage(
                        "  يجب ان تكون ارقام فقط",
                        numeric
                    ),
                },
            },
            form2: {
                Required: {
                    required: helpers.withMessage(
                        "لا يجب تركها فارغه",
                        required
                    ),
                    numeric: helpers.withMessage(
                        "  يجب ان تكون ارقام فقط",
                        numeric
                    ),
                },
                Inside: {
                    required: helpers.withMessage(
                        "لا يجب تركها فارغه",
                        required
                    ),
                    numeric: helpers.withMessage(
                        "  يجب ان تكون ارقام فقط",
                        numeric
                    ),
                },
                Impotence: {
                    required: helpers.withMessage(
                        "لا يجب تركها فارغه",
                        required
                    ),
                    numeric: helpers.withMessage(
                        "  يجب ان تكون ارقام فقط",
                        numeric
                    ),
                },
                TreatmentExpenses: {
                    required: helpers.withMessage(
                        "لا يجب تركها فارغه",
                        required
                    ),
                    numeric: helpers.withMessage(
                        "  يجب ان تكون ارقام فقط",
                        numeric
                    ),
                },
            },
            form3: {
                PatientName: {
                    required: helpers.withMessage(
                        "لا يجب تركها فارغه",
                        required
                    ),
                    regex: helpers.withMessage(
                        "يجب أن تحتوي على حروف عربية فقط",
                        /[\u0600-\u06FF\s]+/
                    ),
                },
                theDisease: {
                    required: helpers.withMessage(
                        "لا يجب تركها فارغه",
                        required
                    ),
                    regex: helpers.withMessage(
                        "يجب أن تحتوي على حروف عربية فقط",
                        /[\u0600-\u06FF\s]+/
                    ),
                },
                treatment: {
                    required: helpers.withMessage(
                        "لا يجب تركها فارغه",
                        required
                    ),
                    regex: helpers.withMessage(
                        "يجب أن تحتوي على حروف عربية فقط",
                        /[\u0600-\u06FF\s]+/
                    ),
                },
                Reasontreatment: {
                    required: helpers.withMessage(
                        "لا يجب تركها فارغه",
                        required
                    ),
                    regex: helpers.withMessage(
                        "يجب أن تحتوي على حروف عربية فقط",
                        /[\u0600-\u06FF\s]+/
                    ),
                },
            },
            form4: {
                numberRooms: {
                    required: helpers.withMessage(
                        "لا يجب تركها فارغه",
                        required
                    ),
                    numeric: helpers.withMessage(
                        "  يجب ان تكون ارقام فقط",
                        numeric
                    ),
                },
                ApartmentType: {
                    required: helpers.withMessage(
                        "لا يجب تركها فارغه",
                        required
                    ),
                },
                BathroomType: {
                    required: helpers.withMessage(
                        "لا يجب تركها فارغه",
                        required
                    ),
                },
                FloorType: {
                    required: helpers.withMessage(
                        "لا يجب تركها فارغه",
                        required
                    ),
                },
                Descriptionkitchen: {
                    required: helpers.withMessage(
                        "لا يجب تركها فارغه",
                        required
                    ),
                    regex: helpers.withMessage(
                        "يجب أن تحتوي على حروف عربية فقط",
                        /[\u0600-\u06FF\s]+/
                    ),
                },
                DescriptionRoom1: {
                    required: helpers.withMessage(
                        "لا يجب تركها فارغه",
                        required
                    ),
                    regex: helpers.withMessage(
                        "يجب أن تحتوي على حروف عربية فقط",
                        /[\u0600-\u06FF\s]+/
                    ),
                },
                DescriptionRoom2: {
                    regex: helpers.withMessage(
                        "يجب أن تحتوي على حروف عربية فقط",
                        /[\u0600-\u06FF\s]+/
                    ),
                },
                DescriptionRoom3: {
                    regex: helpers.withMessage(
                        "يجب أن تحتوي على حروف عربية فقط",
                        /[\u0600-\u06FF\s]+/
                    ),
                },
            },
            form5: {
                medical: {},
                Husband: {},
                clothes: {},
                salaries: {},
                Blankets: {},
                FoodBag: {},
                MonthlyWarranty: {},
                Appliances: {},
            },
        };
    },
    methods: {
        async validateForm1() {
            const res = await this.v$.form1.$validate();
            if (res) {
                this.testform1.push(
                    { namea: this.form1.namea },
                    { nameb: this.form1.nameb },
                    { cardNumber: this.form1.cardNumber },
                    { Region: this.form1.Region },
                    { HouseNumber: this.form1.HouseNumber },
                    { FloorNumber: this.form1.FloorNumber },
                    { theAddress: this.form1.theAddress },
                    { SocialStatus: this.form1.SocialStatus },
                    { phoneNumber: this.form1.phoneNumber }
                );
                const arr = document.querySelectorAll(".tabtest")[0];
                const arr1 = document.querySelectorAll(".tabtest")[1];
                arr1.click();
                arr.style.color = "green";
                arr.style.cursor = "no-drop";
                console.log(this.testform1);
                this.v$.$reset();
                this.form1.namea = "";
                this.form1.nameb = "";
                this.form1.cardNumber = "";
                this.form1.Region = "";
                this.form1.HouseNumber = "";
                this.form1.FloorNumber = "";
                this.form1.theAddress = "";
                this.form1.SocialStatus = "";
                this.form1.phoneNumber = "";
                this.testform1 = [];
            }
        },
        async validateForm2() {
            const res = await this.v$.form2.$validate();
            if (res) {
                this.testform2.push(
                    { Required: this.form2.Required },
                    { Inside: this.form2.Inside },
                    { Impotence: this.form2.Impotence },
                    { TreatmentExpenses: this.form2.TreatmentExpenses }
                );
                const arr = document.querySelectorAll(".tabtest")[1];
                const arr1 = document.querySelectorAll(".tabtest")[2];
                arr1.click();
                arr.style.color = "green";
                arr.style.cursor = "no-drop";
                console.log(this.testform2);
                this.v$.$reset();
                this.form2.Required = "";
                this.form2.Inside = "";
                this.form2.Impotence = "";
                this.form2.TreatmentExpenses = "";

                this.testform2 = [];
            }
        },
        async validateForm3() {
            const res = await this.v$.form3.$validate();
            if (res) {
                this.testform3.push(
                    { PatientName: this.form3.PatientName },
                    { theDisease: this.form3.theDisease },
                    { treatment: this.form3.treatment },
                    {
                        Reasontreatment: this.form3.Reasontreatment,
                    }
                );
                const arr = document.querySelectorAll(".tabtest")[2];
                const arr1 = document.querySelectorAll(".tabtest")[3];
                arr1.click();
                arr.style.color = "green";
                arr.style.cursor = "no-drop";
                console.log(this.testform3);
                this.v$.$reset();
                this.form3.PatientName = "";
                this.form3.theDisease = "";
                this.form3.treatment = "";
                this.form3.Reasontreatment = "";

                this.testform3 = [];
            }
        },
        async validateForm4() {
            const res = await this.v$.form4.$validate();
            if (res) {
                this.testform4.push(
                    { numberRooms: this.form4.numberRooms },
                    { ApartmentType: this.form4.ApartmentType },
                    { BathroomType: this.form4.BathroomType },
                    { FloorType: this.form4.FloorType },
                    { Descriptionkitchen: this.form4.Descriptionkitchen },
                    { DescriptionRoom1: this.form4.DescriptionRoom1 }
                );
                if (this.showDiv1) {
                    this.testform4.push({
                        DescriptionRoom2: this.form4.DescriptionRoom2,
                    });
                }
                if (this.showDiv2) {
                    this.testform4.push({
                        DescriptionRoom3: this.form4.DescriptionRoom3,
                    });
                }
                const arr = document.querySelectorAll(".tabtest")[3];
                const arr1 = document.querySelectorAll(".tabtest")[4];
                arr1.click();
                arr.style.color = "green";
                arr.style.cursor = "no-drop";
                console.log(this.testform4);
                this.v$.$reset();
                this.form4.numberRooms = "";
                this.form4.ApartmentType = "";
                this.form4.BathroomType = "";
            }
            this.form4.FloorType = "";
            this.form4.Descriptionkitchen = "";
            this.form4.DescriptionRoom1 = "";
            this.form4.DescriptionRoom2 = "";
            this.form4.DescriptionRoom3 = "";

            this.testform4 = [];
        },
        async validateForm5() {
            const res = await this.v$.form5.$validate();
            if (res) {
                this.testform5.push(
                    { medical: this.form5.medical },
                    { Husband: this.form5.Husband },
                    { clothes: this.form5.clothes },
                    { salaries: this.form5.salaries },
                    { Blankets: this.form5.Blankets },
                    { FoodBag: this.form5.FoodBag },
                    { MonthlyWarranty: this.form5.MonthlyWarranty },
                    { Appliances: this.form5.Appliances }
                );
                const arr = document.querySelectorAll(".tabtest")[4];
                const arr1 = document.querySelectorAll(".tabtest")[5];
                arr1.click();
                arr.style.color = "green";
                arr.style.cursor = "no-drop";
                console.log(this.testform5);
                this.v$.$reset();
                this.form5.medical = "";
                this.form5.Husband = "";
                this.form5.clothes = "";
                this.form5.salaries = "";
                this.form5.Blankets = "";
                this.form5.FoodBag = "";
                this.form5.MonthlyWarranty = "";
                this.form5.Appliances = "";

                this.testform5 = [];
            }
        },
        reloadPage() {
            window.location.reload();
        },

        toggleDiv1() {
            this.showDiv1 = !this.showDiv1; // تغيير حالة العنصر ما بين الظهور والاختفاء
        },
        toggleDiv2() {
            this.showDiv2 = !this.showDiv2; // تغيير حالة العنصر ما بين الظهور والاختفاء
        },
    },
};
</script>
<style>
@media (max-width: 778px) {
    .v-slide-group__container {
        direction: ltr !important;
    }
}
.v-toolbar__extension {
    justify-content: flex-start !important;
}
.v-toolbar__content {
    direction: rtl;
    height: 0px !important;
}
.v-window-item {
    margin-right: 38px !important;
    text-align: start !important;
    padding: 20px !important;
}
.danger {
    color: red !important;
}
.tap_button {
    cursor: no-drop !important;
    color: green !important;
}
</style>
