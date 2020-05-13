import React, { useState, useEffect } from 'react';
import axios from 'axios';
import qs from 'qs';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


function CreateExercise() {
   
     const [info, setInfo] = useState({
        username : "",
        description : "",
        duration : 0,
        date : new Date(),
        users : []
    });
   
    useEffect(()=>{

        
        


        axios.get('http://localhost:5000/user/')
        .then(response => {
          if (response.data.length > 0) {
           setInfo({
              users: response.data.map(user => user.username),
              username: response.data[0].username
            })
          }
        })
        .catch((error) => {
          console.log(error);
        })
        
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

        axios.post("http://localhost:5000/exercise/add",qs.stringify(info),config)
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
          <select 
         
              required="required"
              name="username"
              className="form-control"
              value={info.username}
              onChange={handleChange}>
              {
               info.users && info.users.map(function(user) {
                  return (
                      <option 
                            key={user}
                            value={user}>{user}
                      </option>
                      );
                })
              }
          </select>
                </div> 

                <div className="form-group">
                    <label>Description</label>
                    <input 
                        name = "description" 
                        value={info.description}
                        className="form-control" 
                        onChange={handleChange} 
                        required="true"
                       
                    />
                </div> 

                <div className="form-group">
                    <label>Duration(in minutes):</label>
                    <input 
                        required="true"
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
                        required="true"
                    />
                </div>

                <button className="btn btn-lg btn-primary" onClick={handleClick}>Create Exercise log</button>
                
            </form> 
        </div>
    );
}

export default CreateExercise;


