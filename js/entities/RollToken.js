/*
=========================================
RollToken.js
Parserが生成するトークン
=========================================
*/

export class RollToken {

    constructor(type, sign, value = null, count = null, sides = null) {

        this.type = type;

        this.sign = sign;

        this.value = value;

        this.count = count;

        this.sides = sides;

        Object.freeze(this);

    }

    get isDice() {

        return this.type === "dice";

    }

    get isNumber() {

        return this.type === "number";

    }

}
