/*
=====================================
random.js
=====================================
*/

class RandomGenerator {

    constructor(seed = null){

        this.seed = seed;

    }

    /*
    通常乱数
    */

    next(max){

        return Math.floor(Math.random()*max)+1;

    }

}

const randomGenerator = new RandomGenerator();
