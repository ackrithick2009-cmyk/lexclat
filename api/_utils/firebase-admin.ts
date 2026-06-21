import admin from 'firebase-admin';

let initialized = false;
let dbInstance: any = null;

export function getDb() {
  if (!initialized) {
    try {
      if (!admin.apps.length) {
        const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT
          ? JSON.parse(Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT, 'base64').toString())
          : undefined;

        admin.initializeApp(serviceAccount
          ? { credential: admin.credential.cert(serviceAccount) }
          : {}
        );
      }
      dbInstance = admin.firestore();
      initialized = true;
    } catch (e) {
      console.warn('Firebase Admin init failed:', e);
    }
  }
  return dbInstance;
}
