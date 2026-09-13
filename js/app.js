/*
=========================================
app.js
アプリケーションの起動処理
=========================================
*/

import { Parser } from "./models/services/parser/Parser.js";
import { DiceEngine } from "./models/services/DiceEngine.js";


/*
=========================================
サービスの初期化
=========================================
*/

const parser = new Parser();
const diceEngine = new DiceEngine();


/*
=========================================
履歴管理
=========================================
*/

const STORAGE_KEY = "trpgDiceHistory";

const MAX_HISTORY_COUNT = 20;

let history = loadHistory();


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

    diceArea.innerHTML = "";

    for (const dice of result.dice) {

        const diceElement =
            document.createElement("span");

        diceElement.classList.add("dice");

        diceElement.textContent =
            dice.signedValue;

        if (dice.isMax) {
            diceElement.classList.add("max");
        }

        if (dice.isMin) {
            diceElement.classList.add("min");
        }

        diceArea.appendChild(diceElement);

    }

    modifierArea.textContent =
        `修正値: ${result.modifier}`;

    totalArea.textContent =
        `合計: ${result.total}`;

    if (result.isCritical) {

        judgeArea.textContent =
            "クリティカル";

    } else if (result.isFumble) {

        judgeArea.textContent =
            "ファンブル";

    } else {

        judgeArea.textContent =
            "";

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

/*
=========================================
初期表示
=========================================
*/

displayHistory();
