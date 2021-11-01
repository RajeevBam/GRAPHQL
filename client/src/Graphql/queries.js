import {gql} from '@apollo/client'
export const getTaskQuery=gql`
query{
    tasks{
      task
      id
    }
  }
  
`;

export const getDeveloperQuery=gql`
query{
    devs{
      name
     id
    }
  }
`;