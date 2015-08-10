module.exports = require('lodash').template(
"<% _.each(data,function(value,index){%>"+
"@custom-media --breakpoint-<%=index%> (min-width: <%=value%>);\n"+
"<%});%>");
