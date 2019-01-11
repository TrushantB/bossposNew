import React, { Component } from 'react';
import '../App.css';
import SellingProduct from './SellingProduct';
import axios from 'axios';
var includingTaxes=0;
class Home extends Component {
  constructor(props) {
    super(props);
    this.state= {
      taxData:[],
      productData:[],
      theadData:null,
      tbodyData:null,
      tbodyDataAll:[],
      productId:null

    }
    axios.get('http://localhost:3005/tax')
    .then((response) => {
    const result = response.data.filter(deleteddata => deleteddata.IsDeleted === 0 );
    this.setState({taxData:result})
})  
    axios.get('http://localhost:3005/product')
    .then((response) => {
    const result = response.data.filter(deleteddata => deleteddata.IsDeleted === 0 );
    this.setState({productData:result})
}) 
  }
      totalAmountHandle = (e)=> {
      includingTaxes=includingTaxes+e;
     
    }
     perticulerSelect = (productId) => {
      this.setState({productId:productId})
        
            if(this.state.productData) { 
                this.state.tbodyDataAll.push(this.state.productData.map((item,index) => { 
                   if(item.id==productId)  {
                       return (
                       <tr key={index}>
                           <td>{item.actualPrice}</td>
                               { this.state.taxData.map((gst) => {
                                   return(
                                       <td>{ (Number(item.actualPrice) * Number(gst.taxValue))/100 }
                                           { this.totalAmountHandle((Number(item.actualPrice) * Number(gst.taxValue))/100)}
                                       </td>                              
                                   )                             
                               }) 
                               }
                           <td>{item.actualPrice + includingTaxes}{includingTaxes=0}</td>
                       </tr>
                       )
                   }  
                 }
               ))
               }
          this.setState({tbodyData:this.state.tbodyDataAll})
               
              
            }
            
            render() {
              //  this.setState({tbodyData:this.state.tbodyDataAll})
    return (
      <div className="row">
      <div className="col-sm-8">

          <SellingProduct perticulerSelect={(e)=>this.perticulerSelect(e)} /> 
    </div>
     <div className="col-sm-4">
     <p> PURCHASE ITEMS</p>
         <table border="1">
         <thead>
            { this.state.productData && this.state.productId ? 
                this.state.productData.map((item,index) => { 
                   if(item.id==this.state.productId)  {
                        return (
                                <tr key={index}>                          
                                    <th>price</th>
                                        { this.state.taxData.map((gst) => {
                                           return(
                                                  <th>{gst.taxName} ({gst.taxValue})%</th>
                                                 )                             
                                          }) 
                                        }
                                     <th>Amount</th>                          
                                </tr>
                         )
                    }  
                })
              : null 
            }
         </thead>
         <tbody>
          { this.state.productId &&
               this.state.tbodyData.map((item) => {
                 return item;
               })
           }
         </tbody>  
         </table>       
    </div>
    </div>
          )
  }
}

export default Home;
