/*
=========================================
Parser.js
=========================================
*/

import {Tokenizer} from "./Tokenizer.js";
import {Validator} from "./Validator.js";
import {RollToken} from "./RollToken.js";

export class Parser{

    constructor(){

        this.tokenizer =
            new Tokenizer();

        this.validator =
            new Validator();

    }

    parse(text){

        const rawTokens =
            this.tokenizer.tokenize(text);

        this.validator.validate(rawTokens);

        const tokens=[];

        for(const raw of rawTokens){

            const sign =
                raw.sign==="-" ? -1 : 1;

            if(raw.value.includes("d")){

                const parts =
                    raw.value.split("d");

                tokens.push(

                    new RollToken({

                        type:"dice",

                        sign:sign,

                        count:Number(parts[0]),

                        sides:Number(parts[1])

                    })

                );

            }

            else{

                tokens.push(

                    new RollToken({

                        type:"number",

                        sign:sign,

                        value:Number(raw.value)

                    })

                );

            }

        }

        return tokens;

    }

}
