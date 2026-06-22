// --- SHARED AUTHENTICATION UI ---
// This file holds ONE copy of the login button / signed-in greeting logic.
// It used to be duplicated in scripts.js, roadmap.html, and mindmap.html.
// Now every page loads this single file instead, so there is one source of truth.
//
// IMPORTANT: this file ONLY draws the auth button/greeting.
// It does NOT load any lesson progress or roadmap progress — those each have
// their own auth listener elsewhere (ProgressTracker in scripts.js, and the
// roadmap's loadFromFirebase). So we must register exactly ONE listener here.

// Draw the auth area for the current user (or the logged-out state).
// `user` is the Firebase user object, or null when nobody is signed in.
function renderAuthUI(user) {
    const container = document.getElementById('auth-container');
    // Pages without an auth area (e.g. lesson pages) simply do nothing.
    if (!container) return;

    // Clear out whatever was there before so we never stack duplicates.
    container.innerHTML = '';

    if (user) {
        const name = user.displayName || user.email || 'Anonymous';
        // Build the greeting with textContent so a display name can never inject HTML (XSS-safe)
        const span = document.createElement('span');
        span.textContent = `เข้าสู่ระบบ: ${name}`;

        const logoutBtn = document.createElement('button');
        logoutBtn.id = 'logout-btn';
        logoutBtn.textContent = 'ออกจากระบบ';
        logoutBtn.onclick = () => firebase.auth().signOut();

        container.append(span, logoutBtn);
    } else {
        const loginBtn = document.createElement('button');
        loginBtn.id = 'login-google-btn';
        loginBtn.textContent = 'เข้าสู่ระบบด้วย Google';
        loginBtn.onclick = () => {
            const provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider);
        };
        container.append(loginBtn);
    }
}

// Register the single auth-UI listener for every page that loads this file.
firebase.auth().onAuthStateChanged(renderAuthUI);
