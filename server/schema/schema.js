const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull
} = graphql;
const _ = require('lodash')
const Task = require('../models/tasks');
const Dev = require('../models/devs');
//temporary data
// var tasks=[
//     {task:'create an app',id:'1',devid:'1'},
//     {task:'create an website',id:'2',devid:'2'},
//     {task:'Customize an app',id:'3',devid:'3'},
//     {task:'remove filter',id:'4',devid:'1'},
// ];
// var devs=[
//     {name:'Rajeev Bam',id:'1'},
//     {name:'Sabi Kafley',id:'2'},
//     {name:'Tuyen',id:'3'}
// ];
const task = new GraphQLObjectType({
    name: 'Task',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        task: {
            type: GraphQLString
        },
        dev: {
            type: developer,
            resolve(parent, args) {
                //return _.find(devs,{id:parent.devid})
                return Dev.findById(parent.devid);
            }
        }
        // task:{type:GraphQLString}
    })
});
const developer = new GraphQLObjectType({
    name: 'Developer',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        tasks: {
            type: new GraphQLList(task),
            resolve(parent, args) {
                //return _.filter(tasks,{devid:parent.id})
                return Task.find({
                    devid:parent.id
                })
            }
        }
        // task:{type:GraphQLString}
    })
});


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        task: {
            type: task,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                //code to get data from database
                // return _.find(tasks,{id:args.id});
                return Task.findById(args.id)
            }
        },
        developer: {
            type: developer,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                //code to get data from database
                // return _.find(devs, {
                //     id: args.id
                // });
                return Dev.findById(args.id)
            }
        },
        tasks: {
            type: new GraphQLList(task),
            resolve(parent, args) {
                // return tasks
                return Task.find();
            }
        },
        devs: {
            type: new GraphQLList(developer),
            resolve(parent, args) {
                //return devs
                return Dev.find();
            }
        }
    }
});
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addDev: {
            type: developer,
            args: {
                name: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve(parent, args) {
                let dev = new Dev({
                    name: args.name
                });
                return dev.save()
            }
        },
        addTask:{
            type: task,
            args:{
                task:{type:new GraphQLNonNull(GraphQLString)},
                devid:{type:new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args) {
                let task = new Task({
                    task: args.task,
                    devid:args.devid
                });
                return task.save();
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});