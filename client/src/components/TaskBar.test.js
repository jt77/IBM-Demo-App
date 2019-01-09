import React from 'react'
import {shallow} from 'enzyme'
import addDays from 'date-fns/add_days'
import format from 'date-fns/format'
import subDays from 'date-fns/sub_days'

import {findByTestAttr,findBySelector} from '../test/testUtils'
import TaskBar from './TaskBar'


/**
 * These tests check that the TaskBar component renders successfully and
 * displays the correct due date status label when provided with various
 * due dates. It makes use of the 'date-fns' module to help format the
 * different dates.
 */


/**
 * @function getWrapper - returns an 'enzyme' ShallowWrapper using default props
 * @param props
 * @returns {ShallowWrapper}
 */
const getWrapper = (props={name:'', description:'', duedate:'', completedStatus:false, handleClick:()=>{},id:1,key:1}) => {
    return shallow(<TaskBar {...props} />)
}

test('The TaskBar renders successfully', () => {
    const wrapper = getWrapper()
    const component = findByTestAttr(wrapper, 'component-taskbar')
    expect(component.length).toBe(1)
})

test('The TaskBar renders the right label for tommorrow', () => {
    let date = format(addDays(new Date(), 1), 'YYYY-MM-DD')
    const wrapper = getWrapper({duedate:date})
    const component = findBySelector(findByTestAttr(wrapper, 'component-taskbar-status'), '.label')
    expect(component.text()).toContain('Tomorrow')
})

test('The TaskBar renders the right label for today', () => {
    let date = format(new Date(), 'YYYY-MM-DD')
    const wrapper = getWrapper({duedate:date})
    const component = findBySelector(findByTestAttr(wrapper, 'component-taskbar-status'), '.label')
    expect(component.text()).toContain('Today')
})

test('The TaskBar renders the right label for overdue', () => {
    let date = format(subDays(new Date(), 1), 'YYYY-MM-DD')
    const wrapper = getWrapper({duedate:date})
    const component = findBySelector(findByTestAttr(wrapper, 'component-taskbar-status'), '.label')
    expect(component.text()).toContain('Overdue')
})

test('The TaskBar renders the right label for completed', () => {
    // let date = format(subDays(new Date(), 1), 'YYYY-MM-DD')
    const wrapper = getWrapper({completedStatus:true})
    const component = findBySelector(findByTestAttr(wrapper, 'component-taskbar-status'), '.label')
    expect(component.text()).toContain('Completed')
})

test('The TaskBar renders the right label for due in a future date', () => {
    let date = format(addDays(new Date(), 10), 'YYYY-MM-DD')
    const wrapper = getWrapper({duedate:date})
    const component = findBySelector(findByTestAttr(wrapper, 'component-taskbar-status'), '.label')
    expect(component.text()).toContain('DUE:')
})