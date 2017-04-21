(function () {
    'use strict'

    function GameField(options) {
        this._cellsSize = options.cellsSize || 100;
        this._cells = [];
        this._selectedCells = [];

        this._init(options.images, options.fieldSize);
    }

    GameField.prototype._init = function (images, fieldSize) {
        this._fieldSize = fieldSize;
        this._renderField();
        this._fillCells(images);
    }

    /**
     * Create DOM Element for game field
     */
    GameField.prototype._renderField = function () {
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

        // this._rootElement.appendChild(fieldElement);
        this._element = fieldElement;
    }

    GameField.prototype.getElement = function () {
        return this._element;
    }

    GameField.prototype.onMathed = function (callback) {
        this.onMatchedHandler = callback;
    }

    /**
     * Handle click on game cell
     */
    GameField.prototype._cellClickHandler = function (cell) {
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
            this.onMatchedHandler(this.isEnd());
        }
    }

    GameField.prototype._fillCells = function (images) {
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

    GameField.prototype._getRandomeFreeCell = function () {
        var isMath = false;
        var count = 0
        while (!isMath) {
            var randomCellIndex = Math.floor(Math.random() * this._cells.length);
            if (!this._cells[randomCellIndex].hasOwnProperty('image')) {
                isMath = true;
                return this._cells[randomCellIndex];
            }
        }
    }

    GameField.prototype.isEnd = function () {
        for (var i = 0; i < this._cells.length; i++) {
            if (!this._cells[i].isMathed) {
                return false;
            }
        }
        return true;
    }


    window.GameField = GameField;

})();