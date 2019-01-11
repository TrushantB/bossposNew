import React, { Component } from 'react';
import axios from 'axios';
class Modal extends Component {
    constructor(props) {
        super(props);
        this.handleSave = this.handleSave.bind(this);
        this.state = {
            tax:[],
            taxAssign:[],
            dropdownitem:[],
            Id:props.modalData.Id || '',
            productName: props.modalData.productTypeName || '',
            productDescription: props.modalData.productDescription || '',
            productTypeId: props.modalData.productTypeId || '',
            actualPrice: props.modalData.actualPrice || '',
            salePrice: props.modalData.salePrice || '',
            forEditTax:props.forEditTax || '',
           
        }
       }
        componentDidMount() {
            axios.get('http://localhost:3005/productType')
            .then((response) => {
            const result = response.data.filter(deleteddata => deleteddata.IsDeleted === 0 )
            this.setState({dropdownitem:result})
            } 
            )
            axios.get('http://localhost:3005/tax')
            .then(resp => {
            this.setState({taxAssign:resp.data})
            })
       }
    componentWillReceiveProps(nextProps) {
        this.setState({
            id:nextProps.modalData ? nextProps.modalData.id : '',
            productName: nextProps.modalData ? nextProps.modalData.productName : '',
            productDescription:nextProps.modalData ? nextProps.modalData.productDescription : '',
            productTypeId:nextProps.modalData ? nextProps.modalData.productTypeId : '',
            actualPrice:nextProps.modalData ? nextProps.modalData.actualPrice : '',
            salePrice:nextProps.modalData ? nextProps.modalData.salePrice : '',
            dropdownmenu:nextProps.dropdownmenu ? nextProps.dropdownmenu : '',
            checkBoxMenu:nextProps.checkBoxMenu ? nextProps.checkBoxMenu : '',
            forEditTax:nextProps.forEditTax ? nextProps.forEditTax : '',
        });   
    } 

                productNameHandler(e) {
                    this.setState({ productName: e.target.value });        
                }

                productDescriptionHandler(e) {
                    this.setState({ productDescription: e.target.value });
                }
                productTypeIdHandler(e) {
                     this.setState({ productTypeId:e.target.value });
                 }
                actualPriceHandler(e) {
                    this.setState({ actualPrice: Number(e.target.value) });
                    this.setState({ salePrice: Number(e.target.value) });
                }
                
                salePriceHandler(e) {
                    this.setState({ salePrice: e.target.value });
                }
               
    newhandleSave(e) {      
            const items={
             "id":'',
             "productName":this.state.productName,
             "productDescription":this.state.productDescription,
             "productTypeId":this.state.productTypeId,
             "actualPrice":this.state.actualPrice,
             "salePrice":this.state.salePrice,
             "tax":this.state.tax,
             "IsDeleted": 0
           }
              axios.post('http://localhost:3005/product',items)
             .then()
             .catch(err =>{
             console.log('faild:',err)
        
         })
          
          const item =  {
            productName: this.state.productName,
            productDescription: this.state.productDescription,
            productTypeId: this.state.productTypeId,
            actualPrice:this.state.actualPrice,
            salePrice:this.state.salePrice,
          };
          this.props.saveModalDetails(item)
      }

    handleSave() {
        const items={
            "id":'',
            "productName":this.state.productName,
            "productDescription":this.state.productDescription,
            "productTypeId":this.state.productTypeId,
            "actualPrice":this.state.actualPrice,
            "salePrice":this.state.salePrice,
            "tax":this.state.tax,
            "IsDeleted": 0
          }
   
          axios.put('http://localhost:3005/product/'+ this.state.id ,items)
          .then(this.render())
        .catch(err =>{
            console.log('faild:',err)
       
        })
         
         const item = this.state;
         this.props.saveModalDetails(item)
        
        
    }
    TaxAssign = (e) => {
       // e.preventDefault()
        if(e.target.checked===true) {
        this.state.tax.push(e.target.id)
        const taxValue= Number(this.state.actualPrice*e.target.value)/100
        const salePrice=Number(this.state.salePrice) + Number(taxValue);
        this.setState({salePrice})
        }else {
          for(let i=0;i<this.state.tax.length;i++) {
            if(this.state.tax[i]===e.target.id) {
              this.state.tax.splice(i,1);
            }
          }
          const taxValue= (this.state.actualPrice*e.target.value)/100
          this.setState({salePrice:this.state.salePrice - taxValue})
        }        
      }
   
    render() {
       const taxAssign = this.state.taxAssign.map((item) => {
          console.log(this.props.forEditTax)
            return (
            <li className="checkbox form-group" key={item.id}>
                    <label className="tax-name"> <input type="checkbox" id={item.id} name={item.taxName} value={item.taxValue} 
                        checked={this.props.forEditTax && this.props.forEditTax.includes(String(item.id))}
                           onChange={(e) => {this.TaxAssign(e)}}/>
                              <b>{item.taxName}</b></label>
                   </li>
              
            )
          });
          const dropdownmenu = this.state.dropdownitem.map((item) => {
            return (
                
               <option key={item.Id}  value={item.Id}>
               {item.productTypeName}</option> 
               
            )
          });
        
        return (
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Product</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group row">
                                    <label for="staticEmail" className="col-sm-4 col-form-label">Name:</label>
                                    <div className="col-sm-8">
                                       <input value={this.state.productName} onChange={(e) => this.productNameHandler(e)} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label for="inputPassword" className="col-sm-4 col-form-label">Description:</label>
                                    <div className="col-sm-8">
                                       <input value={this.state.productDescription} onChange={(e) => this.productDescriptionHandler(e)} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label for="staticEmail" className="col-sm-4 col-form-label">ProductType:</label>
                                    <div className="col-sm-8">
                                        <select className="col-sm-7" id="productTypeId" onChange={(e) => this.productTypeIdHandler(e)}>
                                                    {dropdownmenu}
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label for="staticEmail" className="col-sm-4 col-form-label">Actual price:</label>
                                    <div className="col-sm-8">
                                        <input value={this.state.actualPrice} onChange={(e) => this.actualPriceHandler(e)} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label for="staticEmail" className="col-sm-4 col-form-label">Sale Price:</label>
                                    <div className="col-sm-8">
                                        <input value={this.state.salePrice} onChange={(e) => this.salePriceHandler(e)} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label for="staticEmail" className="col-sm-4 col-form-label">Taxes:</label>
                                    <div className="col-sm-8">
                                        <input  type="text" id="dLabel" placeholder="Assign a taxes here"    
                                              data-toggle="dropdown" aria-haspopup="false" />
                                         <ul className="dropdown-menu" aria-labelledby="dLabel">
                                                {taxAssign}                      
                                         </ul>
                                    </div>
                                </div>
                            </form>                        
                            
                            
                        </div>
                       
                        <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                {this.state.id ? <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => { this.handleSave() }}>Save changes</button>
                                :
                                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={(e) =>{ this.newhandleSave(e)}}>Add new</button>
                                }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Modal;