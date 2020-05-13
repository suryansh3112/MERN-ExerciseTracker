import React,{useState, useEffect} from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';

function ExerciseList(props){
    
    const [arr,setArr] = useState([]);
   
    
       
    
    useEffect(()=>{
        axios.get("http://localhost:5000/exercise")
        .then(res=>{
            setArr(res.data)
        })
    },[]);     
        
        
    function Exercise(props){
        
       
        return(
            <tr>
                <td>{props.username}</td>
                <td>{props.description}</td>
                <td>{props.duration}</td>
                <td>{props.date.substring(0,10)}</td>
                
                <td>
                    <Link to={"/edit/"+props.id}> 
                        <button className="btn btn-primary">
                            Edit
                        </button>
                    </Link>
                   
                     &nbsp; &nbsp; &nbsp;
                    <button 
                    className="btn btn-danger" 
                    value={props.id}
                    onClick={(event)=>{
                           console.log(event.target)
                        axios.delete("http://localhost:5000/exercise/"+event.target.value)
                        .then(res=>console.log(res.data));
                        

                        setArr(prev=>{
                           return prev.filter(e=> e._id!==props.id)
                        });
                    }}>
                    Delete
                    </button>                   
                </td>
            </tr>
        );
    }

    

   
    
    return(
        <div>
            <div> <h1>Logged Exercises</h1></div>
            <table className="table  table-striped ">
            
                <thead className="thead-dark">
                    <tr>
                        <th scope ="col">Username</th>
                        <th scope ="col">Description</th>
                        <th scope ="col">Duration</th>
                        <th scope ="col">Date</th>
                        <th scope ="col">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {  arr.map((e)=>{
                        return(
                            <Exercise 
                                key={e._id}
                                id={e._id}
                                description={e.description}
                                duration={e.duration}
                                date={e.date}
                                username={e.username}

                            />
                        )
                    }) }
                </tbody>


            </table>
        </div>
    )
}

export default ExerciseList;