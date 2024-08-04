import { defineStore } from "pinia";
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

// Define the Pinia store
export const useCharityStore = defineStore({
    // Store ID
    id: "charity",

    // State function
    state: () => ({
        loading: false,
        CharitiesDB: [],
        empty: false,
        CharitiesDB_length: 0,
    }),

    // Actions
    actions: {
        // Define the Get_Data method
        async Get_Data() {
            try {
                this.loading = true;
                const querySnapshot = await getDocs(
                    collection(db, "Charities")
                );
                querySnapshot.forEach((doc) => {
                    this.CharitiesDB.push(doc.data());
                });
                this.loading = false;
                this.CharitiesDB_length = this.CharitiesDB.length;
                // Emit an event if needed
                // this.$emit('child-result1', this.CharitiesDB_length);
                if (this.CharitiesDB.length === 0) {
                    this.empty = true;
                    this.startInternetCheckerUse();
                } else {
                    this.empty = false;
                }
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        },
    },
});
