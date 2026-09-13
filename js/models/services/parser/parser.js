/*
=========================================
Parser.js
ダイス記法解析サービス
=========================================
*/

import { Tokenizer } from "./Tokenizer.js";

import { Validator } from "./Validator.js";

import { RollToken } from "./RollToken.js";

import { ParseResult } from "../../entities/ParseResult.js";


export class Parser {

    constructor() {

        this.tokenizer = new Tokenizer();

        this.validator = new Validator();

    }

    /**
     * ダイス記法を解析する
     *
     * @param {string} text
     * @returns {ParseResult}
     */

    parse(text) {

        if (typeof text !== "string") {

            throw new Error("文字列を入力してください。");

        }

        const originalText = text;

        /*
        ------------------------------
        Tokenizer
        ------------------------------
        */

        const rawTokens =
            this.tokenizer.tokenize(text);

        /*
        ------------------------------
        Validator
        ------------------------------
        */

        this.validator.validate(rawTokens);

        /*
        ------------------------------
        RollToken生成
        ------------------------------
        */

        const tokens = [];

        for (const raw of rawTokens) {

            const sign =
                raw.sign === "-" ? -1 : 1;

            const value =
                raw.value.toLowerCase();

            /*
            --------------------------
            ダイス
            --------------------------
            */

            if (value.includes("d")) {

                const parts = value.split("d");

                const count = Number(parts[0]);

                const sides = Number(parts[1]);

                tokens.push(

                    new RollToken({

                        type: "dice",

                        sign: sign,

                        count: count,

                        sides: sides

                    })

                );

            }

            /*
            --------------------------
            固定値
            --------------------------
            */

            else {

                tokens.push(

                    new RollToken({

                        type: "number",

                        sign: sign,

                        value: Number(value)

                    })

                );

            }

        }

        /*
        ------------------------------
        正規化文字列
        ------------------------------
        */

        const normalizedText = tokens
            .map(token => {

                const sign =
                    token.sign === -1 ? "-" : "+";

                if (token.isDice) {

                    return (
                        sign +
                        token.count +
                        "d" +
                        token.sides
                    );

                }

                return sign + token.value;

            })
            .join("");

        /*
        ------------------------------
        ParseResult生成
        ------------------------------
        */

        return new ParseResult({

            originalText: originalText,

            normalizedText: normalizedText,

            tokens: tokens

        });

    }

}
