/*
=========================================
DiceEngine.js
ダイスを実際に振るサービス
=========================================
*/

import { Dice } from "../entities/Dice.js";
import { DiceResult } from "../entities/DiceResult.js";
import { RandomGenerator } from "./RandomGenerator.js";

export class DiceEngine {

    /**
     * @param {RandomGenerator} randomGenerator 乱数生成サービス
     */
    constructor(randomGenerator = new RandomGenerator()) {

        this.randomGenerator = randomGenerator;

    }

    /**
     * ParseResultをもとにダイスを振る
     *
     * @param {ParseResult} parseResult
     * @returns {DiceResult}
     */
    roll(parseResult) {

        if (
            !parseResult ||
            !Array.isArray(parseResult.tokens)
        ) {
            throw new Error(
                "ParseResultを指定してください。"
            );
        }

        const result = new DiceResult(
            parseResult.originalText
        );

        for (const token of parseResult.tokens) {

            /*
            -----------------------------
            ダイストークンの場合
            -----------------------------
            */
            if (token.isDice) {

                for (let i = 0; i < token.count; i++) {

                    const value =
                        this.randomGenerator.rollDice(
                            token.sides
                        );

                    const dice = new Dice(
                        value,
                        token.sides,
                        token.sign
                    );

                    result.addDice(dice);

                }

            /*
            -----------------------------
            数値トークンの場合
            -----------------------------
            */
            } else if (token.isNumber) {

                const modifier =
                    token.value * token.sign;

                result.addModifier(modifier);

            } else {

                throw new Error(
                    "未知のトークンが含まれています。"
                );

            }

        }

        return result;

    }

}
