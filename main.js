document.addEventListener("DOMContentLoaded", () => {
    const gradeSelect = document.getElementById("grade-select");
    const subjectSelect = document.getElementById("subject-select");
    const unitSelect = document.getElementById("unit-select");
    const elementsContainer = document.getElementById("content-elements-container");
    const generateBtn = document.getElementById("generate-btn");
    const resultArea = document.getElementById("result-area");
    const apiKeyInput = document.getElementById("api-key-input");

    // Load API Key from localStorage
    const savedApiKey = localStorage.getItem("gemini_api_key");
    if (savedApiKey) {
        apiKeyInput.value = savedApiKey;
    }

    // Save API Key to localStorage when changed
    apiKeyInput.addEventListener("change", (e) => {
        localStorage.setItem("gemini_api_key", e.target.value.trim());
    });

    let selectedGrade = null;
    let selectedSubject = null;
    let selectedUnit = null;
    let selectedElement = null;

    // Initialize Grade Dropdown
    const initGrades = () => {
        const grades = Object.keys(curriculumData);
        populateSelect(gradeSelect, grades, "학년을 선택하세요");
    };

    // Helper to populate select elements
    const populateSelect = (selectElement, options, placeholder) => {
        selectElement.innerHTML = `<option value="" disabled selected>${placeholder}</option>`;
        options.forEach(opt => {
            const option = document.createElement("option");
            option.value = opt;
            option.textContent = opt;
            selectElement.appendChild(option);
        });
        selectElement.disabled = false;
    };

    // Helper to reset select elements
    const resetSelect = (selectElement, placeholder) => {
        selectElement.innerHTML = `<option value="" disabled selected>${placeholder}</option>`;
        selectElement.disabled = true;
    };

    // Event Listeners for Dropdowns
    gradeSelect.addEventListener("change", (e) => {
        selectedGrade = e.target.value;
        selectedSubject = null;
        selectedUnit = null;
        selectedElement = null;

        resetSelect(unitSelect, "단원을 선택하세요");
        resetElements();
        checkGenerateBtn();

        const subjects = Object.keys(curriculumData[selectedGrade]);
        populateSelect(subjectSelect, subjects, "과목을 선택하세요");
    });

    subjectSelect.addEventListener("change", (e) => {
        selectedSubject = e.target.value;
        selectedUnit = null;
        selectedElement = null;

        resetElements();
        checkGenerateBtn();

        const units = Object.keys(curriculumData[selectedGrade][selectedSubject]);
        populateSelect(unitSelect, units, "단원을 선택하세요");
    });

    unitSelect.addEventListener("change", (e) => {
        selectedUnit = e.target.value;
        selectedElement = null;

        checkGenerateBtn();

        const elements = curriculumData[selectedGrade][selectedSubject][selectedUnit];
        renderElements(elements);
    });

    // Render Content Elements as buttons
    const renderElements = (elements) => {
        elementsContainer.innerHTML = "";
        
        elements.forEach(el => {
            const btn = document.createElement("button");
            btn.className = "element-btn";
            btn.textContent = el.name;
            
            btn.addEventListener("click", () => {
                // Deselect others
                const allBtns = elementsContainer.querySelectorAll(".element-btn");
                allBtns.forEach(b => b.classList.remove("active"));
                
                // Select this one
                btn.classList.add("active");
                selectedElement = el;
                checkGenerateBtn();
            });

            elementsContainer.appendChild(btn);
        });
    };

    const resetElements = () => {
        elementsContainer.innerHTML = `<div class="empty-state">이전 항목들을 먼저 선택해주세요.</div>`;
    };

    // Check if Generate Button should be enabled
    const checkGenerateBtn = () => {
        if (selectedGrade && selectedSubject && selectedUnit && selectedElement) {
            generateBtn.disabled = false;
        } else {
            generateBtn.disabled = true;
        }
    };

    // Render parsed result cards
    const renderResultCards = (text) => {
        const sectionNames = ['실험 제목', '실험 목표', '준비물', '실험 과정', '안전 유의사항', '평가 관점'];
        let result = {};
        sectionNames.forEach(name => result[name] = []);
        
        let currentSection = null;
        
        const lines = text.split('\n');
        for (const line of lines) {
            let foundSection = false;
            for (const name of sectionNames) {
                // Check if the line is a header containing the section name
                const isHeader = new RegExp(`^[^a-zA-Z가-힣]*${name}[^a-zA-Z가-힣]*$`).test(line.trim());
                if (isHeader) {
                    currentSection = name;
                    foundSection = true;
                    break;
                }
            }
            if (foundSection) continue;
            
            if (currentSection) {
                result[currentSection].push(line);
            }
        }
        
        const htmlParts = sectionNames.map(name => {
            let contentStr = result[name].join('\n').trim();
            if (!contentStr) {
                return `<div class="result-card"><h3>${name}</h3><div class="result-card-content"><p>내용을 찾지 못했습니다.</p></div></div>`;
            }
            
            // Basic markdown to html
            contentStr = contentStr
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/g, '<em>$1</em>')
                .replace(/^-\s+(.*)$/gm, '<li>$1</li>')
                .replace(/^•\s+(.*)$/gm, '<li>$1</li>')
                .replace(/^\d+\.\s+(.*)$/gm, '<li>$1</li>')
                .replace(/\n\n/g, '</p><p>')
                .replace(/\n/g, '<br/>');
                
            if (contentStr.includes('<li>')) {
                // Wrap consecutive li tags in ul/ol if possible, but for simplicity we just wrap the whole thing
                // This is a rough HTML formatting covering normal lists.
                contentStr = `<ul>${contentStr.replace(/<br\/><li>/g, '<li>')}</ul>`;
            }
            
            const extraClass = name === '실험 과정' ? ' wide-card' : '';
            return `<div class="result-card${extraClass}"><h3>${name}</h3><div class="result-card-content"><p>${contentStr}</p></div></div>`;
        });
        
        resultArea.innerHTML = `<div class="result-cards">${htmlParts.join('')}</div>`;
    };

    // Generate Button Click with Gemini API
    generateBtn.addEventListener("click", async () => {
        const apiKey = apiKeyInput.value.trim();
        if (!apiKey) {
            alert("상단에 API Key를 먼저 입력해주세요.");
            apiKeyInput.focus();
            return;
        }

        // Show loading state
        resultArea.classList.remove("empty");
        resultArea.innerHTML = `
            <div class="loading-container">
                <div class="loading-spinner"></div>
                <p>실험 설계안을 생성 중입니다... (약 10~20초 소요)</p>
            </div>
        `;

        try {
            const systemPrompt = `너는 15년 경력의 베테랑 물리 교사야. 다음 조건을 반드시 지켜서 실험을 설계해줘:
과학적으로 오류가 없어야 하며, 실험 논리가 명확해야 한다
일반 학교 과학실에서 구할 수 있는 기자재만 사용할 것
45분 수업 시간 내에 끝낼 수 있을 것
학생 안전 유의사항을 최우선으로 강조할 것
번역투를 쓰지 말고 현장 교사가 쓰는 자연스러운 한국어로 작성할 것
선택된 내용요소의 선수학습을 파악할 때, 함께 제공된 교육과정 데이터에서 하위 과정의 내용요소를 참고해. 통합과학은 물리학의 선수학습이고, 물리학은 역학과에너지·전자기와양자의 선수학습이야.
실험 과정에 인사말이나 도입 멘트를 넣지 마. 절차만 깔끔하게 작성할 것.
실험 과정은 반드시 번호를 매겨 단계별로 작성할 것 (1, 2, 3, ... )
준비물, 안전 유의사항, 평가 관점 등 나머지 항목은 글머리 기호(•)를 사용하여 항목별로 정리할 것
실험 제목과 실험 목표는 간결한 문장으로 작성할 것`;

            const curriculumContext = JSON.stringify(curriculumData, null, 2);
            
            const userPrompt = `선택된 교육과정:
학년/과정: ${selectedGrade}
과목: ${selectedSubject}
단원: ${selectedUnit}
내용요소: ${selectedElement.name}

전체 교육과정 내용요소 (참고용):
${curriculumContext}

다음 6개 항목으로 나누어 답변해줘: 실험 제목, 실험 목표, 준비물, 실험 과정, 안전 유의사항, 평가 관점`;

            const combinedPrompt = systemPrompt + "\n\n" + userPrompt;

            const endpoint = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
            const reqBody = {
                "contents": [
                    {
                        "role": "user",
                        "parts": [{"text": combinedPrompt}]
                    }
                ]
            };

            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(reqBody)
            });

            if (!response.ok) {
                const errData = await response.json();
                console.error("API Response Error:", errData);
                throw new Error("API 요청 실패");
            }

            const data = await response.json();
            const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
            
            if (!textResponse) {
                throw new Error("응답 내용이 없습니다.");
            }

            renderResultCards(textResponse);
        } catch (error) {
            console.error("API 연동 에러:", error);
            resultArea.innerHTML = `
                <div class="api-message" style="border-color: #ef4444; color: #b91c1c; background: #fef2f2;">
                    <strong>API 키를 확인해주세요.</strong><br/>
                    혹은 네트워크 상태를 점검해주세요.
                </div>
            `;
        }
    });

    // Run initialization
    initGrades();
});
