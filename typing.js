const DEFAULT_PASSAGES = [
  {
    id: "home-row",
    title: "Home Row Practice",
    text: "as sa ad da af fa ag ga ah ha aj ja ak ka al la sd ds sf fs sg gs sh hs sj js sk ks sl ls df fd dg gd dh hd dj jd dk kd dl ld fg gf fh hf fj jf fk kf fl lf gh hg gj jg gk kg gl lg asd sdf dfg fgh ghj hjk jkl lkj kjh jhg hgf gfd fds dsa saf afg agh ahj ajk akl sla slk skj sjh shg asd sda das afd fda dag gah haj ajl lkj sdf dfs fsd sdg dgh ghk hkj kjl jla las ask skd kdf dfg fgj asdf sdfg dfgh fghj ghjk hjkl lkjh kjhg jhgf hgfd gfds fdsa safg afgh fghk ghkl askl sklj kljh ljhg adfg dfgh fghj ghjk shjk hjka jkas kasd sdfg dfgs fgsh gshj ahjk hjkl jkla klas asdf sdaf dafg afgh lkja kjas jasd asdg fghk ghkj hkjl kjla sdfh dfhj fhjk hjkl aghj ghjk hjka jkal slkj lkjh kjhg jhgf asdfg sdfgh dfghj fghjk ghjkl lkjhg kjhgf jhgfd hgfds gfdsa safgh afghj fghjk ghjkl hjkla jklas klasd lasdf asdfh sdfhj dfhjk fhjkl hjkla jklad aghjk ghjkl hjkls jklsa skljh kljhg ljhgf jhgfd adfgh dfghj fghjk ghjkl shjkl hjkla jklaf klafd asdfh s"
  },
  {
    id: "top-row",
    title: "Top Row Practice",
    text: "ag fds ja sf lal ljf gadjh dfhs js hgak hfsa gsf jg hdhhf sdlf kjg haf hj sfhf jkdgd llg jhfdl sasdd sjjkl lasl hsgj kag lsg dhd hk sh fafs ks dkl glj lfg hklks fsh lf asa sah kfld fkjfs jh jkasa hsfff djdgk skl al jkk jad ajgkg lkdfg ala aakl als ssf sfasj gfhf jdgk saks dhsf gdkl lalg dg sl ggf fglk asjg ah gdk lassd hl jda hahf shl dfddj dh fgdsj kf khg faf hgsgh lhasg gas hhjls fgaja hjs hsgl jhjg fjj gjl gg jhk kflkd gl sfgf daa ksk fjkjf asj dlk kd llhkl lkdkk gks fghh dd jdf jj lkja jja kahgj llfkf jkaj jdkd jd dagjh khh gjgsk la fsaa fad dks kgh sdg jfsfs sahl hslha ksjhk jdl lkkj hfsg fkjha hdkfh hggl fj lfkkk sg jfg kllh lhhkg gfsf sldf kgl dgal gaa dksa kkkh agk sj saddg fs fljkk jgas fgs fdl da kkgaf gksf fjsl dgd ad gksk jgll ksajh asfa adkl gdjks hjhhs hjk jlak hg sjla jaflh kafgl gkk af gla sfsks jkkf ldjfl sgj lgag kdkl hhllj hffjf ahkjj kad sksl adjds ghjsh hklas gfs sskdg gh jdfl dddsj kdf gkgak"
  },
  {
    id: "bottom-row",
    title: "Bottom Row Practice",
    text: "zx xz zc cz zv vz zb bz zn nz zm mz xc cx xv vx xb bx xn nx xm mx cv vc cb bc cn nc cm mc vb bv vn nv vm mv bn nb bm mb nm mn zxc xcv cvb vbn bnm mnb nbv bvc vcx cxz zcv cvn vnm nmb mbv zxb xbn bnm nmv mvc zcn cnv nvb vbm bmx zxm xmn mnb nbv bvc zxcv xcvb cvbn vbnm bnmv nmvb mvbc vbcx bcxz zcvb cvbn vbnm bnmx nmxc mxcv xcvz zxcv xcvn cvnm vnmb nmbv mbvc bvcx zxbn xbnm bnmv nmvc mvcx vcxz zcnv cnvb nvbm vbmx bmxc mxcz zxcvb xcvbn cvbnm vbnmv bnmvb nmvbc mvbcx vbcxz zcvbn cvbnm vbnmx bnmxc nmxcv mxcvb xcvbz zxcvn xcvnm cvnmb vnmbv nmbvc mbvcx bvcxz zxbnm xbnmv bnmvc nmvcx mvcxz vcxzb zcnvb cnvbm nvbmx vbmxc bmxcz zxcvb xcvbn cvbnm vbnmv bnmvb nmvbc mvbcx vbcxz zcvbn cvbnm vbnmx bnmxc nmxcv mxcvb xcvbz zxcvn xcvnm cvnmb vnmbv nmbvc mbvcx bvcxz zxbnm xbnmv bnmvc nmvcx mvcxz vcxzb zcnvb cnvbm nvbmx vbmxc bmxcz zxc xcv cvb vbn bnm zcv cvn vnm nmb mbv zxb xbn bnm nmv mvc zcn cnv nvb vbm bmx zxm xmn mnb nbv bvc"
  },
  {
    id: "extreme-left",
    title: "Extreme Left Practice",
    text: "qw wq qa aq qs sq qz zq qx xq wa aw ws sw wz zw wx xw as sa az za ax xa sz zs sx xs zx xz qwa qas qaz qax qws wsz wzx wxa asz asx azx zxa zxs sxa qwas wasz wasx wazx aszx qaws awsz wszx szxa qasz aszx szxq zxqa qwaz wazx azxq zxqw qwax waxs axsz xszq qwsz wszx szxq zxqw wasz aszx szxw zxwa qwasz waszx aszxq szxqw zxqwa qawsz awszx wszxq szxqa zxqaw qwasx wasxz asxzq sxzqw xzqwa qwazx wazxq azxqw zxqwa xqwas qwaxs waxsz axszq xszqw szqwa qwszx wszxq szxqw zxqwa xqwas qwasz waszx aszxq szxqw zxqwa qawsz awszx wszxq szxqa zxqaw qwasx wasxz asxzq sxzqw xzqwa qwazx wazxq azxqw zxqwa xqwas qwaxs waxsz axszq xszqw szqwa qwszx wszxq szxqw zxqwa xqwas qw qa qs qz qx wa ws wz wx as az ax sz sx zx qwa qas qaz qax qws wsz wzx wxa asz asx azx zxa zxs sxa qwas wasz aszx szxq zxqa qwasz waszx aszxq szxqw zxqwa"
  },
  {
    id: "extreme-right",
    title: "Extreme Right Practice",
    text: "op po ok ko ol lo on no om mo pk kp pl lp pn np pm mp kl lk kn nk km mk ln nl lm ml nm mn opk pkl kln lnm nmo mol lok kop opl plk lkn knm nmp mpo pol olk lkp kpn pnm nml mlk lko kop opn pnk nkl klm lmn mno nop opkl pkln klnm lnmo nmop mopl oplk plkn lknm knmo nmol molk olkp lkpn kpnm pnml nmlk mlko lkop kopn opnk pnkl nklm klmn lmno mnop opkm pkmn kmnl mnlo nlop lopk opkln pklnm klnmo lnmop nmopl moplk oplkn plknm lknmo knmop nmopk mopkl opkln pklnm klnmo lnmop nmopl moplk oplkn plknm lknmo knmop nmopk mopkl opklm pklmn klmno lmnop mnopk nopkl opnkl pnklo nklom klomp lompk ompkl oplmn plmno lmnop mnopl noplm oplmk plmko lmkop mkopl koplm oplkn plkno lknop knopl noplk polkm olkmp lkmpo kmpol mpolk op ol ok on om pk pl pn pm kl kn km ln lm nm opk pkl kln lnm nmo opl plk lkn knm nmp opkl pkln klnm lnmo nmop opkln pklnm klnmo lnmop nmopl"
  },
  {
    id: "mid",
    title: "Mid Keys Practice",
    text: "rt tr ry yr rf fr rg gr rh hr rc cr rv vr rb br ty yt tf ft tg gt th ht tc ct tv vt tb bt yf fy yg gy yh hy yc cy yv vy yb by fg gf fh hf fc cf fv vf fb bf gh hg gc cg gv vg gb bg hc ch hv vh hb bh cv vc cb bc vb bv rty tyf yfg fgh ghc hcv cvb bvc vch chg hgf gfy fyt ytr try ryg ygh ghv hvb vbc bch chf hfg fgr grt rtf tfg fgh ghb hbc bcv cvf vfg fgy gyr ryt ryf yfg fgc gcv cvb vbh bhg hgf gfr frt rtf tfh fhc hcv cvb vbh bhc hcg cgf gfy gfr frt rtf tfh fhc hcv cvb vbh bhc hcg cgf gfy fyr rtyf tyfg yfgh fghc ghcv hcvb cvbh vbhc bhcg hcgf cgfy gfyr fyrt yrtf rtfg tfgh fghb ghbc hbcv bcvf cvfg vfgy fgyr gytr tryg rygh yghv ghvb hvbc vbch bchf chfg hfgr fgrt rtfh tfhc fhcv hcvb cvbh bhcg hcgf cgfy gfyr rtyfg tyfgh yfghc fghcv ghcvb hcvbh cvbhc vbhcg bhcgf hcgfy cgfyr gfyrt fyrty yrtyf rtyfg tyfgh yfghb fghbc ghbcv hbcvf bcvfg cvfgy vfgyr fgytr gytry trygh ryghv yghvb ghvbc hvbch vbchf bchfg chfgr hfgrt rtfhc tfhcv fhcvb hcvbh cvbhc vbhcg bhcgf hcgfy cgfyr rt ry rf rg rh rc rv rb ty tf tg th tc tv tb yf yg yh yc yv yb fg fh fc fv fb gh gc gv gb hc hv hb cv cb vb rty tyf yfg fgh ghc hcv cvb try ryg ygh ghv hvb vbc rtyf tyfg yfgh c ghcv hcvb rtyfg tyfgh yfghc fghcv ghcvb"
  },
  {
    id: "paragraph",
    title: "Paragraph Practice",
    text: "The ostensibly tranquil metropolis concealed an undercurrent of ineffable complexity, where magniloquent politicians promulgated grandiose doctrines while clandestine factions maneuvered with astonishing dexterity through labyrinthine networks of influence. Amid this intricate milieu, an erudite scholar embarked upon an arduous intellectual odyssey, determined to elucidate the enigmatic mechanisms that governed societal transformation. His perspicacious observations revealed that prosperity was often predicated not merely upon material abundance but upon the cultivation of resilience, sagacity, and an unwavering commitment to ethical conduct. Nevertheless, pervasive avarice and obdurate self-interest frequently undermined collective aspirations, engendering discord, disenchantment, and an atmosphere of palpable uncertainty. The scholar encountered innumerable individuals whose lives epitomized paradoxical contrasts: some exhibited extraordinary munificence despite their meager circumstances, whereas others, endowed with prodigious wealth, remained conspicuously parsimonious and spiritually impoverished. As he traversed bustling marketplaces, venerable libraries, and remote hamlets, he discerned a recurring pattern of human behavior characterized by both remarkable ingenuity and lamentable shortsightedness. In academic circles, interminable debates concerning epistemological frameworks often devolved into pedantic disputes, obscuring the substantive issues they purported to address. Conversely, among artisans and laborers, practical wisdom frequently emerged through quotidian experience rather than formal instruction. Fascinated by these dichotomies, the scholar meticulously documented every nuance, compiling a comprehensive treatise replete with incisive analyses and cogent arguments. His manuscript contended that civilizations attain genuine eminence not through coercive dominance or ostentatious displays of power but through the harmonious integration of innovation, justice, and cultural vitality. Yet he also acknowledged the fragility of such achievements, emphasizing how complacency, dogmatism, and institutional inertia could precipitate precipitous decline. Throughout his journey, he witnessed episodes of extraordinary fortitude during times of adversity. Communities devastated by calamity displayed indomitable perseverance, reconstructing their livelihoods with admirable determination despite formidable obstacles. These experiences reinforced his conviction that the human spirit possesses a remarkable capacity for adaptation, transcending even the most deleterious circumstances. However, he remained acutely aware of the pernicious effects of misinformation, demagoguery, and ideological extremism, all of which threatened to erode social cohesion and rational discourse. Consequently, he advocated for a pedagogical paradigm that prioritized critical thinking, intellectual humility, and empirical inquiry over unquestioning adherence to orthodoxy. As years elapsed, his reputation expanded considerably, attracting both fervent admirers and vehement detractors. While supporters lauded his erudition and visionary insights, critics denounced his conclusions as overly idealistic or impracticable. Undeterred by such opposition, he continued refining his theories, convinced that the pursuit of truth necessitated rigorous scrutiny and perpetual revision. Ultimately, his work achieved enduring significance, inspiring subsequent generations to examine prevailing assumptions with greater discernment and courage. The legacy he bequeathed was neither a rigid doctrine nor an immutable blueprint but rather an exhortation to embrace intellectual curiosity, moral integrity, and constructive dialogue. In an era increasingly defined by volatility and fragmentation, his message retained profound relevance, reminding humanity that wisdom emerges not from certitude alone but from the willingness to confront ambiguity, challenge preconceptions, and engage earnestly with the complexities of existence."
  }
];

const STORAGE_KEY = "speedtype.customTexts.v1";
const SETTINGS_KEY = "speedtype.settings.v1";
const INACTIVITY_MS = 5000;
const LONG_TEXT_WORDS = 1000;
const SHORT_SESSION_SECONDS = 10 * 60;
const LONG_SESSION_SECONDS = 15 * 60;
const PASSIVE_TYPING_KEYS = new Set(["Shift", "CapsLock"]);
const NATIVE_CONTROL_SELECTOR = "#customTitle, #customText, #passageSelect, button, input, textarea, a";

const state = {
  customPassages: [],
  activeMode: "paragraph",
  activeId: "paragraph",
  draft: null,
  currentText: "",
  durationSeconds: SHORT_SESSION_SECONDS,
  startedAt: null,
  finishedAt: null,
  timerId: null,
  inactivityTimerId: null,
  paused: false,
  pauseStartedAt: null,
  pausedTotalMs: 0,
  currentUser: null
};

const els = {
  passageSelect: document.querySelector("#passageSelect"),
  randomButton: document.querySelector("#randomButton"),
  deleteButton: document.querySelector("#deleteButton"),
  targetText: document.querySelector("#targetText"),
  typingInput: document.querySelector("#typingInput"),
  restartButton: document.querySelector("#restartButton"),
  pauseButton: document.querySelector("#pauseButton"),
  newTestButton: document.querySelector("#newTestButton"),
  sessionState: document.querySelector("#sessionState"),
  modeButtons: Array.from(document.querySelectorAll(".mode-button")),
  wpm: document.querySelector("#wpm"),
  accuracy: document.querySelector("#accuracy"),
  errors: document.querySelector("#errors"),
  time: document.querySelector("#time"),
  wordTotal: document.querySelector("#wordTotal"),
  sessionLimit: document.querySelector("#sessionLimit"),
  progressText: document.querySelector("#progressText"),
  progressBar: document.querySelector("#progressBar"),
  customTitle: document.querySelector("#customTitle"),
  customText: document.querySelector("#customText"),
  saveCustomButton: document.querySelector("#saveCustomButton"),
  useDraftButton: document.querySelector("#useDraftButton"),
  savedList: document.querySelector("#savedList"),
  storageStatus: document.querySelector("#storageStatus"),
  idleModal: document.querySelector("#idleModal"),
  resumeModalButton: document.querySelector("#resumeModalButton"),
  restartModalButton: document.querySelector("#restartModalButton"),
  keystrokeEffects: document.querySelector("#keystrokeEffects"),
  keyCaps: Array.from(document.querySelectorAll("[data-key]")),

  googleSignInBtn: document.querySelector("#googleSignInBtn"),
  userProfileWidget: document.querySelector("#userProfileWidget"),
  userMenuTrigger: document.querySelector("#userMenuTrigger"),
  userDropdownMenu: document.querySelector("#userDropdownMenu"),
  usernameDisplay: document.querySelector("#usernameDisplay"),
  userAvatar: document.querySelector("#userAvatar"),
  menuUsername: document.querySelector("#menuUsername"),
  menuEmail: document.querySelector("#menuEmail"),
  googleSignOutBtn: document.querySelector("#googleSignOutBtn"),
  
  dbProfileAvatar: document.querySelector("#dbProfileAvatar"),
  dbProfileName: document.querySelector("#dbProfileName"),
  dbProfileEmail: document.querySelector("#dbProfileEmail"),
  dbAuthStatusBadge: document.querySelector("#dbAuthStatusBadge"),
  
  dbPeakWpm: document.querySelector("#dbPeakWpm"),
  dbAvgWpm: document.querySelector("#dbAvgWpm"),
  dbAvgAccuracy: document.querySelector("#dbAvgAccuracy"),
  dbTotalRaces: document.querySelector("#dbTotalRaces"),
  dbChartContainer: document.querySelector("#dbChartContainer"),
  dbHistoryTable: document.querySelector("#dbHistoryTable"),
  dbHistoryBody: document.querySelector("#dbHistoryBody"),
  clearHistoryBtn: document.querySelector("#clearHistoryBtn"),
  
  leaderboardAuthCallout: document.querySelector("#leaderboardAuthCallout"),
  leaderboardSignInBtn: document.querySelector("#leaderboardSignInBtn"),
  leaderboardRank1Card: document.querySelector("#leaderboardRank1Card"),
  leaderboardRank1Avatar: document.querySelector("#leaderboardRank1Avatar"),
  leaderboardRank1Name: document.querySelector("#leaderboardRank1Name"),
  leaderboardRank1Wpm: document.querySelector("#leaderboardRank1Wpm"),
  leaderboardRank1Accuracy: document.querySelector("#leaderboardRank1Accuracy"),
  
  leaderboardRank2Card: document.querySelector("#leaderboardRank2Card"),
  leaderboardRank2Avatar: document.querySelector("#leaderboardRank2Avatar"),
  leaderboardRank2Name: document.querySelector("#leaderboardRank2Name"),
  leaderboardRank2Wpm: document.querySelector("#leaderboardRank2Wpm"),
  leaderboardRank2Accuracy: document.querySelector("#leaderboardRank2Accuracy"),
  
  leaderboardRank3Card: document.querySelector("#leaderboardRank3Card"),
  leaderboardRank3Avatar: document.querySelector("#leaderboardRank3Avatar"),
  leaderboardRank3Name: document.querySelector("#leaderboardRank3Name"),
  leaderboardRank3Wpm: document.querySelector("#leaderboardRank3Wpm"),
  leaderboardRank3Accuracy: document.querySelector("#leaderboardRank3Accuracy"),
  
  leaderboardTableBody: document.querySelector("#leaderboardTableBody"),
  
  homeAvgAccuracyRing: document.querySelector("#homeAvgAccuracyRing"),
  homeAvgAccuracyText: document.querySelector("#homeAvgAccuracyText"),
  homePeakWpmRing: document.querySelector("#homePeakWpmRing"),
  homePeakWpmText: document.querySelector("#homePeakWpmText"),
  homeStabilityRing: document.querySelector("#homeStabilityRing"),
  homeStabilityText: document.querySelector("#homeStabilityText"),
  homeChartContainer: document.querySelector("#homeChartContainer")
};

function loadCustomPassages() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((item) => item && typeof item.text === "string" && item.text.trim())
      .map((item) => ({
        id: String(item.id || makeId("saved")),
        title: String(item.title || "Saved text").slice(0, 60),
        text: String(item.text)
      }));
  } catch {
    setStorageStatus("Browser storage blocked");
    return [];
  }
}

function saveCustomPassages() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.customPassages));
    setStorageStatus("Saved in this browser");
  } catch {
    setStorageStatus("Browser storage blocked");
  }
}

function loadSettings() {
  try {
    const parsed = JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}");
    if (parsed.mode) state.activeMode = parsed.mode;
    if (parsed.activeId) state.activeId = parsed.activeId;
  } catch {
    state.activeMode = "paragraph";
    state.activeId = "paragraph";
  }
}

function saveSettings() {
  try {
    localStorage.setItem(
      SETTINGS_KEY,
      JSON.stringify({ mode: state.activeMode, activeId: state.activeId })
    );
  } catch {
    setStorageStatus("Browser storage blocked");
  }
}

function makeId(prefix) {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function setStorageStatus(message) {
  if (els.storageStatus) {
    els.storageStatus.textContent = message;
  }
}

function allPassages() {
  return [...DEFAULT_PASSAGES, ...state.customPassages];
}

function getActiveSource() {
  if (state.draft) return state.draft;
  return allPassages().find((item) => item.id === state.activeId) || DEFAULT_PASSAGES[0];
}

function normalizeParagraph(text) {
  return text.trim().replace(/\s+/g, " ");
}

function normalizeLines(text) {
  return text
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean)
    .join("\n");
}

function shuffle(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

function buildPracticeText(sourceText) {
  const clean = sourceText.trim();
  if (!clean) return DEFAULT_PASSAGES[0].text;

  if (state.activeMode === "lines") {
    return normalizeLines(clean) || normalizeParagraph(clean);
  }

  if (state.activeMode === "words") {
    const words = clean.match(/[A-Za-z0-9']+/g) || clean.split(/\s+/);
    return shuffle(words).join(" ");
  }

  return normalizeParagraph(clean);
}

function renderPassageSelect() {
  const currentId = state.draft ? "draft" : state.activeId;
  els.passageSelect.innerHTML = "";

  const starterGroup = document.createElement("optgroup");
  starterGroup.label = "Starter text";
  DEFAULT_PASSAGES.forEach((passage) => {
    starterGroup.appendChild(makeOption(passage, currentId));
  });
  els.passageSelect.appendChild(starterGroup);

  if (state.customPassages.length) {
    const customGroup = document.createElement("optgroup");
    customGroup.label = "Saved by you";
    state.customPassages.forEach((passage) => {
      customGroup.appendChild(makeOption(passage, currentId));
    });
    els.passageSelect.appendChild(customGroup);
  }

  if (state.draft) {
    const option = document.createElement("option");
    option.value = "draft";
    option.textContent = state.draft.title;
    option.selected = true;
    els.passageSelect.appendChild(option);
  }
}

function makeOption(passage, currentId) {
  const option = document.createElement("option");
  option.value = passage.id;
  option.textContent = passage.title;
  option.selected = passage.id === currentId;
  return option;
}

function renderSavedList() {
  els.savedList.innerHTML = "";

  if (!state.customPassages.length) {
    const empty = document.createElement("div");
    empty.className = "saved-empty";
    empty.textContent = "No saved text yet.";
    els.savedList.appendChild(empty);
    return;
  }

  state.customPassages.forEach((passage) => {
    const item = document.createElement("article");
    item.className = "saved-item";

    const titleRow = document.createElement("div");
    titleRow.className = "saved-title";

    const title = document.createElement("span");
    title.textContent = passage.title;
    titleRow.appendChild(title);

    const count = document.createElement("span");
    count.textContent = `${wordCount(passage.text)} words`;
    titleRow.appendChild(count);

    const preview = document.createElement("div");
    preview.className = "saved-preview";
    preview.textContent = normalizeParagraph(passage.text);

    const actions = document.createElement("div");
    actions.className = "saved-actions";

    const useButton = document.createElement("button");
    useButton.type = "button";
    useButton.className = "small-button";
    useButton.textContent = "Use";
    useButton.addEventListener("click", () => selectPassage(passage.id));

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "small-button danger";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deleteCustomPassage(passage.id));

    actions.append(useButton, deleteButton);
    item.append(titleRow, preview, actions);
    els.savedList.appendChild(item);
  });
}

function renderTargetText() {
  const typed = els.typingInput.value;
  const fragment = document.createDocumentFragment();

  [...state.currentText].forEach((char, index) => {
    const span = document.createElement("span");
    span.className = "char";
    span.textContent = char;

    if (index < typed.length) {
      span.classList.add(typed[index] === char ? "correct" : "incorrect");
    } else if (index === typed.length) {
      span.classList.add("current");
    }

    fragment.appendChild(span);
  });

  els.targetText.replaceChildren(fragment);
  keepCurrentCharacterInView();
  lockTypingCaret();
}

function updateModeButtons() {
  els.modeButtons.forEach((button) => {
    const isActive = button.dataset.mode === state.activeMode;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function resetSession(options = {}) {
  const source = getActiveSource();
  state.currentText = buildPracticeText(source.text);
  state.durationSeconds = getSessionDurationSeconds(state.currentText);
  state.startedAt = null;
  state.finishedAt = null;
  state.paused = false;
  state.pauseStartedAt = null;
  state.pausedTotalMs = 0;
  clearSessionTimers();
  els.typingInput.value = "";
  els.typingInput.disabled = false;
  els.typingInput.readOnly = true;
  els.sessionState.textContent = options.message || "Ready";
  hideIdleModal();
  renderPassageSelect();
  updateModeButtons();
  updateDeleteButton();
  updatePauseButton();
  renderTargetText();
  updateStats();
  updateKeyboard();
  lockTypingCaret();
  saveSettings();
}

function updateDeleteButton() {
  const selectedId = state.draft ? "draft" : state.activeId;
  const isCustom = state.customPassages.some((passage) => passage.id === selectedId);
  els.deleteButton.disabled = !isCustom;
}

function updateStats() {
  const typed = els.typingInput.value;
  const elapsed = getActiveElapsedSeconds();
  const scoringElapsed = Math.max(elapsed, 1);
  const remainingSeconds = getRemainingSeconds();
  const correctChars = countCorrectChars(typed, state.currentText);
  const errorCount = countErrors(typed, state.currentText);
  const accuracy = typed.length ? Math.max(0, Math.round((correctChars / typed.length) * 100)) : 100;
  const wpm = elapsed > 0 ? Math.round((correctChars / 5) / (scoringElapsed / 60)) : 0;
  const progress = state.currentText.length
    ? Math.min(100, Math.round((typed.length / state.currentText.length) * 100))
    : 0;

  els.wpm.textContent = String(wpm);
  els.accuracy.textContent = `${accuracy}%`;
  els.errors.textContent = String(errorCount);
  els.time.textContent = formatTime(remainingSeconds);
  els.wordTotal.textContent = String(wordCount(state.currentText));
  els.sessionLimit.textContent = `${Math.round(state.durationSeconds / 60)}m`;
  els.progressText.textContent = `${progress}%`;
  els.progressBar.style.width = `${progress}%`;
}

function getSessionDurationSeconds(text) {
  return wordCount(text) >= LONG_TEXT_WORDS ? LONG_SESSION_SECONDS : SHORT_SESSION_SECONDS;
}

function getActiveElapsedSeconds() {
  return getActiveElapsedMs() / 1000;
}

function getActiveElapsedMs() {
  if (!state.startedAt) return 0;
  const end = state.finishedAt || (state.paused && state.pauseStartedAt ? state.pauseStartedAt : performance.now());
  return Math.max(0, end - state.startedAt - state.pausedTotalMs);
}

function getRemainingSeconds() {
  return Math.max(0, state.durationSeconds - Math.floor(getActiveElapsedSeconds()));
}

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function clearSessionTimers() {
  clearInterval(state.timerId);
  clearTimeout(state.inactivityTimerId);
  state.timerId = null;
  state.inactivityTimerId = null;
}

function startCountdown() {
  clearInterval(state.timerId);
  state.timerId = setInterval(tickTimer, 250);
}

function tickTimer() {
  updateStats();

  if (state.startedAt && !state.finishedAt && !state.paused && getRemainingSeconds() <= 0) {
    finishSession("Time up");
  }
}

function scheduleInactivityPause() {
  clearTimeout(state.inactivityTimerId);

  if (!state.startedAt || state.finishedAt || state.paused) {
    state.inactivityTimerId = null;
    return;
  }

  state.inactivityTimerId = setTimeout(() => {
    if (!state.finishedAt && !state.paused) {
      pauseSession("Auto paused", true);
    }
  }, INACTIVITY_MS);
}

function pauseSession(message = "Paused", showModal = false) {
  if (!state.startedAt || state.finishedAt || state.paused) return;

  state.paused = true;
  state.pauseStartedAt = performance.now();
  clearSessionTimers();
  els.typingInput.disabled = true;
  els.sessionState.textContent = message;
  document.body.classList.add("is-paused");
  updatePauseButton();
  updateStats();

  if (showModal) {
    showIdleModal();
  }
}

function resumeSession() {
  if (!state.paused || state.finishedAt) return;

  state.pausedTotalMs += performance.now() - state.pauseStartedAt;
  state.paused = false;
  state.pauseStartedAt = null;
  els.typingInput.disabled = false;
  els.sessionState.textContent = "Typing";
  document.body.classList.remove("is-paused");
  hideIdleModal();
  updatePauseButton();
  startCountdown();
  scheduleInactivityPause();
  updateStats();
  focusTypingInput();
}

function finishSession(message) {
  if (state.finishedAt) return;

  state.finishedAt = performance.now();
  clearSessionTimers();
  state.paused = false;
  state.pauseStartedAt = null;
  els.typingInput.disabled = true;
  els.sessionState.textContent = message;
  document.body.classList.remove("is-paused");
  hideIdleModal();
  updatePauseButton();
  updateStats();

  if (message === "Complete" || message === "Finished with errors" || message === "Time up") {
    const typed = els.typingInput.value;
    const elapsed = getActiveElapsedSeconds();
    const scoringElapsed = Math.max(elapsed, 1);
    const correctChars = countCorrectChars(typed, state.currentText);
    const errorCount = countErrors(typed, state.currentText);
    const accuracy = typed.length ? Math.max(0, Math.round((correctChars / typed.length) * 100)) : 100;
    const wpm = elapsed > 0 ? Math.round((correctChars / 5) / (scoringElapsed / 60)) : 0;
    
    // saveRun is defined globally in dashboard.js
    if (typeof saveRun === "function") {
      saveRun(wpm, accuracy, errorCount);
    }
  }
}

function updatePauseButton() {
  if (!els.pauseButton) return;

  els.pauseButton.textContent = state.paused ? "Resume" : "Pause";
  els.pauseButton.disabled = Boolean(!state.startedAt || state.finishedAt);
}

function showIdleModal() {
  els.idleModal.classList.add("active");
  els.resumeModalButton.focus();
}

function hideIdleModal() {
  els.idleModal.classList.remove("active");
}

function countCorrectChars(typed, target) {
  let correct = 0;
  for (let index = 0; index < typed.length && index < target.length; index += 1) {
    if (typed[index] === target[index]) correct += 1;
  }
  return correct;
}

function countErrors(typed, target) {
  let errors = 0;
  for (let index = 0; index < typed.length; index += 1) {
    if (typed[index] !== target[index]) errors += 1;
  }
  return errors;
}

function wordCount(text) {
  return (text.trim().match(/\S+/g) || []).length;
}

function handleTyping(effectKey = null) {
  if (!state.startedAt && els.typingInput.value.length) {
    state.startedAt = performance.now();
    els.sessionState.textContent = "Typing";
    updatePauseButton();
    startCountdown();
  }

  if (els.typingInput.value.length >= state.currentText.length && !state.finishedAt) {
    finishSession(countErrors(els.typingInput.value, state.currentText) ? "Finished with errors" : "Complete");
  }

  scheduleInactivityPause();
  renderTargetText();
  updateStats();
  updateKeyboard();
  syncTypingInputScroll();

  if (effectKey !== null) {
    showKeystrokeEffect(effectKey);
  }
}

function handleTypingInputFallback(event) {
  const currentLength = els.typingInput.value.length;
  const targetLength = state.currentText.length;
  
  if (currentLength > targetLength) {
    els.typingInput.value = els.typingInput.value.slice(0, targetLength);
  }

  // Handle deletions (Backspace on virtual keyboards)
  if (event && event.inputType === "deleteContentBackward") {
    removeLastCharacter();
    return;
  }

  // Append new characters
  const addedChar = els.typingInput.value[currentLength - 1] || "";
  if (addedChar) {
    flashKeycap(addedChar, addedChar === state.currentText[currentLength - 1]);
  }

  handleTyping();
}

function handlePracticeKeydown(event) {
  if (shouldLetNativeControlHandle(event)) return;

  // Let browser hotkeys like CMD+R, CMD+T, F12, F5 pass through
  if (event.metaKey || event.ctrlKey || event.altKey || event.key === "F12" || event.key === "F5") {
    return;
  }

  if (PASSIVE_TYPING_KEYS.has(event.key)) {
    blockTypingKey(event);
    return;
  }

  if (state.paused || state.finishedAt || els.typingInput.disabled) {
    blockTypingKey(event);
    return;
  }

  // Handle Backspace deletion
  if (event.key === "Backspace") {
    blockTypingKey(event);
    removeLastCharacter();
    return;
  }

  if (event.key === "Enter") {
    blockTypingKey(event);
    appendTypingCharacter("\n", "Enter");
    return;
  }

  if (isPrintableTypingKey(event.key)) {
    blockTypingKey(event);
    appendTypingCharacter(event.key, event.key);
    return;
  }

  blockTypingKey(event);
}

function removeLastCharacter() {
  if (els.typingInput.value.length === 0) return;
  els.typingInput.value = els.typingInput.value.slice(0, -1);
  handleTyping();
}

function shouldLetNativeControlHandle(event) {
  const target = event.target;
  const activePage = document.querySelector('.page-view.active');
  
  // Only capture keypresses when the user is actively on the practice page
  if (!activePage || activePage.id !== 'practice') return true;

  // Never capture standard Tab key navigation
  if (event.key === "Tab") return true;

  if (!target || typeof target.closest !== "function") return false;
  if (target === els.typingInput) return false;
  if (els.idleModal.classList.contains("active") && target.closest("#idleModal")) return true;

  return Boolean(target.closest(NATIVE_CONTROL_SELECTOR));
}

// Global scope bindings for functions needed by other modules
window.focusTypingInput = focusTypingInput;
window.resetSession = resetSession;
window.selectPassage = selectPassage;
window.deleteCustomPassage = deleteCustomPassage;
window.saveCustomText = saveCustomText;
window.useDraftNow = useDraftNow;
window.pickRandomPassage = pickRandomPassage;
window.allPassages = allPassages;
window.getActiveSource = getActiveSource;
window.wordCount = wordCount;

function blockTypingKey(event) {
  event.preventDefault();
  event.stopPropagation();
}

function flashKeycap(keyChar, isCorrect) {
  const keyName = keyNameForChar(keyChar);
  const keyCap = els.keyCaps.find(key => key.dataset.key === keyName);
  if (keyCap) {
    const flashClass = isCorrect ? 'key-pressed-correct' : 'key-pressed-incorrect';
    keyCap.classList.add(flashClass);
    setTimeout(() => {
      keyCap.classList.remove(flashClass);
    }, 150);
  }
}

function isPrintableTypingKey(key) {
  return key.length === 1 && key >= " ";
}

function appendTypingCharacter(char, effectKey) {
  if (els.typingInput.value.length >= state.currentText.length) return;

  const expectedChar = state.currentText[els.typingInput.value.length];
  const isCorrect = char === expectedChar;

  focusTypingInput();
  els.typingInput.value = `${els.typingInput.value}${char}`.slice(0, state.currentText.length);
  lockTypingCaret();
  
  flashKeycap(char, isCorrect);
  handleTyping(effectKey);
}

function focusTypingInput() {
  const activePage = document.querySelector('.page-view.active');
  if (!activePage || activePage.id !== 'practice') return; 
  if (els.typingInput.disabled) return;

  try {
    els.typingInput.focus({ preventScroll: true });
  } catch {
    els.typingInput.focus();
  }

  lockTypingCaret();
}

function lockTypingCaret() {
  if (!els.typingInput || els.typingInput.disabled) return;

  const end = els.typingInput.value.length;
  try {
    els.typingInput.setSelectionRange(end, end);
  } catch {
    // Selection edge case handle
  }
}

function syncTypingInputScroll() {
  els.typingInput.scrollTop = els.typingInput.scrollHeight;
}

function keepCurrentCharacterInView() {
  const current = els.targetText.querySelector(".current") || els.targetText.lastElementChild;
  if (!current) {
    els.targetText.scrollTop = 0;
    return;
  }

  const targetRect = els.targetText.getBoundingClientRect();
  const currentRect = current.getBoundingClientRect();
  const top = currentRect.top - targetRect.top + els.targetText.scrollTop;
  const bottom = currentRect.bottom - targetRect.top + els.targetText.scrollTop;
  const visibleTop = els.targetText.scrollTop;
  const visibleBottom = visibleTop + els.targetText.clientHeight;
  const lowerComfortLine = visibleTop + els.targetText.clientHeight * 0.72;
  const upperComfortLine = visibleTop + els.targetText.clientHeight * 0.24;

  if (bottom > lowerComfortLine) {
    els.targetText.scrollTo({
      top: Math.max(0, top - els.targetText.clientHeight * 0.38),
      behavior: state.startedAt ? "smooth" : "auto"
    });
  } else if (top < upperComfortLine && visibleTop > 0) {
    els.targetText.scrollTo({
      top: Math.max(0, top - els.targetText.clientHeight * 0.24),
      behavior: "smooth"
    });
  } else if (bottom > visibleBottom || top < visibleTop) {
    els.targetText.scrollTop = Math.max(0, top - els.targetText.clientHeight * 0.38);
  }
}

function showKeystrokeEffect(key) {
  if (!els.keystrokeEffects) return;

  const effect = document.createElement("span");
  const rect = els.typingInput.getBoundingClientRect();
  const safeWidth = Math.max(1, rect.width);
  const x = rect.left + safeWidth * (0.2 + Math.random() * 0.6);
  const y = rect.top + Math.min(rect.height * 0.5, 74);

  effect.className = "key-pop";
  effect.textContent = displayKeyForEffect(key);
  effect.style.left = `${x}px`;
  effect.style.top = `${y}px`;
  effect.style.setProperty("--spin-z", `${-20 + Math.random() * 40}deg`);
  effect.style.setProperty("--travel-x", `${-70 + Math.random() * 140}px`);

  els.keystrokeEffects.appendChild(effect);

  while (els.keystrokeEffects.children.length > 32) {
    els.keystrokeEffects.firstElementChild.remove();
  }

  effect.addEventListener("animationend", () => effect.remove(), { once: true });
}

function displayKeyForEffect(key) {
  if (key === " ") return "Space";
  if (key === "\n" || key === "Enter") return "Enter";
  return key;
}

const FINGER_MAP = {
  "1": "lh-pinky", "Q": "lh-pinky", "A": "lh-pinky", "Z": "lh-pinky",
  "2": "lh-ring", "W": "lh-ring", "S": "lh-ring", "X": "lh-ring",
  "3": "lh-middle", "E": "lh-middle", "D": "lh-middle", "C": "lh-middle",
  "4": "lh-index", "5": "lh-index", "R": "lh-index", "T": "lh-index", "F": "lh-index", "G": "lh-index", "V": "lh-index", "B": "lh-index",
  "6": "rh-index", "7": "rh-index", "Y": "rh-index", "U": "rh-index", "H": "rh-index", "J": "rh-index", "N": "rh-index", "M": "rh-index",
  "8": "rh-middle", "I": "rh-middle", "K": "rh-middle", ",": "rh-middle", ";": "rh-middle",
  "9": "rh-ring", "O": "rh-ring", "L": "rh-ring", ".": "rh-ring", ":": "rh-ring",
  "0": "rh-pinky", "-": "rh-pinky", "P": "rh-pinky", "'": "rh-pinky", "\"": "rh-pinky", "?": "rh-pinky", "!": "rh-pinky", "ENTER": "rh-pinky",
  "SPACE": "rh-thumb"
};

function updateKeyboard() {
  const nextChar = state.currentText[els.typingInput.value.length] || "";
  const keyName = keyNameForChar(nextChar);

  els.keyCaps.forEach((key) => {
    key.classList.toggle("is-next", key.dataset.key === keyName);
  });

  const activeFingerId = FINGER_MAP[keyName];
  document.querySelectorAll(".hand-finger").forEach((finger) => {
    finger.classList.toggle("active-finger", finger.id === activeFingerId);
  });
}

function keyNameForChar(char) {
  if (char === " ") return "SPACE";
  if (char === "\n") return "ENTER";
  return /[a-z]/i.test(char) ? char.toUpperCase() : char;
}
