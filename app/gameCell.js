(function () {
    function GameCell(size) {
        var element = document.createElement('div');
        element.classList.add('game-cell');
        element.style.width = size + 'px';
        element.style.height = size + 'px';
        this._element = element;
    }

    GameCell.prototype.onClick = function (callback) {
        if (!callback) {
            reutrn;
        }
        this._element.addEventListener('click', function () {
            callback(this);
        }.bind(this), false);
    }

    GameCell.prototype.getElement = function () {
        return this._element;
    }

    GameCell.prototype.setImage = function (imageUrl) {
        this.image = imageUrl;
        // var imgElement = document.createElement('img');
        
    }

    GameCell.prototype.hide = function () {
        this._element.style.backgroundImage = '';
     }

    GameCell.prototype.show = function () {
        this._element.style.backgroundImage = 'url(' + this.image + ')';
     }

    GameCell.prototype.setMatched = function () {
        this.isMathed = true;
        console.log('is matched')
     }

    window.GameCell = GameCell;
})();