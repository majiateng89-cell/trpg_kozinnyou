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
