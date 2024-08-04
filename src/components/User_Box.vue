<template>
    <v-avatar class="bg-grey">NA</v-avatar>
    <v-list nav>
        <v-list-title>مرحباً</v-list-title>
        <v-list-item
            ><router-link to="DashBoard_charities">
                إدارة الحالات</router-link
            ></v-list-item
        >
        <v-list-item
            ><router-link to="/"> إدارة المشتركين</router-link>
        </v-list-item>
        <v-list-item><v-icon>mdi-export</v-icon> تسجيل خروج</v-list-item>
    </v-list>
</template>
<script scoped>
export default {
    data: () => ({}),
};
</script>

{ Family_Member : { id : "", family_ID : "", }, Relativities : { id : "",
title:"", }, Medical_Conditions : { id : "", person_ID:"", }, Work : { id : "",
person_ID:"", }, Education : { id : "", person_ID:"", }, Marital_Statuses : { id
: "", title:"", } }
