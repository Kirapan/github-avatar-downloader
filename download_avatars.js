var request = require('request');
var token = require('./secret.js');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
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

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  result = result.map(function (element) {
    console.log(element.avatar_url);
  });
});