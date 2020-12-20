const { createCanvas, loadImage } = require('canvas')
const fs = require('fs')
const twemoji = require('twemoji')
const { emojis } = require('./config.json');

const canvas = createCanvas(1200, 675);
const ctx = canvas.getContext('2d');

ctx.fillStyle = 'white'
ctx.fillRect(0, 0, canvas.width, canvas.height)

const scale = 4.3;
for (let i = 0; i < emojis.length; i++) {
    loadImage(`https://twemoji.maxcdn.com/v/13.0.1/svg/${twemoji.convert.toCodePoint(emojis[i]).split('-')[0]}.svg`).then((image) => {
        image.width = image.naturalWidth * scale;
        image.height = image.naturalHeight * scale;
        ctx.drawImage(image, ((canvas.width - image.width) / 2)-(((emojis.length*image.width+(emojis.length-2)*260))/(3))+(i*260), ((canvas.height - image.height) / 2));
        const out = fs.createWriteStream(__dirname + '/output.png')
        const stream = canvas.createPNGStream()
        stream.pipe(out)
     }) 
}