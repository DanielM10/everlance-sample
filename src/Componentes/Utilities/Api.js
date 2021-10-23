import React from 'react';
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import axios from 'axios';

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
export function api_handleErrors(response) {
	
    if (!response.ok) {
		
    	throw response; 
    }
    return response;
}

export function busquedadedatos(querystring){
	axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
	return axios.get('https://www.metaweather.com/api/location/'+'search/?query='+querystring
	)
	
}

export function busquedadedatosdeatil(data){
axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
return axios.get('https://www.metaweather.com/api/location/'+data)
}