(function () {
    'use strict'

    function TiemCounter() {
        this._init();
    }

    TiemCounter.prototype._init = function () {
        var element = document.createElement('div');
        var minutsElemen = document.createElement('span');
        minutsElemen.innerText = 0;
        var secondsElemen = document.createElement('span');
        secondsElemen.innerText = 0;
        var colon = document.createTextNode(':');
        element.classList.add('tiem-counter');
        element.appendChild(minutsElemen);
        element.appendChild(colon);
        element.appendChild(secondsElemen);
        this._minutsElemen = minutsElemen;
        this._secondsElemen = secondsElemen;
        this._element = element;
    }

    TiemCounter.prototype.getElement = function () {
        return this._element;
    }

    TiemCounter.prototype.start = function () {
        this._interval = 0;
        this.intervalIndex = setInterval(this._updateTimeView.bind(this), 1000);
    }

    TiemCounter.prototype.stop = function () {
        clearInterval(this.intervalIndex);
    }

    TiemCounter.prototype._updateTimeView = function () {
        this._interval++;
        this._secondsElemen.innerText = this._interval % 60;
        this._minutsElemen.innerText = Math.floor(this._interval / 60) % 60;
    }

    window.TiemCounter = TiemCounter
})()