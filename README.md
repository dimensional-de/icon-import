# dimensional-grunt-icon-import

> Imports Icon sets (from Icomoon) into a project

## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install dimensional-grunt-icon-import --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('dimensional-grunt-icon-import');
```

## The "dimensional-icon-import" task

### Overview
In your project's Gruntfile, add a section named `dimensional_grunt_icon_import` to the data object passed into `grunt.initConfig
()`.

```js
grunt.initConfig({
  dimensional_grunt_icon_import: {
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

#### options.src
Type: `String`
Default value: `'resources/icons'`

A string value that defines the source directory containing the resource files from IcoMoon.

#### options.target
Type: `String`
Default value: `'src/styles/icons'`

A string value that defines the target directory for the imported symbol font.
