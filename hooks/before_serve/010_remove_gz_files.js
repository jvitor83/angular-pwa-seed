#!/usr/bin/env node

/**
 * Lets clean up some files that conflicts with aapt.
 * https://osvaldojiang.com/p/137
 * https://github.com/driftyco/ionic/issues/4584
 * http://stackoverflow.com/questions/4666098/why-does-android-aapt-remove-gz-file-extension-of-assets
 * https://forum.ionicframework.com/t/android-build-failed-ionic-cordova-unable-to-add-asset-file-file-already-in-archive/41146
 */

var glob = require('glob');
var fs = require('fs');
var path = require('path');

var deleteFilesFromFolder = function(globExp) {
  // Find files
  glob(globExp, function(err,files) {
    if (err) throw err;
    files.forEach(function(item, index,array) {
      console.log(item + " found");
    });

    // Delete files
    files.forEach(function(item, index,array) {
      fs.unlink(item, function(err) {
        if (err) throw err;
          console.log(item + " deleted");
      });
    });
  });
};

var globExp = path.resolve(__dirname, '../../www') + '/**/*.gz';
deleteFilesFromFolder(globExp);