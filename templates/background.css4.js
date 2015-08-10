module.exports = require('lodash').template(
"<% _.each(data,function(value,index){%>"+
".bg-<%=index%>{ background:<%=transform(value)%>}\n"+
"<%});%>");
