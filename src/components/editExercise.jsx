import React, { useState, useEffect } from 'react';
import axios from 'axios';
import qs from 'qs';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


function EditExercise(props) {
   
     const [info, setInfo] = useState({
        username : "",
        description : "",
        duration : 0,
        date : new Date(),
       
    });

    
   
    useEffect(()=>{
     

        axios.get("http://localhost:5000/exercise/"+props.match.params.id)
        .then(res=>{
            
          setInfo({
            username : res.data.username,
            description :res.data.description ,
            duration :res.data.duration ,
            date : new Date(res.data.date)
          })
        })
        .catch(err=>console.log(err));
        
    },[]);

   

    function handleChange(event){
        const {name,value}= event.target;
        
        setInfo(prev=>{
            return{
                ...prev,
                [name]:value
            }
        });
    }
    
    function handleDate(d){
        console.log(d); 
        setInfo(prev=>{
            return{ 
                ...prev,
                date:d
            }
         });
        
    }

    function handleClick(event){
        event.preventDefault();
        console.log(info);

        console.log(info.users);

        const config = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }

        axios.put("http://localhost:5000/exercise/"+props.match.params.id,qs.stringify(info),config)
        .then(res=>console.log(res.data))
        .catch(err=>console.log(err));

        window.location = '/';
    }

      

    return(
        <div>
            <h1>Create New Exercise Log</h1>
            <form>
                <div className="form-group">
                    <label>Username: </label>
                    <input 
                        name = "username" 
                        value={info.username}
                        className="form-control" 
                          
                    />
                </div> 

                <div className="form-group">
                    <label>Description</label>
                    <input 
                        name = "description" 
                        value={info.description}
                        className="form-control" 
                        onChange={handleChange} 
                        
                       
                    />
                </div> 

                <div className="form-group">
                    <label>Duration(in minutes):</label>
                    <input 
                        name = "duration"
                        type="number" 
                        className="form-control" 
                        onChange={handleChange} 
                        value={info.duration}
                    />
                </div> 

             

                <div className="form-group">
                    <label>Date:</label><br/>
                    <DatePicker 
                        selected={info.date}
                        onChange={handleDate}
                       
                    />
                    {/* <input
                        name="date"
                        type="date"
                        className="form-control"
                        style={{width:"200px"}}
                        value={info.date}
                    /> */}
                </div>

                <button className="btn btn-lg btn-primary" onClick={handleClick}>Edit Exercise log</button>
                
            </form> 
        </div>
    );
}

export default EditExercise;


