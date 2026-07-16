import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
// Load Firebase credentials dynamically from environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/spreadsheets');
provider.addScope('https://www.googleapis.com/auth/drive.file');

let isSigningIn = false;
let cachedAccessToken = null;

// Initialize auth state listener
export const initAuth = (
  onAuthSuccess,
  onAuthFailure
) => {
  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      // In Firebase Auth, we need to ensure we have the cached token or retrieve it.
      // If we don't have it in memory, we may need to sign in again to get the accessToken,
      // or retrieve it if available. Usually, signInWithPopup provides it once per session.
      if (cachedAccessToken) {
        if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
      } else {
        // If not in memory, we can let user know they are logged in but need to re-authenticate
        // or we can prompt them when they action the sheet creation.
        if (onAuthSuccess) onAuthSuccess(user, null);
      }
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

// Sign in with Google to get user and accessToken
export const googleSignIn = async () => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Failed to get access token from Google Auth');
    }

    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error) {
    console.error('Google Sign-In Error:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const logout = async () => {
  await auth.signOut();
  cachedAccessToken = null;
};

export const getAccessToken = () => {
  return cachedAccessToken;
};

// Drive API: Search for existing "C.M Scents Orders" spreadsheet
export const findSpreadsheet = async (token) => {
  const query = encodeURIComponent("name='C.M Scents Orders' and mimeType='application/vnd.google-apps.spreadsheet' and trashed=false");
  const url = `https://www.googleapis.com/drive/v3/files?q=${query}&fields=files(id,name)`;
  
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  
  if (!response.ok) {
    throw new Error('Failed to search Google Drive');
  }
  
  const data = await response.json();
  if (data.files && data.files.length > 0) {
    return data.files[0].id;
  }
  return null;
};

// Sheets API: Create a new spreadsheet with header row
export const createSpreadsheet = async (token) => {
  const url = 'https://sheets.googleapis.com/v4/spreadsheets';
  
  const createResponse = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      properties: {
        title: 'C.M Scents Orders',
      },
    }),
  });
  
  if (!createResponse.ok) {
    throw new Error('Failed to create new spreadsheet');
  }
  
  const spreadsheet = await createResponse.json();
  const spreadsheetId = spreadsheet.spreadsheetId;
  
  // Initialize spreadsheet with headers
  const headers = [
    [
      'Order Number',
      'Date',
      'Customer Name',
      'Phone',
      'City',
      'Address',
      'Products',
      'Total Price (Rs.)',
      'Savings (Rs.)',
      'Payment Method',
      'Order Notes'
    ]
  ];
  
  const writeUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1!A1:K1?valueInputOption=USER_ENTERED`;
  const writeResponse = await fetch(writeUrl, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      values: headers,
    }),
  });
  
  if (!writeResponse.ok) {
    throw new Error('Failed to write headers to spreadsheet');
  }
  
  return spreadsheetId;
};

// Sheets API: Append order row
export const appendOrderRow = async (token, spreadsheetId, rowData) => {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1!A:K:append?valueInputOption=USER_ENTERED`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      values: [rowData],
    }),
  });
  
  if (!response.ok) {
    const errText = await response.text();
    console.error('Append Error Response:', errText);
    throw new Error('Failed to append order to spreadsheet');
  }
  
  return await response.json();
};
