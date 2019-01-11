import React from 'react';
import axios from 'axios'

import { Card, Button, CardTitle, CardText } from 'reactstrap';

class SellingProduct extends React.Component {
    constructor() {
        super();
        this.state={
            productData:[],
            productId:null,
            temp:[],
            taxData:[]
        }
axios.get('http://localhost:3005/product')
.then((response) => {
    const result = response.data.filter(deleteddata => deleteddata.IsDeleted === 0 );
    this.setState({productData:result})
})
    }
   
render() {  
        const ptoducts=this.state.productData.map((item) => {
            return(
               <lable>
                  <div>
                    <Card body outline color="secondary">
                        <CardTitle >{item.productName}</CardTitle>
                        <CardText  >{item.salePrice}</CardText>
                         <Button onClick={() => {this.props.perticulerSelect(item.id)}} 
                                 color="primary" id="product" >Add</Button> 
                    </Card>
                  </div>            
               </lable>           
            )
        })
      return(
         <div className="form-inline">         
               { ptoducts}           
         </div>
            );
        }
       
    }
export default SellingProduct;