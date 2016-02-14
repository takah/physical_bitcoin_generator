var bitcore = require('bitcore');
var QRCode = require('qrcode');
var fs = require('fs');
var sprintf = require('sprintf-js').sprintf;

fs.mkdirSync('images');

for (var i=1; i<101; i++) {
  var serial_num = sprintf('%05d', i);
  var privateKey = new bitcore.PrivateKey();
  var address = privateKey.toAddress();
  console.log(serial_num + ', ' + address.toString() + ', ' + privateKey.toString());
  generate(address, serial_num);
}

function generate(address, serial_num) {
  QRCode.draw(address.toString(), function(error, canvas) {
    var out = fs.createWriteStream('images/qrcode_' + serial_num + '.png');
    var stream = canvas.pngStream();
    stream.on('data', function(chunk) {
      out.write(chunk);
    });
  });
}
