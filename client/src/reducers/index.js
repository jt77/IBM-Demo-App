import {combineReducers} from 'redux'

import {actionTypes} from '../actions/actionTypes'


/**
 * Reducer that updates the tasks list in the store based on various actions
 * @param {array} currentTasks
 * @param {string} action
 * @returns {array}
 */
const tasksReducer = (currentTasks=[], action) => {

    // update store with all the latest tasks
    if (action.type === actionTypes.GET_TASKS) {

        return action.payload

    // search the tasks store for a task, update it if found, or add it to the store if is new
    } else if (action.type === actionTypes.UPDATE_TASKS) {

        let foundTask = false
        const tasks = currentTasks.map(task => {
            if (task.id === action.payload.id) {
                foundTask = true
                task.data = Object.assign({}, action.payload.data)
                return task
            } else {
                return task
            }
        })

        if ( foundTask ) {
            return tasks
        } else {
            return [...currentTasks, action.payload]
        }

    // search the tasks store and update it with only those that DO NOT match the id sent
    } else if (action.type === actionTypes.DELETE_TASK) {

        const tasks = currentTasks.filter(task => task.id !== action.payload)

        return tasks
    }

    return currentTasks
}

/**
 * Reducer that returns a provided task OR a task with default values
 * @param {object} task
 * @param {string} action
 * @returns {object}
 */
const getTaskReducer = (task={id:null, data:{name:'', description:'', dueDate:'', completed:false}}, action) => {
    if (action.type === actionTypes.GET_TASK_DATA) {
        return action.payload || {id:null, data:{name:'', description:'', dueDate:'', completed:false}}
    }

    return task
}

/**
 * Reducer that creates a new set of selected display filters and updates the store with it
 * @param {object} filters
 * @param {string} action
 */
const updateFiltersReducer = (filters={}, action) => {
    if (action.type === actionTypes.UPDATE_FILTERS) {
        let newFilters = {}
        action.payload.map(filter => newFilters[filter.value] = 1)
        return newFilters
    }

    return filters
}


export default combineReducers({
    tasks: tasksReducer,
    foundTask: getTaskReducer,
    updatedFilters: updateFiltersReducer,
})