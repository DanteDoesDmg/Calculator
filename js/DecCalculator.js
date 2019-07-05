import {Calculator} from "./Calculator";

class DecCalculator extends Calculator {
    constructor(settings) {
        super(settings);
        this.$inputNumbers = this.$calculatorDOMElement.children(".group-number").children("label:first-child, label:nth-child(2)").children('span');
        console.log(this.getName())
    }


    changeNumber(root) {
        let activeElement = root.find('.active');
        activeElement.attr('contenteditable', 'true');
        activeElement.trigger('focus');
        activeElement.text('');

        activeElement.on('input blur', (e) => {
            switch (true) {
                case (isNaN($(e.target).text())): {
                    $(e.target).css('color', 'red');
                    this.errorMessage();
                    break;
                }
                case (($(e.target).text().length) !== 1): {
                    $(e.target).css('color', 'red');
                    this.errorMessage();
                    break;
                }
                case(this.checkInputs()): {
                    $(e.target).css('color', '');

                    this.errorMessage();
                    break;
                }
                default : {
                    root.find('.operator-bar span').next().hide();
                    $(e.target).css('color', '');

                    this.$calculatorDOMElement.find('.operator-bar span').show();
                    this.$calculatorDOMElement.find('.operator-bar span').next().first().html(`Aby dodać, kliknij!                
                <div class="chatBubbleArrowBorder"></div>
                <div class="chatBubbleArrow"></div>`);
                    this.$calculatorDOMElement.find('.operator-bar span').next().show();
                    break;
                }
            }

        });
    }

    initEvents(root) {
        super.initEvents();
        let addButton = this.$calculatorDOMElement.find('.operator-bar span');
        addButton.on('click', (e) => {
            if ($(document.activeElement).text() === '23') {

            } else {
                this.checkNumber();
                this.updateResult();
                addButton.next().hide();
            }
        });
        let $inputNumbers = this.$calculatorDOMElement.children(".group-number").children("label:first-child, label:nth-child(2)").children('span');
        $inputNumbers.on('blur', (e) => {
            if ($(e.target).text() === '') {
                $(e.target).text('0');
            }
        })
    }

    add(numberX, numberY) {
        let result = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (let i = numberX.length - 1; i >= 0; i--) {
            let carryBit = numberX[i] + numberY[i] + result[i];
            if (carryBit > 9) {
                result[i] = carryBit - 10;
                result[i - 1] = 1;
            } else {
                result[i] = carryBit;
            }
        }
        return result;
    }

    updateResult() {
        let root = this.$calculatorDOMElement;
        let $resultNumber = root.children(".group-number").children(".result-bit");
        for (let i = 0, j = this.resultNumberArray.length - 1; i < this.resultNumberArray.length; i++, j--) {
            $resultNumber.eq(i).find('.active').hide();
            $resultNumber.eq(i).find('.active').text(`${this.resultNumberArray[j]}`);
            $resultNumber.eq(i).find('.active').slideToggle();
        }
    }

    errorMessage() {
        this.$calculatorDOMElement.find('.operator-bar span').hide();
        this.$calculatorDOMElement.find('.operator-bar span').next().first().html(`Wprowadź liczbę jednocyfrową`);
        this.$calculatorDOMElement.find('.operator-bar span').next().show();
    }

    checkInputs() {
        const inputs = this.$inputNumbers;
        for (let i = 0; i < inputs.length; i++) {
            if ($(inputs[i]).text().length > 1 || isNaN($(inputs[i]).text())) {
                return true
            }
        }

    }

}

export {DecCalculator}