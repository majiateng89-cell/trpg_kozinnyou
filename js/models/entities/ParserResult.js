/*
=========================================
Tokenizer.js
ダイス記法をトークンへ分割
=========================================
*/

export class Tokenizer {

    tokenize(text) {

        if (typeof text !== "string") {

            throw new Error("文字列を入力してください。");

        }

        text = text.replace(/\s+/g, "");

        if (text.length === 0) {

            throw new Error("入力してください。");

        }

        // d6 → 1d6
        text = text.replace(/(^|[+\-])d/gi, "$11d");

        // 先頭に符号追加
        if (!/^[+\-]/.test(text)) {

            text = "+" + text;

        }

        const regex = /([+\-])(\d*d\d+|\d+)/gi;

        const tokens = [];

        let match;

        while ((match = regex.exec(text)) !== null) {

            tokens.push({

                sign: match[1],

                value: match[2]

            });

        }

        // 解析漏れ検出
        const joined = tokens
            .map(t => t.sign + t.value)
            .join("");

        if (joined !== text) {

            throw new Error("解釈できない記法があります。");

        }

        return tokens;

    }

}
