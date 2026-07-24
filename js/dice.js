/*
=========================================
 dice.js
 共通ダイスエンジン
=========================================
*/

class DiceEngine {

    constructor() {

        this.version = "1.0.0";

    }

    /*
    ------------------------------
    ランダム
    ------------------------------
    */

    random(max) {

        return Math.floor(Math.random() * max) + 1;

    }

    /*
    ------------------------------
    パース済みデータをロール
    ------------------------------
    */

    roll(parsedData) {

        const result = {

            formula: parsedData.original,

            total: 0,

            diceResults: [],

            modifier: 0,

            critical: false,

            fumble: false,

            maxValue: false,

            minValue: false

        };

        let allMax = true;
        let allMin = true;

        for (const token of parsedData.tokens) {

            /*
            ------------------
            ダイス
            ------------------
            */

            if (token.type === "dice") {

                const dice = {

                    count: token.count,

                    sides: token.sides,

                    sign: token.sign,

                    values: []

                };

                for (let i = 0; i < token.count; i++) {

                    const value = this.random(token.sides);

                    dice.values.push(value);

                    result.total += value * token.sign;

                }

                result.diceResults.push(dice);

            }

            /*
            ------------------
            固定値
            ------------------
            */

            else {

                result.modifier += token.value * token.sign;

                result.total += token.value * token.sign;

            }

        }

        /*
        ------------------------------
        最大・最小判定
        ------------------------------
        */

        for (const dice of result.diceResults) {

            for (const value of dice.values) {

                if (value !== dice.sides)
                    allMax = false;

                if (value !== 1)
                    allMin = false;

            }

        }

        result.maxValue = allMax;
        result.minValue = allMin;

        /*
        ------------------------------
        通常ルール
        ------------------------------
        */

        if (result.maxValue)
            result.critical = true;

        if (result.minValue)
            result.fumble = true;

        /*
        ------------------------------
        CoC d100判定用
        ------------------------------
        */

        if (
            result.diceResults.length === 1 &&
            result.diceResults[0].count === 1 &&
            result.diceResults[0].sides === 100
        ) {

            const value = result.diceResults[0].values[0];

            result.coc = {

                value: value,

                critical: value <= 5,

                fumble: value >= 96

            };

        }

        return result;

    }

}

/*
=========================================
グローバル
=========================================
*/

const diceEngine = new DiceEngine();
