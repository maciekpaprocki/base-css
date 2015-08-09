var _ = require('lodash');
var async = require('async');
var fs = require('fs');

var BaseCSS = function(options,extension){
    this.data = options.data;
    this.options = options;
    this.ext = extension;
    this.templatePaths = [__dirname];
    if(typeof this.options.templatePaths !== 'undefined'){
        if(_.isArray(this.options.templatePaths)){
            Array.prototype.apply(this.templatePaths,this.options.templatePaths);
        }
        this.templatePaths.push(this.templatePaths)
    }
    console.log('initiated');
    return this;
}

BaseCSS.prototype.getTemplate = function(name, cb){
    var self = this;
    var templateList = _.map(this.templatePaths,function(value){
        return self.createPath(value,name,self.extension);
    });
    if(templateList.length === 0){
        return cb(false);
    }
    async.map(templateList, fs.exists, function(results){
        var i, l = results.length;
        for(i = l-1; i>=0; i++){
            if(results[i]===true) return fs.readFile(templateList[i],function(){
                cb(templateList[i])
            });
        }
        return cb(false);
    });

}
BaseCSS.prototype.createPath = function(dir,name,extension) {
    return dir + '/' + name + '.' + extension + '.js';
}
BaseCSS.prototype.addTemplatePath = function(dir){
    if(!_.isString){
        throw new Error('Function addTemplatePath expects first attribute to be string');
    }else{  
        this.templatePaths.push(dir);
    }
    return this;
};
/*
    Expects dataname (need to be included in this.data)
    return Proper css/less... string
 */

BaseCSS.prototype.getPartial = function(dataName,cb){
    if(typeof this.data[dataName] === 'undefined'){
        throw new Error('data not found for ' + dataName);
    }
    this.getTemplate(index, function(template){
        if(!template){
                throw new Error('template not found for ' + dataName);
        }
        cb(_.template(template, {'data':this.data[dataName]})); 
    });
};

BaseCSS.prototype.toString = function(cb){
    var self = this;
    var res = [];
    async.map(_.keys(this.data), BaseCSS.prototype.getPartial.bind(this), function(results){ 
        return cb(results.join('\n'));
    });
};

module.exports = function(options,extension){

    if(_.isUndefined(extension)){
        extension  = 'css';
    }else if(!_.isString(extension)){
        throw new Error('second argument should be string, try "css" ;)');
    }
    if(!_.isObject(options)){
        console.log(new BaseCSS(options,extension));
        return new BaseCSS(options,extension);
    }
}   
