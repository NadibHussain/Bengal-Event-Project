import React, { Component } from 'react'

export default class Inputs extends Component {
  state={
    numberOfOptions:1,
  }

  createoptions = (e) =>
  {
   this.setState({
     numberOfOptions:e.target.value
   })
  }

  handlechange=(e)=>{

    this.setState({
      [e.target.id]:e.target.value
    })
  }
  handlesubmit=(e)=>{

    e.preventDefault()
    if(e.target.id=="text-input-form"){ 
      var data={
        type:"text",
        label:this.state.textInput,
       
      }
      this.props.submitInput(data);
    }
    else if(e.target.id=="description-input-form"){
      var data={
        type:"description",
        label:this.state.descriptionInput,
        
      }
      this.props.submitInput(data);
    }
    else if(e.target.id=="radio-input-form"){
      var options=[]
      for(var x=0;x<this.state.numberOfOptions;x++)
      {
        options.push(document.getElementById("Option"+x).value)
      }
      var data={
        type:"radio",
        label:this.state.radiolabel,
        number:this.state.numberOfOptions,
        options:options,
        
      }
      console.log(data)
      this.props.submitInput(data);
    }
    else if(e.target.id=="checkbox-input-form"){
      var options=[]
      for(var x=0;x<this.state.numberOfOptions;x++)
      {
        options.push(document.getElementById("Option"+x).value)
      }
      var data={
        type:"checkbox",
        label:this.state.checkboxlabel,
        number:this.state.numberOfOptions,
        options:options,
        
      }
      this.props.submitInput(data);
    }
    else if(e.target.id=="select-input-form"){
      var options=[]
      for(var x=0;x<this.state.numberOfOptions;x++)
      {
        options.push(document.getElementById("Option"+x).value)
      }
      var data={
        type:"select",
        label:this.state.selectInput,
        number:this.state.numberOfOptions,
        options:options,
      }
      
      this.props.submitInput(data);
    }
  }

  render() {
    //console.log(this.state)
    var items = []
    for(var x=0;x<this.state.numberOfOptions;x++)
    {
      items.push(
      <div key={x}>
      <label htmlFor={"Option-"+x }>Label Of the Option {x+1}:</label>
      <input  type="text" className="form-control" id={"Option"+x } />
      </div>
      )
    }

    if(this.props.inputType =="text-input"){
      return (
      <form id="text-input-form" onSubmit={this.handlesubmit}>
      <div className="form-group">
      <br/> 
      <label htmlFor="text-input">Label Of the Text input:</label>
      <input onChange={this.handlechange} type="text" className="form-control" id="textInput"/>
      </div>
      <button type="submit" className="btn btn-primary">Add</button>
      </form>
    )
  }
    else if(this.props.inputType =="text-description"){
      return (
      <form id="description-input-form" onSubmit={this.handlesubmit}>
      <div className="form-group">
      <br/> 
        <label htmlFor="descriptionInput">Label Of the Description input:</label>
        <input onChange={this.handlechange} type="text" className="form-control" id="descriptionInput"/>
      </div>
      <button type="submit" className="btn btn-primary">Add</button>
      </form>
    )
    }
    else if(this.props.inputType =="radio-input"){
      
      return (
        <form id="radio-input-form" onSubmit={this.handlesubmit}>
      <div className="form-group">
      <br/> 
        <label htmlFor="radiolabel">Label Of the Radio input:</label>
        <input onChange={this.handlechange} type="text" className="form-control" id="radiolabel"/>
  
        <label htmlFor="Quantity">Number of Options: </label>
        <br/>
        <input onChange={this.createoptions} type="number" name="form-control" min="1" id="Quantity"/>
        {items}
      </div>
      <button type="submit" className="btn btn-primary">Add</button>
      </form>
    )
    }
  else if(this.props.inputType =="Check-box"){
    return (
      <form id="checkbox-input-form" onSubmit={this.handlesubmit}>
    <div className="form-group">
     <br/> 
      <label htmlFor="checkboxlabel">Label Of the Checkbox-box:</label>
      <input onChange={this.handlechange} type="text" className="form-control" id="checkboxlabel"/>
 
      <label htmlFor="Quantity">Number of Options: </label>
      <br/>
      <input onChange={this.createoptions} type="number" name="form-control" min="1" id="Quantity"/>
      {items}
    </div>
    <button type="submit" className="btn btn-primary">Add</button>
      </form>
  )
  }
  else if(this.props.inputType =="Select"){
    return (
      <form id="select-input-form" onSubmit={this.handlesubmit}>
    <div className="form-group">
     <br/> 
      <label htmlFor="selectInput">Label Of the Select-Input:</label>
      <input onChange={this.handlechange} type="text" className="form-control" id="selectInput"/>
 
      <label htmlFor="Quantity">Number of Options: </label>
      <br/>
      <input onChange={this.createoptions} type="number" name="form-control" min="1" id="Quantity"/>
      {items}
    </div>
    <button type="submit" className="btn btn-primary">Add</button>
      </form>
  )
  }
    else{
      return (
        <div>
          <br/>
        </div>
    
    
    )
  }
  }
}
