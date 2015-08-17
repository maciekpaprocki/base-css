module.exports = require('lodash').template(
    ":root{\n" +
    "<% _.each(data,function(value,index){%>" +
    "<%=options.indent%>--color-<%=index%>: <%=value%>;\n" +
    "<%});%>" +
    "}\n" +
    "<% _.each(data,function(value,index){%>" +
    ".<%=index%>{ color: var(--color-<%=index%>) }\n" +
    "<%});%>");
