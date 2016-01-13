'use strict';

var fs = require('fs');
var Q = require('q');
var gitRev = require('git-rev');
var exec = require('child_process').exec;

function makeVersionsFolder() {
  var deferred = Q.defer();

  fs.lstat('./.versions', function (err, stats) {
    if (!err && stats.isDirectory()) {
      return deferred.resolve();
    } else {
      fs.mkdir('./.versions', function (err) {
        if (err) {
          return deferred.reject(err);
        }
        return deferred.resolve();
      });
    }
  });

  return deferred.promise;
}

function getGitTag() {

  var deferred = Q.defer();

  gitRev.tag(function (tagStr) {
    deferred.resolve(tagStr);
  });

  return deferred.promise;
}

function createArchive(branch, version) {

  var deferred = Q.defer();

  var child = exec('git archive -o ./.versions/' + version + '.zip ' + branch, function (err, stdout, stderr) {
    if (err) {
      return deferred.reject(err);
    }
    return deferred.resolve();
  });

  return deferred.promise;
};

exports.getGitTag = getGitTag;
exports.createArchive = createArchive;
exports.makeVersionsFolder = makeVersionsFolder;
//# sourceMappingURL=utils.js.map