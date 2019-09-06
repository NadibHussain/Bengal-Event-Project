import React, { Component } from 'react'

export default class CurrentForm extends Component {
  render() {
    var {formdata}=this.props
    // console.log(formdata)
    if(formdata.length!=0){
    return formdata.map(input=>{
      if(input.type=="text"){
        return(
          <div key={input.label} className="card">
          <div className="container">
          <label htmlFor="text-input">{input.label}</label>
          <input onChange={this.handlechange} type="text" className="form-control" id="textInput"/>
          </div>
          </div>
        )
      }
      else if(input.type=="description"){
        return(
          <div key={input.label}className="card">
          <div className="container">
          <label htmlFor="comment">{input.label}</label>
          <textarea className="form-control" rows="5" id="descriptionInput"></textarea>
          </div>
          </div>
        )
      }
      else if(input.type=="radio"){
        return(
          <div key={input.label}className="card">
          <div className="container">
          <label >{input.label}</label>
          {input.options.map(option =>{
            return (
              <div key={option}>
                <div className="form-check">
                  <label className="form-check-label">
                    <input type="radio" className="form-check-input" name="optradio" value={option}/>
                    {option}
                  </label>
                </div>
              </div>
              
            )
          })}
          </div>
          </div>
        )
      }
      else if(input.type=="checkbox"){
        return(
          <div key={input.label}className="card">
          <div className="container">
          <label >{input.label}</label>
          {input.options.map(option =>{
            return (
              <div key={option}>
                <div className="form-check">
                  <label className="form-check-label">
                    <input type="checkbox" className="form-check-input" name="optradio"value={option} />
                    {option}
                  </label>
                </div>
              </div>
              
            )
          })}
          </div>
          </div>
        )
      }
      else if(input.type=="select"){
        return(
          <div key={input.label}className="card">
          <div className="container">
          <label >{input.label}</label>
          <select multiple class="form-control">
          {input.options.map(option =>{
            return (
              <option value={option} key={option}>{option}</option>
            )
          })}
          </select>
          </div>
          </div>
        )
      }
    })
  }
  else if(formdata.length==0){
    return <div>No Element Selected yet</div>
  }
  }
}
