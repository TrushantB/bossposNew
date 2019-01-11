import React, { Component } from 'react';
import Axios from 'axios';


class Modal extends Component {
    constructor(props) {
        super(props);
        this.handleSave = this.handleSave.bind(this);
        this.state = {
            id:props.modalData.id || '',
            taxName: props.modalData.taxName || '',
            taxDescription: props.modalData.taxDescription || '',
            taxValue:props.modalData.taxValue || '',
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            id:nextProps.modalData ? nextProps.modalData.id : '',
            taxName: nextProps.modalData ? nextProps.modalData.taxName : '',
            taxDescription:nextProps.modalData ? nextProps.modalData.taxDescription : '',
            taxValue:nextProps.modalData ? nextProps.modalData.taxValue : '',

        });
    } 

    taxNameHandler(e) {
        this.setState({ taxName: e.target.value });        
    }

    taxDescriptionHandler(e) {
        this.setState({ taxDescription: e.target.value });
    }
    taxValueHandler(e) {
        this.setState({ taxValue: e.target.value });        
    }
    newhandleSave()  {
      
          const item = this.state;
          this.props.saveModalDetails(item)
          Axios.post('http://localhost:3005/tax',({
            
              "taxName":this.state.taxName,
              "taxDescription":this.state.taxDescription,
              "taxValue":this.state.taxValue,
              "IsDeleted": 0
          })).then(console.log(this.state.taxName))
          .catch(err =>{
              console.log('faild:',err)

          })   
      }

    handleSave() {
     
        const item = this.state;
        this.props.saveModalDetails(item)
        Axios.put('http://localhost:3005/tax/'+this.state.id,({
            "taxName":this.state.taxName,
            "taxDescription":this.state.taxDescription,
            "taxValue":this.state.taxValue,
            "IsDeleted": 0
        }))
        .then()
  }

    render() {
        console.log(this.state.Id)
        return (
            <div>             
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Tax</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                    <div class="form-group row">
                                        <label for="staticEmail" class="col-sm-4 col-form-label">Name:</label>
                                        <div class="col-sm-8">
                                            <input value={this.state.taxName} onChange={(e) => this.taxNameHandler(e)} />
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label for="inputPassword" class="col-sm-4 col-form-label">Description:</label>
                                        <div class="col-sm-8">
                                        <input value={this.state.taxDescription} onChange={(e) => this.taxDescriptionHandler(e)} />
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label for="staticEmail" class="col-sm-4 col-form-label">Value:</label>
                                        <div class="col-sm-8">
                                            <input value={this.state.taxValue} onChange={(e) => this.taxValueHandler(e)} />
                                        </div>
                                    </div>
                            </form>                        
                     </div>
  
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                          {this.state.id ? <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => { this.handleSave() }}>Save changes</button>
                          :
                          <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => { this.newhandleSave() }}>Add new</button>
                          }
                        </div>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}

export default Modal;