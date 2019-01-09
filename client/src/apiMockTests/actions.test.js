import moxios from 'moxios'

import {store, initMockStateJSON} from './actions'
import {getTasks, updateTasks, deleteTask} from "./actions";


describe('mock api calls that update redux store', () => {

    beforeEach( () => moxios.install() )

    afterEach( () => moxios.uninstall() )


    test('adds tasks data to redux store', () => {

        /**
         * prepare mock api call
         */
        moxios.wait(() => {
            const request = moxios.requests.mostRecent()
            request.respondWith({
                status: 200,
                response: initMockStateJSON
            })
        })

        /**
         * call action creator to initiate api call and update redux store
         * then compare new state of redux store to the expected state
         */
        return store.dispatch(getTasks())
            .then(() => {
                const newState = store.getState()
                expect(newState.tasks).toEqual(initMockStateJSON.tasks)
            })
    })

    test('update redux store with a new task', () => {

        const newTask = {
            "id": 3,
            "data": {
                "name": "task 3",
                "description": "this is a task description",
                "duedate": "2019-03-11",
                "completed": false
            }
        }

        /**
         * prepare mock api call
         */
        moxios.wait(() => {
            const request = moxios.requests.mostRecent()
            request.respondWith({
                status: 200,
                response: newTask
            })
        })

        /**
         * call action creator to initiate api call and update redux store
         * then compare new state of redux store to the expected state
         */
        return store.dispatch(updateTasks(newTask['data']))
            .then(() => {
                const newState = store.getState()
                expect(newState.tasks[2]).toEqual(newTask)
            })
    })

    test('remove task from redux store', () => {

        const taskToDelete = 2

        const updatedMockStateJSON = {

            "tasks": [
                {
                    "id": 1,
                    "data": {
                        "name": "task 1",
                        "description": "this is a task description",
                        "duedate": "2018-11-27",
                        "completed": true
                    }
                },
                {
                    "id": 3,
                    "data": {
                        "name": "task 3",
                        "description": "this is a task description",
                        "duedate": "2019-03-11",
                        "completed": false
                    }
                }
            ],
            "foundTask": {},
            "updatedFilters": []
        }

        /**
         * prepare mock api call
         */
        moxios.wait(() => {
            const request = moxios.requests.mostRecent()
            request.respondWith({
                status: 200,
                response: {"message": "Task deleted"}
            })
        })

        /**
         * call action creator to initiate api call and update redux store
         * then compare new state of redux store to the expected state
         */
        return store.dispatch(deleteTask(taskToDelete))
            .then(() => {
                const newState = store.getState()
                expect(newState).toEqual(updatedMockStateJSON)
            })
    })
})