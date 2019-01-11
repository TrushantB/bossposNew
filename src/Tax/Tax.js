import React, { Component } from 'react';
import Modal from './Modal.js';
import Axios from 'axios';
class Tax extends Component {
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
        brochure: [],
        perticulerdata: [],
        alldata:[]
    }
    Axios.get('http://localhost:3005/tax')
        .then((response) => {
          const result = response.data.filter(deleteddata => deleteddata.IsDeleted ===0 );
          this.setState({brochure:result})
          this.setState({alldata:result})
        }
        )
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
 deleteItem(index,id) {
    let tempBrochure = this.state.brochure;
    tempBrochure.splice(index, 1);
    this.setState({ brochure: tempBrochure });   
    Axios.delete('http://localhost:3005/tax/'+id)
    .then()
  }
  
  searchEngine(event) {
    if(this.state.brochure.length > 0){
    const searched=this.state.alldata.filter((match) =>{
      return (
               match.taxName.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1 
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
          <td>{item.taxName}</td>
          <td>{item.taxDescription}</td>
          <td>{item.taxValue}</td>
          <td>
            <button className="btn btn-primary" data-toggle="modal" data-target="#exampleModal"
               onClick={() => this.replaceModalItem(index)}>edit</button> {" "}
            <button className="btn btn-danger" onClick={() => this.deleteItem(index,item.id)}>remove</button>
          </td>
        </tr>
            
       
      )
    });
    
    return (
      <div>
        <div style={{ textAlign: "center" }}>
          <h1>TAX </h1>
        </div>
        <div className="modal-body">
            <form className="form-inline my-2 my-lg-0" style={{ position: 'absolute',top: -105 ,right: 0,left:900, }}>
                <input className="form-control mr-sm-2" type="search" placeholder="Search By Name..." onChange={this.searchEngine.bind(this)} />
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
         </div>
           <button className="btn btn-success" data-toggle="modal" data-target="#exampleModal"
        
             onClick={() => this.addModalItem(this.state.brochure.length)}>ADD</button>
          <table className="table table-striped">
              <tr>
                  <td><b>Index</b></td>
                  <td><b>Tax Name</b></td>
                  <td><b>Tax Value</b></td>
                  <td><b>Tax Description</b></td>
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
export default Tax;


