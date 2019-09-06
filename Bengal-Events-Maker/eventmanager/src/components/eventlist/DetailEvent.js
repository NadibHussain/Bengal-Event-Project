import React, { Component } from 'react'
import {isEmpty} from '../helpers'
import {Link} from 'react-router-dom'
export default class DetailEvent extends Component {

    state={
        data:{}
    }

    componentDidMount(){
        var {id}=this.props.match.params;
        var authToken=localStorage.getItem("token")
        fetch("http://localhost:8000/api/event/"+id,{
            method: 'GET',
            headers:{
              Accept: 'application/json',
                       'Content-Type': 'application/json',
                       'Authorization': "Bearer " + authToken,
            }
          }).then(res=>{
            return res.json();
        }).then(data=>{
            this.setState({
                data:data
            })
        })
    }

    

    render() {
    var {data}=this.state;
    var register=true;
    if(data.formstructure=="null")
    {
        var register=false;
    }
    
    //console.log(data)
    if(!isEmpty(data))
    {
        return (
            <div>
            
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-2">
                                <img src="https://image.ibb.co/jw55Ex/def_face.jpg" className="img img-rounded img-fluid"/>
                                
                            </div>
                            <div className="col-md-10"> 
                                    <h3 className="float-left"><strong>{data.title}</strong></h3>
                                    <br/>
                                    <br/>
                                    {register? <Link to={'/register/'+data.id}  type="button" id="Register" value="Register now" className="btn btn-primary">Register now</Link>:<div></div>}
                                    <Link style={{margin:"5px"}} to={'/registeredUser/'+data.id}  type="button" id="RegisteredUser" value="Register now" className="btn btn-primary">Registered Users</Link>
                                    <br/>
                                    <br/>
                                    <div className="clearfix"></div>
                                    <h5>Description:</h5>
                                    <p>{data.description}</p>
                                    <h5>Location:</h5>
                                    <p>{data.location}</p>
                                    <h5>Number of Seats:</h5>
                                    <p>{data.seat_number}</p>
                                    </div>
                        </div>
                    </div>
                </div>
            </div>
            
        )
    }
    else{
       
        return (
            <div className="spinner-grow" role="status">
              <span className="sr-only">Loading...</span>
            </div>
        )
    }
    
    }
}
