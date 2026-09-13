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

const history = [];

const MAX_HISTORY_COUNT = 20;


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


/*
=========================================
ダイスを振る処理
=========================================
*/

function rollDice() {

    try {

        const notation =
            diceNotationInput.value;

        /*
        -----------------------------
        ダイス記法を解析
        -----------------------------
        */

        const parseResult =
            parser.parse(notation);

        /*
        -----------------------------
        ダイスを振る
        -----------------------------
        */

        const result =
            diceEngine.roll(parseResult);

        /*
        -----------------------------
        結果を表示
        -----------------------------
        */

        displayResult(result);

        /*
        -----------------------------
        履歴に追加
        -----------------------------
        */

        addHistory(result);

        /*
        -----------------------------
        履歴を表示
        -----------------------------
        */

        displayHistory();

    } catch (error) {

        alert(error.message);

        clearResult();

    }

}


/*
=========================================
結果を画面に表示
=========================================
*/

function displayResult(result) {

    /*
    -----------------------------
    ダイスの出目を表示
    -----------------------------
    */

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


    /*
    -----------------------------
    修正値を表示
    -----------------------------
    */

    modifierArea.textContent =
        `修正値: ${result.modifier}`;


    /*
    -----------------------------
    合計値を表示
    -----------------------------
    */

    totalArea.textContent =
        `合計: ${result.total}`;


    /*
    -----------------------------
    クリティカル・ファンブル判定
    -----------------------------
    */

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

    history.unshift(result);

    /*
    履歴が20件を超えた場合、
    古い履歴から削除する
    */

    if (history.length > MAX_HISTORY_COUNT) {

        history.pop();

    }

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

    for (const result of history) {

        const historyItem =
            document.createElement("li");

        const diceValues =
            result.dice
                .map(dice => dice.signedValue)
                .join(", ");

        const time =
            result.timestamp.toLocaleTimeString(
                "ja-JP",
                {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit"
                }
            );

        historyItem.textContent =
            `${time}｜${result.formula}｜` +
            `出目: [${diceValues}]｜` +
            `修正値: ${result.modifier}｜` +
            `合計: ${result.total}`;

        if (result.isCritical) {

            historyItem.textContent +=
                "｜クリティカル";

        } else if (result.isFumble) {

            historyItem.textContent +=
                "｜ファンブル";

        }

        historyList.appendChild(historyItem);

    }

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
ボタンイベントの登録
=========================================
*/

rollButton.addEventListener(
    "click",
    rollDice
);
