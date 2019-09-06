import AdminApp from './components/AdminApp'
import ReactDOM from 'react-dom'
import React from 'react'

if(document.getElementById('adminapp')){
    ReactDOM.render(<AdminApp/>,document.getElementById('adminapp'));
}
if(document.getElementById('userapp')){
    ReactDOM.render(<AdminApp/>,document.getElementById('userapp'));
}





