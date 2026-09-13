/*
=========================================
ParseResult.js
ダイス記法の解析結果
=========================================
*/

export class ParseResult {

    /**
     * @param {Object} options
     * @param {string} options.originalText
     * @param {string} options.normalizedText
     * @param {Array} options.tokens
     */

    constructor({

        originalText = "",

        normalizedText = "",

        tokens = []

    } = {}) {

        this.originalText = originalText;

        this.normalizedText = normalizedText;

        this.tokens = tokens;

        Object.freeze(this.tokens);

        Object.freeze(this);

    }

    /**
     * トークン数
     */
    get tokenCount() {

        return this.tokens.length;

    }

    /**
     * ダイスを含むか
     */
    get hasDice() {

        return this.tokens.some(
            token => token.isDice
        );

    }

    /**
     * 固定値を含むか
     */
    get hasNumber() {

        return this.tokens.some(
            token => token.isNumber
        );

    }

}
