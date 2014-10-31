/*
 * grunt-phptpl
 * https://github.com/paulgessinger/grunt-phptpl
 *
 * Copyright (c) 2013 Paul Gessinger
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

	grunt.registerMultiTask('phptpl', 'The best Grunt plugin ever.', function() {
    	// Merge task-specific and/or target-specific options with these defaults.
    	var options = this.options({
			ext: '.html',
			args: []
    	});
		
		var totalFileGroupCount = 0 ;
		var self = this ;
		
		var done = this.async();

		var getFileName = function(name, flatten) {
			flatten = flatten || false ;
			
			if(flatten) {
				name = name.substring(name.lastIndexOf('/')+1) ;
			}
					
			return name.substring(0, name.lastIndexOf('.')) ;
		} ;
		
		if(this.files === 0) {
			grunt.log.warn('no files resolved.') ;
			done() ;
		}

    	// Iterate over all specified file groups.
		this.files.forEach(function(f) {
			
			var totalFileCount = 0 ;
			
			var areWeDone = function() {
				grunt.log.debug('are we done?') ;
				if(totalFileCount === f.src.length) {
					// all files in this group are done, is this the last group?
					totalFileGroupCount++;
					if(totalFileGroupCount === self.files.length) {
						// yes!
						grunt.log.debug('yes!') ;
						done() ;
					}
					else {
						grunt.log.debug('no!') ;
					}
				}
				else {
					grunt.log.debug('no!') ;
				}
			}
		
			var processFiles = function(files, cwd, callback) {
			
				var i = 0 ;
        var order = 0 ;
				var output = {} ;
			
				files.forEach(function(elem) {
          var j = order ;
					var args = options.args.slice(0);
					args.unshift(cwd+elem);
          grunt.log.debug(args) ;
					grunt.util.spawn({
						cmd: 'php',
						args: args
					}, function (error, result, code) {
            
            
						if(code !== 0) {
							
							grunt.log.error('An error occurred') ;
							grunt.log.error(result.stdout+result.stderr) ;
							
						}
						else {
							grunt.log.debug('index: '+j) ;
							grunt.log.debug('PHP file '+elem+' executed.') ;
							//output += result ;
							output[j] = result ;
						}
						
						i++;
						totalFileCount++;

						if(i === files.length) {
							// this was the last file in this batch, sort, then join result, then run callback
              var out = '' ;
              
              var keys = [];

              for(var key in output){
                  if(output.hasOwnProperty(key)){
                      keys.push(key);
                  }
              }
              
              keys.sort() ;
              
              for(var k=0;k<keys.length;k++) {
                out += output[keys[k]] ;
              }
              
							callback(out) ;
						}
				  });  
          order++ ;
				}) ;
			} ;
			
			
			
			//console.log(f.src) ;
			
			var destIsDir = grunt.util._.endsWith(f.dest, '/')
			var src = f.src ;
			var cwd = f.orig.expand ? '' : (f.cwd ? f.cwd+'/' : '') ;
			var flatten = typeof f.orig.flatten !== 'undefined' ? f.orig.flatten : true ;
			
			if(src.length === 0) {
				grunt.log.warn('no files in this group resolved.') ;
				done() ;
			}
			
			if(!destIsDir) {
				grunt.log.debug('one file out, easy') ;
				// one file out, easy
				processFiles(src, cwd, function(output) {
					grunt.log.debug('writing output of length '+output.length+' to '+f.dest) ;
					
					// write to dest file
					if(src.length > 1) {
						for(var i=0;i<src.length;i++) {
							if(i===0) {
								grunt.log.writeln('  '+src[i]) ;
							}
							else {
								if(i===src.length-1) {
									grunt.log.write('+ '+src[i]) ;
								}
								else {
									grunt.log.writeln('+ '+src[i]) ;
								}
							}
						}
					}
					else {
						grunt.log.write(' '+src[0]) ;
					}
					
					
					
					grunt.log.writeln(' => '+f.dest) ;
					
					grunt.file.write(f.dest, output) ;
					
					areWeDone() ;
				}) ;
			}
			
			if(destIsDir) {
				grunt.log.debug('each file goes into its own output file') ;
				// each file goes into its own output file
				src.forEach(function(elem) {
					processFiles([elem], cwd, function(output) {
						var dest = f.dest+getFileName(elem, flatten)+options.ext ;
						
						grunt.log.debug('writing output of length '+output.length+' to '+dest) ;
					
						// write to dest file
						grunt.log.writeln('  '+elem+' => '+dest) ;
						grunt.file.write(dest, output) ;
					
						areWeDone() ;
					}) ;
				}) ;
				
			}
		});
	});

};
