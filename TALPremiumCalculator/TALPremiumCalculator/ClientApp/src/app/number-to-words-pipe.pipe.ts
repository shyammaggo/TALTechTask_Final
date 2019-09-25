import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'numberToWordsPipe'
})
export class NumberToWordsPipePipe implements PipeTransform {

    ENDS_WITH_DOUBLE_ZERO_PATTERN: any = /(hundred|thousand|(m|b|tr|quadr)illion)$/;
    ENDS_WITH_TEEN_PATTERN = /teen$/;
    ENDS_WITH_Y_PATTERN = /y$/;
    ENDS_WITH_ZERO_THROUGH_TWELVE_PATTERN = /(zero|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)$/;
    TEN = 10;
    ONE_HUNDRED = 100;
    ONE_THOUSAND = 1000;
    ONE_MILLION = 1000000;
    ONE_BILLION = 1000000000;           //         1.000.000.000 (9)
    ONE_TRILLION = 1000000000000;       //     1.000.000.000.000 (12)
    ONE_QUADRILLION = 1000000000000000; // 1.000.000.000.000.000 (15)
    MAX = 9007199254740992;             // 9.007.199.254.740.992 (15)

    LESS_THAN_TWENTY = [
        'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
        'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'
    ];

    TENTHS_LESS_THAN_HUNDRED = [
        'zero', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'
    ];

    transform(value: any, ...args: any[]): any {
        //debugger;
        if (value != undefined) {
            var decimals = value.toString().split(".")[1];
            if (decimals) { return (this.toWords(value) + " and " + this.toWords(decimals) + " cents"); }
            return this.toWords(value);
        }
        else
            return null;
    }
    isFinite(value): any {
        return !(typeof value !== 'number' || value !== value || value === Infinity || value === -Infinity);
    }
    /**
       * Converts a number-word into an ordinal number-word.
       * @example makeOrdinal('one') => 'first'
       * @param {string} words
       * @returns {string}
       */
    makeOrdinal(words): any {
        // Ends with *00 (100, 1000, etc.) or *teen (13, 14, 15, 16, 17, 18, 19)
        if (this.ENDS_WITH_DOUBLE_ZERO_PATTERN.test(words) || this.ENDS_WITH_TEEN_PATTERN.test(words)) {
            return words + '';
        }
        // Ends with *y (20, 30, 40, 50, 60, 70, 80, 90)
        else if (this.ENDS_WITH_Y_PATTERN.test(words)) {
            //return words.replace(this.ENDS_WITH_Y_PATTERN, '');//ieth
        }
        // Ends with one through twelve
        else if (this.ENDS_WITH_ZERO_THROUGH_TWELVE_PATTERN.test(words)) {
            return words.replace(this.ENDS_WITH_ZERO_THROUGH_TWELVE_PATTERN, this.replaceWithOrdinalVariant);
        }
        return words;
    }

    replaceWithOrdinalVariant(match, numberWord): any {
        //  debugger;
        let ordinalLessThanThirteen = {
            'zero': 'zero',
            'one': 'one',
            'two': 'two',
            'three': 'three',
            'four': 'four',
            'five': 'five',
            'six': 'six',
            'seven': 'seven',
            'eight': 'eighth',
            'nine': 'nine',
            'ten': 'ten',
            'eleven': 'eleven',
            'twelve': 'twelve'
        };
        console.log(ordinalLessThanThirteen);
        return ordinalLessThanThirteen[numberWord];
    }


	/**
	 * Converts an integer into words.
	 * If number is decimal, the decimals will be removed.
	 * @example toWords(12) => 'twelve'
	 * @param {number|string} number
	 *
	 * @returns {string}
	 */
    toWords(number): any {
        var words;
        var num = parseInt(number, 10);
        if (!this.isFinite(num)) throw new TypeError('Not a finite number: ' + number + ' (' + typeof number + ')');
        words = this.generateWords(num);
        return this.makeOrdinal(words)
    }

    /**
         * Converts an integer into a string with an ordinal postfix.
         * If number is decimal, the decimals will be removed.
         * @example toOrdinal(12) => '12th'
         * @param {number|string} number
         * @returns {string}
         */
    toOrdinal(number): any {
        var num = parseInt(number, 10);
        if (!this.isFinite(num)) throw new TypeError('Not a finite number: ' + number + ' (' + typeof number + ')');
        var str = String(num);
        var lastTwoDigits = num % 100;
        var betweenElevenAndThirteen = lastTwoDigits >= 11 && lastTwoDigits <= 13;
        var lastChar = str.charAt(str.length - 1);
        return str + (betweenElevenAndThirteen ? 'th'
            : lastChar === '1' ? 'st'
                : lastChar === '2' ? 'nd'
                    : lastChar === '3' ? 'rd'
                        : 'th');
    }


    generateWords(number, words?: any): any {
        let remainder, word;



        // We’re done
        if (number === 0) {
            return !words ? 'zero' : words.join(' ').replace(/,$/, '');
        }
        // First run
        if (!words) {
            words = [];
        }
        // If negative, prepend “minus”
        if (number < 0) {
            words.push('minus');
            number = Math.abs(number);
        }

        if (number < 20) {
            remainder = 0;
            word = this.LESS_THAN_TWENTY[number];

        } else if (number < this.ONE_HUNDRED) {
            remainder = number % this.TEN;
            word = this.TENTHS_LESS_THAN_HUNDRED[Math.floor(number / this.TEN)];
            // In case of remainder, we need to handle it here to be able to add the “-”
            if (remainder) {
                word += '-' + this.LESS_THAN_TWENTY[remainder];
                remainder = 0;
            }

        } else if (number < this.ONE_THOUSAND) {
            remainder = number % this.ONE_HUNDRED;
            word = this.generateWords(Math.floor(number / this.ONE_HUNDRED)) + ' hundred';

        } else if (number < this.ONE_MILLION) {
            remainder = number % this.ONE_THOUSAND;
            word = this.generateWords(Math.floor(number / this.ONE_THOUSAND)) + ' thousand,';

        } else if (number < this.ONE_BILLION) {
            remainder = number % this.ONE_MILLION;
            word = this.generateWords(Math.floor(number / this.ONE_MILLION)) + ' million,';

        } else if (number < this.ONE_TRILLION) {
            remainder = number % this.ONE_BILLION;
            word = this.generateWords(Math.floor(number / this.ONE_BILLION)) + ' billion,';

        } else if (number < this.ONE_QUADRILLION) {
            remainder = number % this.ONE_TRILLION;
            word = this.generateWords(Math.floor(number / this.ONE_TRILLION)) + ' trillion,';

        } else if (number <= this.MAX) {
            remainder = number % this.ONE_QUADRILLION;
            word = this.generateWords(Math.floor(number / this.ONE_QUADRILLION)) +
                ' quadrillion,';
        }

        words.push(word);
        return this.generateWords(remainder, words);
    }

    /**
     * Converts a number into ordinal words.
     * @example toWordsOrdinal(12) => 'twelfth'
     * @param {number|string} number
     * @returns {string}
     */
    toWordsOrdinal(number) {
        var words = this.toWords(number);
        return this.makeOrdinal(words);
    }
}
