var request = require('request');
var token = require('./secret.js');
var fs = require('fs');

console.log('Welcome to the GitHub Avatar Downloader!');
var repoOwner = process.argv[2];
var repoName = process.argv[3];

function getRepoContributors(repoOwner, repoName, cb) {
  if (!repoOwner || !repoName) {
    console.log("Input error. Please check repoowner and reponame.");
    return;
  }
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': "token " + token.GITHUB_TOKEN
      }
  };

  request(options, function(err, res, body) {
    var array = [];
     array = JSON.parse(body);
    cb(err, array);
  });
}

getRepoContributors(repoOwner, repoName, function(err, result) {
  console.log("Errors:", err);
  result = result.map(function (element) {
    downloadImageByURL(element.avatar_url,`./avatars/${element.login}.jpg`);
  });
});

function downloadImageByURL(url, filePath) {
  request.get(url)
    .on('error', function (err) {
      throw err;
    })
    .pipe(fs.createWriteStream(filePath));
}