var _ = require('lodash');

module.exports = function(ob) {
    "use strict";
    /*    delete ob._;
     */
    /*    console.log(ob);
     */
    var base = parseFloat(ob.transform(ob.data.default, 'default')['font-size'].replace(/px$/g, ''));

    var data = _.map(ob.data, function(val, index) {
        var value = ob.transform(val, index);
        var selectors = _.result(val, 'defaultElemtents', []);
        selectors.push('.t-' + index);
        var baseVariation = parseFloat(value['font-size'].replace(/px$/g, ''));
        return {
            fontSize: (baseVariation / base) + 'rem',
            lineHeight: value['line-height'].replace(/px$/g, '') / baseVariation + 'em',
            letterSpacing: (value['letter-spacing'] / 1000) + 'em',
            selectors: selectors.join(','),
            textTransform: _.result(value, 'text-transform', false),
            fontFamily: _.result(value, 'font-family', false),
            fontWeight: _.result(value, 'font-weight', false)
        }
    });

    var template = _.template(
        "html{font-size:<%=100*base/16%>%}\n" +
        "<%_.each(data,function(value,index){%>" +
        "<%=value.selectors%>{\n" +
        "<%=indent%>font-size:<%=value.fontSize%>;\n" +
        "<%=indent%>line-height:<%=value.lineHeight%>;\n" +
        "<%=indent%>letter-spacing:<%=value.letterSpacing%>;\n" +
        "<%if(value.fontFamily){%>" +
        "<%=indent%>font-family:<%=value.fontFamily%>;\n" +
        "<%}%>" +
        "<%if(value.textTransform){%>" +
        "<%=indent%>text-transform:<%=value.textTransform%>;\n" +
        "<%}%>" +
        "<%if(value.fontWeight){%>" +
        "<%=indent%>font-weight:<%=value.fontWeight%>;\n" +
        "<%}%>" +
        "}\n" +
        "<%})%>"
    );
    return template({
        data: data,
        base: base,
        _: _,
        indent: ob.options.indent
    });

}
