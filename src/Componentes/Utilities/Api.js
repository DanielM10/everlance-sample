const apiurl='https://www.metaweather.com/api/location/';
/*uTILERIAS GENERALES PARA CONTROLDE APIS DE DANIEL V2*/


function api_JsonToUrl(obj){
	
	var objKeys = Object.keys(obj);
	for(var i = 0; i<objKeys.length; i++){
		if(obj[objKeys[i]] == null || obj[objKeys[i]] === ''){
			delete obj[objKeys[i]];
		}
	}
	var url = new URLSearchParams(obj).toString();
	url = url ? "?"+url : '';
	return url;
}

/* General Consumo API */


export function busquedadedatos(querystring){
	return fetch(apiurl+'search/?query='+querystring, {
		method: 'GET',
		headers:{
			
			'Content-Type': 'application/json',
					
		}
	})		
}
export function busquedadedatosdeatil(data){
	return fetch(apiurl+data+'/', {
		method: 'GET',
		headers:{			
			'Content-Type': 'application/json',
				
		}
	})	
}