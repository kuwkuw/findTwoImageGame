(function () {
    'use strict'

    function Game(options) {
        if (!options.el) {
            throw new Error('[el] property is requered');
        }
        this._rootElement = document.querySelector(options.el);

        this._init(options);
    }

    Game.prototype._init = function (options) {
        this._loadFieldSize(function (err, respos) {
            if (err) {
                console.error('Loading field size error', err);
                return;
            }
            options.fieldSize = respos;
            this._render(options);
        }.bind(this));
    }

    Game.prototype._render = function (options) {
        var gameField = new GameField(options);
        gameField.onMathed(this._onMathedHandler.bind(this));
        gameField.onFalseTry(this._onFalseTryHanler.bind(this));
        var timeCounter = new TiemCounter()
        this._rootElement.appendChild(timeCounter.getElement());
        this._rootElement.appendChild(this._renderWinStatusContainer());
        this._rootElement.appendChild(this._renderFalseTryCountContainer());
        this._rootElement.appendChild(gameField.getElement());
        this._timeCounter = timeCounter;
        this._timeCounter.start();
    }

    Game.prototype._renderWinStatusContainer = function(){
        var element = document.createElement('div');
        element.classList.add('game-status');
        element.innerText = 'You win!';
        this._winNotificationElement = element;        
        return this._winNotificationElement;
    }
    Game.prototype._renderFalseTryCountContainer= function(){
        var element = document.createElement('div');
        element.classList.add('false-try-counter');
        element.innerText = 0;
        this._falseTryCounter = element;        
        return this._falseTryCounter;
    }

    Game.prototype._onMathedHandler = function (isEnd) {
        if (isEnd) {
            this._timeCounter.stop();
            this._winNotificationElement.style.opacity = 1;
        }
    }

    Game.prototype._onFalseTryHanler = function () {
        this._falseTryCounter.innerText = parseInt(this._falseTryCounter.innerText)+1;
    }

    /**
    * Get field size
    */
    Game.prototype._loadFieldSize = function (callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://kde.link/test/get_field_size.php', true);

        xhr.onreadystatechange = function () {
            if (xhr.readyState != 4) return;

            if (xhr.status != 200) {
                callback(xhr.statusText);
            } else {
                var date;
                try {
                    date = JSON.parse(xhr.responseText)
                }
                catch (error) {
                    console.error(error);
                }
                callback(null, date);
            }

        }

        xhr.send();
    }

    window.Game = Game;
})();