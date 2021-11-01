import {gql} from '@apollo/client';

export const CREATE_TASK_MUTATION=gql`
    mutation addTask($task: String! $devid: ID!){
        addTask(task:$task devid:$devid){
            task 
            id
        }
    }
`;              