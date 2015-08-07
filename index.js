var _ = require('lodash');
var defaults = require('defaults');
var async = require('async');

var BaseCSS = function(options,extension){
    this.options = options;
    this.ext = extension;
    this.templatePaths = [__dirname];

}

BaseCSS.prototype.getTemplate = function(name,extension,callback){
    var self = this;
    var templateList = _.map(this.templatePaths,function(value){
        return self.createPath(value,name,extension);
    })

    async.filter(templateList, fs.exists, function(results){
    
    });

}
BaseCSS.prototype.createPath = function(dir,name,extension) {

}
BaseCSS.prototype.addTemplatePath= function(dir){
    if(!_.isString){
        throw new Error('Function addTemplatePath expects first attribute to be string');
    }else{  
        this.templatePaths.push(dir);
    }
}

BaseCSS.prototype.toString = function(){

}

module.exports = function(options,extension){

    if(_.isUndefined(extension)){
        extension  = 'css';
    }else if(!_.isString(extension)){
        throw new Error('second argument should be string, try "css" ;)');
    }
    if(!_.isObject(options)){
        return new BaseCSS(options,extension);
    }
}   
