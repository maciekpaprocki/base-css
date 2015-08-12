module.exports = function(ob){  
    
    return "\n@media("+(ob._.has(ob.options.breakpoints,ob.breakpoint)?'--breakpoint-'+ob.breakpoint:'min-width:'+ob.breakpoint)+"){\n\n"+
    ob.options.indent+ob.content+"\n"+
    "}\n"};
