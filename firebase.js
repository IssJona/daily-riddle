// Firebase wrapper: Google sign-in + one Firestore document per player.
// If Firebase can't load (offline, blocked), the app keeps working with local progress only.
const VERSION = "13.4.0";
const config = {
  apiKey: "AIzaSyANhI0QOBrBFd116QBE4pgjz1gD1t_QgBM",
  authDomain: "daily-riddle-1c609.firebaseapp.com",
  projectId: "daily-riddle-1c609",
  storageBucket: "daily-riddle-1c609.firebasestorage.app",
  messagingSenderId: "144709731326",
  appId: "1:144709731326:web:72eab1815cfdf4835236af"
};

let fb = null; // { auth, db, mods }

export async function initFirebase() {
  if (fb) return fb;
  const base = `https://www.gstatic.com/firebasejs/${VERSION}/`;
  const [appM, authM, fsM] = await Promise.all([
    import(base + "firebase-app.js"),
    import(base + "firebase-auth.js"),
    import(base + "firebase-firestore.js")
  ]);
  const app = appM.initializeApp(config);
  const auth = authM.getAuth(app);
  const db = fsM.getFirestore(app);
  try { await authM.getRedirectResult(auth); } catch (e) { console.warn("redirect result", e); }
  fb = { auth, db, authM, fsM };
  return fb;
}

export function onUser(cb) { fb.authM.onAuthStateChanged(fb.auth, cb); }

export async function signIn() {
  const provider = new fb.authM.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  try {
    await fb.authM.signInWithPopup(fb.auth, provider);
  } catch (e) {
    const fallback = ["auth/popup-blocked", "auth/operation-not-supported-in-this-environment", "auth/cancelled-popup-request"];
    if (fallback.includes(e.code)) return fb.authM.signInWithRedirect(fb.auth, provider);
    if (e.code === "auth/popup-closed-by-user") return;
    throw e;
  }
}

export function signOut() { return fb.authM.signOut(fb.auth); }

const userRef = uid => fb.fsM.doc(fb.db, "users", uid);

export async function loadUser(uid) {
  const snap = await fb.fsM.getDoc(userRef(uid));
  return snap.exists() ? snap.data() : null;
}

export function watchUser(uid, cb) {
  return fb.fsM.onSnapshot(userRef(uid), s => { if (s.exists()) cb(s.data()); }, e => console.warn(e));
}

export function saveUser(uid, data) {
  return fb.fsM.setDoc(userRef(uid), { ...data, updated: fb.fsM.serverTimestamp() });
}

export async function leaderboard() {
  const { collection, query, orderBy, limit, getDocs } = fb.fsM;
  const q = query(collection(fb.db, "users"), orderBy("points", "desc"), limit(100));
  const res = await getDocs(q);
  return res.docs.map(d => ({ uid: d.id, ...d.data() }));
}
