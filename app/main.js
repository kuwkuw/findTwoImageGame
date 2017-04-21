(function () {
    'use strict'

    var images = [
        'https://kde.link/test/0.png',
        'https://kde.link/test/1.png',
        'https://kde.link/test/2.png',
        'https://kde.link/test/3.png',
        'https://kde.link/test/4.png',
        'https://kde.link/test/5.png',
        'https://kde.link/test/6.png',
        'https://kde.link/test/7.png',
        'https://kde.link/test/8.png',
        'https://kde.link/test/9.png',
    ];

    var game = new Game({
        el: '.game',
        cellSize: 100,
        images: images
    });
})()
