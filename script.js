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
    text: "zx xz zc cz zv vz zb bz zn nz zm mz xc cx xv vx xb bx xn nx xm mx cv vc cb bc cn nc cm mc vb bv vn nv vm mv bn nb bm mb nm mn zxc xcv cvb vbn bnm mnb nbv bvc vcx cxz zcv cvn vnm nmb mbv bvc vcx zxb xbn bnm nmv mvc vcx cxz zcn cnv nvb vbm bmx mxc xcz zxm xmn mnb nbv bvc zxcv xcvb cvbn vbnm bnmv nmvb mvbc vbcx bcxz zcvb cvbn vbnm bnmx nmxc mxcv xcvz zxcv xcvn cvnm vnmb nmbv mbvc bvcx zxbn xbnm bnmv nmvc mvcx vcxz zcnv cnvb nvbm vbmx bmxc mxcz zxcvb xcvbn cvbnm vbnmv bnmvb nmvbc mvbcx vbcxz zcvbn cvbnm vbnmx bnmxc nmxcv mxcvb xcvbz zxcvn xcvnm cvnmb vnmbv nmbvc mbvcx bvcxz zxbnm xbnmv bnmvc nmvcx mvcxz vcxzb zcnvb cnvbm nvbmx vbmxc bmxcz zxcvb xcvbn cvbnm vbnmv bnmvb nmvbc mvbcx vbcxz zcvbn cvbnm vbnmx bnmxc nmxcv mxcvb xcvbz zxcvn xcvnm cvnmb vnmbv nmbvc mbvcx bvcxz zxbnm xbnmv bnmvc nmvcx mvcxz vcxzb zcnvb cnvbm nvbmx vbmxc bmxcz zxc xcv cvb vbn bnm zcv cvn vnm nmb mbv zxb xbn bnm nmv mvc zcn cnv nvb vbm bmx zxm xmn mnb nbv bvc"
  },
  {
    id: "extreme-left",
    title: "Extreme Left Practice",
    text: "qw wq qa aq qs sq qz zq qx xq wa aw ws sw wz zw wx xw as sa az za ax xa sz zs sx xs zx xz qwa qas qaz qax qws wsz wzx wxa asz asx azx zxa zxs sxa qwas wasz wasx wazx aszx qaws awsz wszx szxa qasz aszx szxq zxqa qwaz wazx azxq zxqw qwax waxs axsz xszq qwsz wszx szxq zxqw wasz aszx szxw zxwa qwasz waszx aszxq szxqw zxqwa qawsz awszx wszxq szxqa zxqaw qwasx wasxz asxzq sxzqw xzqwa qwazx wazxq azxqw zxqwa xqwas qwaxs waxsz axszq xszqw szqwa qwszx wszxq szxqw zxqwa xqwas qwasz waszx aszxq szxqw zxqwa qawsz awszx wszxq szxqa zxqaw qwasx wasxz asxzq sxzqw xzqwa qwazx wazxq azxqw zxqwa xqwas qwaxs waxsz axszq xszqw szqwa qwszx wszxq szxqw zxqwa xqwas qw qa qs qz qx wa ws wz wx as az ax sz sx zx qwa qas qaz qax qws wsz wzx wxa asz asx azx zxa zxs sxa qwas wasz aszx szxq zxqa qwasz waszx aszxq szxqw zxqwa"
  },
  {
    id: "extreme-right",
    title: "Extreme Right Practice",
    text: "op po ok ko ol lo on no om mo pk kp pl lp pn np pm mp kl lk kn nk km mk ln nl lm ml nm mn opk pkl kln lnm nmo mol lok kop opl plk lkn knm nmp mpo pol olk lkp kpn pnm nml mlk lko kop opn pnk nkl klm lmn mno nop opkl pkln klnm lnmo nmop mopl oplk plkn lknm knmo nmol molk olkp lkpn kpnm pnml nmlk mlko lkop kopn opnk pnkl nklm klmn lmno mnop opkm pkmn kmnl mnlo nlop lopk opkln pklnm klnmo lnmop nmopl moplk oplkn plknm lknmo knmop nmopk mopkl opkln pklnm klnmp lnmpk nmpol mpolk polkn olknm lknmp knmpl nmplo mplok plokn loknp oknpl knplm nplmo plmok lmokp mokpl okpln kplnm plnmo lnmok opkln pklnm klnmo lnmop nmopl moplk oplkn plknm lknmo knmop nmopk mopkl opklm pklmn klmno lmnop mnopk nopkl opnkl pnklo nklom klomp lompk ompkl oplmn plmno lmnop mnopl noplm oplmk plmko lmkop mkopl koplm oplkn plkno lknop knopl noplk polkm olkmp lkmpo kmpol mpolk op ol ok on om pk pl pn pm kl kn km ln lm nm opk pkl kln lnm nmo opl plk lkn knm nmp opkl pkln klnm lnmo nmop opkln pklnm klnmo lnmop nmopl"
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
    
    saveRun(wpm, accuracy, errorCount);
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

// ... Continues in Part 2
// ... Continued from Part 1
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

function handleTypingInputFallback() {
  els.typingInput.value = els.typingInput.value.slice(0, state.currentText.length);
  lockTypingCaret();
  handleTyping();
}

function handlePracticeKeydown(event) {
  if (shouldLetNativeControlHandle(event)) return;

  if (event.metaKey || event.ctrlKey || event.altKey) {
    blockTypingKey(event);
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

function shouldLetNativeControlHandle(event) {
  const target = event.target;

  if (!target || typeof target.closest !== "function") return false;
  if (target === els.typingInput) return false;
  if (els.idleModal.classList.contains("active") && target.closest("#idleModal")) return true;

  return Boolean(target.closest(NATIVE_CONTROL_SELECTOR));
}

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

function selectPassage(id) {
  state.draft = null;
  state.activeId = id;
  resetSession({ message: "Ready" });
}

function deleteCustomPassage(id) {
  state.customPassages = state.customPassages.filter((passage) => passage.id !== id);
  if (state.activeId === id) {
    state.activeId = DEFAULT_PASSAGES[0].id;
    state.draft = null;
  }
  saveCustomPassages();
  renderSavedList();
  resetSession({ message: "Deleted" });
}

function saveCustomText() {
  const text = els.customText.value.trim();
  if (!text) {
    els.sessionState.textContent = "Add text first";
    els.customText.focus();
    return;
  }

  const title = els.customTitle.value.trim() || `Practice text ${state.customPassages.length + 1}`;
  const passage = {
    id: makeId("custom"),
    title: title.slice(0, 60),
    text
  };

  state.customPassages.unshift(passage);
  state.activeId = passage.id;
  state.draft = null;
  saveCustomPassages();
  els.customTitle.value = "";
  els.customText.value = "";
  renderSavedList();
  resetSession({ message: "Saved" });
}

function useDraftNow() {
  const text = els.customText.value.trim();
  if (!text) {
    els.sessionState.textContent = "Add text first";
    els.customText.focus();
    return;
  }

  state.draft = {
    id: "draft",
    title: els.customTitle.value.trim() || "Unsaved draft",
    text
  };
  resetSession({ message: "Draft loaded" });
}

function pickRandomPassage() {
  const passages = allPassages();
  if (!passages.length) return;

  const available = passages.filter((passage) => passage.id !== state.activeId);
  const pool = available.length ? available : passages;
  const next = pool[Math.floor(Math.random() * pool.length)];
  state.draft = null;
  state.activeId = next.id;
  resetSession({ message: "Ready" });
}

// ... Continues in Part 3
// ... Continued from Part 2
// --- Supabase, Telemetry, and Leaderboard Integrations ---
let supabaseClient = null;

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
      if (activeView.id === 'dashboard') {
        updateDashboardTelemetry();
      } else if (activeView.id === 'leaderboard') {
        updateLeaderboards();
      } else if (activeView.id === 'home') {
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
    if (activeView.id === 'dashboard') {
      updateDashboardTelemetry();
    } else if (activeView.id === 'leaderboard') {
      updateLeaderboards();
    } else if (activeView.id === 'home') {
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

async function getRecentRuns() {
  if (supabaseClient && state.currentUser) {
    try {
      const { data, error } = await supabaseClient
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
  
  if (supabaseClient && state.currentUser) {
    try {
      const { error } = await supabaseClient
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
    if (supabaseClient && state.currentUser) {
      try {
        const { error } = await supabaseClient
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
  
  setSvgRingValue(els.homeAvgAccuracyRing, els.homeAvgAccuracyText, stats.avgAccuracy, 100, true);
  setSvgRingValue(els.homePeakWpmRing, els.homePeakWpmText, stats.peakWpm, 150, false);
  setSvgRingValue(els.homeStabilityRing, els.homeStabilityText, stats.stability, 100, true);
  
  updateBarChart(els.homeChartContainer, runs);
}

async function updateDashboardTelemetry() {
  const runs = await getRecentRuns();
  const stats = calculateTelemetryStats(runs);
  
  if (els.dbPeakWpm) els.dbPeakWpm.textContent = String(stats.peakWpm);
  if (els.dbAvgWpm) els.dbAvgWpm.textContent = String(stats.avgWpm);
  if (els.dbAvgAccuracy) els.dbAvgAccuracy.textContent = `${stats.avgAccuracy}%`;
  if (els.dbTotalRaces) els.dbTotalRaces.textContent = String(stats.totalRaces);
  
  updateBarChart(els.dbChartContainer, runs);
  
  if (els.dbHistoryBody) {
    els.dbHistoryBody.innerHTML = "";
    
    if (runs.length === 0) {
      const row = document.createElement("tr");
      row.innerHTML = `<td colspan="5" style="text-align: center; color: var(--text-muted); padding: 32px 0;">No races completed yet. Go to Practice to start!</td>`;
      els.dbHistoryBody.appendChild(row);
    } else {
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

async function updateLeaderboards() {
  if (els.leaderboardTableBody) {
    els.leaderboardTableBody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-muted); padding: 32px 0;">Loading leaderboards...</td></tr>`;
  }
  
  let boardData = [];
  let isSupabaseLoaded = false;
  
  if (supabaseClient && state.currentUser) {
    if (els.leaderboardAuthCallout) els.leaderboardAuthCallout.style.display = 'none';
  } else {
    if (els.leaderboardAuthCallout) els.leaderboardAuthCallout.style.display = 'flex';
  }

  if (supabaseClient) {
    try {
      const { data, error } = await supabaseClient
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

// --- Navigation Controller ---
function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  const startBtn = document.getElementById('start-training-btn');
  const drillModal = document.getElementById('drillSelectorModal');
  const closeDrillBtn = document.getElementById('closeDrillSelectorButton');
  const drillCards = document.querySelectorAll('.drill-card-btn');

  function openDrillSelector() {
    if (drillModal) {
      drillModal.classList.add('active');
    }
  }

  function closeDrillSelector() {
    if (drillModal) {
      drillModal.classList.remove('active');
    }
  }

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetPageId = link.getAttribute('href').substring(1);
      if (targetPageId === 'practice') {
        openDrillSelector();
      } else {
        switchPage(targetPageId);
      }
    });
  });

  const footerLinks = document.querySelectorAll('.footer-link');
  footerLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const targetPageId = href.substring(1);
        if (targetPageId === 'practice') {
          openDrillSelector();
        } else {
          switchPage(targetPageId);
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  });

  if (startBtn) {
    startBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openDrillSelector();
    });
  }

  if (closeDrillBtn) {
    closeDrillBtn.addEventListener('click', closeDrillSelector);
  }

  drillCards.forEach(btn => {
    btn.addEventListener('click', () => {
      const drillId = btn.dataset.drillId;
      closeDrillSelector();
      selectPassage(drillId);
      switchPage('practice');
    });
  });

  const exploreBtn = document.getElementById('explore-features-btn');
  if (exploreBtn) {
    exploreBtn.addEventListener('click', (e) => {
      e.preventDefault();
      switchPage('features');
    });
  }
}

function switchPage(pageId) {
  const navLinks = document.querySelectorAll('.nav-link');
  const pageViews = document.querySelectorAll('.page-view');

  pageViews.forEach(view => {
    view.classList.remove('active');
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${pageId}`) {
      link.classList.add('active');
    }
  });

  const activePage = document.getElementById(pageId);
  if (activePage) {
    activePage.classList.add('active');
    
    if (pageId === 'practice') {
      setTimeout(focusTypingInput, 100);
    } else {
      if (state.startedAt && !state.paused && !state.finishedAt) {
        pauseSession("Auto paused");
      }
    }

    if (pageId === 'home') {
      updateHomeTelemetry();
    } else if (pageId === 'dashboard') {
      updateDashboardTelemetry();
    } else if (pageId === 'leaderboard') {
      updateLeaderboards();
    }
  }
}

function bindEvents() {
  document.addEventListener("keydown", handlePracticeKeydown, true);
  els.targetText.addEventListener("click", focusTypingInput);
  els.typingInput.addEventListener("beforeinput", blockTypingKey);
  els.typingInput.addEventListener("paste", blockTypingKey);
  els.typingInput.addEventListener("drop", blockTypingKey);
  els.typingInput.addEventListener("cut", blockTypingKey);
  els.typingInput.addEventListener("copy", blockTypingKey);
  els.typingInput.addEventListener("input", handleTypingInputFallback);
  els.typingInput.addEventListener("mousedown", (event) => {
    event.preventDefault();
    focusTypingInput();
  });
  els.typingInput.addEventListener("select", () => requestAnimationFrame(lockTypingCaret));
  els.restartButton.addEventListener("click", () => {
    resetSession({ message: "Restarted" });
    focusTypingInput();
  });
  els.pauseButton.addEventListener("click", () => {
    if (state.paused) {
      resumeSession();
    } else {
      pauseSession();
    }
  });
  els.newTestButton.addEventListener("click", () => {
    resetSession({ message: "Ready" });
    focusTypingInput();
  });
  els.resumeModalButton.addEventListener("click", resumeSession);
  els.restartModalButton.addEventListener("click", () => {
    resetSession({ message: "Restarted" });
    focusTypingInput();
  });
  els.randomButton.addEventListener("click", pickRandomPassage);
  els.deleteButton.addEventListener("click", () => {
    if (state.customPassages.some((passage) => passage.id === state.activeId)) {
      deleteCustomPassage(state.activeId);
    }
  });
  els.saveCustomButton.addEventListener("click", saveCustomText);
  els.useDraftButton.addEventListener("click", useDraftNow);
  els.passageSelect.addEventListener("change", (event) => {
    const selected = event.target.value;
    if (selected === "draft") return;
    selectPassage(selected);
  });
  els.modeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.activeMode = button.dataset.mode;
      resetSession({ message: "Mode changed" });
      focusTypingInput();
    });
  });

  if (els.googleSignInBtn) {
    els.googleSignInBtn.addEventListener("click", signInWithGoogle);
  }
  if (els.googleSignOutBtn) {
    els.googleSignOutBtn.addEventListener("click", signOut);
  }
  if (els.leaderboardSignInBtn) {
    els.leaderboardSignInBtn.addEventListener("click", signInWithGoogle);
  }
  if (els.clearHistoryBtn) {
    els.clearHistoryBtn.addEventListener("click", clearRunsHistory);
  }

  if (els.userMenuTrigger && els.userDropdownMenu) {
    els.userMenuTrigger.addEventListener("click", (e) => {
      e.stopPropagation();
      const isVisible = els.userDropdownMenu.style.display === "flex";
      els.userDropdownMenu.style.display = isVisible ? "none" : "flex";
      els.userMenuTrigger.setAttribute("aria-expanded", String(!isVisible));
    });

    document.addEventListener("click", (e) => {
      if (els.userDropdownMenu.style.display === "flex" && !els.userProfileWidget.contains(e.target)) {
        els.userDropdownMenu.style.display = "none";
        els.userMenuTrigger.setAttribute("aria-expanded", "false");
      }
    });
  }
}

const THEME_STORAGE_KEY = "speedtype.theme.v1";

function initTheme() {
  const themeToggle = document.getElementById('themeToggle');
  if (!themeToggle) return;

  let savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  if (!savedTheme) {
    savedTheme = 'light';
  }

  applyTheme(savedTheme);

  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  });
}

function applyTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }

  const event = new CustomEvent('themeChanged', { detail: { theme: theme } });
  window.dispatchEvent(event);
}

function init() {
  state.customPassages = loadCustomPassages();
  loadSettings();

  if (!allPassages().some((passage) => passage.id === state.activeId)) {
    state.activeId = DEFAULT_PASSAGES[0].id;
  }

  initTheme();
  initNavigation();
  initSupabase();
  listenToAuthChanges();
  bindEvents();
  renderSavedList();
  resetSession();
  updateHomeTelemetry();
}

init();
