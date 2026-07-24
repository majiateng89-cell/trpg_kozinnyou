class Dice{

    constructor(value,sides,sign){

        this.value=value;

        this.sides=sides;

        this.sign=sign;

    }

    get max(){

        return this.value===this.sides;

    }

    get min(){

        return this.value===1;

    }

}
