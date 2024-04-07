import { env } from "$env/dynamic/private";

import admin from "firebase-admin";
let firebaseAdmin: admin.app.App | undefined = undefined;

if (!admin.apps.length) {
    firebaseAdmin = admin.initializeApp({
        credential: admin.credential.cert(JSON.parse(env.FIREBASE_ADMIN_KEY)),
    });
}

export default firebaseAdmin;
