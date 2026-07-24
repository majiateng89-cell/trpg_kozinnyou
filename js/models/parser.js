/*
=========================================
 parser.js
 ダイス記法解析
=========================================
*/

class DiceParser {

    constructor() {

        // 最大ダイス数
        this.maxDice = 1000;

        // 最大面数
        this.maxSides = 1000;

    }

    /**
     * ダイス式を解析する
     * @param {string} text
     * @returns {Object}
     */
    parse(text) {

        if (!text)
            throw new Error("入力してください。");

        // 空白削除
        text = text.replace(/\s+/g, "");

        // d6 → 1d6
        text = text.replace(/(^|[+\-])d/gi, "$11d");

        // 先頭が+や-で始まらないなら+
        if (!/^[+\-]/.test(text))
            text = "+" + text;

        const regex = /([+\-])(\d*d\d+|\d+)/gi;

        const tokens = [];

        let match;

        while ((match = regex.exec(text)) !== null) {

            const sign = match[1] === "-" ? -1 : 1;

            const value = match[2];

            if (value.includes("d")) {

                const parts = value.split("d");

                const count = parseInt(parts[0]);

                const sides = parseInt(parts[1]);

                if (count < 1)
                    throw new Error("ダイス数が不正です");

                if (count > this.maxDice)
                    throw new Error("ダイス数が多すぎます");

                if (sides < 2)
                    throw new Error("面数は2以上です");

                if (sides > this.maxSides)
                    throw new Error("面数が大きすぎます");

                tokens.push({

                    type: "dice",

                    sign,

                    count,

                    sides

                });

            }

            else {

                tokens.push({

                    type: "number",

                    sign,

                    value: parseInt(value)

                });

            }

        }

        return {

            original: text,

            tokens

        };

    }

}

/*
=========================================
 グローバル生成
=========================================
*/

class DiceParser {

}
