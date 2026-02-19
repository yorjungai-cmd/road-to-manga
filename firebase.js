// ═══════════════════════════════════════════════════════════
// firebase.js — Yor's Road to Reading Japanese Manga
// Firebase Auth + Firestore Cloud Sync
// Shared across all pages — edit here, applies everywhere
// ═══════════════════════════════════════════════════════════

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged }
  from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';
import { getFirestore, doc, setDoc, getDoc, serverTimestamp }
  from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';

// ── Config ──
const firebaseConfig = {
  apiKey: "AIzaSyAOMhrwSur-5AV4XLw5JrqTcNKpBZU7YdM",
  authDomain: "road-to-manga.firebaseapp.com",
  projectId: "road-to-manga",
  storageBucket: "road-to-manga.firebasestorage.app",
  messagingSenderId: "784518497162",
  appId: "1:784518497162:web:23a1c57ba6831964577e73"
};

// ── localStorage keys to sync across all stages ──
const SYNC_KEYS = [
  'hiraLearned', 'kataLearned', 'kanjiKnown', 'vocabKnown', 'kg_hs',
  'dl_hira', 'dl_kata', 'dl_kj',
  'gd', 'gd_p', 'gd_goals',
  'vd_srs', 'vd_stats'
];

// ── Initialize ──
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db   = getFirestore(app);

let currentUser  = null;
let syncTimer    = null;
let lastSyncHash = '';

// ════════════════════════════════════════════
// PUBLIC API — callable from any page
// ════════════════════════════════════════════

// Login with Google popup
window.fbSignIn = async () => {
  try {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  } catch (e) {
    console.error('Login failed:', e);
    if (e.code !== 'auth/popup-closed-by-user') {
      alert('Login ไม่สำเร็จ: ' + e.message);
    }
  }
};

// Logout
window.fbSignOut = async () => {
  if (confirm('Logout จาก Google?')) {
    await signOut(auth);
  }
};

// Skip login for this session
window.fbSkip = () => {
  const overlay = document.getElementById('fb-login-overlay');
  if (overlay) overlay.style.display = 'none';
  sessionStorage.setItem('fb-skipped', '1');
};

// Manual sync triggers
window.fbSync = () => pushToCloud();
window.fbPull = () => pullFromCloud();

// ════════════════════════════════════════════
// SYNC LOGIC
// ════════════════════════════════════════════

function gatherLocal() {
  const data = {};
  SYNC_KEYS.forEach(k => {
    const v = localStorage.getItem(k);
    if (v !== null) data[k] = v;
  });
  return data;
}

function applyCloud(data) {
  if (!data) return;
  SYNC_KEYS.forEach(k => {
    if (data[k] !== undefined) localStorage.setItem(k, data[k]);
  });
}

function hashData(data) {
  return JSON.stringify(data);
}

async function pushToCloud() {
  if (!currentUser) return;
  const data = gatherLocal();
  const h = hashData(data);
  if (h === lastSyncHash) return;
  setSyncStatus('syncing');
  try {
    await setDoc(doc(db, 'users', currentUser.uid, 'progress', 'data'), {
      ...data,
      _updatedAt: serverTimestamp(),
      _page: window.location.pathname
    });
    lastSyncHash = h;
    setSyncStatus('ok');
  } catch (e) {
    console.error('Push failed:', e);
    setSyncStatus('error');
  }
}

async function pullFromCloud() {
  if (!currentUser) return;
  setSyncStatus('syncing');
  setLoadingState(true);
  try {
    const snap = await getDoc(doc(db, 'users', currentUser.uid, 'progress', 'data'));
    if (snap.exists()) {
      const cloudData = snap.data();
      const local = gatherLocal();
      const merged = { ...local };
      SYNC_KEYS.forEach(k => {
        if (cloudData[k] !== undefined) merged[k] = cloudData[k];
      });
      applyCloud(merged);
      lastSyncHash = hashData(gatherLocal());
    }
    setSyncStatus('ok');
  } catch (e) {
    console.error('Pull failed:', e);
    setSyncStatus('error');
  } finally {
    setLoadingState(false);
    refreshPageState();
  }
}

// ════════════════════════════════════════════
// LOADING STATE
// ════════════════════════════════════════════

function setLoadingState(loading) {
  // Skeleton shimmer on stat numbers
  document.querySelectorAll('[data-fb-stat]').forEach(el => {
    if (loading) {
      el.dataset.fbOriginal = el.textContent;
      el.style.cssText += 'background:linear-gradient(90deg,rgba(255,255,255,.06) 25%,rgba(255,255,255,.12) 50%,rgba(255,255,255,.06) 75%);background-size:200% 100%;animation:fbShimmer 1.2s infinite;color:transparent;border-radius:6px;min-width:32px;display:inline-block';
    } else {
      el.style.cssText = '';
      el.style.animation = '';
    }
  });
}

function refreshPageState() {
  // Call page-specific refresh functions if they exist
  if (typeof updateStats    === 'function') updateStats();
  if (typeof renderDashboard === 'function') renderDashboard();
  if (typeof initPage       === 'function') initPage();
  // Re-render portal overall block
  if (typeof renderOverall  === 'function') renderOverall();
  if (typeof renderToday    === 'function') renderToday();
  if (typeof renderStages   === 'function') { 
    const sg = document.getElementById('stages-grid');
    if (sg) { sg.innerHTML = ''; renderStages(); }
  }
  if (typeof renderHeader   === 'function') renderHeader();
}

// ════════════════════════════════════════════
// UI — CREDIT BAR
// ════════════════════════════════════════════

function setSyncStatus(status) {
  const dot = document.getElementById('fb-sync-dot');
  if (!dot) return;
  dot.className = '';
  dot.style.cssText = `width:7px;height:7px;border-radius:50%;flex-shrink:0;transition:background .3s;${
    status === 'ok'      ? 'background:#3ddc84' :
    status === 'syncing' ? 'background:#f0c040;animation:fbPulse 1s infinite' :
    status === 'error'   ? 'background:#e74c3c' :
                           'background:rgba(200,200,240,.2)'
  }`;
}

function updateCreditBar(user) {
  const creditEl = document.getElementById('yor-credit');
  if (!creditEl) return;

  let userArea = document.getElementById('fb-user-area');
  if (!userArea) {
    userArea = document.createElement('div');
    userArea.id = 'fb-user-area';
    userArea.style.cssText = 'display:flex;align-items:center;gap:8px;flex-shrink:0';
    const backBtn = creditEl.querySelector('.yc-back');
    if (backBtn) creditEl.insertBefore(userArea, backBtn);
    else creditEl.appendChild(userArea);
  }

  if (user) {
    userArea.innerHTML = `
      ${user.photoURL
        ? `<img src="${user.photoURL}" style="width:22px;height:22px;border-radius:50%;border:1px solid rgba(232,84,122,.5)">`
        : ''}
      <span style="font-size:11px;color:rgba(200,200,240,.7);max-width:120px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">
        ${user.displayName || user.email}
      </span>
      <div id="fb-sync-dot" title="Sync status"></div>
      <span onclick="fbSignOut()" style="font-size:10px;color:rgba(200,200,240,.3);cursor:pointer;padding:2px 6px;border:1px solid rgba(255,255,255,.1);border-radius:5px;transition:all .2s" onmouseover="this.style.color='#e8547a';this.style.borderColor='#e8547a'" onmouseout="this.style.color='rgba(200,200,240,.3)';this.style.borderColor='rgba(255,255,255,.1)'">Logout</span>`;
    setSyncStatus('ok');
  } else {
    userArea.innerHTML = `
      <div id="fb-sync-dot" style="width:7px;height:7px;border-radius:50%;background:rgba(200,200,240,.2)"></div>
      <span onclick="document.getElementById('fb-login-overlay').style.display='flex'"
        style="font-size:10px;color:rgba(232,84,122,.8);cursor:pointer;padding:2px 8px;border:1px solid rgba(232,84,122,.4);border-radius:5px">
        ☁️ Login
      </span>`;
  }
}

// ════════════════════════════════════════════
// AUTO SYNC
// ════════════════════════════════════════════

function startAutoSync() {
  if (syncTimer) clearInterval(syncTimer);
  syncTimer = setInterval(pushToCloud, 30000);

  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) pullFromCloud();
    else pushToCloud();
  });

  window.addEventListener('beforeunload', () => pushToCloud());
}

// ════════════════════════════════════════════
// AUTH STATE LISTENER — main entry point
// ════════════════════════════════════════════

onAuthStateChanged(auth, async (user) => {
  currentUser = user;

  if (user) {
    const overlay = document.getElementById('fb-login-overlay');
    if (overlay) overlay.style.display = 'none';
    updateCreditBar(user);
    await pullFromCloud();
    startAutoSync();
  } else {
    updateCreditBar(null);
    if (syncTimer) clearInterval(syncTimer);
    const skipped = sessionStorage.getItem('fb-skipped');
    if (!skipped) {
      const overlay = document.getElementById('fb-login-overlay');
      if (overlay) overlay.style.display = 'flex';
    }
  }
});

console.log('🔥 firebase.js loaded — Yor Road to Manga');
