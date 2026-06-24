let supabaseClient = null;

function initSupabase() {
  if (window.SUPABASE_CONFIG && window.SUPABASE_CONFIG.url && window.SUPABASE_CONFIG.anonKey) {
    try {
      const { createClient } = supabase;
      if (typeof createClient === 'function') {
        supabaseClient = createClient(window.SUPABASE_CONFIG.url, window.SUPABASE_CONFIG.anonKey);
        console.log("Supabase successfully initialized.");
      } else {
        console.warn("Supabase library loaded but createClient is not a function. Running in offline fallback.");
      }
    } catch (err) {
      console.error("Failed to initialize Supabase:", err);
    }
  } else {
    console.log("Supabase config is empty or invalid. Running in offline fallback.");
  }
}

function listenToAuthChanges() {
  if (!supabaseClient) {
    updateAuthUI(null);
    return;
  }

  supabaseClient.auth.onAuthStateChange(async (event, session) => {
    console.log("Auth state change event:", event);
    const user = session ? session.user : null;
    
    if (user) {
      state.currentUser = user;
      updateAuthUI(user);
      
      try {
        const username = user.user_metadata.full_name || user.user_metadata.name || user.email.split('@')[0] || 'User';
        const avatar_url = user.user_metadata.avatar_url || '';
        
        await supabaseClient
          .from('profiles')
          .upsert({
            id: user.id,
            username: username,
            avatar_url: avatar_url,
            updated_at: new Date().toISOString()
          });
      } catch (err) {
        console.error("Error syncing profile metadata:", err);
      }
    } else {
      state.currentUser = null;
      updateAuthUI(null);
    }
    
    const activeView = document.querySelector('.page-view.active');
    if (activeView) {
      if (activeView.id === 'dashboard' && typeof updateDashboardTelemetry === 'function') {
        updateDashboardTelemetry();
      } else if (activeView.id === 'leaderboard' && typeof updateLeaderboards === 'function') {
        updateLeaderboards();
      } else if (activeView.id === 'home' && typeof updateHomeTelemetry === 'function') {
        updateHomeTelemetry();
      }
    }
  });
}

function updateAuthUI(user) {
  if (user) {
    if (els.googleSignInBtn) els.googleSignInBtn.style.display = 'none';
    if (els.userProfileWidget) els.userProfileWidget.style.display = 'block';
    
    const displayName = user.user_metadata.full_name || user.user_metadata.name || user.email.split('@')[0] || 'User';
    if (els.usernameDisplay) els.usernameDisplay.textContent = displayName;
    if (els.menuUsername) els.menuUsername.textContent = displayName;
    if (els.menuEmail) els.menuEmail.textContent = user.email;
    
    const avatarUrl = user.user_metadata.avatar_url || 'assets/keyboard-guide-light.png';
    if (els.userAvatar) els.userAvatar.src = avatarUrl;
    
    if (els.dbProfileAvatar) els.dbProfileAvatar.src = avatarUrl;
    if (els.dbProfileName) els.dbProfileName.textContent = displayName;
    if (els.dbProfileEmail) els.dbProfileEmail.textContent = user.email;
    
    if (els.dbAuthStatusBadge) {
      els.dbAuthStatusBadge.textContent = 'Cloud Verified';
      els.dbAuthStatusBadge.className = 'profile-status-badge authenticated-badge';
    }
  } else {
    if (els.googleSignInBtn) els.googleSignInBtn.style.display = 'flex';
    if (els.userProfileWidget) els.userProfileWidget.style.display = 'none';
    
    if (els.dbProfileAvatar) els.dbProfileAvatar.src = 'assets/keyboard-guide-light.png';
    if (els.dbProfileName) els.dbProfileName.textContent = 'Guest User';
    if (els.dbProfileEmail) els.dbProfileEmail.textContent = 'Not signed in';
    
    if (els.dbAuthStatusBadge) {
      els.dbAuthStatusBadge.textContent = 'Offline Mode';
      els.dbAuthStatusBadge.className = 'profile-status-badge anonymous-badge';
    }
  }
}

async function signInWithGoogle() {
  if (!supabaseClient) {
    alert("Supabase is not configured. Google Sign-In is unavailable.");
    return;
  }
  try {
    const { error } = await supabaseClient.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + window.location.pathname,
        queryParams: {
          prompt: 'select_account'
        }
      }
    });
    if (error) throw error;
  } catch (err) {
    console.error("Google sign-in error:", err);
    alert("Sign-in failed: " + err.message);
  }
}

async function signOut() {
  if (!supabaseClient) return;

  state.currentUser = null;
  updateAuthUI(null);
  if (els.userDropdownMenu) {
    els.userDropdownMenu.style.display = 'none';
    const trigger = document.querySelector("#userMenuTrigger");
    if (trigger) trigger.setAttribute("aria-expanded", "false");
  }
  
  const activeView = document.querySelector('.page-view.active');
  if (activeView) {
    if (activeView.id === 'dashboard' && typeof updateDashboardTelemetry === 'function') {
      updateDashboardTelemetry();
    } else if (activeView.id === 'leaderboard' && typeof updateLeaderboards === 'function') {
      updateLeaderboards();
    } else if (activeView.id === 'home' && typeof updateHomeTelemetry === 'function') {
      updateHomeTelemetry();
    }
  }

  try {
    const { error } = await supabaseClient.auth.signOut();
    if (error) {
      console.warn("Sign-out server warning:", error);
    }
  } catch (err) {
    console.error("Sign-out server error:", err);
  }
}

// Bind to global scope
window.supabaseClient = supabaseClient;
window.initSupabase = initSupabase;
window.listenToAuthChanges = listenToAuthChanges;
window.updateAuthUI = updateAuthUI;
window.signInWithGoogle = signInWithGoogle;
window.signOut = signOut;
