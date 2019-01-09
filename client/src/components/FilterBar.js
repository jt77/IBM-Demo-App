import React from 'react'

import Select from '@atlaskit/select'
import AddItemIcon from '@atlaskit/icon/glyph/add-item'
import Button from '@atlaskit/button'


const customStyles = {
    container(styles) {
        return { ...styles, width: '50%' }
    },
};


/**
 * This component contains the filters select menu and the 'create task' button.
 * It takes two callback functions as props. One, is called when the 'create task'
 * button is clicked and, the second, is called when a filter is selected from
 * the drop down list and the list of selected filters is passed to it.
 */


class FilterBar extends React.Component {

    /**
     * callback function called when clicking the 'new task' button
     */
    doNewTaskClick() {
        this.props.doNewTask()
    }

    /**
     * callback function called with object of selected filters when a selection is made
     * @param filtersObj
     */
    doFilterSelect(filtersObj) {
        this.props.doFilterSelect(filtersObj)
    }

    render() {
        return(
            <div className='filter_container' data-test="component-filterbar">
                <Select
                    isDisabled={!this.props.isDisabled}
                    options={[
                        { label: 'Due Today', value: 'today' },
                        { label: 'Due Tomorrow', value: 'tomorrow' },
                        { label: 'Completed', value: 'completed' },
                        { label: 'Overdue', value: 'overdue' },
                    ]}
                    onChange={(filters) => this.doFilterSelect(filters)}
                    className="multi-select"
                    classNamePrefix="react-select"
                    isMulti
                    isSearchable={false}
                    placeholder="Filter By Due Date Status"
                    styles={customStyles}
                />
                <Button className='filter_btn_newtask'
                        iconAfter={<AddItemIcon label="" />}
                        onClick={() => this.doNewTaskClick()}
                >
                    Create Task
                </Button>
            </div>
        )
    }
}

export default FilterBar