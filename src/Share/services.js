import React from 'react';
import axios from 'axios';
const uri='http://localhost:3005/productType'

 export function ShowTaxData(){
   return axios.get(uri + '/api/UserTypes');
 }