import React, { Component } from 'react'
import {isEmpty} from '../helpers'

export default class RegisteredUserList extends Component {

    state={
        data:{}
    }

    componentDidMount(){
        var {id}=this.props.match.params;
        var authToken=localStorage.getItem("token")
        fetch('http://localhost:8000/api/event/register/'+id,{
            method:'GET',
            headers:{
              Accept: 'application/json',
                       'Content-Type': 'application/json',
                       'Authorization': "Bearer " + authToken,
               },
          }).then(res => {
            return res.json()
          })
          .then(data => { 
           
           //console.log(data)
           this.setState({
               data:data
           })
          })
    }
    render() {
        var{data}=this.state
        console.log(data)
       
         if(!isEmpty(data)){
            var structure=JSON.parse(this.state.data.formstructure)
            var {registered}=data
            
            return (
                <div>
                    <h2>{data.title}</h2>
                    <table className="table table-hover">
                        <thead>
                        <tr>
                    {structure.map((row,i) =>{
                        return(
                            <th key={i}>{row.label}</th>
                        )
                    })}
                    </tr>
                    </thead>
                    <tbody> 
                    {
                       registered.map((row,i)=>{
                        var rowdata=JSON.parse(row.data)
                        
                        return(
                            <tr key={i}>
                            {
                                rowdata.map((item,i)=>{
                                    
                                    if(typeof(item)=='string')
                                    {
                                        return <td key={i}>{item}</td>
                                    }
                                    else{
                                        return <td key={i}>{item.join(", ")}</td>
                                    }
                                })
                            }
                            </tr>
                        )
                        
                       }) 
                    }
                    
                    </tbody>
                    </table>
                </div>
            )
         }
         else
         {
             return (
                <div className="spinner-grow" role="status">
                <span className="sr-only">Loading...</span>
              </div>
             )
         }
        
    }
}
