async function getRecentRuns() {
  if (window.supabaseClient && state.currentUser) {
    try {
      const { data, error } = await window.supabaseClient
        .from('typing_runs')
        .select('*')
        .eq('user_id', state.currentUser.id)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    } catch (err) {
      console.error("Error retrieving runs from database:", err);
    }
  }
  
  try {
    const local = localStorage.getItem("speedtype.runs.v2");
    return local ? JSON.parse(local) : [];
  } catch (err) {
    console.error("Error reading fallback local runs:", err);
    return [];
  }
}

async function saveRun(wpm, accuracy, errors) {
  const mode = state.activeMode;
  const passageTitle = getActiveSource().title;
  
  if (window.supabaseClient && state.currentUser) {
    try {
      const { error } = await window.supabaseClient
        .from('typing_runs')
        .insert({
          user_id: state.currentUser.id,
          wpm: parseInt(wpm),
          accuracy: parseFloat(accuracy),
          errors: parseInt(errors),
          mode: mode,
          passage_title: passageTitle
        });
      if (error) throw error;
      console.log("Run saved to database.");
    } catch (err) {
      console.error("Error saving run to database, using local storage:", err);
      saveRunToLocal(wpm, accuracy, errors, mode, passageTitle);
    }
  } else {
    saveRunToLocal(wpm, accuracy, errors, mode, passageTitle);
  }
  
  updateHomeTelemetry();
}

function saveRunToLocal(wpm, accuracy, errors, mode, passageTitle) {
  try {
    const local = localStorage.getItem("speedtype.runs.v2");
    const runs = local ? JSON.parse(local) : [];
    runs.unshift({
      id: makeId("run"),
      wpm: parseInt(wpm),
      accuracy: parseFloat(accuracy),
      errors: parseInt(errors),
      mode: mode,
      passage_title: passageTitle,
      created_at: new Date().toISOString()
    });
    if (runs.length > 50) {
      runs.length = 50;
    }
    localStorage.setItem("speedtype.runs.v2", JSON.stringify(runs));
    console.log("Run saved to local storage fallback.");
  } catch (err) {
    console.error("Failed to save run locally:", err);
  }
}

async function clearRunsHistory() {
  if (confirm("Are you sure you want to clear your entire typing history? This action cannot be undone.")) {
    if (window.supabaseClient && state.currentUser) {
      try {
        const { error } = await window.supabaseClient
          .from('typing_runs')
          .delete()
          .eq('user_id', state.currentUser.id);
        if (error) {
          console.warn("Could not delete from database. Cleared local fallback storage instead.", error);
        }
      } catch (err) {
        console.error("Error clearing database runs:", err);
      }
    }
    
    try {
      localStorage.removeItem("speedtype.runs.v2");
    } catch (err) {
      console.error("Failed to clear local runs:", err);
    }
    
    const activeView = document.querySelector('.page-view.active');
    if (activeView && activeView.id === 'dashboard') {
      updateDashboardTelemetry();
    }
    updateHomeTelemetry();
  }
}

function calculateTelemetryStats(runs) {
  if (!runs || !runs.length) {
    return { peakWpm: 0, avgWpm: 0, avgAccuracy: 0, totalRaces: 0, stability: 100 };
  }
  const peakWpm = Math.max(...runs.map(r => r.wpm));
  const totalWpm = runs.reduce((sum, r) => sum + r.wpm, 0);
  const avgWpm = Math.round(totalWpm / runs.length);
  const totalAccuracy = runs.reduce((sum, r) => sum + parseFloat(r.accuracy), 0);
  const avgAccuracy = Math.round(totalAccuracy / runs.length);
  const totalErrors = runs.reduce((sum, r) => sum + r.errors, 0);
  const avgErrors = totalErrors / runs.length;
  const stability = Math.max(0, 100 - Math.round(avgErrors));
  return {
    peakWpm,
    avgWpm,
    avgAccuracy,
    totalRaces: runs.length,
    stability
  };
}

function setSvgRingValue(ringElement, textElement, value, maxVal = 100, isPercentage = true) {
  if (!ringElement) return;
  const percent = Math.min(100, Math.max(0, Math.round((value / maxVal) * 100)));
  ringElement.setAttribute("stroke-dasharray", `${percent}, 100`);
  if (textElement) {
    textElement.textContent = isPercentage ? `${value}%` : `${value}`;
  }
}

function updateBarChart(containerElement, runs) {
  if (!containerElement) return;
  const wrappers = containerElement.querySelectorAll(".chart-bar-wrapper");
  if (!wrappers || wrappers.length === 0) return;
  
  const last8 = runs.slice(0, 8).reverse();
  const maxWpm = Math.max(100, ...last8.map(r => r.wpm));
  
  for (let i = 0; i < wrappers.length; i++) {
    const bar = wrappers[i].querySelector(".chart-bar");
    const label = wrappers[i].querySelector(".chart-label");
    
    if (i < last8.length) {
      const run = last8[i];
      const percent = Math.min(100, Math.max(5, Math.round((run.wpm / maxWpm) * 100)));
      if (bar) {
        bar.style.height = `${percent}%`;
        bar.setAttribute("title", `${run.wpm} WPM (${run.accuracy}% Acc)`);
      }
      if (label) {
        label.textContent = `${run.wpm}`;
      }
    } else {
      if (bar) {
        bar.style.height = "0%";
        bar.removeAttribute("title");
      }
      if (label) {
        label.textContent = "-";
      }
    }
  }
}

async function updateHomeTelemetry() {
  const runs = await getRecentRuns();
  const stats = calculateTelemetryStats(runs);
  
  const hasRuns = runs && runs.length > 0;
  
  setSvgRingValue(els.homeAvgAccuracyRing, els.homeAvgAccuracyText, hasRuns ? stats.avgAccuracy : 0, 100, true);
  if (!hasRuns && els.homeAvgAccuracyText) els.homeAvgAccuracyText.textContent = "—";
  
  setSvgRingValue(els.homePeakWpmRing, els.homePeakWpmText, hasRuns ? stats.peakWpm : 0, 150, false);
  if (!hasRuns && els.homePeakWpmText) els.homePeakWpmText.textContent = "—";
  
  setSvgRingValue(els.homeStabilityRing, els.homeStabilityText, hasRuns ? stats.stability : 0, 100, true);
  if (!hasRuns && els.homeStabilityText) els.homeStabilityText.textContent = "—";
  
  updateBarChart(els.homeChartContainer, runs);
}

async function updateDashboardTelemetry() {
  const runs = await getRecentRuns();
  const stats = calculateTelemetryStats(runs);
  
  const hasRuns = runs && runs.length > 0;
  
  // Empty state toggle logic
  const dbLifetimeStatsCard = document.getElementById("dbLifetimeStatsCard");
  const dbDetailedAnalyticsColumn = document.getElementById("dbDetailedAnalyticsColumn");
  const dbEmptyStateCard = document.getElementById("dbEmptyStateCard");

  if (hasRuns) {
    if (dbLifetimeStatsCard) dbLifetimeStatsCard.style.display = "block";
    if (dbDetailedAnalyticsColumn) dbDetailedAnalyticsColumn.style.display = "flex";
    if (dbEmptyStateCard) dbEmptyStateCard.style.display = "none";
  } else {
    if (dbLifetimeStatsCard) dbLifetimeStatsCard.style.display = "none";
    if (dbDetailedAnalyticsColumn) dbDetailedAnalyticsColumn.style.display = "none";
    if (dbEmptyStateCard) dbEmptyStateCard.style.display = "flex";
  }
  
  if (els.dbPeakWpm) els.dbPeakWpm.textContent = hasRuns ? String(stats.peakWpm) : "—";
  if (els.dbAvgWpm) els.dbAvgWpm.textContent = hasRuns ? String(stats.avgWpm) : "—";
  if (els.dbAvgAccuracy) els.dbAvgAccuracy.textContent = hasRuns ? `${stats.avgAccuracy}%` : "—";
  if (els.dbTotalRaces) els.dbTotalRaces.textContent = String(stats.totalRaces);
  
  updateBarChart(els.dbChartContainer, runs);
  
  if (els.dbHistoryBody) {
    els.dbHistoryBody.innerHTML = "";
    
    if (hasRuns) {
      runs.forEach(run => {
        const row = document.createElement("tr");
        let dateStr = "Unknown";
        if (run.created_at) {
          try {
            const date = new Date(run.created_at);
            dateStr = date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) + ", " +
                      date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: true });
          } catch (e) {
            console.error("Error formatting date:", e);
          }
        }
        
        row.innerHTML = `
          <td>${dateStr}</td>
          <td style="max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${run.passage_title}">${run.passage_title}</td>
          <td><strong style="color: var(--primary-color);">${run.wpm}</strong> WPM</td>
          <td>${run.accuracy}%</td>
          <td>${run.errors}</td>
        `;
        els.dbHistoryBody.appendChild(row);
      });
    }
  }
}

// Bind to global scope
window.getRecentRuns = getRecentRuns;
window.saveRun = saveRun;
window.saveRunToLocal = saveRunToLocal;
window.clearRunsHistory = clearRunsHistory;
window.calculateTelemetryStats = calculateTelemetryStats;
window.setSvgRingValue = setSvgRingValue;
window.updateBarChart = updateBarChart;
window.updateHomeTelemetry = updateHomeTelemetry;
window.updateDashboardTelemetry = updateDashboardTelemetry;
