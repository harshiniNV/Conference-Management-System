import React, { useEffect ,useState} from 'react';
import Axios from 'axios';


const WorkshopReview = () => {
    useEffect(() => {
        document.title = 'Workshop Review Page';
    });
 
  function Approve(e)
  {
    alert(e.target.value);
  Axios.post("http://localhost:3001/api/updateWorkshopPresenter",
  {
  Wid:e.target.value,
  status:"Approved",
  }).then(()=>{
  alert("Succesfully inserted");
  });
  }

  function Decline(e)
  {
    alert(e.target.value);
  Axios.post("http://localhost:3001/api/updateWorkshopPresenter",
  {
  Wid:e.target.value,
  status:"Declined",
  }).then(()=>{
  alert("Succesfully inserted");
  });
  }



    const[workshopPresenterList, setWorkshopPresenterList]=useState([]);
    useEffect(()=>{
    Axios.get ('http://localhost:3001/api/getWorkshopPresenter').then((response)=>{
    setWorkshopPresenterList(response.data)
    });
    }, []);
    

    return (
      <body className="body">
        <div>
            <h1 className="header">WorkshopPresenter Reviews</h1>
            <table className="table">
            <tr><th>Name</th><th>Document</th><th>Action</th><th>Status</th></tr>
            {workshopPresenterList.map((val)=>{
            return(
            <tr>
                <td>{val.workshopPresenterName} </td><td>  
                <a href={val.documentSrc} download>DOWNLOAD</a>
                </td> 
                {val.status==='pending'?<td className="buttons" ><button value={val.workshopPresenterId} className="btn" onClick={Approve}>Approve</button><button  value={val.workshopPresenterId} className="btn"  onClick={Decline}>Decline</button></td>:<td><i><div className="btn">Already action has been taken</div></i></td>}<td>{val.status}</td> 
            </tr>
            );
            })}

                
                
            </table>
            <div>
                <a href="/">Go to Dashboard</a>
            </div>
        </div>
        </body>
    );


}



export default WorkshopReview;