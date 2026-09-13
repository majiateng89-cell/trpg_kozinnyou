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
        解析結果をもとにダイスを振る
        -----------------------------
        */
        const result =
            diceEngine.roll(parseResult);

        /*
        -----------------------------
        結果を画面に表示
        -----------------------------
        */
        displayResult(result);

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

        /*
        最大値の場合
        */
        if (dice.isMax) {

            diceElement.classList.add("max");

        }

        /*
        最小値の場合
        */
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
