var base = require('./index');

base({
	data:{
        brakepoint:{
            sm:'40em',
            md:'52em',
            lg:'64em'
        },
        padding:{
    		0:'10px',
    		1:'20px',
            bp:{
                sm:function(value){
                        return (value.replace(/px$/g,'') * 1.5)+'px';
                }
            }
    	},
        margin:{
            small:'10px',
            bp:{
                sm:function(value){
                        return (value.replace(/px$/g,'') * 1.5)+'px';
                }
            }
        }

    }
},'css4').toString(function(err,result){
	console.log(result.join(''));
});
