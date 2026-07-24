/*
=========================================
RandomGenerator.js
乱数生成サービス
=========================================
*/

export class RandomGenerator {

    /**
     * @param {Function|null} randomFunction
     * Math.random互換の関数を指定可能
     */
    constructor(randomFunction = null) {

        this.randomFunction = randomFunction ?? Math.random;

    }

    /**
     * 0～1未満の乱数
     */
    next() {

        return this.randomFunction();

    }

    /**
     * min～max
     */
    nextInt(min, max) {

        if (!Number.isInteger(min) || !Number.isInteger(max)) {

            throw new Error("整数を指定してください。");

        }

        if (min > max) {

            throw new Error("minはmax以下である必要があります。");

        }

        return Math.floor(

            this.next() * (max - min + 1)

        ) + min;

    }

    /**
     * ダイス
     */
    rollDice(sides) {

        if (!Number.isInteger(sides)) {

            throw new Error("面数は整数で指定してください。");

        }

        if (sides < 2) {

            throw new Error("面数は2以上です。");

        }

        return this.nextInt(1, sides);

    }

    /**
     * 複数ダイス
     */
    rollDiceMultiple(count, sides) {

        if (!Number.isInteger(count)) {

            throw new Error("ダイス数は整数です。");

        }

        if (count < 1) {

            throw new Error("ダイス数は1以上です。");

        }

        const values = [];

        for (let i = 0; i < count; i++) {

            values.push(

                this.rollDice(sides)

            );

        }

        return values;

    }

}
