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

export const useCaseStore = defineStore({
    id: "case",

    state: () => ({
        loading: false,
        Cases: [],
        originalCases: [],
        empty: false,
        casesLength: 0,
        deficit: 0,
        required: 0,
        incom: 0,
    }),

    // Options object
    options: {
        // Make the data strict
        strict: true,
    },
    actions: {
        async fetchData() {
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
                this.sumFinancialData();
                this.loading = false; // Set loading to false after data is loaded
            } catch (error) {
                console.error("Error adding document: ", error);
            }
        },

        // Loop through each case to extract financial_info
        sumFinancialData() {
            this.deficit = 0;
            this.required = 0;
            this.incom = 0;
            this.Cases.forEach((Case) => {
                if (!isNaN(parseInt(Case.financial_info.deficit))) {
                    this.deficit += parseInt(Case.financial_info.deficit);
                }
                if (!isNaN(parseInt(Case.financial_info.required))) {
                    this.required += parseInt(Case.financial_info.required);
                }
                if (!isNaN(parseInt(Case.financial_info.incom))) {
                    this.incom += parseInt(Case.financial_info.incom);
                }
            });
            this.value = Math.round((this.incom / this.required) * 100);
        },
    },
});
