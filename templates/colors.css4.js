module.exports = require('lodash').template(
    ":root{\n" +
    "<% _.each(data,function(value,index){%>" +
    "--color-<%=index%>:<%=value%>;\n" +
    "<%});%>" +
    "}\n" +
    "<% _.each(data,function(value,index){%>" +
    ".<%=index%>{color:var(--color-<%=index%>)}\n" +
    "<%});%>");
