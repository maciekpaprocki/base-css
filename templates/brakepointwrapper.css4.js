module.exports = require('lodash').template(
    "\n@media(<%=(_.has(options.brakepoints,brakepoint)?'--brakepoint-'+brakepoint:'min-width:'+brakepoint)%>){\n\n"+
    "    <%=content%>\n"+
    "}\n");
