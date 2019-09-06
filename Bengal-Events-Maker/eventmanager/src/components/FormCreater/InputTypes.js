import React, { Component } from 'react'

export default class InputTypes extends Component {
    

  render() {
    var style={
        margin:"5px"
    }
    return (
      <div>
       <div >
        <button onClick={this.props.changeInput} style ={style} type="button" className="btn btn-warning" id="text-input">Text Input</button>
        <button onClick={this.props.changeInput} style ={style} type="button" className="btn btn-warning"id="text-description">Description Input</button>
        <button onClick={this.props.changeInput} style ={style} type="button" className="btn btn-warning"id="radio-input">Radio Input</button>
        <button onClick={this.props.changeInput} style ={style} type="button" className="btn btn-warning"id="Check-box">Check-Box Input</button>
        <button onClick={this.props.changeInput} style ={style} type="button" className="btn btn-warning"id="Select">Dropdown Input</button>
        </div>
      </div>
    )
  }
}
