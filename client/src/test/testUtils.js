// import checkPropTypes from 'check-prop-types'
// import {createStore} from 'redux'

// import rootReducer from '../reducers'


// export const storeFactory = (initialState) => {
//     return createStore(rootReducer, initialState)
// }

/**
 * Return node with the given data-test attribute
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper
 * @param {String} val - Value of data-test attribute for search
 * @returns {ShallowWrapper}
 */
export const findByTestAttr = (wrapper, val) => {
    return wrapper.find(`[data-test="${val}"]`)
}

/**
 * Return node matching the provided css selector
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper
 * @param {String} val - CSS selector
 * @returns {ShallowWrapper}
 */
export const findBySelector = (wrapper, val) => {
    return wrapper.find(val)
}
