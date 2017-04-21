(function () {
    function Game(options) {
        if (!options.el) {
            throw new Error('[el] property is requered');
        }
        this._rootElement = document.querySelector(options.el);

        this._init(options);
    }

    Game.prototype._init = function (options) {
        this.loadFieldSize(function (err, respos) {
            if (err) {
                console.error('Loading field size error', err);
                return;
            }
            options.fieldSize = respos
            var gameField = new GameField(options);
            this._rootElement.appendChild(gameField.getElement());
        }.bind(this));
    }


    /**
    * Get field size
    */
    Game.prototype.loadFieldSize = function (callback) {
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
    // new GameField({
    //     el: '.game',
    //     cellSize: 100,
    //     images: images
    // });

    window.Game = Game;
})();