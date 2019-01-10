import React from 'react'

import FieldText from '@atlaskit/field-text'
import FieldTextArea from '@atlaskit/field-text-area'
import { DatePicker } from '@atlaskit/datetime-picker'
import { Label } from '@atlaskit/field-base'
import Button from '@atlaskit/button'
import Toggle from '@atlaskit/toggle'

import format from 'date-fns/format'


/**
 * This component contains the form that is used to create a new task, update
 * an already existing task, or delete a task. It stores the task's data in its state.
 * It takes two callback functions as props. One called when the form is submitted
 * and, the second, when the 'delete task' button is clicked.
 *
 * The component is contexual. It will display the 'delete' button only if a task
 * is being edited and will toggle between displaying an 'update' or 'create' button
 * depending on whether or not a new task is being created or being updated.
 */


class TaskForm extends React.Component {

    state = {
        isCompleteToggleChecked: this.props.completed || false,
        taskName: this.props.name || '',
        taskDescription: this.props.description || '',
        taskDueDate: this.props.duedate ? format(this.props.duedate, 'YYYY-MM-DD') : format(new Date(), 'YYYY-MM-DD'),
        id: this.props.id || null
    }

    /**
     * Update state with string from task name field
     * @param event
     */
    doNameFieldChange = event => {
        this.setState({
            taskName: event.currentTarget.value
        })
    }

    /**
     * update state with string from task description field
     * @param event
     */
    doDescriptionFieldChange = event => {
        this.setState({
            taskDescription: event.currentTarget.value
        })
    }

    /**
     * update state with date selected from the date picker component
     * @param value
     */
    doDateSelect = value => {
        this.setState({taskDueDate:value})
    }

    /**
     * update state with true/false flag for the 'compeleted' toggle
     */
    doCompleteToggle = () => {
        this.setState({
            isCompleteToggleChecked: !this.state.isCompleteToggleChecked
        })
    }

    /**
     * callback function to send the task data from the state
     */
    doFormSubmit = () => {
        this.props.onSubmit({
            name: this.state.taskName,
            description: this.state.taskDescription,
            duedate: this.state.taskDueDate,
            completed: this.state.isCompleteToggleChecked,
            id: this.state.id
        })
    }

    /**
     * callback function for when clicking the 'delete task' button
     */
    doTaskDelete = () => {
        this.props.onDelete(this.state.id)
    }

    render() {
        return(
            <form className='taskform_container' data-test="component-taskform">
                <h3 className="taskform_header">{this.props.header}</h3>
                <div className='taskform_fields_container'>
                    <FieldText
                        shouldFitContainer={true}
                        label="Please enter a name"
                        required
                        name="task-name"
                        value={this.props.name}
                        onChange={this.doNameFieldChange}
                    />
                    <FieldTextArea
                        shouldFitContainer={true}
                        minimumRows={7}
                        label="Please enter a description"
                        required
                        enableResize='vertical'
                        name="task-description"
                        value={this.props.description}
                        onChange={this.doDescriptionFieldChange}
                    />
                </div>
                <Label htmlFor="react-select-datepicker--input" label="Please select a due date" />
                <DatePicker
                    id="datepicker"
                    defaultValue={this.state.taskDueDate}
                    innerProps={{style:{width:'50%'}}}
                    onChange={this.doDateSelect}
                />
                <div className='taskform_buttons'>
                    <Button className=''
                            appearance='primary'
                            onClick={this.doFormSubmit}
                    >
                        {this.props.creatingNewTask ? 'Create' : 'Update'}
                    </Button>
                    {!this.props.creatingNewTask && <Button className=''
                            onClick={this.doTaskDelete}
                    >
                        Delete Task
                    </Button>}
                </div>
                <div className='taskform_completetoggle'>
                    <h5>Completed</h5>
                    <Toggle size="large"
                            label='Completed'
                            isDefaultChecked={this.state.isCompleteToggleChecked}
                            onChange={this.doCompleteToggle} />
                </div>
            </form>
        )
    }
}

export default TaskForm