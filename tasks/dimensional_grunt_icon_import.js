'use strict';

module.exports = function (grunt) {

  grunt.registerMultiTask(
    'dimensional_grunt_icon_import',
    'Imports icon sets (Icomoon) into a project',
    function () {

      function importCss(srcFile, targetFile, prefix, addAfterMixIns) {
        var patterns = {
          bootstrap: (new RegExp('([^]*?)\\[class\\^="'+ prefix +'-"]')),
          format: (new RegExp('\\[class\\^="'+ prefix +'-"][^{}]+(\\{[^}]+\\})')),
          icons: (new RegExp('(\\.'+prefix+'-[^:]+):before\\s*\\{(([^}]+?))\\}', 'g')),
          icon: (new RegExp('(\\.'+prefix+'-[^:]+):before\\s*\\{\\s*(content:.+)'))
        };
        var css = grunt.file.read(srcFile);
        var result, bootstrap, format, icons, icon, counter = 0;
        if (!(bootstrap = css.match(patterns.bootstrap))) {
          return false;
        }
        result = '/*This file is generated by a Grunt task. */\n\n';
        result += '@icon-fonts: "./icons/fonts";\n\n';
        result += bootstrap[1];
        if (!(format = css.match(patterns.format))) {
          return false;
        }
        result += '.'+prefix+'() ' + format[1] + "\n";
        result = result.replace(/url\('fonts\//g, 'url(\'@{'+prefix+'-fonts}/');
        icons = css.match(patterns.icons);
        for (var i = 0; icons && i < icons.length; i++) {
          if (icon = patterns.icon.exec(icons[i])) {
            counter++;
            result += icon[1] + " {\n";
            result += "    &:before {\n";
            result += "        ."+prefix+";\n";
            result += "        " + icon[2] + "\n";
            result += "    }\n";
            result += "}\n";
            if (addAfterMixIns) {
              result += icon[1] + "-after() {\n";
              result += "    &:after {\n";
              result += "        ."+prefix+";\n";
              result += "        " + icon[2] + "\n";
              result += "    }\n";
              result += "}\n";
            }
          }
        }
        grunt.log.writeln('Icons: ' + counter);
        return grunt.file.write(targetFile, result);
      }

      function copyFonts(srcDirectory, targetDirectory) {
        var files, counter = 0;
        files = grunt.file.expand(
          {
            cwd : srcDirectory,
            nonull : true
          },
          ['*.*']
        );
        for (var i = files.length - 1; i >= 0; i--) {
          grunt.verbose.writeln('Copy: ' + srcDirectory + '/' + files[i]);
          grunt.file.copy(srcDirectory + '/' + files[i], targetDirectory + '/' + files[i])
          counter++;
        }
        return counter;
      }

      var options = this.options(
        {
          src : 'resources/icons',
          target : 'src/styles/icons',
          prefix : 'icon',
          addAfterMixIns: true
        }
      );
      var srcFile = options.src + '/style.css';
      var targetFile = options.target + '/icons.less';
      if (importCss(srcFile, targetFile, options.prefix, options.addAfterMixIns)) {
        grunt.log.writeln('Import: ' + srcFile);
        grunt.log.writeln('Created: ' + targetFile);
        var fileCount = copyFonts(options.src + '/fonts', options.target + '/fonts');
        grunt.log.writeln('Copied ' + fileCount + ' font files');
      }
    }
  );

};
