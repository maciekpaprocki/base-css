var base = require('./index');

base({
	padding:{
		small:'10px',
		big:'20px'
	}
},'css4').toString(function(result){
	console.log(result);
});