import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {isEmpty} from '../helpers'
import Pagemanager from './Pagemanager'
export default class EventList extends Component {
  
  state={
    next:"",
    previous:"",
    count:0,
    list:[],
    
  }

  componentDidMount(){
   this.getdata('http://localhost:8000/api/event/')
  }


  getdata =(link)=>{
    var authToken=localStorage.getItem("token")
    fetch(link,{
      method: 'GET',
      headers:{
        Accept: 'application/json',
                 'Content-Type': 'application/json',
                 'Authorization': "Bearer " + authToken,
      }
    }).
    then(result =>{
       return result.json();
    }).then(data =>{
        //console.log(data)
        this.setState(
            {
              next:data.next,
              previous:data.previous,
              list:data.results,
              count:data.count
            }
        )
    })
}

  dateformatconverter = (date) =>
  {
    var data=date.split("T")
    var date =new Date(data[0])
    var daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var monthNames = [
      "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ];
    var str=daysOfWeek[date.getDay()]+" "+date.getDate()+" "+monthNames[date.getMonth()]+" "+date.getFullYear()
    return str
  }

  render() {
    var {list}=this.state
    
    if(list.length>0){
      
      return (
        <div>
          {list.map(event =>{
            var date=this.dateformatconverter(event.event_date)
            return(
            <div className="card" key={event.id}>
            <div className="card-body">
              <h5 className="card-title">{event.title}</h5>
              <h6 className="card-subtitle mb-2 text-muted">{event.created_by}</h6>
              <p className="card-text">{date}</p>
              <Link to={'/detail/'+event.id}>Learn More
              </Link>
            </div>
          </div>
          )
          })}
          <Pagemanager getdata={this.getdata} count={this.state.count} next={this.state.next} previous={this.state.previous}></Pagemanager>
        </div>
      )
    }
    else if(list.length==0){
      return (
        <div className="spinner-grow" role="status">
          <span className="sr-only">Loading...</span>
        </div>
    )
    }
    
  }
}
