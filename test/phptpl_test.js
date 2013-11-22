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

exports.phptpl = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  single: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/single.html');
    var expected = grunt.file.read('test/expected/single.html');
    test.equal(actual, expected, 'single file to single file');

    test.done();
  },
  multiple_concat: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/multiple.html');
    var expected = grunt.file.read('test/expected/multiple.html');
    test.equal(actual, expected, 'multiple files to single file');

    test.done();
  },
  multiple_pattern_concat: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/multiple_pattern_concat.html');
    var expected = grunt.file.read('test/expected/multiple_pattern_concat.html');
    test.equal(actual, expected, 'multiple files obtained through pattern to single file');

    test.done();
  },
  multiple_separate: function(test) {
    test.expect(2);

    test.equal(
		grunt.file.read('tmp/multiple_separate/single.html'), 
		grunt.file.read('test/expected/multiple_separate/single.html'), 
		'multiple files to separate files'
	);
	
    test.equal(
		grunt.file.read('tmp/multiple_separate/single2.html'), 
		grunt.file.read('test/expected/multiple_separate/single2.html'), 
		'multiple files to separate files'
	);

    test.done();
  },
  multiple_pattern_separate_hierarchy: function(test) {
  	var files = [
  		'single.html',
  		'single2.html',
  		'down/file.html',
  		'down/file2.html',
  		'down/down2/file3.html',
  		'/down/down2/file4.html'
  	] ;
	
	test.expect(files.length);
	
	for(var i=0;i<files.length;i++) {
	    test.equal(
			grunt.file.read('tmp/multiple_pattern_separate_hierarchy/'+files[i]), 
			grunt.file.read('test/expected/multiple_pattern_separate_hierarchy/'+files[i]), 
			'multiple files obtained by pattern to separate files with hierarchy'
		);
	}

    test.done();
  },
  multiple_pattern_separate_flat: function(test) {
  	var files = [
  		'single.html',
  		'single2.html',
  		'file.html',
  		'file2.html',
  		'file3.html',
  		'file4.html'
  	] ;
	
	test.expect(files.length);
	
	for(var i=0;i<files.length;i++) {
	    test.equal(
			grunt.file.read('tmp/multiple_pattern_separate_flat/'+files[i]), 
			grunt.file.read('test/expected/multiple_pattern_separate_flat/'+files[i]), 
			'multiple files obtained by pattern to separate files without hierarchy'
		);
	}

    test.done();
  },
  multiple_expand_separate: function(test) {
  	var files = [
  		'single.html',
  		'single2.html',
  		'down/file.html',
  		'down/file2.html',
  		'down/down2/file3.html',
  		'down/down2/file4.html'
  	] ;
	
	test.expect(files.length);
	
	for(var i=0;i<files.length;i++) {
	    test.equal(
			grunt.file.read('tmp/multiple_expand_separate/'+files[i]), 
			grunt.file.read('test/expected/multiple_expand_separate/'+files[i]), 
			'multiple files obtained by pattern and expanded to separate files with hierarchy'
		);
	}

    test.done();
  },
};
