import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FormCreator from '../FormCreater/FormCreator'
export default class CreateEvent extends Component {
  state={
    eventdate:new Date(),
    form:false,
    formstructure:null,
  }

  handledate=(date)=>
  {
    this.setState({
      eventdate: date
    });
  }


  handleSubmit=(e)=>
  {
    e.preventDefault();
    var authToken=localStorage.getItem("token")
    let data={
      title: this.state.title,
      description:this.state.description,
      event_date: this.state.eventdate,
      seat_number: this.state.seat_number,
      location: this.state.location,
      formstructure:JSON.stringify(this.state.formstructure),
    }
    console.log(data)
    fetch('http://localhost:8000/api/event/create/',{
      method:'POST',
      headers:{
        Accept: 'application/json',
                 'Content-Type': 'application/json',
                 'Authorization': "Bearer " + authToken,
         },
      body:JSON.stringify(data),
    }).then(res => {
      return res.json()
    })
    .then(data => { 
      window.location.replace("http://localhost:8000/eventmanager/#/eventlist");
    })
  }

  formStructureSubmit=(structure)=>
  {
    this.setState({
      formstructure:structure
    })
    //console.log(structure)
  }


  isform=()=>{
    if(this.state.form)
    {

      return (
        <div>
        
        <FormCreator formStructureSubmit={this.formStructureSubmit}></FormCreator>
        <br/>
        {
          this.state.formstructure? <input onClick={this.handleSubmit} type="button" id="create" value="Create Event" className="btn btn-primary"/>: <input onClick={this.handleSubmit} type="button" id="create" value="Submit Form Before Creating Event" className="btn btn-secondary" disabled/>
        }
       
        </div>
      
        ) 
    }else{
       return <input onClick={this.handleSubmit} type="button" id="create" value="Create Event" className="btn btn-primary"/>
    }
  }

  handleChange=(e)=>
  {
    this.setState({
      [e.target.id]:e.target.value
    })
  }

  formRequired=()=>
  {
    this.setState({
      form:!this.state.form
    })
  }

  render() {
    // console.log(this.state)
    return (
      <div>
        <h1>Create A Event</h1>
        <form action="/accounts/signup/" method="POST" id="signup" >
              <div className="form-group">
                  <label htmlFor="username">Title</label>
                  <input type="text" className="form-control" id="title" name="title" onChange={this.handleChange}/> 
              </div>
              <div className="form-group">
                  <label htmlFor="password">Description</label>
                  <textarea type="password" className="form-control" id="description" name="description" onChange={this.handleChange} rows="6"/> 
              </div>
              <div className="form-group">
                  <label htmlFor="location">Location</label>
                  <textarea type="text" className="form-control" id="location" name="location" onChange={this.handleChange}/> 
              </div>
              
              <div className="row">
                <div className="col-md-3 ">
                  <div className="form-group">
                    <label htmlFor="username">Event Date</label>
                    <DatePicker selected={this.state.eventdate} onChange={this.handledate}/>
                  </div>
                </div>
                <div className="col-md-4 ">
                <div className="form-check">
                    <label className="form-check-label">
                      <input type="checkbox" className="form-check-input" value="" onClick={this.formRequired}/>Form Required?
                    </label>
                  </div> 
                </div>
                <div className="col-md-5">
                  <div className="form-group">
                    <label htmlFor="seat_number">Number of Seats</label>
                    <input type="number" min="10" className="form-control" id="seat_number" name="seat_number" onChange={this.handleChange}/> 
                  </div> 
                </div>
              </div>
                 
              <br/>
              {
                this.isform()
              }
             
          </form>
      </div>
    )
  }
}
