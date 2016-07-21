'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.dimensional_grunt_icon_import = {
  setUp: function (done) {
    // setup here if necessary
    done();
  },
  custom_options: function (test) {
    var actual = grunt.file.read('tmp/icons.less');
    var expected = grunt.file.read('test/expected/icons.less');
    test.equal(actual, expected, 'Imported icons.less is not equal to expected.');
    test.ok(grunt.file.exists('tmp/fonts/testfont.eot'), 'Missing "testfont.eot".');
    test.ok(grunt.file.exists('tmp/fonts/testfont.svg'), 'Missing "testfont.svg".');
    test.ok(grunt.file.exists('tmp/fonts/testfont.ttf'), 'Missing "testfont.ttf".');
    test.ok(grunt.file.exists('tmp/fonts/testfont.woff'), 'Missing "testfont.woff".');

    test.done();
  }
};
