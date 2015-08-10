module.exports = require('lodash').template(
"<% _.each(data,function(value,index){%>"+
".<%=resp%>m<%=index%>{ margin:<%=transform(value)%>}\n"+
".<%=resp%>mt<%=index%>{ margin-top:<%=transform(value)%>}\n"+
".<%=resp%>mb<%=index%>{ margin-bottom:<%=transform(value)%>}\n"+
".<%=resp%>ml<%=index%>{ margin-left:<%=transform(value)%>}\n"+
".<%=resp%>mr<%=index%>{ margin-right:<%=transform(value)%>}\n"+
".<%=resp%>my<%=index%>{ margin-top:<%=transform(value)%>; margin-bottom:<%=transform(value)%>}\n"+
".<%=resp%>mx<%=index%>{ margin-left:<%=transform(value)%>; margin-right:<%=transform(value)%>}\n"+
"<%});%>");
