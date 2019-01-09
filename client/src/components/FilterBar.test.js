import React from 'react'
import {shallow} from 'enzyme'
import {findByTestAttr} from '../test/testUtils'
import FilterBar from './FilterBar'


/**
 * This test just checks that the FilterBar component mounts without any errors
 */


/**
 * @function getWrapper - returns an 'enzyme' ShallowWrapper using default props
 * @param props
 * @returns {ShallowWrapper}
 */
const getWrapper = (props={isDisabled:false, doFilterSelect:()=>{}, doNewTask:()=>{}}) => {
    return shallow(<FilterBar {...props} />)
}

test('The FilterBar renders successfully', () => {
    const wrapper = getWrapper()
    const component = findByTestAttr(wrapper, 'component-filterbar')
    expect(component.length).toBe(1)
})