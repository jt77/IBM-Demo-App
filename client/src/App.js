import React, {Component} from 'react'
import {connect} from 'react-redux'

import ModalDialog, { ModalTransition } from '@atlaskit/modal-dialog'

import differenceInCalendarDays from 'date-fns/difference_in_calendar_days'
import isToday from 'date-fns/is_today'
import isTomorrow from 'date-fns/is_tomorrow'

import {getTasks, updateTasks, deleteTask, getTaskData, updateTaskFilters} from "./actions"
import FilterBar from './components/FilterBar'
import TaskBar from './components/TaskBar'
import TaskForm from './components/TaskForm'

import {store} from './index'

import './css/styles.css'



class App extends Component {

    state = {
        modalOpen: false,
        modalHeader:'',
        modalCreatingNewTask: false,
    }

    componentWillMount() {
        store.subscribe(() => {
            this.renderTaskBars()
        })
    }

    componentDidMount() {
        this.props.getTasks()
    }

    doTaskBarClick({name, description, duedate, completedStatus, id}) {
        this.props.getTaskData(id)
        this.setState({
            modalOpen:true,
            modalHeader: 'Edit Task',
            modalCreatingNewTask: false,
        })
    }

    doModalClose() {
        this.setState({modalOpen:false})
    }

    doFilterSelect(filtersObj) {
        this.props.updateTaskFilters(filtersObj)
    }

    doNewTaskButton() {
        this.props.getTaskData()

        this.setState({
            modalOpen: true,
            modalHeader: 'Create New Task',
            modalCreatingNewTask: true
        })
    }

    doTaskFormSubmit({name, description, duedate, completed, id}) {
        this.props.updateTasks({
            // id: id ? id : Math.random() * 1000,
            id: id,
            data: {
                name,
                description,
                duedate,
                completed
            }
        })

        this.setState({modalOpen:false})
    }

    doDeleteTask(taskId) {
        this.props.deleteTask(taskId)

        this.setState({modalOpen:false})
    }

    renderTaskBars() {
        return (
            this.props.tasks.length > 0 &&
            (this.props.tasks.map(task => {
                if (!this.checkIfFilteredOut(task.data.duedate, task.data.completed)) {
                    return (
                        <TaskBar
                            name={task.data.name}
                            description={task.data.description}
                            duedate={task.data.duedate}
                            completedStatus={task.data.completed}
                            handleClick={(taskData) => this.doTaskBarClick({...taskData})}
                            id={task.id}
                            key={task.id}/>
                    )
                }
            })) || <h4>Hey, go ahead and create your first task <span style={{fontSize:'2em',verticalAlign:'middle', marginLeft:'5px'}}>👉</span></h4>
        )
    }

    checkIfFilteredOut(date, completed) {

        if (Object.keys(this.props.updatedFilters).length == 0) return false

        if (completed && this.props.updatedFilters.completed) {
            console.log('found a completed task')
            return false
        }

        if (
            !completed &&
            ((differenceInCalendarDays(new Date(), date) > 0 && this.props.updatedFilters.overdue) ||
            (isToday(date) && this.props.updatedFilters.today) ||
            (isTomorrow(date) && this.props.updatedFilters.tomorrow))
        ) {
            return false
        }

        return true
    }

    render() {
        return (
            <div className="App" data-test="component-app">
                <h1 className="App-header">
                    TaskMan 5000
                </h1>
                <FilterBar isDisabled={this.props.tasks.length > 0} doFilterSelect={(filtersObj) => this.doFilterSelect(filtersObj)} doNewTask={() => this.doNewTaskButton()} />
                <hr/>
                <div className='tasks_container'>
                    { this.renderTaskBars() }
                </div>
                <ModalTransition>
                    {this.state.modalOpen && (
                        <ModalDialog
                                className={"modalDialog"}
                                width="75%"
                                shouldCloseOnOverlayClick={true}
                                onClose={() => {this.doModalClose()}}
                        >
                            { <TaskForm { ...this.props.modalTaskData.data }
                                        id={this.props.modalTaskData.id}
                                        header={this.state.modalHeader}
                                        creatingNewTask={this.state.modalCreatingNewTask}
                                        onSubmit={(formData) => this.doTaskFormSubmit(formData)}
                                        onDelete={(taskId) => this.doDeleteTask(taskId)}
                            /> }
                        </ModalDialog>
                    )}
                </ModalTransition>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        tasks: state.tasks,
        modalTaskData: state.foundTask,
        updatedFilters: state.updatedFilters,
    }
}

export default connect(mapStateToProps, {getTasks, updateTasks, deleteTask, getTaskData, updateTaskFilters})(App);
