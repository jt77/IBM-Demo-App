import axios from 'axios'

import {store} from '../index'

import {actionTypes} from "./actionTypes";


/**
 *  We capture the api end point url passed in from environment variables
 */
export const apiUrl = process.env.REACT_APP_API_URL

/**
 * setting baseURL for axios to use on all network calls
 * endpoints are appended when network calls are made
 */
axios.defaults.baseURL = apiUrl

/**
 * Action that makes an api call to get all the available tasks in the database
 * @returns {{type: string, payload: object}} - Dispatches an object to the reducers with the GET_TASKS
 *          action type and the tasks data received from the api
 */
export const getTasks = () => async (dispatch, getState) => {

    const response = await axios.get(`${apiUrl}/tasks`)

    dispatch({
        type: actionTypes.GET_TASKS,
        payload: response.data.tasks
    })
}

/**
 * Action that makes an api call to update an existing task or create a new one
 * @param task - an object containing the data for a new task OR to update an
 *               existing task.
 * @returns {{type: string, payload: object}} - Dispatches an object to
 *          the reducers with the UPDATE_TASKS
 *          action type and the task data received from the api
 */
export const updateTasks = (task) => async (dispatch, getState) => {

    const response = task.id ? await axios.put(`${apiUrl}/task/${task.id}`, task.data) : await axios.post(`${apiUrl}/task`, task.data)

    dispatch( {
        type: actionTypes.UPDATE_TASKS,
        payload: response.data
    })
}

/**
 * Action that makes an api call to delete an existing task
 * @param taskId - a number matching the id of a task to be deleted
 * @returns {{type: string, payload: number}} - Dispatches an
 *          object to the reducers with the DELETE_TASK
 *          action type and the id of the task to be deleted
 */
export const deleteTask = (taskId) => async (dispatch, getState) => {

    const response = await axios.delete(`${apiUrl}/task/${taskId}`)

    dispatch( {
        type: actionTypes.DELETE_TASK,
        payload: taskId
    })
}

/**
 * Action that takes a task id, searches for a match in the store,
 * and returns the data for a matching task
 * @param taskId
 * @returns {{type: string, payload: object/null}} - Dispatches an
 *          object to the reducers with the GET_TASK_DATA action type
 *          and an object with the data of the requested task
 */
export const getTaskData = (taskId=null) => {

    if (taskId != null) {
        let tasksState = store.getState()['tasks'] || []
        var taskData = (() => {
            let data = {}
            for (let i = 0; i < tasksState.length; i++) {
                if (tasksState[i].id === taskId) {
                    data = Object.assign(tasksState[i])
                    return data
                }
            }
            return data
        })()
    }

    return {
        type: actionTypes.GET_TASK_DATA,
        payload: taskData || null
    }
}

/**
 * An action that gets an array of selected filters for displaying of the tasks list
 * @param filterData
 * @returns {{type: string, payload: Array}} - Dispatches an
 *          object to the reducers with the UPDATE_FILTERS action type
 *          and an array with the data of the selected display filters
 */
export const updateTaskFilters = (filterData=[]) => {

    return {
        type: actionTypes.UPDATE_FILTERS,
        payload: filterData
    }
}
