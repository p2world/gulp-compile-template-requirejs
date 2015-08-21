'use strict';
var gutil = require('gulp-util');
var through = require('through2');
var _ = require('underscore');
var PluginError = gutil.PluginError;

var PLUGIN_NAME = 'gulp-compile-template-requirejs';

var buildTemplateSource = "define('{moduleName}', function () { return {source}; });\n";

module.exports = function (options) {
    options = options || {};

    function compiler (file) {
        var name = typeof options.name === 'function' && options.name(file) || file.relative;
        var html = file.contents.toString();
        var template = _.template(html).source;
        //var moduleName = file.path;
        return buildTemplateSource
                    .replace('{moduleName}', name.replace(".tpl", ""))
                    .replace('{source}', template);
    }

    var stream = through.obj(function (file, enc, callback) {

        if (file.isNull()) {
            this.push(file);
            return callback();
        }

        if (file.isStream()) {
            this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
            return callback();
        }

        var filePath = file.path;

        try {
            var compiled = compiler(file);

            file.contents = new Buffer(compiled);
            file.path = gutil.replaceExtension(file.path, '.js');
        } catch (err) {
            this.emit('error', new PluginError(PLUGIN_NAME, err, {fileName: filePath}));
            return callback();
        }

        this.push(file);
        callback();
    });

    return stream;
};

