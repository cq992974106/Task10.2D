

const taskList = [];

function findTask(){
    var Type="Type_All";
    fetch('http://localhost:5000/findTask', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body : JSON.stringify({
          Type:Type
        })
    })
    .then(response => response.json())
    .then(data =>  {console.log(data);
        console.log("ffff:")
        for(var i=0;i<data.length;i++){
            taskList.push(
                {
                    "key":i,
                    "Title":data[i].Title,
                    "Description":data[i].Description,
                    "Expiry":data[i].Expiry
                }
            )
    } 
    }
    )
    .catch(err => {
        console.log("Error:" + err)
    })
}

setInterval(findTask(),1000)


/*const taskList = [
    {
        
    }
]*/


export default taskList