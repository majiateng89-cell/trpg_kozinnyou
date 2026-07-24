/*
=========================================
Validator.js
入力検査
=========================================
*/

export class Validator {

    constructor() {

        this.maxDice = 1000;
        this.maxSides = 1000;

    }

    validate(tokens) {

        for (const token of tokens) {

            if (token.value.includes("d")) {

                const parts = token.value.split("d");

                const count = Number(parts[0]);
                const sides = Number(parts[1]);

                if (!Number.isInteger(count)) {

                    throw new Error("ダイス数が不正です。");

                }

                if (!Number.isInteger(sides)) {

                    throw new Error("面数が不正です。");

                }

                if (count < 1) {

                    throw new Error("ダイス数は1以上です。");

                }

                if (count > this.maxDice) {

                    throw new Error("ダイス数が多すぎます。");

                }

                if (sides < 2) {

                    throw new Error("面数は2以上です。");

                }

                if (sides > this.maxSides) {

                    throw new Error("面数が大きすぎます。");

                }

            }

            else {

                const value = Number(token.value);

                if (!Number.isFinite(value)) {

                    throw new Error("数値が不正です。");

                }

            }

        }

    }

}
