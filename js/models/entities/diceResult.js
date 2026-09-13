/*
=========================================
DiceResult.js
1回のロール結果
=========================================
*/

export class DiceResult {

    constructor(formula = "") {

        this.formula = formula;

        this.timestamp = new Date();

        this.dice = [];

        this.modifier = 0;

        this.systemResult = null;

    }

    addDice(dice) {

        this.dice.push(dice);

    }

    addModifier(value) {

        this.modifier += value;

    }

    get diceTotal() {

        return this.dice.reduce(
            (sum, dice) => sum + dice.signedValue,
            0
        );

    }

    get total() {

        return this.diceTotal + this.modifier;

    }

    get diceCount() {

        return this.dice.length;

    }

    get maxCount() {

        return this.dice.filter(d => d.isMax).length;

    }

    get minCount() {

        return this.dice.filter(d => d.isMin).length;

    }

    get isCritical() {

        return (
            this.dice.length > 0 &&
            this.maxCount === this.dice.length
        );

    }

    get isFumble() {

        return (
            this.dice.length > 0 &&
            this.minCount === this.dice.length
        );

    }

}
