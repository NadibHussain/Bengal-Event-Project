 function dateformatconverter (date) 
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

function isEmpty(obj){
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}
export {dateformatconverter,isEmpty}
