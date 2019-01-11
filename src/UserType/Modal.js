import React, { Component } from 'react';
import Axios from 'axios';


class Modal extends Component {
    constructor(props) {
        super(props);
        this.handleSave = this.handleSave.bind(this);
        this.state = {
            id:props.modalData.id || '',
            userTypeName: props.modalData.userTypeName || '',
            userDescription: props.modalData.userDescription || '',
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            id:nextProps.modalData ? nextProps.modalData.id : '',
            userTypeName: nextProps.modalData ? nextProps.modalData.userTypeName : '',
            userDescription:nextProps.modalData ? nextProps.modalData.userDescription : '',
        });
    } 

    userTypeNameHandler(e) {
        this.setState({ userTypeName: e.target.value });        
    }

    userDescriptionHandler(e) {
        this.setState({ userDescription: e.target.value });
    }
    newhandleSave()  {
      
          const item = this.state;
          this.props.saveModalDetails(item)
          Axios.post('http://localhost:3005/userType',({
              "id":'',
              "userTypeName":this.state.userTypeName,
              "userDescription":this.state.userDescription,
              "IsDeleted": 0
          })).then(console.log("inserted success"))
          .catch(err =>{
              console.log('faild:',err)

          })
       
      }

    handleSave() {
     
        const item = this.state;
        this.props.saveModalDetails(item)
        Axios.put('http://localhost:3005/userType/'+this.state.id,({
              "id":'',
              "userTypeName":this.state.userTypeName,
              "userDescription":this.state.userDescription,
              "IsDeleted": 0
        }))
        .then(console.log("update success"))
        
        
    }

    render() {
        return (
            <div>
               
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">User Type</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">



                            <form>
                            <div class="form-group row">
                                <label for="staticEmail" class="col-sm-4 col-form-label">Name:</label>
                                <div class="col-sm-8">
                                    <input value={this.state.userTypeName} 
                                    onChange={(e) => this.userTypeNameHandler(e)} />
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="inputPassword" class="col-sm-4 col-form-label">Description:</label>
                                <div class="col-sm-8">
                                <input value={this.state.userDescription} 
                                onChange={(e) => this.userDescriptionHandler(e)} />
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