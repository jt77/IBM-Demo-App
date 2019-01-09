import React from 'react'
import {shallow, mount} from 'enzyme'

import {findByTestAttr,findBySelector} from '../test/testUtils'
import TaskForm from './TaskForm'



/**
 * @function getWrapper - returns an 'enzyme' ShallowWrapper using default props
 * @param props
 * @returns {ShallowWrapper}
 */
const getWrapper = (props={}) => {
    const wrapper = mount(<TaskForm {...props} />)
    return wrapper
}

describe('testing the TaskForm component', () => {

    test('The TaskForm renders successfully', () => {
        const wrapper = getWrapper()
        const component = findByTestAttr(wrapper, 'component-taskform')
        expect(component.length).toBe(1)
    })

    test('The TaskForm renders the create button with correct label when creating a new task', () => {
        const wrapper = getWrapper({creatingNewTask:true})
        const component = findBySelector(wrapper, '.sc-bwzfXH span span')
        expect(component.text()).toBe('Create')
    })

    test('The TaskForm renders the correct header when creating a task', () => {
        const wrapper = getWrapper({creatingNewTask:false, header:'Create New Task'})
        const component = findBySelector(wrapper, '.taskform_header')
        expect(component.text()).toBe('Create New Task')
    })

    test('The TaskForm renders the correct header when editing a task', () => {
        const wrapper = getWrapper({creatingNewTask:false, header:'Edit Task'})
        const component = findBySelector(wrapper, '.taskform_header')
        expect(component.text()).toBe('Edit Task')
    })

    test('The TaskForm renders the update button with correct label when editing a task', () => {
        const wrapper = getWrapper({creatingNewTask:false})
        const component = findBySelector(wrapper, '.sc-bwzfXH.jnSiSs span span')
        expect(component.text()).toBe('Update')
    })

    test('The TaskForm renders the delete button with correct label when editing a task', () => {
        const wrapper = getWrapper({creatingNewTask:false})
        const component = findBySelector(wrapper, '.sc-bwzfXH.dvTFNV span span')
        expect(component.text()).toBe('Delete Task')
    })

})