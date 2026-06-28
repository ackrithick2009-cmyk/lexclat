import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, updateDoc, collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import firebaseConfig from '@/firebase-applet-config.json';
import { toast } from 'sonner';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// ─── Google Sign-In (Popup + Redirect Fallback) ───

export const loginWithGoogle = async (useRedirect = false) => {
  try {
    if (useRedirect) {
      // Use redirect flow for mobile or when popup fails
      await signInWithRedirect(auth, googleProvider);
      return null; // Redirect will reload the page
    }
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    await createUserProfile(user);
    return user;
  } catch (error: any) {
    // Handle specific popup errors gracefully
    if (error.code === 'auth/popup-blocked') {
      toast.info('Popup blocked. Redirecting to sign-in...');
      await signInWithRedirect(auth, googleProvider);
      return null;
    }
    if (error.code === 'auth/popup-closed-by-user') {
      toast.error('Sign-in was cancelled. Please try again.');
      return null;
    }
    if (error.code === 'auth/cancelled-popup-request') {
      // Multiple popup requests, ignore
      return null;
    }
    if (error.code === 'auth/network-request-failed') {
      toast.error('Network error. Please check your connection and try again.');
      return null;
    }
    handleFirestoreError(error, OperationType.GET, 'auth/google_login');
    throw error;
  }
};

// ─── Handle Redirect Result (call once on app load) ───

export async function handleRedirectResult() {
  try {
    const result = await getRedirectResult(auth);
    if (result?.user) {
      await createUserProfile(result.user);
      return result.user;
    }
    return null;
  } catch (error: any) {
    if (error.code === 'auth/account-exists-with-different-credential') {
      toast.error('An account already exists with this email using a different sign-in method.');
    } else if (error.code === 'auth/network-request-failed') {
      toast.error('Network error. Please check your connection.');
    } else {
      console.error('Redirect result error:', error);
    }
    return null;
  }
}

// ─── Create User Profile ───

async function createUserProfile(user: FirebaseUser) {
  const userRef = doc(db, 'users', user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    await setDoc(userRef, {
      email: user.email,
      displayName: user.displayName || 'Aspirant',
      photoURL: user.photoURL || '',
      isPremium: false,
      studentStatus: 'school',
      targetNLU: '',
      targetRank: 0,
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
}

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
