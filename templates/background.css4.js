module.exports = require('lodash').template(
    ":root{\n" +
    "<% _.each(data,function(value,index){%>" +
    "<%=options.indent%>--<%=index%>: <%=value%>;\n" +
    "<%});%>" +
    "}\n" +
    "<% _.each(data,function(value,index){%>" +
    ".bg-<%=index%>{ background: var(--<%=index%>) }\n" +
    "<%});%>");
