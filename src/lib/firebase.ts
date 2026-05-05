import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, updateDoc, collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import firebaseConfig from '@/firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Check if user exists in Firestore
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
      // Create initial profile with all required fields from blueprint
      await setDoc(userRef, {
        email: user.email,
        displayName: user.displayName || 'Aspirant',
        isPremium: false,
        studentStatus: 'school',
        diagnosticScores: {
          english: 0,
          gk: 0,
          legal: 0,
          logical: 0,
          quant: 0
        },
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    }
    return user;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, 'auth/google_login');
    throw error;
  }
};

export const logout = () => auth.signOut();

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const user = auth.currentUser;
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: user?.uid || null,
      email: user?.email || null,
      emailVerified: user?.emailVerified || null,
    },
    operationType,
    path
  }
  
  if (errInfo.error.includes('insufficient permissions')) {
    console.warn(`[PERMISSIONS] Denied ${operationType} on ${path}. User: ${user?.uid || 'Anonymous'}`);
  }

  console.error('Firestore Error Payload: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}
