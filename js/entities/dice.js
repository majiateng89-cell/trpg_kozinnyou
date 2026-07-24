/*
=========================================
Dice.js
ダイス1個を表すエンティティ
=========================================
*/

export class Dice {

    /**
     * @param {number} value 出目
     * @param {number} sides 面数
     * @param {number} sign +1 または -1
     */
    constructor(value, sides, sign = 1) {

        this._value = value;
        this._sides = sides;
        this._sign = sign;

        Object.freeze(this);
    }

    get value() {
        return this._value;
    }

    get sides() {
        return this._sides;
    }

    get sign() {
        return this._sign;
    }

    get isMax() {
        return this._value === this._sides;
    }

    get isMin() {
        return this._value === 1;
    }

    get signedValue() {
        return this._value * this._sign;
    }

}
