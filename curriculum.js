const curriculumData = {
  "고등학교 공통과정": {
    "통합과학1": {
      "과학의 기초": [
        { name: "기본량과 단위", prerequisites: [] },
        { name: "측정과 어림", prerequisites: [] },
        { name: "정보와 신호", prerequisites: [] }
      ],
      "물질과 규칙성": [
        { name: "원소 형성", prerequisites: [] },
        { name: "별의 진화", prerequisites: [] },
        { name: "원소의 주기성", prerequisites: [] },
        { name: "이온 결합", prerequisites: [] },
        { name: "공유 결합", prerequisites: [] },
        { name: "지각과 생명체 구성 물질의 규칙성", prerequisites: [] },
        { name: "물질의 전기적 성질", prerequisites: [] }
      ],
      "시스템과 상호작용": [
        { name: "지구시스템의 구성과 상호작용", prerequisites: [] },
        { name: "판구조론과 지각 변동", prerequisites: [] },
        { name: "중력장 내의 운동", prerequisites: [] },
        { name: "충격량과 운동량", prerequisites: [] },
        { name: "생명 시스템의 기본 단위", prerequisites: [] },
        { name: "물질대사", prerequisites: [] },
        { name: "유전자와 단백질", prerequisites: [] }
      ]
    },
    "통합과학2": {
      "변화와 다양성": [
        { name: "지질시대의 생물과 화석", prerequisites: [] },
        { name: "지질시대 환경 변화와 대멸종", prerequisites: [] },
        { name: "자연선택", prerequisites: [] },
        { name: "생물다양성", prerequisites: [] },
        { name: "산화와 환원", prerequisites: [] },
        { name: "산성과 염기성", prerequisites: [] },
        { name: "중화 반응", prerequisites: [] },
        { name: "물질 변화에서 에너지 출입", prerequisites: [] }
      ],
      "환경과 에너지": [
        { name: "생태계 구성 요소", prerequisites: [] },
        { name: "생태계 평형", prerequisites: [] },
        { name: "대기와 해양의 상호작용", prerequisites: [] },
        { name: "온실기체와 지구온난화", prerequisites: [] },
        { name: "핵융합", prerequisites: [] },
        { name: "발전", prerequisites: [] },
        { name: "에너지 전환과 효율", prerequisites: [] }
      ],
      "과학과 미래 사회": [
        { name: "감염병과 병원체", prerequisites: [] },
        { name: "인공지능과 과학 탐구", prerequisites: [] },
        { name: "로봇", prerequisites: [] },
        { name: "과학기술과 윤리", prerequisites: [] }
      ]
    }
  },
  "고등학교 일반선택": {
    "물리학": {
      "힘과 에너지": [
        { name: "평형과 안정성", prerequisites: [] },
        { name: "뉴턴 운동 법칙", prerequisites: [] },
        { name: "일-에너지 정리", prerequisites: [] },
        { name: "역학적 에너지 보존", prerequisites: [] },
        { name: "열과 에너지 전환", prerequisites: [] }
      ],
      "전기와 자기": [
        { name: "전기장과 전위차", prerequisites: [] },
        { name: "축전기", prerequisites: [] },
        { name: "자성체", prerequisites: [] },
        { name: "전류의 자기 작용", prerequisites: [] },
        { name: "전자기 유도", prerequisites: [] }
      ],
      "빛과 물질": [
        { name: "중첩과 간섭", prerequisites: [] },
        { name: "굴절", prerequisites: [] },
        { name: "빛과 물질의 이중성", prerequisites: [] },
        { name: "에너지띠와 반도체", prerequisites: [] },
        { name: "광속 불변", prerequisites: [] }
      ]
    }
  },
  "고등학교 진로선택": {
    "역학과 에너지": {
      "시공간과 운동": [
        { name: "벡터의 합성", prerequisites: [] },
        { name: "포물선 운동과 원운동", prerequisites: [] },
        { name: "역학적 에너지", prerequisites: [] },
        { name: "중력과 천체 운동", prerequisites: [] },
        { name: "탈출 속도", prerequisites: [] },
        { name: "등가 원리", prerequisites: [] }
      ],
      "열과 에너지": [
        { name: "열의 이동", prerequisites: [] },
        { name: "이상 기체 법칙", prerequisites: [] },
        { name: "열역학 제1법칙", prerequisites: [] },
        { name: "열기관", prerequisites: [] },
        { name: "열역학 제2법칙", prerequisites: [] }
      ],
      "탄성파와 소리": [
        { name: "탄성파", prerequisites: [] },
        { name: "투과와 반사", prerequisites: [] },
        { name: "도플러 효과", prerequisites: [] },
        { name: "간섭과 소음 제어", prerequisites: [] },
        { name: "정상파", prerequisites: [] }
      ]
    },
    "전자기와 양자": {
      "전자기적 상호작용": [
        { name: "전기력선과 등전위면", prerequisites: [] },
        { name: "유전분극", prerequisites: [] },
        { name: "로런츠 힘", prerequisites: [] },
        { name: "유도기전력", prerequisites: [] },
        { name: "반도체 소자", prerequisites: [] }
      ],
      "빛과 정보 통신": [
        { name: "렌즈와 수차", prerequisites: [] },
        { name: "간섭과 회절", prerequisites: [] },
        { name: "편광", prerequisites: [] },
        { name: "광전효과", prerequisites: [] },
        { name: "레이저", prerequisites: [] }
      ],
      "양자와 미시세계": [
        { name: "입자-파동 이중성", prerequisites: [] },
        { name: "확률 파동", prerequisites: [] },
        { name: "중첩", prerequisites: [] },
        { name: "터널 효과", prerequisites: [] },
        { name: "불확정성 원리", prerequisites: [] },
        { name: "핵융합", prerequisites: [] }
      ]
    }
  }
};
