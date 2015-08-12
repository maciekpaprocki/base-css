var _ = require('lodash');
var async = require('async');
var fs = require('fs');

var BaseCSS = function(options, extension) {
    this.data = options.data;
    options.breakpoints = options.data.breakpoint;
    delete options.data;
    this.options = options;
    this.ext = extension;

    this.templatePaths = [__dirname + '/templates'];
    if (typeof this.options.templatePaths !== 'undefined') {
        if (_.isArray(this.options.templatePaths)) {
            Array.prototype.apply(this.templatePaths, this.options.templatePaths);
        }
        this.templatePaths.push(this.templatePaths)
    }


}

BaseCSS.prototype.getTemplate = function(name, cb) {
    var self = this;
    var templateList = _.map(this.templatePaths, function(value) {
        return self.createPath(value, name, self.ext);
    });

    if (templateList.length === 0) {
        return cb(false);
    }
    async.filter(templateList, fs.exists, function(results) {
        if (results.length > 0) {
            cb(require(templateList.shift()));
        } else {
            return cb(false);
        }
    });

}
BaseCSS.prototype.createPath = function(dir, name, extension) {

    return dir + '/' + name + '.' + extension + '.js';
}
BaseCSS.prototype.addTemplatePath = function(dir) {
    if (!_.isString) {
        throw new Error('Function addTemplatePath expects first attribute to be string');
    } else {
        this.templatePaths.unshift(dir);
    }
    return this;
};
/*
    Expects dataname (need to be included in this.data)
    return Proper css/less... string
 */

BaseCSS.prototype.getPartial = function(dataName, cb) {

    var self = this;
    if (typeof this.data[dataName] === 'undefined') {
        throw new Error('data not found for ' + dataName);
    }
    this.getTemplate(dataName, function(fun) {

        if (fun === false) {
            throw new Error('template not found for ' + dataName);
        }
        var compiled = '';
        if (_.result(self.data[dataName], 'bp', false)) {

            var bp = self.data[dataName].bp;
            delete self.data[dataName].bp;
            compiled = fun({
                'resp': '',
                'transform': function(t) {
                    return t;
                },
                'data': self.data[dataName],
                'options': self.options,
                '_': _
            });
            _.each(bp, function(value, index) {
                console.log(dataName + ' adding another breakpoint')
                var content = fun({
                    'resp': index + '-',
                    'transform': value,
                    'data': self.data[dataName],
                    'options': self.options,
                    '_': _
                });
                compiled += self.breakpointwrapper({
                    breakpoint: index,
                    options: self.options,
                    content: content.replace(/(\r\n|\n|\r)/gm, '$&' + self.options.indent),
                    _: _
                });
            });
        } else {
            compiled = fun({
                'resp': '',
                'transform': function(t) {
                    return t;
                },
                'data': self.data[dataName],
                'options': self.options,
                '_': _
            });
        }
        cb(null, compiled);
    });

};

BaseCSS.prototype.toString = function(cb) {

    var self = this;
    if (!_.result(this, 'breakpointwrapper', false)) {
        this.getTemplate('breakpointwrapper', function(fun) {
            self.breakpointwrapper = fun;
            var keys = _.keys(self.data);
            async.map(keys, BaseCSS.prototype.getPartial.bind(self), function(err, results) {
                if (self.options.addComments === true) {
                    results = _.map(results, function(value, index) {
                        return "/* " + keys[index] + " */\n" + value;
                    });
                }
                cb(err, results.join('\n'));
            });
        })
    } else {
        async.map(_.keys(this.data), BaseCSS.prototype.getPartial.bind(this), function(err, results) {
            cb(err, results.join('\n'));
        });
    }

};
BaseCSS.prototype.writeTo = function(path, cb) {
    this.toString(function(err, res) {
        if (err) throw err;

        fs.writeFile(path, res, function(err) {
            if (err) {
                throw err;
            } else {
                cb(path, res);
            }
        });
    });

}
BaseCSS.defaultOptions = {
    indent: '    ',
    addComments: true,
};
module.exports = function(options, extension) {
    options = _.extend(BaseCSS.defaultOptions, options)
    if (_.isUndefined(extension)) {
        extension = 'css';
    } else if (!_.isString(extension)) {
        throw new Error('second argument should be string, try "css" ;)');
    }
    if (_.isObject(options)) {
        return new BaseCSS(options, extension);
    } else {
        throw new Error('first argument should be object of settings');
    }
}
