const MOCK_LEADERBOARD = [
  {
    rank: 1,
    username: "FlowTypist_x0",
    avatar_url: "👑",
    wpm: 152,
    accuracy: 99.8,
    platform_key: "sp_mock_1"
  },
  {
    rank: 2,
    username: "Lovelace.Dev",
    avatar_url: "🥈",
    wpm: 138,
    accuracy: 99.2,
    platform_key: "sp_mock_2"
  },
  {
    rank: 3,
    username: "Woz_KeyStroke",
    avatar_url: "🥉",
    wpm: 124,
    accuracy: 98.5,
    platform_key: "sp_mock_3"
  },
  {
    rank: 4,
    username: "Qwertist",
    avatar_url: "👤",
    wpm: 115,
    accuracy: 97.8,
    platform_key: "sp_mock_4"
  },
  {
    rank: 5,
    username: "KeyGlitch",
    avatar_url: "👤",
    wpm: 108,
    accuracy: 96.4,
    platform_key: "sp_mock_5"
  }
];

async function updateLeaderboards() {
  if (els.leaderboardTableBody) {
    els.leaderboardTableBody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-muted); padding: 32px 0;">Loading leaderboards...</td></tr>`;
  }
  
  let boardData = [];
  let isSupabaseLoaded = false;
  
  // Use window.supabaseClient since it is initialized in auth.js
  const client = window.supabaseClient;
  
  if (client && state.currentUser) {
    if (els.leaderboardAuthCallout) els.leaderboardAuthCallout.style.display = 'none';
  } else {
    if (els.leaderboardAuthCallout) els.leaderboardAuthCallout.style.display = 'flex';
  }

  if (client) {
    try {
      const timeoutPromise = new Promise((resolve) => setTimeout(() => resolve({ timeout: true }), 1500));
      const queryPromise = client
        .from('typing_runs')
        .select(`
          id,
          wpm,
          accuracy,
          errors,
          created_at,
          user_id,
          profiles:user_id (
            username,
            avatar_url
          )
        `)
        .order('wpm', { ascending: false });
        
      const result = await Promise.race([queryPromise, timeoutPromise]);
      
      if (result && result.timeout) {
        console.warn("Leaderboard request to Supabase timed out. Falling back to mock data.");
      } else {
        const { data, error } = result;
        if (error) throw error;
        
        if (data) {
          const seenUsers = new Set();
          const topRuns = [];
          data.forEach(run => {
            if (run.user_id && !seenUsers.has(run.user_id)) {
              seenUsers.add(run.user_id);
              topRuns.push(run);
            }
          });
          
          boardData = topRuns.map((run, index) => {
            const profile = run.profiles || {};
            return {
              rank: index + 1,
              username: profile.username || "Anonymous Typist",
              avatar_url: profile.avatar_url || "👤",
              wpm: run.wpm,
              accuracy: run.accuracy,
              platform_key: `sp_${run.user_id.substring(0, 8)}...`
            };
          });
          isSupabaseLoaded = true;
        }
      }
    } catch (err) {
      console.error("Error loading leaderboards from database:", err);
    }
  }
  
  if (!isSupabaseLoaded) {
    boardData = MOCK_LEADERBOARD;
  }
  
  const rank1Player = boardData.find(p => p.rank === 1);
  const rank2Player = boardData.find(p => p.rank === 2);
  const rank3Player = boardData.find(p => p.rank === 3);
  
  if (els.leaderboardRank1Card) {
    if (rank1Player) {
      els.leaderboardRank1Card.style.display = "flex";
      renderRankCard(rank1Player, els.leaderboardRank1Avatar, els.leaderboardRank1Name, els.leaderboardRank1Wpm, els.leaderboardRank1Accuracy);
    } else {
      els.leaderboardRank1Card.style.display = "none";
    }
  }
  
  if (els.leaderboardRank2Card) {
    if (rank2Player) {
      els.leaderboardRank2Card.style.display = "flex";
      renderRankCard(rank2Player, els.leaderboardRank2Avatar, els.leaderboardRank2Name, els.leaderboardRank2Wpm, els.leaderboardRank2Accuracy);
    } else {
      els.leaderboardRank2Card.style.display = "none";
    }
  }
  
  if (els.leaderboardRank3Card) {
    if (rank3Player) {
      els.leaderboardRank3Card.style.display = "flex";
      renderRankCard(rank3Player, els.leaderboardRank3Avatar, els.leaderboardRank3Name, els.leaderboardRank3Wpm, els.leaderboardRank3Accuracy);
    } else {
      els.leaderboardRank3Card.style.display = "none";
    }
  }
  
  if (els.leaderboardTableBody) {
    els.leaderboardTableBody.innerHTML = "";
    
    if (boardData.length === 0) {
      els.leaderboardTableBody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-muted); padding: 32px 0;">No scores submitted yet.</td></tr>`;
    } else {
      boardData.forEach(player => {
        const row = document.createElement("tr");
        let avatarHTML = `<span style="font-size: 1.2rem;">👤</span>`;
        if (player.avatar_url) {
          if (player.avatar_url.startsWith("http")) {
            avatarHTML = `<img src="${player.avatar_url}" class="table-avatar-img" alt="${player.username}">`;
          } else {
            avatarHTML = `<span style="font-size: 1.2rem;">${player.avatar_url}</span>`;
          }
        }
        
        row.innerHTML = `
          <td><strong style="color: var(--text-muted);">#${player.rank}</strong></td>
          <td>
            <div class="table-user">
              ${avatarHTML}
              <span>${player.username}</span>
            </div>
          </td>
          <td><strong style="color: var(--primary-color);">${player.wpm}</strong> WPM</td>
          <td>${player.accuracy}%</td>
          <td><code style="font-size: 0.8rem; opacity: 0.7;">${player.platform_key}</code></td>
        `;
        els.leaderboardTableBody.appendChild(row);
      });
    }
  }
}

function renderRankCard(player, avatarEl, nameEl, wpmEl, accuracyEl) {
  if (avatarEl) {
    if (player.avatar_url && player.avatar_url.startsWith("http")) {
      avatarEl.innerHTML = `<img src="${player.avatar_url}" class="table-avatar-img" style="width: 48px; height: 48px;" alt="${player.username}">`;
    } else {
      avatarEl.textContent = player.avatar_url || "👤";
    }
  }
  if (nameEl) nameEl.textContent = player.username;
  if (wpmEl) wpmEl.textContent = `${player.wpm} WPM`;
  if (accuracyEl) accuracyEl.textContent = `${player.accuracy}% Accuracy`;
}

// Bind to global scope
window.updateLeaderboards = updateLeaderboards;
window.renderRankCard = renderRankCard;
