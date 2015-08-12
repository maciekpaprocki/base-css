module.exports = require('lodash').template(
    //define vars for base
    "<%if(resp===''){%>" +
    ":root{\n" +
    "<% _.each(data,function(value,index){%>" +
    "<%=options.indent%>--space-<%=resp%><%=index%>:<%=transform(value)%>;\n" +
    "<%});%>" +
    "}" +
    "<%}%>\n" +
    //because
    "<% _.each(data,function(value,index){%>" +
    ".<%=resp%>p<%=index%>{ padding:<%=transform(value)%>}\n" +
    ".<%=resp%>pt<%=index%>{ padding-top:<%=transform(value)%>}\n" +
    ".<%=resp%>pb<%=index%>{ padding-bottom:<%=transform(value)%>}\n" +
    ".<%=resp%>pl<%=index%>{ padding-left:<%=transform(value)%>}\n" +
    ".<%=resp%>pr<%=index%>{ padding-right:<%=transform(value)%>}\n" +
    ".<%=resp%>py<%=index%>{ padding-top:<%=transform(value)%>; padding-bottom:<%=transform(value)%>}\n" +
    ".<%=resp%>px<%=index%>{ padding-left: <%=transform(value)%>; padding-right:<%=transform(value)%>}\n" +
    "<%});%>");
