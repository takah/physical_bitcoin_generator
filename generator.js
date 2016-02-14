var bitcore = require('bitcore');
var QRCode = require('qrcode');
var fs = require('fs');
var sprintf = require('sprintf-js').sprintf;

fs.mkdirSync('images');
fs.mkdirSync('images/public');
fs.mkdirSync('images/private');

var result = 'images/result.csv';

for (var i=1; i<101; i++) {
  var serial_num = sprintf('%05d', i);
  var privateKey = new bitcore.PrivateKey();
  var address = privateKey.toAddress();
  var log = serial_num + ', ' + address.toString() + ', ' + privateKey.toString();
  console.log(log);
  fs.appendFile(result, log + "\n", function(err) {});
  draw(address.toString(), 'images/public/' + serial_num + '.png');
  draw(privateKey.toString(), 'images/private/' + serial_num + '.png');
}

function draw(string, path) {
  QRCode.draw(string, function(error, canvas) {
    var out = fs.createWriteStream(path);
    var stream = canvas.pngStream();
    stream.on('data', function(chunk) {
      out.write(chunk);
    });
  });
}
