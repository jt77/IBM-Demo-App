import React from 'react'

import EditFilledIcon from '@atlaskit/icon/glyph/edit-filled'
import ErrorIcon from '@atlaskit/icon/glyph/error'
import WarningIcon from '@atlaskit/icon/glyph/warning'
import InfoIcon from '@atlaskit/icon/glyph/info'
import CheckCircleIcon from '@atlaskit/icon/glyph/check-circle'

import format from 'date-fns/format'
import differenceInCalendarDays from 'date-fns/difference_in_calendar_days'


const urgentIcon = (<span className="icon urgent_icon"><ErrorIcon primaryColor="inherit" /></span>)
const warningIcon = (<span className="icon warning_icon"><WarningIcon primaryColor="inherit" /></span>)
const infoIcon = (<span className="icon info_icon"><InfoIcon primaryColor="inherit" /></span>)
const okIcon = (<span className="icon ok_icon"><CheckCircleIcon primaryColor="inherit" /></span>)


/**
 * This component is responsible for displaying the name and due date status
 * of an individual task. It internally stores the name, description,
 * completed status, due date, and id of that task in its state. It also
 * takes a callback function as a prop that it calls and passes its state to.
 */


class TaskBar extends React.Component {

    state = {
        name: this.props.name,
        description: this.props.description,
        completedStatus: this.props.completedStatus,
        duedate: this.props.duedate,
        id: this.props.id,
        clickHandler: this.props.handleClick
    }

    /**
     * this is here to force this component to update when an already existing
     * TaskBar has its props updated
     */
    componentWillReceiveProps(props) {
        this.setState({
            name: props.name,
            description: props.description,
            completedStatus: props.completedStatus,
            duedate: props.duedate,
            id: props.id
        })
    }

    /**
     * this performs the logic for determining the due date display of the task
     */
    renderDueStatusDisplay() {

        let diffBetTodayDuedate = differenceInCalendarDays(new Date(), format(this.props.duedate))

        if (this.state.completedStatus) {
            return (<>{okIcon}<h5 className='label'>Completed</h5></>)
        } else if ( diffBetTodayDuedate > 0 ) {
            return (<>{urgentIcon}<h5 className='label'>{diffBetTodayDuedate} Days Overdue</h5></>)
        } else if (diffBetTodayDuedate === 0) {
            return (<>{warningIcon}<h5 className='label'>Due Today</h5></>)
        } else if ( diffBetTodayDuedate === -1 ) {
            return (<>{infoIcon}<h5 className='label'>Due Tomorrow</h5></>)
        } else {
            return (<h5 className='label'>DUE: {format(this.props.duedate, 'dddd, MMMM Do YYYY')}</h5>)
        }
    }

    /**
     * callback function called when the taskbar is clicked
     */
    doBarClickToEdit = () => {
        this.props.handleClick({...this.state})
    }

    render() {
        return(
            <div className='taskBar' data-test="component-taskbar" onClick={this.doBarClickToEdit}>
                <h3>{this.state.name}</h3>
                <div className='taskBar_status' data-test="component-taskbar-status">{this.renderDueStatusDisplay()}</div>
                <EditFilledIcon label="edit task" />
            </div>
        )
    }
}

export default TaskBar