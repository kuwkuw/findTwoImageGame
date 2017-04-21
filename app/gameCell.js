(function () {
    function GameCell(size) {
        var element = document.createElement('div');
        element.classList.add('game-cell');
        this._element = element;
    }

    GameCell.prototype.onClick = function (callback) {
        if (!callback) {
            reutrn;
        }
        this.clicDelifat = function () {
            callback(this);
        }.bind(this);
        this._element.addEventListener('click', this.clicDelifat, false);
    }
    
    GameCell.prototype.getElement = function () {
        return this._element;
    }

    GameCell.prototype.setImage = function (imageUrl) {
        this.image = imageUrl;
    }

    GameCell.prototype.hide = function () {
        this._element.style.backgroundImage = '';
    }

    GameCell.prototype.show = function () {
        this._element.style.backgroundImage = 'url(' + this.image + ')';
    }

    GameCell.prototype.setMatched = function () {
        this.isMathed = true;
        this._element.removeEventListener('click', this.clicDelifat, false);
        this._element.classList.add('matched')
        console.log('is matched');
    }

    window.GameCell = GameCell;
})();