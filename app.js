// 2022 Revised Curriculum High School Physics Database
const CURRICULUM_DATA = {
  "10학년 (고1)": {
    "통합과학 1": {
      "시스템과 상호작용": [
        "중력과 역학적 시스템",
        "운동과 충돌",
        "충돌과 안전장치"
      ]
    },
    "통합과학 2": {
      "환경과 에너지": [
        "에너지 전환과 보존",
        "태양 에너지의 생성과 전환",
        "전기 에너지의 생산과 수송",
        "신재생 에너지와 지속 가능한 발전"
      ]
    }
  },
  "11학년 (고2)": {
    "물리학": {
      "힘과 에너지": [
        "힘의 평형과 구조물의 안정성(돌림힘)",
        "속도와 가속도, 등가속도 운동",
        "뉴턴 운동 법칙",
        "운동량 보존 법칙",
        "일-에너지 정리와 역학적 에너지 보존",
        "열과 에너지 전환(에너지 전환과 보존, 열효율)"
      ],
      "전기와 자기": [
        "전기장과 전위차",
        "전기에너지와 축전기",
        "전류의 자기 작용(전류에 의한 자기장)",
        "물질의 자성(자성체)",
        "전자기 유도"
      ],
      "빛과 물질": [
        "파동의 중첩과 간섭",
        "빛의 굴절과 볼록렌즈(렌즈에 의한 상의 작도)",
        "특수 상대성 이론(광속 불변, 시간 팽창, 길이 수축)",
        "전자기파와 광통신",
        "빛의 입자성(광전 효과)",
        "물질의 파동성(전자의 파동성)",
        "원자의 에너지 준위",
        "에너지띠와 전기소자(반도체)"
      ]
    }
  },
  "12학년 (고3)": {
    "역학과 에너지": {
      "시공간과 운동": [
        "벡터의 합성",
        "지표면에서의 운동(포물선 운동)",
        "평면상에서의 운동(원운동)",
        "행성의 운동과 케플러 법칙",
        "중력장 내에서의 운동과 탈출 속도",
        "일반 상대성 이론과 등가 원리"
      ],
      "열과 에너지": [
        "열팽창",
        "물질의 상태 변화와 잠열",
        "기체 분자의 운동과 이상 기체 상태 방정식",
        "열역학 제1법칙과 단열 과정",
        "열역학 제2법칙과 열기관"
      ],
      "탄성파와 소리": [
        "탄성파의 발생과 전파",
        "파동의 반사와 굴절(투과와 반사)",
        "정상파와 악기의 물리적 원리",
        "도플러 효과",
        "파동의 간섭과 소음 제어"
      ]
    },
    "전자기와 양자": {
      "전자기적 상호작용": [
        "전기력선과 등전위면(전기장과 전위)",
        "정전기 유도와 유전분극",
        "축전기",
        "전류에 의한 자기장",
        "로런츠 힘(자기장 내의 전하가 받는 힘)",
        "전자기 유도와 인덕터, 변압기",
        "교류 회로(R-L-C 회로)",
        "반도체 소자(다이오드, 트랜지스터)"
      ],
      "빛과 정보 통신": [
        "빛의 간섭, 회절, 편광",
        "렌즈와 거울을 이용한 광학 기기(기하광학)",
        "레이저의 원리와 활용",
        "디지털 정보 처리 및 광통신"
      ],
      "양자와 미시 세계": [
        "광전 효과(빛의 입자성)",
        "물질파와 전자현미경(물질의 파동성)",
        "단일 양자의 분포와 확률 파동",
        "양자 중첩과 측정",
        "터널 효과",
        "양자 정보 기술(양자 컴퓨터, 양자 암호 통신)"
      ]
    }
  }
};

// Global Application State
let selectedGrade = "";
let selectedSubject = "";
let selectedUnit = "";
let selectedElement = "";
let currentGeneratedMarkdown = "";

// DOM Elements
const gradeSelect = document.getElementById("gradeSelect");
const subjectSelect = document.getElementById("subjectSelect");
const unitSelect = document.getElementById("unitSelect");
const elementsContainer = document.getElementById("elementsContainer");
const generateBtn = document.getElementById("generateBtn");
const groupSizeSelect = document.getElementById("groupSize");
const customRequestsText = document.getElementById("customRequests");

const emptyState = document.getElementById("emptyState");
const loaderContainer = document.getElementById("loaderContainer");
const outputToolbar = document.getElementById("outputToolbar");
const paneDesign = document.getElementById("pane-design");
const paneGuide = document.getElementById("pane-guide");
const paneWorksheet = document.getElementById("pane-worksheet");
const tabsContainer = document.getElementById("tabsContainer");

const settingsModal = document.getElementById("settingsModal");
const apiKeyInput = document.getElementById("apiKeyInput");
const apiStatusText = document.getElementById("apiStatusText");
const apiStatusBtn = document.getElementById("apiStatusBtn");
const apiModalAlert = document.getElementById("apiModalAlert");
const historyList = document.getElementById("historyList");

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
  initDropdowns();
  checkApiKeyStatus();
  renderHistory();
  
  // Setup Event Listeners
  gradeSelect.addEventListener("change", handleGradeChange);
  subjectSelect.addEventListener("change", handleSubjectChange);
  unitSelect.addEventListener("change", handleUnitChange);
  generateBtn.addEventListener("click", generateExperiment);
});

// Dropdown Populate Logics
function initDropdowns() {
  // Populate Grades
  for (const grade in CURRICULUM_DATA) {
    const option = document.createElement("option");
    option.value = grade;
    option.textContent = grade;
    gradeSelect.appendChild(option);
  }
}

function handleGradeChange() {
  selectedGrade = gradeSelect.value;
  selectedSubject = "";
  selectedUnit = "";
  selectedElement = "";
  
  // Reset child selectors
  subjectSelect.innerHTML = '<option value="" disabled selected>선택</option>';
  subjectSelect.disabled = false;
  
  unitSelect.innerHTML = '<option value="" disabled selected>선택</option>';
  unitSelect.disabled = true;
  
  elementsContainer.innerHTML = `
    <p style="font-size: 12.5px; color: var(--text-muted); text-align: center; padding: 20px 0;">
      과목과 단원을 차례대로 선택해 주세요.
    </p>
  `;
  
  updateGenerateButtonState();

  // Populate Subjects
  const subjects = CURRICULUM_DATA[selectedGrade];
  for (const subject in subjects) {
    const option = document.createElement("option");
    option.value = subject;
    option.textContent = subject;
    subjectSelect.appendChild(option);
  }
}

function handleSubjectChange() {
  selectedSubject = subjectSelect.value;
  selectedUnit = "";
  selectedElement = "";
  
  unitSelect.innerHTML = '<option value="" disabled selected>선택</option>';
  unitSelect.disabled = false;
  
  elementsContainer.innerHTML = `
    <p style="font-size: 12.5px; color: var(--text-muted); text-align: center; padding: 20px 0;">
      단원을 선택해 주세요.
    </p>
  `;
  
  updateGenerateButtonState();

  // Populate Units
  const units = CURRICULUM_DATA[selectedGrade][selectedSubject];
  for (const unit in units) {
    const option = document.createElement("option");
    option.value = unit;
    option.textContent = unit;
    unitSelect.appendChild(option);
  }
}

function handleUnitChange() {
  selectedUnit = unitSelect.value;
  selectedElement = "";
  
  updateGenerateButtonState();
  renderContentElements();
}

function renderContentElements() {
  elementsContainer.innerHTML = "";
  const elements = CURRICULUM_DATA[selectedGrade][selectedSubject][selectedUnit];
  
  if (!elements || elements.length === 0) {
    elementsContainer.innerHTML = '<p style="font-size:12.5px;color:var(--text-muted);">내용 요소가 없습니다.</p>';
    return;
  }
  
  elements.forEach(element => {
    const button = document.createElement("button");
    button.className = "content-element-btn";
    button.textContent = element;
    button.type = "button";
    button.addEventListener("click", () => handleElementSelect(button, element));
    elementsContainer.appendChild(button);
  });
}

function handleElementSelect(button, element) {
  // Toggle Selection
  const allButtons = elementsContainer.querySelectorAll(".content-element-btn");
  
  if (button.classList.contains("active")) {
    button.classList.remove("active");
    selectedElement = "";
  } else {
    allButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    selectedElement = element;
  }
  
  updateGenerateButtonState();
}

// Check if Generate Button can be activated
function updateGenerateButtonState() {
  const apiKey = localStorage.getItem("gemini_api_key");
  if (selectedGrade && selectedSubject && selectedUnit && selectedElement && apiKey) {
    generateBtn.disabled = false;
  } else {
    generateBtn.disabled = true;
  }
}

// API Key Storage and Management
function checkApiKeyStatus() {
  const apiKey = localStorage.getItem("gemini_api_key");
  if (apiKey) {
    apiStatusBtn.classList.add("configured");
    apiStatusText.textContent = "API 키 로드됨";
    apiKeyInput.value = apiKey;
  } else {
    apiStatusBtn.classList.remove("configured");
    apiStatusText.textContent = "API 키를 입력하세요";
    apiKeyInput.value = "";
  }
  updateGenerateButtonState();
}

function openSettingsModal() {
  settingsModal.classList.add("active");
  const apiKey = localStorage.getItem("gemini_api_key");
  if (apiKey) {
    apiKeyInput.value = apiKey;
  }
}

function closeSettingsModal() {
  settingsModal.classList.remove("active");
}

function saveApiKey() {
  const key = apiKeyInput.value.trim();
  if (key) {
    localStorage.setItem("gemini_api_key", key);
    apiModalAlert.className = "alert-banner info";
    apiModalAlert.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" style="width: 16px; height: 16px; flex-shrink:0;">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
      </svg>
      <div>API 키가 성공적으로 저장되었습니다!</div>
    `;
    setTimeout(() => {
      closeSettingsModal();
      checkApiKeyStatus();
    }, 1000);
  } else {
    localStorage.removeItem("gemini_api_key");
    apiModalAlert.className = "alert-banner danger";
    apiModalAlert.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" style="width: 16px; height: 16px; flex-shrink:0;">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
      </svg>
      <div>API 키가 입력되지 않았습니다. 기존 설정이 삭제되었습니다.</div>
    `;
    checkApiKeyStatus();
  }
}

// Get Checked Equipments
function getSelectedEquipment() {
  const checkboxes = document.querySelectorAll(".equipment-grid input[type='checkbox']");
  const selected = [];
  checkboxes.forEach(cb => {
    if (cb.checked) {
      selected.push(cb.value);
    }
  });
  return selected;
}

// Generate Prompt & Call Gemini
async function generateExperiment() {
  const apiKey = localStorage.getItem("gemini_api_key");
  if (!apiKey) {
    openSettingsModal();
    return;
  }

  // Set Loading UI
  emptyState.style.display = "none";
  paneDesign.style.display = "none";
  paneGuide.style.display = "none";
  paneWorksheet.style.display = "none";
  tabsContainer.style.display = "none";
  outputToolbar.style.display = "none";
  loaderContainer.style.display = "flex";
  generateBtn.disabled = true;

  const equipments = getSelectedEquipment().join(", ");
  const groupSize = groupSizeSelect.value;
  const customRequests = customRequestsText.value.trim();

  // Create customized prompt based on grade
  let levelConstraint = "";
  if (selectedGrade.includes("10학년")) {
    levelConstraint = `
      - 대상 학년은 고등학교 1학년(통합과학 수준)입니다.
      - 절대 정량적인 물리 벡터 합성 연산, 삼각함수(sin, cos 등) 계산, 미적분 기호, 복잡한 전자기학 유도 공식을 사용해서는 안 됩니다.
      - 모든 물리 개념을 정성적으로 이해시키고, 단순한 그래프 해석이나 사칙연산 수준으로만 난이도를 유지하십시오.
    `;
  } else if (selectedGrade.includes("11학년")) {
    levelConstraint = `
      - 대상 학년은 고등학교 2학년(물리학 일반선택 수준)입니다.
      - 2D 운동(평면 운동)의 복잡한 벡터 연산이나 돌림힘의 고난이도 평형 계산은 12학년 과정이므로 제외하며, 1차원 직선 운동 및 평면상의 힘의 평형을 기본 삼각비 수준에서 분석하도록 제한하십시오.
      - 고등학교 공통수학(대수, 삼각비) 범위를 넘어서는 고난도 수학(고급 미적분, 선형대수) 표현을 지양해 주십시오.
    `;
  } else {
    levelConstraint = `
      - 대상 학년은 고등학교 3학년(진로 선택 과목: 역학과 에너지 / 전자기와 양자 수준)입니다.
      - 벡터의 성분 분해, 포물선/원운동 공식, 기체 법칙, 맥스웰 방정식의 정성적 이해, 슈뢰디거 방정식의 개념(양자 터널링 등)을 다룰 수 있습니다.
      - 그러나 대학 과정의 미분방정식 풀이나 고난도 적분 계산식은 배제하고, 고등학교 물리 수준의 기하와 벡터, 미적분학의 개념적 적용 수준으로 조율하십시오.
    `;
  }

  const systemInstruction = `
    당신은 한국 고등학교의 전문 물리 교사입니다. 2022 개정 과학과 교육과정을 엄격히 준수하여 고등학교 실험 설계안을 전문적으로 작성해 주는 것이 임무입니다.
    
    작성 시 반드시 다음 수칙을 지켜야 합니다:
    1. 학년 수준 제약 사항(선수학습):
       ${levelConstraint}
    2. 시간적 제약:
       - 전체 실험 수업은 45분에서 50분 내에 끝날 수 있도록 치밀하게 예산을 분배해야 합니다.
       - 도입(개념 도입, 안전 교육 및 장비 사용법): 5~10분
       - 전개(실험 진행, 데이터 수집 및 기록): 25~30분
       - 정리(결과 토의, 실험대 정리, 활동지 완성): 5~10분
    3. 기자재 조건 및 대안 제시:
       - 한국 고등학교 과학실에 흔히 구비되어 있는 다음 장비를 활용해 설계하십시오: ${equipments}
       - MBL 센서나 포토게이트는 구비되지 않은 학교가 많으므로, 이들 장비를 활용해 설계하더라도 반드시 **스마트폰 카메라(슬로우 모션 촬영), 일반 초시계, 용수철 저울, 종이 자 등 보편적인 대안 도구를 활용한 대안적인 실험 설계 및 데이터 측정 방식**을 준비물과 전개 과정에 함께 포함하여 주십시오.
       - 선택되지 않은 특수 장비(MBL, 포토게이트 등)는 실험 진행에 필수 조건이 되어서는 안 되며, 수동 측정 방법이나 무료 스마트폰 앱(Phyphox 등)을 활용한 실험으로 구성하십시오.
    4. 모둠 구성:
       - 실험 모둠 구성은 [ ${groupSize} ] 기준으로 구성 단계별 지침을 적어주십시오.
    5. LaTeX 수식 표기법 절대 금지:
       - 수식이나 물리 기호를 작성할 때 절대 LaTeX 표기법(예: $...$, $$...$$, \\frac, \\Delta, \\Phi 등)을 사용하지 마십시오.
       - 수식은 일반 텍스트나 일반 유니코드 기호(예: Δ, Φ, ΔΦ/Δt, F = ma, v = f * lambda)로만 작성해야 합니다.
       - 예: '$\\frac{\\Delta \\Phi}{\\Delta t}$' 대신 'ΔΦ/Δt' 또는 '시간 변화율에 대한 자기선속의 변화율'로 표기하십시오.
       - 예: '$v = f \\lambda$' 대신 'v = f * lambda' 또는 '속력 = 진동수 * 파장'으로 표기하십시오.
       - 이 수칙은 교사용 팁, 학생 활동지 등 모든 내용에 균일하게 적용되며, 이를 위반하여 특수 문자나 수식이 $ 기호 등으로 감싸지는 일이 없도록 하십시오.
  `;

  const userPrompt = `
    다음 교육과정 내용 요소를 기반으로 실험 설계안을 작성해 주십시오:
    - 학년: ${selectedGrade}
    - 과목: ${selectedSubject}
    - 단원: ${selectedUnit}
    - 핵심 내용 요소: ${selectedElement}
    
    추가 요청 사항: ${customRequests ? customRequests : "없음"}
    
    [출력 양식 요구사항]
    반드시 아래에 지정된 세 가지 구분선 기호(===TAB_DESIGN===, ===TAB_GUIDE===, ===TAB_WORKSHEET===)를 텍스트 내에 그대로 포함하여 3개 섹션으로 분할하여 작성해 주십시오. 다른 텍스트 없이 이 구분선 기호만을 별도의 줄에 독립적으로 적어 섹션을 구분해야 합니다.
    
    ===TAB_DESIGN===
    # [실험명]
    ## 1. 교육과정 연계 및 학습 목표
    - 2022 개정 교육과정 매핑 단원 및 내용요소 기재
    - 구체적 학습 목표 (3가지 이내)
    
    ## 2. 선수학습 및 난이도 진단
    - 본 실험에서 다루지 않아야 하는 고난도 수학/물리 개념 정의 (선수학습 초과 금지선)
    - 학생들에게 사전 진단 질문(1-2개)
    
    ## 3. 실험 준비물 및 안전 수칙
    - 과학실 보유 기자재 연계 상세 준비물 목록 (모둠별 / 교사용 구분)
    - MBL/포토게이트 장비가 없는 학교를 위한 스마트폰 및 간이 도구 대체 방법 안내
    - 실험 전/중/후 필수 안전 주의사항 (학생 지도시 주의할 점)
    
    ## 4. 실험 과정 및 시간 계획 (45-50분 차시안)
    - **도입 (5-10분)**: 동기유발, 원리 설명, 안전 교육
    - **전개 (25-30분)**: 모둠별 조작 단계 (기본 실험 과정 및 간이 대체 실험 과정을 함께 기술)
    - **정리 (5-10분)**: 데이터 도식화, 결과 정리, 토의
    
    ===TAB_GUIDE===
    ## 5. 교사용 수업 지도 팁 (수업 노하우)
    - 실험 오차 줄이기 팁 (물리실험 오차 분석법)
    - 이론과 실제 데이터 간의 불일치 시 학생 설득 및 지도 노하우
    - 안전 지도 시 교사가 특히 집중해서 통제해야 할 위험 요점
    
    ===TAB_WORKSHEET===
    ## 6. [학생 배포용] 실험 활동지 양식
    - 학생들이 실험 중 기록할 데이터 테이블 서식
    - 데이터 테이블 바로 아래에 반드시 다음 HTML 태그를 한 줄의 단독 코드로 정확히 기재하십시오:
      <div class="student-graph-grid"></div>
    - 결과 해석을 위한 서술형 질문 (2-3개)
    - 느낀 점 및 자기 평가 양식
  `;

  const requestBody = {
    contents: [{
      parts: [{ text: userPrompt }]
    }],
    generationConfig: {
      temperature: 0.3,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 8192
    },
    systemInstruction: {
      parts: [{ text: systemInstruction }]
    }
  };

  try {
    // API Endpoint matching v1beta to support systemInstruction properly
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.error?.message || `API Error: ${response.status}`);
    }

    const data = await response.json();
    const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!resultText) {
      throw new Error("API로부터 유효한 텍스트 응답을 받지 못했습니다.");
    }

    currentGeneratedMarkdown = resultText;
    
    // Render Markdown using marked with tabs
    renderMarkdownTabs(resultText);
    
    // Save to History
    saveToHistory(selectedElement, resultText);

    // Show Output UI
    loaderContainer.style.display = "none";
    outputToolbar.style.display = "flex";

  } catch (error) {
    console.error("API Call Failed:", error);
    loaderContainer.style.display = "none";
    emptyState.style.display = "flex";
    emptyState.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.2" stroke="var(--danger)" style="width: 64px; height: 64px;">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
      </svg>
      <h3 style="color: var(--danger);">실험 설계 실패</h3>
      <p style="margin-top: 8px;">오류 메시지: ${error.message}</p>
      <p style="margin-top: 8px; font-size:12px; color: var(--text-muted);">API 키가 유효한지 또는 네트워크 연결을 확인해 주세요. 우측 상단 'API 키 설정'에서 키를 재등록할 수 있습니다.</p>
    `;
  } finally {
    generateBtn.disabled = false;
  }
}

// History LocalStorage Management
function saveToHistory(elementName, markdown) {
  let history = JSON.parse(localStorage.getItem("physics_experiments_history")) || [];
  
  const newItem = {
    id: Date.now().toString(),
    title: `[실험] ${elementName}`,
    grade: selectedGrade,
    subject: selectedSubject,
    unit: selectedUnit,
    element: elementName,
    content: markdown,
    timestamp: new Date().toLocaleString("ko-KR")
  };

  // Limit to 10 history items
  history.unshift(newItem);
  if (history.length > 10) {
    history.pop();
  }

  localStorage.setItem("physics_experiments_history", JSON.stringify(history));
  renderHistory();
}

function renderHistory() {
  const history = JSON.parse(localStorage.getItem("physics_experiments_history")) || [];
  historyList.innerHTML = "";

  if (history.length === 0) {
    historyList.innerHTML = `
      <p style="font-size: 12px; color: var(--text-muted); text-align: center; padding: 20px 0; width: 100%;">
        보관된 실험 설계안이 없습니다.
      </p>
    `;
    return;
  }

  history.forEach(item => {
    const historyItem = document.createElement("div");
    historyItem.className = "history-item";
    
    const info = document.createElement("div");
    info.className = "history-info";
    info.addEventListener("click", () => loadHistoryItem(item));

    const title = document.createElement("div");
    title.className = "history-title";
    title.textContent = item.title;

    const meta = document.createElement("div");
    meta.className = "history-meta";
    meta.textContent = `${item.subject} | ${item.timestamp}`;

    info.appendChild(title);
    info.appendChild(meta);

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-history-btn";
    deleteBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" style="width: 14px; height: 14px;">
        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
      </svg>
    `;
    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      deleteHistoryItem(item.id);
    });

    historyItem.appendChild(info);
    historyItem.appendChild(deleteBtn);
    historyList.appendChild(historyItem);
  });
}

function loadHistoryItem(item) {
  // Set UI state to show generated item
  emptyState.style.display = "none";
  loaderContainer.style.display = "none";
  
  currentGeneratedMarkdown = item.content;
  renderMarkdownTabs(item.content);
  outputToolbar.style.display = "flex";

  // Reverse populate dropdown values (visually) if matching curriculum exists
  if (CURRICULUM_DATA[item.grade]) {
    gradeSelect.value = item.grade;
    selectedGrade = item.grade;

    // Reset subject
    subjectSelect.innerHTML = '<option value="" disabled>선택</option>';
    subjectSelect.disabled = false;
    for (const sub in CURRICULUM_DATA[item.grade]) {
      const option = document.createElement("option");
      option.value = sub;
      option.textContent = sub;
      if (sub === item.subject) option.selected = true;
      subjectSelect.appendChild(option);
    }
    selectedSubject = item.subject;

    // Reset unit
    unitSelect.innerHTML = '<option value="" disabled>선택</option>';
    unitSelect.disabled = false;
    for (const uni in CURRICULUM_DATA[item.grade][item.subject]) {
      const option = document.createElement("option");
      option.value = uni;
      option.textContent = uni;
      if (uni === item.unit) option.selected = true;
      unitSelect.appendChild(option);
    }
    selectedUnit = item.unit;

    // Render elements and highlight the active one
    renderContentElements();
    const buttons = elementsContainer.querySelectorAll(".content-element-btn");
    buttons.forEach(btn => {
      if (btn.textContent.trim() === item.element.trim()) {
        btn.classList.add("active");
        selectedElement = item.element;
      }
    });

    updateGenerateButtonState();
  }
}

function deleteHistoryItem(id) {
  let history = JSON.parse(localStorage.getItem("physics_experiments_history")) || [];
  history = history.filter(item => item.id !== id);
  localStorage.setItem("physics_experiments_history", JSON.stringify(history));
  renderHistory();
}

// Exporting Functions
function copyResult() {
  if (!currentGeneratedMarkdown) return;
  navigator.clipboard.writeText(currentGeneratedMarkdown).then(() => {
    alert("실험 설계안 마크다운 텍스트가 클립보드에 복사되었습니다!");
  }).catch(err => {
    console.error("복사 실패:", err);
  });
}

function downloadText() {
  if (!currentGeneratedMarkdown) return;
  
  // 1. Get the parsed HTML for each tab
  const designHtml = paneDesign.innerHTML;
  const guideHtml = paneGuide.innerHTML;
  const worksheetHtml = paneWorksheet.innerHTML;
  
  // 2. Combine them into one structured HTML document with page breaks
  const combinedHtml = `
    <div class="word-section">
      ${designHtml}
    </div>
    <br style="page-break-before: always; clear: both; mso-break-type: section-break;" />
    <div class="word-section">
      ${guideHtml}
    </div>
    <br style="page-break-before: always; clear: both; mso-break-type: section-break;" />
    <div class="word-section">
      ${worksheetHtml}
    </div>
  `;

  // 3. Wrap in standard MS Word XML/HTML template
  const wordDocumentHtml = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' 
          xmlns:w='urn:schemas-microsoft-com:office:word' 
          xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset="utf-8">
      <title>${selectedElement || "물리실험설계"}</title>
      <!--[if gte mso 9]>
      <xml>
        <w:WordDocument>
          <w:View>Print</w:View>
          <w:Zoom>100</w:Zoom>
          <w:DoNotOptimizeForBrowser/>
        </w:WordDocument>
      </xml>
      <![endif]-->
      <style>
        body {
          font-family: 'Malgun Gothic', '맑은 고딕', Arial, sans-serif;
          line-height: 1.6;
          color: #333333;
          padding: 20px;
        }
        h1 {
          font-size: 22pt;
          color: #1a365d;
          border-bottom: 2px solid #2b6cb0;
          padding-bottom: 6px;
          margin-top: 24px;
          margin-bottom: 12px;
        }
        h2 {
          font-size: 16pt;
          color: #2c5282;
          border-bottom: 1px dashed #cbd5e0;
          padding-bottom: 4px;
          margin-top: 20px;
          margin-bottom: 10px;
        }
        h3 {
          font-size: 13pt;
          color: #0f766e;
          margin-top: 16px;
          margin-bottom: 8px;
        }
        p {
          font-size: 10.5pt;
          margin-bottom: 10px;
        }
        ul, ol {
          margin-left: 20px;
          margin-bottom: 12px;
        }
        li {
          font-size: 10.5pt;
          margin-bottom: 4px;
        }
        blockquote {
          background-color: #f7fafc;
          border-left: 4px solid #3182ce;
          padding: 8px 12px;
          margin-bottom: 12px;
          font-style: italic;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 16px 0;
        }
        th, td {
          border: 1px solid #cbd5e0;
          padding: 8px 10px;
          font-size: 10pt;
          text-align: left;
        }
        th {
          background-color: #ebf8ff;
          color: #2b6cb0;
          font-weight: bold;
        }
        tr:nth-child(even) {
          background-color: #f7fafc;
        }
        /* Graph Grid Styles for Word Export */
        .graph-grid-wrapper {
          margin: 20px 0;
          font-family: 'Malgun Gothic', '맑은 고딕', sans-serif;
        }
        .graph-y-axis-label {
          font-size: 9pt;
          font-weight: bold;
          color: #4a5568;
          margin-bottom: 4px;
          margin-left: 45px;
        }
        .graph-x-axis-label {
          font-size: 9pt;
          font-weight: bold;
          color: #4a5568;
          text-align: right;
          margin-top: 4px;
          max-width: 550px;
        }
        .graph-grid-table {
          border-collapse: collapse;
          margin: 0;
        }
        .graph-grid-table tr {
          background-color: transparent !important;
        }
        .graph-grid-table td {
          width: 18pt;
          height: 18pt;
          border: 0.5px solid #cbd5e0;
          padding: 0;
          text-align: center;
          font-size: 8pt;
          color: #718096;
        }
        .graph-grid-table td.axis-y-cell {
          border-left: 2.5px solid #1a202c !important;
        }
        .graph-grid-table td.axis-x-cell {
          border-bottom: 2.5px solid #1a202c !important;
        }
        .graph-grid-table td.origin-cell {
          font-weight: bold;
          color: #1a202c;
          vertical-align: middle;
        }
      </style>
    </head>
    <body>
      ${combinedHtml}
    </body>
    </html>
  `;

  // 4. Create blob using htmlDocx.asBlob and download as a valid zipped .docx file
  const blob = htmlDocx.asBlob(wordDocumentHtml);
  
  const element = document.createElement("a");
  element.href = URL.createObjectURL(blob);
  
  const safeTitle = selectedElement.replace(/[^a-zA-Z0-9가-힣\s]/g, "").trim().substring(0, 15);
  element.download = `${selectedSubject}_실험설계_${safeTitle || "물리실험"}.docx`;
  
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

function printResult() {
  if (!currentGeneratedMarkdown) return;
  window.print();
}

// Global Tab Switching Logic
function switchTab(tabId) {
  const tabButtons = document.querySelectorAll(".tab-btn");
  tabButtons.forEach(btn => {
    if (btn.getAttribute("data-tab") === tabId) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  const tabPanes = document.querySelectorAll(".tab-pane");
  tabPanes.forEach(pane => {
    if (pane.id === `pane-${tabId}`) {
      pane.style.display = "block";
    } else {
      pane.style.display = "none";
    }
  });
}

// Render Markdown split by tabs
function renderMarkdownTabs(resultText) {
  let designText = "";
  let guideText = "";
  let worksheetText = "";

  // Split text based on tab markers
  if (resultText.includes("===TAB_DESIGN===") || resultText.includes("===TAB_GUIDE===") || resultText.includes("===TAB_WORKSHEET===")) {
    const parts = resultText.split(/===TAB_(DESIGN|GUIDE|WORKSHEET)===/i);
    for (let i = 1; i < parts.length; i += 2) {
      const tag = parts[i].toUpperCase();
      const content = parts[i + 1] ? parts[i + 1].trim() : "";
      if (tag === "DESIGN") {
        designText = content;
      } else if (tag === "GUIDE") {
        guideText = content;
      } else if (tag === "WORKSHEET") {
        worksheetText = content;
      }
    }
  }

  // Fallback if markers are missing
  if (!designText && !guideText && !worksheetText) {
    const sections = resultText.split(/## 5\.|## 6\./);
    if (sections.length >= 3) {
      designText = sections[0];
      guideText = "## 5. " + sections[1];
      worksheetText = "## 6. " + sections[2];
    } else {
      designText = resultText;
      guideText = "참고 및 유의사항이 생성되지 않았습니다. 실험 설계서 내용을 참고해 주세요.";
      worksheetText = "배포용 활동지가 생성되지 않았습니다. 실험 설계서 내용을 참고해 주세요.";
    }
  }

  // Parse and inject
  let parsedDesign = marked.parse(designText || "내용 없음");
  let parsedGuide = marked.parse(guideText || "내용 없음");
  let parsedWorksheet = marked.parse(worksheetText || "내용 없음");

  // Dynamically replace the graph grid placeholder with a styled HTML table
  const gridHtml = generateGraphGridHtml();
  parsedWorksheet = parsedWorksheet.replace(/<div class="student-graph-grid"><\/div>/g, gridHtml);
  parsedWorksheet = parsedWorksheet.replace(/<div class="student-graph-grid">\s*<\/div>/g, gridHtml);

  paneDesign.innerHTML = parsedDesign;
  paneGuide.innerHTML = parsedGuide;
  paneWorksheet.innerHTML = parsedWorksheet;

  // Show Tab Nav
  tabsContainer.style.display = "flex";
  
  // Set default tab
  switchTab("design");
}

// Generate high school student coordinate graph grid using HTML table
function generateGraphGridHtml() {
  const cols = 22;
  const rows = 15;
  let html = '<div class="graph-grid-wrapper">';
  html += '  <div class="graph-y-axis-label">y축 (종속변인)</div>';
  html += '  <div class="graph-grid-table-container">';
  html += '    <table class="graph-grid-table">';
  for (let r = 0; r < rows; r++) {
    html += '      <tr>';
    for (let c = 0; c < cols; c++) {
      let cellClass = "";
      if (c === 2) cellClass += " axis-y-cell";
      if (r === rows - 3) cellClass += " axis-x-cell";
      
      // Bottom-left origin label position (below and to the left of the axis intersection)
      if (r === rows - 2 && c === 1) {
        html += `      <td class="${cellClass} origin-cell">O</td>`;
      } else {
        html += `      <td class="${cellClass}"></td>`;
      }
    }
    html += '      </tr>';
  }
  html += '    </table>';
  html += '  </div>';
  html += '  <div class="graph-x-axis-label">x축 (조작변인)</div>';
  html += '</div>';
  return html;
}
