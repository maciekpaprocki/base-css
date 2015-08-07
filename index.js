var _ = require('lodash');
var defaults = require('defaults');

var BaseCSS = function(options,version){
    this.options = options;
    this.templatePath = [__dirname];

}

BaseCSS.prototype.getTemplate(name,vari){

}
BaseCSS.addTemplate.getTemplate()

BaseCSS.prototype.toString(){

}

module.exports = function(options,version){

    if(_.isUndefined(version)){
        version  = 'css';
    }else if(!_.isString(version)){
        throw new Error('second argument should be string, try "css" ;)');
    }
    if(!_.isObject(options)){
        return new BaseCSS(options,version);
    }
}   
