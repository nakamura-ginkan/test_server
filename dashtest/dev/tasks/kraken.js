var fs = require('fs'),
  mkdirp = require('mkdirp'),
  getDirName = require('path').dirname,
  os = require('os'),
  isGIF = require('is-gif'),
  isPNG = require('is-png'),
  isJPG = require('is-jpg'),
  async = require('async'),
  chalk = require('chalk'),
  pretty = require('pretty-bytes'),
  Kraken = require('kraken'),
  request = require('request');

module.exports = function (grunt) {
  grunt.registerMultiTask('kraken', 'Grunt plugin to optimize all your images with the powerful Kraken.io API', function () {
    var done = this.async(),
      files = this.files,
      options = this.options({
        lossy: false
      });

    var total = {
      bytes: 0,
      kraked: 0,
      files: 0
    };

    async.forEachLimit(files, os.cpus().length, function (file, next) {
      var isSupported = !isGIF(file.src[0]) || !isPNG(file.src[0]) || !isJPG(file.src[0]);

      if (!isSupported) {
        grunt.warn('Skipping unsupported image ' + file.src[0]);
        return next();
      }

      mkdirp(getDirName(file.dest));

      var kraken = new Kraken({
        // eslint-disable-next-line camelcase
        api_key: options.key,
        // eslint-disable-next-line camelcase
        api_secret: options.secret
      });

      var opts = {
        file: file.src[0],
        lossy: options.lossy || false,
        wait: true
      };

      kraken.upload(opts, function (data) {
        if (!data.success) {
          grunt.warn('Error in file ' + file.src[0] + ': ' + data.message || data.error);
          return next();
        }

        var originalSize = data.original_size,
          krakedSize = data.kraked_size,
          savings = data.saved_bytes;

        var percent = (((savings) * 100) / originalSize).toFixed(2),
          savedMsg = 'saved ' + pretty(savings) + ' - ' + percent + '%',
          msg = savings > 0 ? savedMsg : 'already optimized';

        total.bytes += originalSize;
        total.kraked += krakedSize;
        total.files++;

        request(data.kraked_url, function (err) {
          if (err) {
            grunt.warn(err + ' in file ' + file.src[0]);
            return next();
          }

          grunt.log.writeln(chalk.green('✔ ') + file.src[0] + chalk.gray(' (' + msg + ')'));
          process.nextTick(next);
        }).pipe(fs.createWriteStream(file.dest));
      });
    }, function (err) {
      if (err) {
        grunt.warn(err);
      }

      var percent = (((total.bytes - total.kraked) * 100) / total.bytes).toFixed(2);
      savings = total.bytes - total.kraked;
      msg = 'All done. Kraked ' + total.files + ' image';

      msg += total.files === 1 ? '' : 's';
      msg += chalk.gray(' (saved ' + pretty(savings) + ' - ' + percent + '%)');

      msg += '.\nPlease delete "img" folder, then change "img_min" to "img".';

      grunt.log.writeln(msg);
      done();
    });
  });
};
