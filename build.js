const https = require('https');
const fs = require('fs');

const download = function(url, dest) {
  const file = fs.createWriteStream(dest);
  https.get(url, function(response) {
    response.pipe(file);
    file.on('finish', function() {
      file.close();  // close() is async, call cb after close completes.
      console.log('get success');
      process.exit(0);
    });
  }).on('error', function(err) { // Handle errors
    fs.unlink(dest, () => {}); // Delete the file async. (But we don't check the result)
    console.log('get failed', err);
    process.exit(1);
  });
};

download('https://raw.githubusercontent.com/BlankerL/DXY-2019-nCoV-Data/master/DXYArea.csv', 'public/DXYArea.csv');
setTimeout(() => {}, 0);
