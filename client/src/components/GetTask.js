import React, {useEffect, useState } from "react";
import { CREATE_TASK_MUTATION } from "../Graphql/Mutation";
import { useMutation } from "@apollo/react-hooks";
import { getDeveloperQuery } from "../Graphql/queries";
import {useQuery, gql} from '@apollo/client'

function GetTask() {
    const [mutatetask] = useMutation(CREATE_TASK_MUTATION);

    const {error, loading, data} =useQuery(getDeveloperQuery);
    const [users, setDev]=useState([]);
    useEffect(()=>{
        console.log(data)
        if(data){
            setDev(data.devs)
        }
    },[data]);
    return data.todos.map(({ id, task }) => {
    let input;
  
  return (
    <form id="add-book">
        <div className="field">
            <label>Task:</label>
            <input type="text" onSubmit={e => {
              console.log(e.target.value);
              e.preventDefault();
              mutatetask({ variables: {id, task: input.value } });
              input.value = '';
        }}  />
        </div>
      <div className='Developer'>
          <label>Developer:</label>
          <select>
              <option>Select Developer</option>
              {users.map((val)=>{
                return <option key={val.id}>{val.name}</option>
            })}
          </select>
      </div>
      <button type='submit'> Create Task</button>
    </form>
    );
          })
}

export default GetTask;