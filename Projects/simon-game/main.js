/* Generated by Babel */
// declare start and strict buttons
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var startBtn = document.getElementById('start');
var startLabel = document.getElementById('start-label');
var strictBtn = document.getElementById('strict');
var label = document.getElementById('label');

function initSimon(startBtn, startLabel, strictBtn, label) {

    // the whole simon game as an object

    var Plate = (function () {
        function Plate(start, startLabel, strict, label) {
            _classCallCheck(this, Plate);

            this.startBtn = start;
            this.startLabel = startLabel;
            this.strictBtn = strict;
            this.label = label;
            this.one = document.getElementById('one');
            this.two = document.getElementById('two');
            this.three = document.getElementById('three');
            this.four = document.getElementById('four');
            this.buttons = [one, two, three, four];
            this.steps = [];
            this.userSteps = [];
            this.userTurn = false;
            this.level = 1;
        }

        // create simon object

        // a method to add new steps

        _createClass(Plate, [{
            key: 'addSteps',
            value: function addSteps() {
                var newStep = Math.floor(Math.random() * 4);
                this.steps.push(newStep);
                return this;
            }

            // a method to show the steps
        }, {
            key: 'showSteps',
            value: function showSteps() {
                var delayTime = 500;
                var that = this;

                var _loop = function (i) {
                    var delay = setTimeout(function () {
                        that.buttons[that.steps[i]].className = 'enabled';
                        var sound = 'sound-' + that.buttons[that.steps[i]].id;
                        document.getElementById(sound).play();
                        var clearDelay = setTimeout(function () {
                            that.buttons[0].className = '';
                            that.buttons[1].className = '';
                            that.buttons[2].className = '';
                            that.buttons[3].className = '';
                        }, 1000);
                        if (i === that.steps.length - 1) {
                            that.userTurn = true;
                            that.userSteps = that.steps.slice(0);
                            that.level = that.level + 1;
                        }
                    }, delayTime);
                    delayTime += 1500;
                };

                for (var i = 0; i < that.steps.length; i++) {
                    _loop(i);
                }
                return this;
            }

            // method when user selects a wrong button
        }, {
            key: 'error',
            value: function error() {
                var _this = this;

                this.level = this.level - 1;
                this.label.innerHTML = 'Try Again';
                this.userSteps = this.steps.slice(0);
                var tryagain = setTimeout(function () {
                    _this.strictBtn.className === 'enabled' ? _this.reset().addSteps().showSteps() : _this.updateLabel().showSteps();
                }, 1000);
                return this;
            }

            // method for starting the next level
        }, {
            key: 'nextLevel',
            value: function nextLevel() {
                var _this2 = this;

                if (this.level >= 21) {
                    this.label.innerHTML = 'You Won!';
                    this.userTurn = false;
                    return this;
                } else if (this.level < 10) {
                    this.label.innerHTML = 'Level 0' + this.level;
                } else {
                    this.label.innerHTML = 'Level ' + this.level;
                }
                this.userTurn = false;
                this.addSteps();
                var delay = setTimeout(function () {
                    _this2.showSteps();
                }, 500);
                return this;
            }

            // reset the parameters
        }, {
            key: 'reset',
            value: function reset() {
                this.level = 1;
                this.label.innerHTML = 'Level 0' + '1';
                this.userTurn = false;
                this.steps = [];
                this.userSteps = [];
                return this;
            }

            // update label when an error occured in non-stricted mode
        }, {
            key: 'updateLabel',
            value: function updateLabel() {
                if (simon.level < 10) {
                    simon.label.innerHTML = 'Level 0' + simon.level;
                } else {
                    simon.label.innerHTML = 'Level ' + simon.level;
                }
                return this;
            }
        }]);

        return Plate;
    })();

    var simon = new Plate(startBtn, startLabel, strictBtn, label);

    // start the game when the start button is clicked
    simon.startBtn.onclick = function (e) {
        var _this3 = this;

        if (this.className === 'start') {
            this.className = 'restart';
            simon.startLabel.innerHTML = "restart";
            simon.reset().addSteps().showSteps();
        } else {
            this.className = 'start';
            var flashBtn = setTimeout(function () {
                _this3.className = 'restart';
            }, 100);
            simon.userTurn;
            if (simon.userTurn === true || simon.level >= 21) {
                simon.reset().addSteps().showSteps();
            }
        }
    };

    // toggle the strict state
    simon.strictBtn.onclick = function (e) {
        this.className === 'enabled' ? this.className = 'disabled' : this.className = 'enabled';
    };

    // user turn
    simon.buttons.forEach(function (item) {
        item.onclick = function (e) {
            var _this4 = this;

            if (simon.userTurn === true) {
                this.className = 'enabled';
                simon.userTurn = false;
                var sound = 'sound-' + this.id;
                document.getElementById(sound).play();

                if (simon.buttons.indexOf(this) === simon.userSteps[0]) {
                    simon.userSteps.shift();
                    var duration = setTimeout(function () {
                        _this4.className = '';
                        simon.userTurn = true;
                        if (simon.userSteps.length < 1) {
                            simon.nextLevel();
                        }
                    }, 200);
                } else {
                    simon.error();
                    var duration = setTimeout(function () {
                        _this4.className = '';
                    }, 1000);
                }
            }
        };
    });
}

initSimon(startBtn, startLabel, strictBtn, label);