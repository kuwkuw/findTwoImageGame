(function () {
    function Game(options) {
        if (!options.el) {
            throw new Error('[el] property is requered');
        }
        this._cellsSize = options.cellsSize || 100;
        this._rootElement = document.querySelector(options.el);
        this._cells = [];
        this._selectedCells = [];

        this._init(options.images);
    }

    Game.prototype._init = function (images) {
        this.loadFieldSize(function (err, respos) {
            if (err) {
                console.error('Loading field size error', err);
                return;
            }
            this._fieldSize = respos;
            this._renderField();
            this._fillCells(images);

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

    /**
     * Create DOM Element for game field
     */
    Game.prototype._renderField = function () {
        var cellCount = this._fieldSize.width * this._fieldSize.height;
        var fieldElement = document.createElement('div');
        fieldElement.style.width = this._fieldSize.width * this._cellsSize + 'px';
        fieldElement.style.height = this._fieldSize.height * this._cellsSize + 'px';
        fieldElement.classList.add('game-fild');

        for (var i = 0; i < cellCount; i++) {
            var newCell = new GameCell(this._cellsSize);
            newCell.onClick(this._cellClickHandler.bind(this));
            fieldElement.appendChild(newCell.getElement());
            this._cells.push(newCell);
        }

        this._rootElement.appendChild(fieldElement);
    }

    /**
     * Handle click on game cell
     */
    Game.prototype._cellClickHandler = function (cell) {
        if (2 === this._selectedCells.length) {
            this._selectedCells[0].hide();
            this._selectedCells[1].hide();
            this._selectedCells.length = 0;
        }
        cell.show();
        this._selectedCells.push(cell)
        if (2 === this._selectedCells.length && this._selectedCells[0].image == this._selectedCells[1].image) {
            this._selectedCells[0].setMatched();
            this._selectedCells[1].setMatched();
            this._selectedCells.length = 0;
        }
    }

    Game.prototype._fillCells = function (images) {
        var freeCells = this._cells.length;
        while (freeCells > 0) {
            for (var i = 0; i < images.length; i++) {
                var freeCellFirst = this._getRandomeFreeCell();
                freeCellFirst.setImage(images[i]);
                var freeCellSecond = this._getRandomeFreeCell();
                freeCellSecond.setImage(images[i]);
                freeCells -= 2;
                if (freeCells == 0) {
                    break;
                }
            }
        }
    }

    Game.prototype._getRandomeFreeCell = function () {
        var isMath = false;
        var count = 0
        while (!isMath) {
            var randomCellIndex = Math.floor(Math.random() * this._cells.length);

            if (this._cells.length - 1 == randomCellIndex) {
                console.log('geted last index', randomCellIndex)
            }
            if (this._cells.length == randomCellIndex) {
                console.log('geted last index to bige', randomCellIndex)
            }
            if (!this._cells[randomCellIndex].hasOwnProperty('image')) {
                isMath = true;
                return this._cells[randomCellIndex];
            }
        }
    }

    window.Game = Game;

})();