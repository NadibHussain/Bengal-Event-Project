import React, { Component } from 'react'
import InputTypes from './InputTypes'
import Inputs from './Inputs'
import CurrentForm from './CurrentForm'
 

class FormCreator extends Component{
  state = {
    inputType:"Not Selected",
    data:[],
  }


  changeInput =(e)=>{
    this.setState({
      inputType:e.target.id
    })
    if(document.getElementById("textInput"))
    {
      document.getElementById("textInput").value="";
    }
    else if(document.getElementById("descriptionInput"))
    {
      document.getElementById("descriptionInput").value="";
    }
    else if(document.getElementById("radiolabel"))
    {
      document.getElementById("radiolabel").value="";
    }
    else if(document.getElementById("checkboxlabel"))
    {
      document.getElementById("checkboxlabel").value="";
    }
    else if(document.getElementById("selectInput"))
    {
      document.getElementById("selectInput").value="";
    }
    
  }

  submitInput =(data)=>{
    let newdata=[...this.state.data,data]
    this.setState({
      data:newdata
    })
    // console.log(data)
    // console.log(this.state.data)
  }
  submitstructure=()=>
  {
    this.props.formStructureSubmit(this.state.data)
  }

   render(){
     
       return (
           <div>
            <h4>Create your Form here</h4>
            <div className="row" style={{padding:"0px"}} >
              <div className="col-lg-6">
                <InputTypes changeInput={this.changeInput}></InputTypes>
                <button type="button" onClick={this.submitstructure} className="btn btn-success">Submit Form</button>
                <Inputs inputType={this.state.inputType} submitInput={this.submitInput}></Inputs>
              </div>
              <div className="col-lg-6">
                <h4>Current Form Preview</h4>
                <CurrentForm formdata={this.state.data}></CurrentForm>
              </div>
            </div>                      
          </div>
       )
   }
}

export default FormCreator;