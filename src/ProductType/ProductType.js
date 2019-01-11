import React, { Component } from 'react';
import Modal from './Modal.js';
import Axios from 'axios';
//import { NavLink }  from 'react-router-dom';

class List extends Component {
  constructor(props) {
    super(props);

    this.replaceModalItem = this.replaceModalItem.bind(this);
    this.saveModalDetails = this.saveModalDetails.bind(this);
    this.condition = this.condition.bind(this);
    this.state = {
        search:'',
        isEdit: false,
        datalength:'',
      requiredItem: null,
     // brochure:[]
      brochure: [],
      alldata: [],
      perticulerdata: []
    }
    Axios.get('http://localhost:3005/productType')
        .then((response) => {
          const result = response.data.filter(deleteddata => deleteddata.IsDeleted === 0 );
          this.setState({brochure:result})
          this.setState({alldata:result})
        }
        )
        //console.log(this.state.brochure.length)
  }
  

  replaceModalItem(index) {
    this.setState({
      requiredItem: index,
      isEdit: true
    });
    console.log(index)
  }

  saveModalDetails(item) {
    const requiredItem = this.state.requiredItem;
    let tempbrochure = this.state.brochure;
    tempbrochure[requiredItem] = item;
    this.setState({ brochure: tempbrochure });
  }
  addSaveModelDetails(item) {
//console.log(item)
  }

  deleteItem(index,Id) {
    let tempBrochure = this.state.brochure;
    tempBrochure.splice(index, 1);
    this.setState({ brochure: tempBrochure });   
    Axios.delete('http://salty-badlands-70835.herokuapp.com/api/productType/'+Id)
    .then()
  }
  
  searchEngine(event) {
    if(this.state.brochure.length > 0){
    const searched=this.state.alldata.filter((match) =>{
     
        
      
        return (
                
                match.productTypeName.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1 
                ) 
        
            })
            this.setState({search:event.target.value})
            this.setState({brochure:searched})
  }
  else {
   alert ('No Data Found')
    this.setState({brochure:this.state.alldata});
  }
  }
 
  addModalItem() {
    this.setState({datalength:this.state.brochure.length})
    this.setState({requiredItem:this.state.brochure.length})
  }
  render() {    
 
    const brochure = this.state.brochure.map((item, index) => {
      return (
   
        <tr key={index}>
          <td>{index +1}</td>
          <td>{item.productTypeName}</td>
          <td>{item.Description}</td>
          <td>
            <button className="btn btn-primary" data-toggle="modal" data-target="#exampleModal"
        
               onClick={() => this.replaceModalItem(index)}>edit</button> {" "}
            <button className="btn btn-danger" onClick={() => this.deleteItem(index,item.Id)}>remove</button>
          </td>
        </tr>
            
       
      )
    });
    
    return (
      <div>
        <div style={{ textAlign: "center" }}>
          <h1>Product Type </h1>
         </div>
        <div className="modal-body">
            <form className="form-inline my-2 my-lg-0" style={{ position: 'absolute',top: -105 ,right: 0,left:900 }}>
                <input className="form-control mr-sm-2" type="search" placeholder="Search By Name..." onChange={this.searchEngine.bind(this)} />
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
        </div>
         <button className="btn btn-success" data-toggle="modal" data-target="#exampleModal"
        
        onClick={() => this.addModalItem(this.state.brochure.length)}>ADD</button>
        <table className="table table-striped">
        <tr>
        <td><b>Index</b></td>
          <td><b>Name</b></td>
          <td><b>Description</b></td>
        </tr>
          <tbody>
            {brochure}
          </tbody>
        </table>
        <div>
  
       {this.condition()}
        </div>
      </div>
    );
   
 
  }
  condition= () => {
    const data=this.state.isEdit ? this.state.brochure[this.state.requiredItem] : this.state.perticulerdata;
     return <Modal
       modalData={data}
        saveModalDetails={this.saveModalDetails}
        />
  }
  
}

export default List;


