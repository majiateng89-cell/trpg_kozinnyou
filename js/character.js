const STORAGE_KEY = "trpgCharacters";

const characterNameInput = document.getElementById("characterName");
const playerNameInput = document.getElementById("playerName");
const ageInput = document.getElementById("age");
const genderInput = document.getElementById("gender");
const occupationInput = document.getElementById("occupation");
const birthplaceInput = document.getElementById("birthplace");

const skillList = document.getElementById("skillList");
const characterList = document.getElementById("characterList");
const message = document.getElementById("message");

const occupationData = {
  探偵: {
    skills: {
      "目星": 60,
      "聞き耳": 50,
      "図書館": 50,
      "心理学": 40,
      "追跡": 40
    }
  },

  医師: {
    skills: {
      "医学": 70,
      "応急手当": 60,
      "心理学": 30,
      "科学": 40
    }
  },

  警察官: {
    skills: {
      "拳銃": 50,
      "聞き耳": 50,
      "目星": 50,
      "追跡": 40,
      "法律": 40
    }
  },

  ジャーナリスト: {
    skills: {
      "図書館": 60,
      "説得": 50,
      "心理学": 40,
      "写真術": 50,
      "母国語": 60
    }
  },

  大学教授: {
    skills: {
      "図書館": 70,
      "母国語": 60,
      "研究": 50,
      "他の言語": 40
    }
  },

  エンジニア: {
    skills: {
      "コンピューター": 60,
      "機械修理": 60,
      "電気修理": 50,
      "物理学": 40
    }
  },

  学生: {
    skills: {
      "図書館": 40,
      "コンピューター": 30,
      "母国語": 50
    }
  },

  作家: {
    skills: {
      "図書館": 60,
      "母国語": 70,
      "心理学": 30,
      "芸術／製作": 50
    }
  },

    教師: {
    skills: {
      "図書館": 60,
      "母国語": 60,
      "心理学": 40,
      "説得": 50,
      "歴史": 40
    }
  },

  看護師: {
    skills: {
      "応急手当": 70,
      "医学": 60,
      "心理学": 40,
      "目星": 40
    }
  },

  弁護士: {
    skills: {
      "法律": 70,
      "説得": 60,
      "信用": 50,
      "心理学": 40,
      "図書館": 40
    }
  },

  消防士: {
    skills: {
      "応急手当": 60,
      "回避": 50,
      "目星": 50,
      "聞き耳": 40,
      "登攀": 50
    }
  },

  軍人: {
    skills: {
      "ライフル": 60,
      "拳銃": 50,
      "回避": 50,
      "応急手当": 40,
      "聞き耳": 40
    }
  },

  "ジャーナリスト助手": {
    skills: {
      "図書館": 50,
      "写真術": 40,
      "聞き耳": 40,
      "目星": 50
    }
  },

  写真家: {
    skills: {
      "写真術": 70,
      "目星": 60,
      "芸術／製作": 50,
      "図書館": 40
    }
  },

  芸術家: {
    skills: {
      "芸術／製作": 70,
      "目星": 50,
      "心理学": 40,
      "図書館": 40
    }
  },

  ミュージシャン: {
    skills: {
      "芸術／製作": 70,
      "聞き耳": 60,
      "魅惑": 50,
      "心理学": 30
    }
  },

  俳優: {
    skills: {
      "芸術／製作": 70,
      "魅惑": 60,
      "説得": 50,
      "心理学": 40
    }
  },

  スポーツ選手: {
    skills: {
      "回避": 60,
      "跳躍": 50,
      "登攀": 50,
      "投擲": 50,
      "水泳": 50
    }
  },

  料理人: {
    skills: {
      "芸術／製作": 60,
      "目星": 50,
      "聞き耳": 40,
      "化学": 30
    }
  },

  農家: {
    skills: {
      "農業": 70,
      "運転": 50,
      "機械修理": 40,
      "目星": 40
    }
  },

  運転手: {
    skills: {
      "運転": 70,
      "機械修理": 50,
      "ナビゲート": 40,
      "目星": 40
    }
  },

  パイロット: {
    skills: {
      "操縦": 70,
      "ナビゲート": 60,
      "機械修理": 40,
      "目星": 40
    }
  },

  プログラマー: {
    skills: {
      "コンピューター": 70,
      "電気修理": 40,
      "図書館": 50,
      "数学": 50
    }
  },

  研究者: {
    skills: {
      "図書館": 60,
      "科学": 60,
      "コンピューター": 40,
      "母国語": 50
    }
  },

  大学生: {
    skills: {
      "図書館": 50,
      "コンピューター": 30,
      "母国語": 50,
      "他の言語": 30
    }
  },

  記者: {
    skills: {
      "図書館": 60,
      "写真術": 50,
      "説得": 50,
      "目星": 50,
      "聞き耳": 40
    }
  },

  営業職: {
    skills: {
      "説得": 60,
      "信用": 50,
      "心理学": 40,
      "言いくるめ": 50
    }
  },

  会社員: {
    skills: {
      "コンピューター": 40,
      "信用": 40,
      "図書館": 40,
      "母国語": 50
    }
  },

  店員: {
    skills: {
      "信用": 40,
      "説得": 50,
      "目星": 40,
      "聞き耳": 40
    }
  },

  警備員: {
    skills: {
      "目星": 60,
      "聞き耳": 60,
      "回避": 50,
      "格闘": 50
    }
  },

  探検家: {
    skills: {
      "ナビゲート": 60,
      "登攀": 60,
      "水泳": 50,
      "追跡": 50,
      "サバイバル": 60
    }
  },

  考古学者: {
    skills: {
      "考古学": 70,
      "歴史": 60,
      "図書館": 60,
      "目星": 40
    }
  },

  司書: {
    skills: {
      "図書館": 80,
      "コンピューター": 40,
      "母国語": 60,
      "目星": 40
    }
  },

  宗教家: {
    skills: {
      "説得": 60,
      "心理学": 50,
      "歴史": 40,
      "図書館": 40
    }
  },

  犯罪者: {
    skills: {
      "隠れる": 60,
      "忍び歩き": 60,
      "言いくるめ": 50,
      "鍵開け": 50,
      "回避": 50
    }
  },

  私立探偵: {
    skills: {
      "目星": 70,
      "聞き耳": 60,
      "図書館": 60,
      "追跡": 50,
      "心理学": 50
    }
  },

  無職: {
    skills: {
      "目星": 30,
      "聞き耳": 30,
      "図書館": 30
    }
  }
};

const occupationSelect =
  document.getElementById("occupation");

const ageAdjustmentMessage =
  document.getElementById("ageAdjustmentMessage");

occupationSelect.addEventListener("change", () => {
  const occupation = occupationSelect.value;
  const data = occupationData[occupation];

  if (!data) {
    return;
  }

  Object.entries(data.skills).forEach(([skillName, skillValue]) => {
    addOrUpdateSkill(skillName, skillValue);
  });
});

ageInput.addEventListener("input", updateAgeAdjustment);

function updateAgeAdjustment() {
  const age = Number(ageInput.value);

  if (!age) {
    ageAdjustmentMessage.textContent = "";
    return;
  }

  if (age >= 15 && age <= 19) {
    ageAdjustmentMessage.textContent =
      "年齢補正：STRまたはSIZに調整が発生する可能性があります。EDUにも年齢による補正があります。";
  } else if (age >= 20 && age <= 39) {
    ageAdjustmentMessage.textContent =
      "年齢補正：通常の成人年齢区分です。";
  } else if (age >= 40 && age <= 49) {
    ageAdjustmentMessage.textContent =
      "年齢補正：DEX・CONなどに年齢による減少が発生する場合があります。EDUの増加判定があります。";
  } else if (age >= 50 && age <= 59) {
    ageAdjustmentMessage.textContent =
      "年齢補正：身体能力の減少とEDUの増加判定を確認してください。";
  } else if (age >= 60) {
    ageAdjustmentMessage.textContent =
      "年齢補正：身体能力の減少とEDUの増加判定を確認してください。";
  } else {
    ageAdjustmentMessage.textContent =
      "年齢は15歳以上を入力してください。";
  }
}

const abilityNames = [
  "STR",
  "CON",
  "POW",
  "DEX",
  "APP",
  "SIZ",
  "INT",
  "EDU"
];

const additionalNames = [
  "hp",
  "san",
  "mp",
  "luck"
];

const defaultSkills = [
  "目星",
  "聞き耳",
  "図書館",
  "回避",
  "隠れる",
  "忍び歩き",
  "応急手当",
  "精神分析",
  "説得",
  "言いくるめ",
  "信用",
  "心理学",
  "こぶし",
  "キック",
  "組み付き",
  "投擲",
  "拳銃",
  "ライフル",
  "コンピューター"
];

let characters = loadCharacters();

function getNumberValue(id) {
  const element = document.getElementById(id);
  return Number(element.value) || 0;
}

function setNumberValue(id, value) {
  const element = document.getElementById(id);

  if (element) {
    element.value = value ?? 0;
  }
}

function addSkillRow(name = "", value = 0) {
  const row = document.createElement("div");
  row.className = "skill-row";

  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.placeholder = "技能名";
  nameInput.className = "skill-name";
  nameInput.value = name;

  const valueInput = document.createElement("input");
  valueInput.type = "number";
  valueInput.min = "0";
  valueInput.max = "100";
  valueInput.className = "skill-value";
  valueInput.value = value;

  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.className = "remove-skill";
  removeButton.textContent = "削除";

  removeButton.addEventListener("click", () => {
    row.remove();
  });

  row.appendChild(nameInput);
  row.appendChild(valueInput);
  row.appendChild(removeButton);

  skillList.appendChild(row);
}

function addOrUpdateSkill(skillName, skillValue) {
  const rows = document.querySelectorAll(".skill-row");

  for (const row of rows) {
    const nameInput = row.querySelector(".skill-name");

    if (nameInput.value.trim() === skillName) {
      const valueInput = row.querySelector(".skill-value");
      valueInput.value = skillValue;
      return;
    }
  }

  addSkillRow(skillName, skillValue);
}

function getSkills() {
  const rows = document.querySelectorAll(".skill-row");
  const skills = {};

  rows.forEach((row) => {
    const name = row.querySelector(".skill-name").value.trim();
    const value = Number(row.querySelector(".skill-value").value) || 0;

    if (name !== "") {
      skills[name] = value;
    }
  });

  return skills;
}

function getCharacterFromForm() {
  const abilities = {};
  const additional = {};

  abilityNames.forEach((name) => {
    abilities[name] = getNumberValue(name);
  });

  additionalNames.forEach((name) => {
    additional[name] = getNumberValue(name);
  });

  return {
    id: crypto.randomUUID
      ? crypto.randomUUID()
      : String(Date.now()),

    name: characterNameInput.value.trim() || "名前未設定",
    playerName: playerNameInput.value.trim(),
    age: Number(ageInput.value) || 0,
    gender: genderInput.value.trim(),
    occupation: occupationInput.value.trim(),
    birthplace: birthplaceInput.value.trim(),

    abilities,
    additional,
    skills: getSkills(),

    notes: document.getElementById("notes").value,

    updatedAt: new Date().toISOString()
  };
}

function saveCharacters() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(characters));
}

function loadCharacters() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch (error) {
    console.error("キャラクターデータの読み込みに失敗しました", error);
    return [];
  }
}

function saveCharacter() {
  const character = getCharacterFromForm();

  characters.push(character);
  saveCharacters();
  displayCharacters();

  message.textContent = `「${character.name}」を保存しました。`;
}

function loadCharacterToForm(character) {
  characterNameInput.value = character.name || "";
  playerNameInput.value = character.playerName || "";
  ageInput.value = character.age || "";
  genderInput.value = character.gender || "";
  occupationInput.value = character.occupation || "";
  birthplaceInput.value = character.birthplace || "";

  abilityNames.forEach((name) => {
    setNumberValue(name, character.abilities?.[name]);
  });

  additionalNames.forEach((name) => {
    setNumberValue(name, character.additional?.[name]);
  });

  document.getElementById("notes").value = character.notes || "";

  skillList.innerHTML = "";

  const skills = character.skills || {};

  Object.entries(skills).forEach(([name, value]) => {
    addSkillRow(name, value);
  });

  message.textContent = `「${character.name}」を読み込みました。`;
}

function displayCharacters() {
  characterList.innerHTML = "";

  if (characters.length === 0) {
    characterList.textContent = "保存されているキャラクターはありません。";
    return;
  }

  characters.forEach((character) => {
    const item = document.createElement("div");
    item.className = "saved-character";

    const name = document.createElement("span");
    name.textContent = character.name;

    const loadButton = document.createElement("button");
    loadButton.type = "button";
    loadButton.textContent = "読み込む";

    loadButton.addEventListener("click", () => {
      loadCharacterToForm(character);
    });

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "削除";

    deleteButton.addEventListener("click", () => {
      const confirmed = confirm(
        `「${character.name}」を削除しますか？`
      );

      if (!confirmed) {
        return;
      }

      characters = characters.filter(
        (item) => item.id !== character.id
      );

      saveCharacters();
      displayCharacters();

      message.textContent = "キャラクターを削除しました。";
    });

    item.appendChild(name);
    item.appendChild(loadButton);
    item.appendChild(deleteButton);

    characterList.appendChild(item);
  });
}

function clearForm() {
  characterNameInput.value = "";
  playerNameInput.value = "";
  ageInput.value = "";
  genderInput.value = "";
  occupationInput.value = "";
  birthplaceInput.value = "";

  abilityNames.forEach((name) => {
    setNumberValue(name, 50);
  });

  additionalNames.forEach((name) => {
    setNumberValue(name, 0);
  });

  document.getElementById("notes").value = "";

  skillList.innerHTML = "";

  defaultSkills.forEach((skillName) => {
    addSkillRow(skillName, 0);
  });

  message.textContent = "入力内容をクリアしました。";
}

/* ボタン設定 */
document
  .getElementById("addSkillButton")
  .addEventListener("click", () => {
    addSkillRow();
  });

document
  .getElementById("saveButton")
  .addEventListener("click", saveCharacter);

document
  .getElementById("loadButton")
  .addEventListener("click", () => {
    characters = loadCharacters();
    displayCharacters();

    message.textContent = "保存データを読み込みました。";
  });

document
  .getElementById("clearButton")
  .addEventListener("click", clearForm);

/* 初期表示 */
clearForm();
displayCharacters();

/* 既存のダイス画面と同じダークモード設定を使用 */
const savedTheme = localStorage.getItem("trpgDiceTheme");

if (savedTheme === "dark") {
  document.body.classList.add("dark-mode");
}
