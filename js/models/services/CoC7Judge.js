/*
=========================================
CoC7Judge.js
クトゥルフ神話TRPG 第7版の判定サービス
=========================================
*/

export class CoC7Judge {

    /**
     * CoC第7版の技能判定を行う
     *
     * @param {number} rollValue 1d100の出目
     * @param {number} skillValue 技能値
     * @returns {Object} 判定結果
     */
    judge(rollValue, skillValue) {

        if (
            !Number.isInteger(rollValue) ||
            rollValue < 1 ||
            rollValue > 100
        ) {
            throw new Error(
                "出目は1から100の整数で指定してください。"
            );
        }

        if (
            !Number.isInteger(skillValue) ||
            skillValue < 1 ||
            skillValue > 100
        ) {
            throw new Error(
                "技能値は1から100の整数で指定してください。"
            );
        }

        /*
        ---------------------------------
        クリティカル判定
        ---------------------------------
        */

        if (rollValue === 1) {

            return {
                type: "critical",
                label: "クリティカル",
                success: true
            };

        }

        /*
        ---------------------------------
        ファンブル判定
        技能値50未満：96～100
        技能値50以上：100
        ---------------------------------
        */

        const isFumble =
            skillValue < 50
                ? rollValue >= 96
                : rollValue === 100;

        if (isFumble) {

            return {
                type: "fumble",
                label: "ファンブル",
                success: false
            };

        }

        /*
        ---------------------------------
        イクストリーム成功
        ---------------------------------
        */

        if (rollValue <= skillValue / 5) {

            return {
                type: "extreme",
                label: "イクストリーム成功",
                success: true
            };

        }

        /*
        ---------------------------------
        ハード成功
        ---------------------------------
        */

        if (rollValue <= skillValue / 2) {

            return {
                type: "hard",
                label: "ハード成功",
                success: true
            };

        }

        /*
        ---------------------------------
        レギュラー成功
        ---------------------------------
        */

        if (rollValue <= skillValue) {

            return {
                type: "regular",
                label: "レギュラー成功",
                success: true
            };

        }

        /*
        ---------------------------------
        失敗
        ---------------------------------
        */

        return {
            type: "failure",
            label: "失敗",
            success: false
        };

    }

}
