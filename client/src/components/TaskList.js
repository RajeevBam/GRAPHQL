import React, {useEffect, useState} from 'react'
import {useQuery, gql} from '@apollo/client'
import { getTaskQuery } from '../Graphql/queries'

function TaskList() {
    const {error, loading, data} =useQuery(getTaskQuery)
    const [users, setTask]=useState([]);
    useEffect(()=>{
        // console.log(data)
        if(data){
            setTask(data.tasks)
        }
    },[data])
    return (
        <div>
            {users.map((val)=>{
                return <li key={val.id}>{val.task}</li>
            })}
        </div>
    )
}

export default TaskList;
