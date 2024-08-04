import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import DashBoard_charities from "@/views/DashBoard_charities.vue";
import DashBoard_Admin from "@/views/DashBoard_Admin.vue";
import Settings_Admin from "@/views/Settings_Admin.vue";
import Reset_Password from "@/views/Reset_Password.vue";
import { doc, getDoc } from "firebase/firestore";
import { initializeApp } from "@firebase/app";
import { getFirestore } from "firebase/firestore";

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

const routes = [
    {
        path: "/",
        name: "home",
        component: HomeView,
    },
    {
        path: "/DashBoard_charities",
        name: "DashBoard_charities",
        component: DashBoard_charities,
        meta: { requiresAuth: true, requiredAuthority: "owner" },
    },
    {
        path: "/DashBoard_Admin",
        name: "DashBoard_Admin",
        component: DashBoard_Admin,
        meta: { requiresAuth: true, requiredAuthority: "admin" },
    },
    {
        path: "/Settings_Admin",
        name: "Settings_Admin",
        component: Settings_Admin,
    },
    {
        path: "/Reset_Password",
        name: "Reset_Password",
        component: Reset_Password,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

router.beforeEach(async (to, from, next) => {
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
    const requiredAuthority = to.meta.requiredAuthority;

    // Check if route requires authentication
    if (requiresAuth) {
        try {
            const userData = await Check_User();

            if (!userData) {
                console.log("User data not found");
                next("/");
                return;
            }

            // Check if user has required authority
            if (userData.type !== requiredAuthority) {
                console.log("User does not have required authority");
                next("/");
                return;
            }

            // Proceed to the route
            next();
        } catch (error) {
            console.error("Error checking user:", error);
            next("/"); // Redirect to error page if there's an issue
        }
    } else {
        // If route does not require authentication, proceed
        next();
    }
});

async function Check_User() {
    try {
        const userId = localStorage.getItem("id");
        if (!userId) {
            console.log("User ID not found in localStorage");
            return null;
        }

        const docRef = doc(db, "Users", userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const userData = docSnap.data();

            return {
                type: userData.type,
                // You can add more fields as needed
            };
        } else {
            console.log("No such document!");
            return null;
        }
    } catch (error) {
        console.error("Error fetching user:", error);
        throw error; // Throw the error to handle it in the calling function
    }
}

export default router;
