<template>
    <!-- Handle offline error and empty data -->
    <Offline_error>
        <template v-slot:default>
            <img
                style="
                    position: fixed;
                    top: 80%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 245px;
                "
                v-if="loading"
                src="../assets/images/Spinner@1x-1.0s-200px-200px.svg"
                alt=""
            />
            <slot v-if="!loading"></slot>
            <!-- Show empty error if no data -->
            <Empty_error v-if="empty == true" :text="text" />
            <!-- Iterate over paginated charities -->
            <div class="Charities" v-if="(empty === false, !loading)">
                <div
                    class="box px-5 py-3 mt-5 border rounded"
                    v-for="(charity, index) in paginatedCharities"
                    :key="charity.id"
                >
                    <!-- Display serial number -->
                    <div class="feat">
                        <span>
                            <div class="number">
                                {{ (currentPage - 1) * 5 + index + 1 }}
                            </div>
                            <div class="name">
                                {{ charity.title }}
                            </div>
                        </span>
                        <img
                            src="../assets/images/trash.gif"
                            alt=""
                            width="25px"
                            style="cursor: pointer"
                            @click="deletecharity(charity.id)"
                        />
                    </div>
                    <div
                        class="number"
                        style="
                            color: var(--main-color);
                            font-size: 20px;
                            font-weight: bold;
                            text-align: right;
                        "
                    >
                        {{ charity.description }}
                    </div>
                    <div class="body">
                        <div class="feat">
                            <div class="number">
                                <!-- Return the icon according to the charity social media links -->
                                <div
                                    class="d-flex align-center justify-between"
                                >
                                    <a
                                        v-if="
                                            charity.facebook &&
                                            charity.facebookLink
                                        "
                                        :href="charity.facebookLink"
                                        ><v-icon>mdi-facebook</v-icon></a
                                    >
                                    <a
                                        v-if="
                                            charity.youtube &&
                                            charity.youtubeLink
                                        "
                                        :href="charity.youtubeLink"
                                        ><v-icon>mdi-youtube</v-icon></a
                                    >
                                    <a
                                        v-if="
                                            charity.linkedin &&
                                            charity.linkedinLink
                                        "
                                        :href="charity.linkedinLink"
                                        ><v-icon>mdi-linkedin</v-icon></a
                                    >
                                    <a
                                        v-if="
                                            charity.whatsapp &&
                                            charity.whatsappLink
                                        "
                                        :href="charity.whatsappLink"
                                        ><v-icon>mdi-whatsapp</v-icon></a
                                    >
                                    <a
                                        v-if="
                                            charity.instagram &&
                                            charity.instagramLink
                                        "
                                        :href="charity.instagramLink"
                                        ><v-icon>mdi-instagram</v-icon></a
                                    >
                                    <p
                                        v-if="
                                            !charity.instagram &&
                                            !charity.instagramLink &&
                                            !charity.whatsapp &&
                                            !charity.whatsappLink &&
                                            !charity.linkedin &&
                                            !charity.linkedinLink &&
                                            !charity.youtube &&
                                            !charity.youtubeLink &&
                                            !charity.facebook &&
                                            !charity.facebookLink
                                        "
                                    >
                                        لا توجد لينكات تواصل
                                    </p>
                                </div>
                            </div>
                            <div class="title">منصات</div>
                        </div>
                        <div class="feat">
                            <div class="number">
                                {{ charity.cases_number || 0 }}
                            </div>
                            <div class="title">حالة</div>
                        </div>

                        <div class="feat">
                            <div
                                class="number"
                                style="display: flex; flex-flow: row wrap"
                            >
                                <v-card
                                    elevation="0"
                                    v-for="(
                                        activity, index_1
                                    ) in charity.Charities_specialty"
                                    :key="index_1"
                                    class="ma-2 pa-3"
                                    rounded="lg"
                                    :value="activity"
                                    >{{ activity }}</v-card
                                >
                            </div>
                            <div class="title">أنشطة</div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Display pagination -->
            <div class="text-center" v-if="(empty === false, !loading)">
                <v-pagination
                    v-model="currentPage"
                    next-icon="mdi-menu-left"
                    prev-icon="mdi-menu-right"
                    :length="Math.ceil(CharitiesDB.length / 5)"
                    :total-visible="5"
                ></v-pagination>
            </div>
        </template>
    </Offline_error>
</template>

<script>
import { ref } from "vue";
import Offline_error from "@/components/Offline_error.vue";
import Empty_error from "@/components/Empty_error.vue";
// Get Data
import {
    getDocs,
    getFirestore,
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
export default {
    components: { Empty_error, Offline_error },
    inject: ["Emitter"],
    emits: ["child-result1"],
    data() {
        return {
            empty: false,
            currentPage: 1,
            text: "لا توجد بيانات",
            loading: false, // Loading state
            activities: ref(["كفالة", "إطعام"]),
            // ref to store the Charities data
            Charities: {}, // Initialize as an empty object
            CharitiesDB: [],
            CharitiesDB_length: 0,
        };
    },
    mounted() {
        // Method to check internet connection status
        this.startInternetCheckerUse();
        //call the function
        this.Get_Data();
    },
    computed: {
        paginatedCharities() {
            const start = (this.currentPage - 1) * 5;
            const end = start + 5;
            return this.CharitiesDB.slice(start, end);
        },
    },
    methods: {
        // Method to check internet connection status
        startInternetCheckerUse() {
            this.Emitter.emit("startInternetChecker");
        },
        Send_Function_To_Perant() {
            this.$emit("Send_Function_To_Perant", this.Get_data());
        },
        // Get Data
        async Get_Data() {
            try {
                this.loading = true; // Set loading to true before fetching data
                const querySnapshot = await getDocs(
                    collection(db, "Charities")
                );
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    const charityData = doc.data();
                    this.detectSocialMediaType(charityData);
                    this.CharitiesDB.push(charityData);
                });
                this.loading = false; // Set loading to false after data is loaded
                this.CharitiesDB_length = this.CharitiesDB.length;
                this.$emit("child-result1", this.CharitiesDB_length);
                if (this.CharitiesDB.length === 0) {
                    this.empty = true;
                    // Method to check internet connection status
                    this.startInternetCheckerUse();
                } else {
                    this.empty = false;
                }
            } catch (error) {
                console.error("Error adding document: ", error);
            }
        },
        async deletecharity(UsersId) {
            try {
                // Delete the document from Firestore
                await deleteDoc(doc(db, "Charities", UsersId));
                console.log("charity deleted successfully from Firestore");

                // Find the index of the CharitiesDB in the CharitiesDB array
                const index = this.CharitiesDB.findIndex(
                    (CharitiesDB) => CharitiesDB.id === UsersId
                );

                // If the charity is found in the charity array, remove it
                if (index !== -1) {
                    this.charity.splice(index, 1);
                    console.log(
                        "charity deleted successfully from charity array"
                    );
                } else {
                    console.log("charity not found in charity array");
                }
            } catch (error) {
                console.error("Error deleting charity:", error);
            }
        },
        //fuction to detect the Social_media link type
        detectSocialMediaType(charity) {
            const whatsappRegex = /^(https?):\/\/(www\.)?api\.whatsapp\.com/i;
            const youtubeRegex = /^(https?):\/\/(www\.)?youtube\.com/i;
            const linkedinRegex = /^(https?):\/\/(www\.)?linkedin\.com/i;
            const facebookRegex = /^(https?):\/\/(www\.)?facebook\.com/i;
            const instagramRegex = /^(https?):\/\/(www\.)?instagram\.com/i;

            if (charity.Social_media && Array.isArray(charity.Social_media)) {
                charity.Social_media.forEach((link) => {
                    if (whatsappRegex.test(link)) {
                        console.log("WhatsApp");
                        charity.whatsapp = true;
                        charity.whatsappLink = link;
                    } else if (youtubeRegex.test(link)) {
                        console.log("Youtube");
                        charity.youtube = true;
                        charity.youtubeLink = link;
                    } else if (linkedinRegex.test(link)) {
                        console.log("LinkedIn");
                        charity.linkedin = true;
                        charity.linkedinLink = link;
                    } else if (facebookRegex.test(link)) {
                        console.log("Facebook");
                        charity.facebook = true;
                        charity.facebookLink = link;
                    } else if (instagramRegex.test(link)) {
                        console.log("Instagram");
                        charity.instagram = true;
                        charity.instagramLink = link;
                    }
                });
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.Charities {
    display: flex;
    flex-direction: column;
    gap: 10px;
    .box {
        display: flex;
        flex-direction: column;
        gap: 10px;
        border: 1px solid var(--secound-color);
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
                min-width: 23%;
                border: 1px solid var(--secound-color);
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                gap: 10px;
                padding: 10px;
                border-radius: 5px;
                min-height: 126px;
                .number {
                    min-height: 70px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column !important;
                    font-size: 25px;
                    font-weight: bold;
                    color: var(--therd-color);
                }
                .title {
                    color: var(--main-color);
                    font-weight: bold;
                }
            }

            & > .feat:last-child {
                .number .v-card {
                    color: var(--main-color);
                }
                .title {
                    color: var(--therd-color);
                }
            }
        }
    }
}
@media (max-width: 900px) {
    .Charities .box .body .feat {
        min-height: 145px;
        min-width: 48%;
    }
}
@media (max-width: 700px) {
    .Charities .box .body .feat {
        min-height: 145px;
        min-width: 100%;
        text-align: center;
    }
}
</style>
