/*
=========================================
app.js
アプリケーションの起動処理
=========================================
*/

import { Parser } from "./models/services/parser/Parser.js";
import { DiceEngine } from "./models/services/DiceEngine.js";
import { CoC7Judge } from "./models/services/CoC7Judge.js";


/*
=========================================
サービスの初期化
=========================================
*/

const parser = new Parser();
const diceEngine = new DiceEngine();
const coc7Judge = new CoC7Judge();


/*
=========================================
履歴管理
=========================================
*/

const STORAGE_KEY = "trpgDiceHistory";

const MAX_HISTORY_COUNT = 20;

let history = loadHistory();

// =========================================
// 保存データ
// =========================================

const SKILL_STORAGE_KEY =
    "trpgDiceSkills";

let savedSkills = [];

/*
=========================================
HTML要素の取得
=========================================
*/

const diceNotationInput =
    document.getElementById("diceNotation");

const rollButton =
    document.getElementById("rollButton");

const diceArea =
    document.getElementById("diceArea");

const modifierArea =
    document.getElementById("modifierArea");

const totalArea =
    document.getElementById("totalArea");

const judgeArea =
    document.getElementById("judgeArea");

const historyList =
    document.getElementById("historyList");

const clearHistoryButton =
    document.getElementById("clearHistoryButton");

const statisticsArea =
    document.getElementById("statisticsArea");

const saveFavoriteButton =
    document.getElementById("saveFavorite");

const favoriteList =
    document.getElementById("favoriteList");

const gameSystemSelect =
    document.getElementById("gameSystem");

const skillValueInput =
    document.getElementById("skillValue");

const coc7Area =
    document.getElementById("coc7Area");

const animationCheckbox =
    document.getElementById("animation");

const saveSkillButton =
    document.getElementById("saveSkillButton");

const savedSkillList =
    document.getElementById("savedSkillList");

const themeToggle = document.getElementById("themeToggle");
/*
=========================================
ゲームシステムの表示切り替え
=========================================
*/

function updateGameSystemDisplay() {

    if (gameSystemSelect.value === "coc7") {

        coc7Area.style.display = "block";

    } else {

        coc7Area.style.display = "none";

    }

}

/*
=========================================
ダイスを振る処理
=========================================
*/

function rollDice() {

    try {

        const notation =
            diceNotationInput.value;

        const parseResult =
            parser.parse(notation);

        const result =
            diceEngine.roll(parseResult);

        if (gameSystemSelect.value === "coc7") {

            const skillValue =
            Number(skillValueInput.value);

            const d100Dice =
            result.dice.find(
                dice => dice.sides === 100
            );

        if (!d100Dice) {

            throw new Error(
                "CoC第7版では1d100を使用してください。"
            );

        }

        const judgeResult =
            coc7Judge.judge(
                d100Dice.value,
                skillValue
        );

        result.systemResult =
            judgeResult;

        judgeArea.textContent =
            `${judgeResult.label} ` +
            `（技能値: ${skillValue}、出目: ${d100Dice.value}）`;

        }

        displayResult(result);

        addHistory(result);

        displayHistory();

    } catch (error) {

        alert(error.message);

        clearResult();

    }

}


/*
=========================================
現在の結果を表示
=========================================
*/

function displayResult(result) {

    // ダイス表示
    diceArea.innerHTML = result.dice
        .map(dice => {

            let className = "dice";

            // アニメーションのON/OFF
            if (
                animationCheckbox &&
                animationCheckbox.checked
            ) {
                className += " dice-animation";
            }

            // CoC第7版の色分け
            if (result.systemResult) {

                const judgeType =
                    result.systemResult.type;

                if (judgeType === "critical") {
                    className += " dice-critical";

                } else if (judgeType === "fumble") {
                    className += " dice-fumble";

                } else if (
                    result.systemResult.success
                ) {
                    className += " dice-success";

                } else {
                    className += " dice-failure";
                }

            } else {

                // 通常ロールの色分け
                if (dice.isMax) {
                    className += " dice-critical";

                } else if (dice.isMin) {
                    className += " dice-fumble";
                }
            }

            return `
                <span class="${className}">
                    ${dice.value}
                </span>
            `;
        })
        .join("");


    // 修正値を表示
    modifierArea.textContent =
        `修正値：${result.modifier}`;


    // 合計値を表示
    totalArea.textContent =
        `合計：${result.total}`;


    // 判定結果を表示
    judgeArea.className = "";

    if (result.systemResult) {

        const judge =
            result.systemResult;

        judgeArea.textContent =
            `判定結果：${judge.label}`;

        judgeArea.classList.add(
            `judge-${judge.type}`
        );

    } else if (result.isCritical) {

        judgeArea.textContent =
            "クリティカル";

        judgeArea.classList.add(
            "judge-critical"
        );

    } else if (result.isFumble) {

        judgeArea.textContent =
            "ファンブル";

        judgeArea.classList.add(
            "judge-fumble"
        );

    } else {

        judgeArea.textContent = "";
    }
}

/*
=========================================
履歴を追加
=========================================
*/

function addHistory(result) {

    const historyData = {

        formula: result.formula,

        timestamp: result.timestamp.toISOString(),

        diceValues: result.dice.map(
            dice => dice.signedValue
        ),

        modifier: result.modifier,

        total: result.total,

        isCritical: result.isCritical,

        isFumble: result.isFumble

    };

    history.unshift(historyData);

    if (history.length > MAX_HISTORY_COUNT) {

        history.pop();

    }

    saveHistory();

}


/*
=========================================
履歴を画面に表示
=========================================
*/

function displayHistory() {

    historyList.innerHTML = "";

    if (history.length === 0) {

        const emptyItem =
            document.createElement("li");

        emptyItem.textContent =
            "まだ履歴がありません。";

        historyList.appendChild(emptyItem);

        return;

    }

    for (const item of history) {

        const historyItem =
            document.createElement("li");

        const date =
            new Date(item.timestamp);

        const time =
            date.toLocaleTimeString(
                "ja-JP",
                {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit"
                }
            );

        const diceValues =
            item.diceValues.join(", ");

        historyItem.textContent =
            `${time}｜${item.formula}｜` +
            `出目: [${diceValues}]｜` +
            `修正値: ${item.modifier}｜` +
            `合計: ${item.total}`;

        if (item.isCritical) {

            historyItem.textContent +=
                "｜クリティカル";

        } else if (item.isFumble) {

            historyItem.textContent +=
                "｜ファンブル";

        }

        historyList.appendChild(historyItem);

    }

    displayStatistics();

}

/*
=========================================
技能値を保存する関数を追加
=========================================
*/

function saveCurrentSkill() {

    const skillValue =
        Number(skillValueInput.value);

    if (
        !Number.isInteger(skillValue) ||
        skillValue < 1 ||
        skillValue > 100
    ) {
        alert(
            "技能値は1～100の整数で入力してください。"
        );

        return;
    }

    if (savedSkills.includes(skillValue)) {

        alert(
            "その技能値はすでに保存されています。"
        );

        return;
    }

    savedSkills.push(skillValue);

    saveSkills();

    displaySavedSkills();
}

/*
=========================================
技能値を保存する関数
=========================================
*/

function saveSkills() {

    localStorage.setItem(
        SKILL_STORAGE_KEY,
        JSON.stringify(savedSkills)
    );
}

/*
=========================================
技能値を読み込む関数
=========================================
*/

function loadSkills() {

    const savedData =
        localStorage.getItem(
            SKILL_STORAGE_KEY
        );

    if (savedData === null) {
        return [];
    }

    try {

        const parsedData =
            JSON.parse(savedData);

        if (!Array.isArray(parsedData)) {
            return [];
        }

        return parsedData.filter(
            value =>
                Number.isInteger(value) &&
                value >= 1 &&
                value <= 100
        );

    } catch (error) {

        console.error(
            "技能値の読み込みに失敗しました。",
            error
        );

        return [];
    }
}

/*
=========================================
保存した技能値を画面に表示
=========================================
*/

function displaySavedSkills() {

    if (!savedSkillList) {
        return;
    }

    savedSkillList.innerHTML = "";

    if (savedSkills.length === 0) {

        savedSkillList.textContent =
            "保存された技能値はありません。";

        return;
    }

    savedSkills.forEach(skillValue => {

        const container =
            document.createElement("span");

        const useButton =
            document.createElement("button");

        useButton.textContent =
            `技能値 ${skillValue}`;

        useButton.addEventListener(
            "click",
            () => {

                skillValueInput.value =
                    skillValue;
            }
        );


        const deleteButton =
            document.createElement("button");

        deleteButton.textContent =
            "削除";

        deleteButton.addEventListener(
            "click",
            () => {

                removeSkill(skillValue);
            }
        );

        container.appendChild(useButton);
        container.appendChild(deleteButton);

        savedSkillList.appendChild(container);
    });
}

/*
=========================================
保存した技能値を削除する関数
=========================================
*/

function removeSkill(skillValue) {

    savedSkills =
        savedSkills.filter(
            value => value !== skillValue
        );

    saveSkills();

    displaySavedSkills();
}

/*
=========================================
統計情報を表示
=========================================
*/

function displayStatistics() {

    statisticsArea.innerHTML = "";

    if (history.length === 0) {

        statisticsArea.textContent =
            "まだ統計情報がありません。";

        return;

    }

    /*
    -----------------------------
    基本データの集計
    -----------------------------
    */

    const rollCount =
        history.length;

    /*
    -----------------------------
    クリティカル・ファンブル数
    -----------------------------
    */

    const criticalCount =
        history.filter(
            item => item.isCritical
        ).length;

    const fumbleCount =
        history.filter(
            item => item.isFumble
        ).length;

    /*
    -----------------------------
    表示する統計情報
    -----------------------------
    */

    const statisticsList =
        document.createElement("ul");

    const statistics = [

        `ロール回数: ${rollCount}回`,

        `クリティカル回数: ${criticalCount}回`,

        `ファンブル回数: ${fumbleCount}回`

    ];

    for (const text of statistics) {

        const item =
            document.createElement("li");

        item.textContent = text;

        statisticsList.appendChild(item);

    }

    statisticsArea.appendChild(
        statisticsList
    );

}

/*
=========================================
履歴をlocalStorageへ保存
=========================================
*/

function saveHistory() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(history)
    );

}


/*
=========================================
localStorageから履歴を読み込む
=========================================
*/

function loadHistory() {

    const savedHistory =
        localStorage.getItem(STORAGE_KEY);

    if (!savedHistory) {

        return [];

    }

    try {

        const parsedHistory =
            JSON.parse(savedHistory);

        if (!Array.isArray(parsedHistory)) {

            return [];

        }

        return parsedHistory;

    } catch (error) {

        console.error(
            "履歴の読み込みに失敗しました。",
            error
        );

        return [];

    }

}


/*
=========================================
履歴をすべて削除
=========================================
*/

function clearHistory() {

    history = [];

    localStorage.removeItem(STORAGE_KEY);

    displayHistory();

}


/*
=========================================
結果表示を消去
=========================================
*/

function clearResult() {

    diceArea.innerHTML = "";

    modifierArea.textContent = "";

    totalArea.textContent = "";

    judgeArea.textContent = "";

}

/*
=========================================
お気に入り管理
=========================================
*/

const FAVORITE_STORAGE_KEY =
    "trpgDiceFavorites";

const DEFAULT_FAVORITES = [
    "1d100",
    "1d6",
    "2d100",
    "2d6"
];

let favorites = [];

/*
=========================================
お気に入りを保存
=========================================
*/

function saveFavorites() {

    localStorage.setItem(
        FAVORITE_STORAGE_KEY,
        JSON.stringify(favorites)
    );

}

/*
=========================================
お気に入りを読み込む
=========================================
*/

function loadFavorites() {

    const savedFavorites =
        localStorage.getItem(
            FAVORITE_STORAGE_KEY
        );

    // 保存データがない場合
    if (savedFavorites === null) {

        return [
            ...DEFAULT_FAVORITES
        ];
    }

    try {

        const parsedFavorites =
            JSON.parse(savedFavorites);

        if (!Array.isArray(parsedFavorites)) {

            return [
                ...DEFAULT_FAVORITES
            ];
        }

        // 保存済みデータをそのまま使用する
        return [
            ...new Set(parsedFavorites)
        ];

    } catch (error) {

        console.error(
            "お気に入りの読み込みに失敗しました。",
            error
        );

        return [
            ...DEFAULT_FAVORITES
        ];
    }
}

/*
=========================================
お気に入りを表示
=========================================
*/

function displayFavorites() {

    favoriteList.innerHTML = "";

    if (favorites.length === 0) {

        favoriteList.textContent =
            "お気に入りがありません。";

        return;

    }

    for (const favorite of favorites) {

        const favoriteItem =
            document.createElement("div");

        favoriteItem.classList.add(
            "favorite-item"
        );

        const selectButton =
            document.createElement("button");

        selectButton.textContent =
            favorite;

        selectButton.addEventListener(
            "click",
            () => {

                diceNotationInput.value =
                    favorite;

            }
        );

        const deleteButton =
            document.createElement("button");

        deleteButton.textContent =
            "削除";

        deleteButton.addEventListener(
            "click",
            () => {

                removeFavorite(favorite);

            }
        );

        favoriteItem.appendChild(
            selectButton
        );

        favoriteItem.appendChild(
            deleteButton
        );

        favoriteList.appendChild(
            favoriteItem
        );

    }

}

/*
=========================================
お気に入りを追加
=========================================
*/

function addFavorite() {

    const notation =
        diceNotationInput.value.trim();

    if (notation === "") {

        alert("お気に入りに追加する記法を入力してください。");

        return;

    }

    try {

        /*
        不正な記法を登録しないように検証する
        */

        parser.parse(notation);

    } catch (error) {

        alert(error.message);

        return;

    }

    if (favorites.includes(notation)) {

        alert("その記法はすでにお気に入りに登録されています。");

        return;

    }

    favorites.push(notation);

    saveFavorites();

    displayFavorites();

}

/*
=========================================
お気に入りを削除
=========================================
*/

function removeFavorite(notation) {

    favorites =
        favorites.filter(
            favorite => favorite !== notation
        );

    saveFavorites();

    displayFavorites();

}


/*
=========================================
イベント登録
=========================================
*/

rollButton.addEventListener(
    "click",
    rollDice
);

clearHistoryButton.addEventListener(
    "click",
    clearHistory
);

saveFavoriteButton.addEventListener(
    "click",
    addFavorite
);

gameSystemSelect.addEventListener(
    "change",
    updateGameSystemDisplay
);

if (saveSkillButton) {
    saveSkillButton.addEventListener(
        "click",
        saveCurrentSkill
    );
}

/*
=========================================
初期表示
=========================================
*/


history = loadHistory();

favorites = loadFavorites();

savedSkills = loadSkills();

displayHistory();

displayFavorites();

displaySavedSkills();

updateGameSystemDisplay();

/*
=========================================
ダークモード初期化
=========================================
*/

const savedTheme = localStorage.getItem("trpgDiceTheme");

if (savedTheme === "dark") {
  document.body.classList.add("dark-mode");
  themeToggle.textContent = "☀️ ライトモード";
} else {
  document.body.classList.remove("dark-mode");
  themeToggle.textContent = "🌙 ダークモード";
}

/*
=========================================
ボタンのクリック処理
=========================================
*/

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  const isDarkMode = document.body.classList.contains("dark-mode");

  if (isDarkMode) {
    themeToggle.textContent = "☀️ ライトモード";
    localStorage.setItem("trpgDiceTheme", "dark");
  } else {
    themeToggle.textContent = "🌙 ダークモード";
    localStorage.setItem("trpgDiceTheme", "light");
  }
});
