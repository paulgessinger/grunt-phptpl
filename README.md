# grunt-phptpl

> The best Grunt plugin ever.

## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-phptpl --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-phptpl');
```

## The "phptpl" task

### Overview
In your project's Gruntfile, add a section named `phptpl` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  phptpl: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

### Options

### Usage Examples

#### Single file
A single file is processed and written to a single file.

```js
single: {
	options: {
	},
	files: {
		'tmp/single.html': ['test/fixtures/single.php'],
	}
},
```

#### Concatenate multiple files
Multiple files are processed, and their outputs are concatenated together into one file.

```js
multiple_concat: {
	options: {
	},
	files: {
		'tmp/multiple.html': ['test/fixtures/single.php', 'test/fixtures/single2.php']
	}
},
```

#### Separate multiple files
Process multiple files each into their own output file.
```js
multiple_separate: {
	options: {
	},
	files: {
		'tmp/multiple_separate/': ['test/fixtures/single.php', 'test/fixtures/single2.php']
	}
},
```

#### Use Patterns
Of course, all of the above also works with grunt/glob/minmatch patterns:

```js
multiple_pattern_concat: {
	options: {
	},
	files: {
		'tmp/multiple_pattern_concat.html': ['test/fixtures/**/*.php']
	}
},
```

```js
multiple_pattern_separate_hierarchy: {
	files: [
		{
			cwd: 'test/fixtures',
			src: '**/*.php',
			dest: 'tmp/multiple_pattern_separate_hierarchy/',
			ext:'.html',
			flatten:false
		}
	]
},
```

```js
multiple_pattern_separate_flat: {
	files: [
		{
			cwd: 'test/fixtures',
			src: '**/*.php',
			dest: 'tmp/multiple_pattern_separate_flat/',
			ext:'.html',
			flatten:true
		}
	]
},
```

```js
multiple_expand_separate: {
	files: [
		{
			expand:true,
			cwd: 'test/fixtures',
			src: '**/*.php',
			dest: 'tmp/multiple_expand_separate',
			ext:'.html',
			flatten:false
		}
	]
}
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
0.1.0 Initial release.
