import React ,{useState} from 'react';
import axios from "axios";
import qs from "qs";

function CreateUser(){
    
    const [user,setUser]=useState("");

    function handleChange(event){
        setUser(event.target.value);
    }    

    function handleClick(event){
        event.preventDefault();
        const a = {
            username:user,
        }
        console.log(a);

        const config = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }

        axios.post("http://localhost:5000/user/add",qs.stringify(a),config)
        .then(res=>console.log(res.data)
        )
        .catch(err=>console.log(err)
        );

        setUser("");
    }
    
    return(
        <div>
            <h1>Create New User</h1>
            <form>
                <div className="form-group">
                    <label >Username:</label>
                    <input type="text" className="form-control" onChange={handleChange} value={user} name="username"/> 
                </div>

                <button className="btn btn-lg btn-primary" onClick={handleClick}>Create User</button>
            </form>
        </div>
    )
}

export default CreateUser;