from flask_restful import Resource, reqparse
from models.task import TaskModel

class Task(Resource):

    # specify the request arguments that we will allow through
    parser = reqparse.RequestParser()
    parser.add_argument(
        'name',
        type=str,
        required=True,
        help='This field cannot be left blank'
    )
    parser.add_argument(
        'description',
        type=str,
        required=True,
        help='This field cannot be left blank'
    )
    parser.add_argument(
        'duedate',
        type=str,
        required=True,
        help='This field cannot be left blank'
    )
    parser.add_argument(
        'completed',
        type=bool,
        required=True,
        help='This field cannot be left blank'
    )

    # /task/<id>
    def get(self, id):

        task = TaskModel.find_by_id(id)

        if task:
            # since the task variable is a TaskModel object instance
            # we must first convert it to a json object before returning
            # it to the client
            return task.json()
        else:
            return {'message': 'Task not found'}, 404


    # /task
    def post(self):

        data = Task.parser.parse_args()

        # we instantiate the TaskModel class with name and price parameters
        # and store a reference to it in the task variable
        task = TaskModel(**data)

        try:
            # we take the TaskModel instance and call its insert method
            # so that it inserts its name and price properties passed to it
            # above and into the db
            task.save_to_db()
        except:
            return {'message': "An error occurred inserting the task."}, 500 # Internal server error

        return task.json(), 201 # return with 'created' status code


    # /task/<id>
    def delete(self, id):

        task = TaskModel.find_by_id(id)
        if task:
            task.delete_from_db()

        return {'message': 'Task deleted'}


    # /task/<id>
    def put(self, id):
        data = Task.parser.parse_args()

        task = TaskModel.find_by_id(id)

        if task is None:
            task = TaskModel(**data)

        else:
            task.name = data['name']
            task.description = data['description']
            task.duedate = data['duedate']
            task.completed = data['completed']

        task.save_to_db()

        return task.json()


class TaskList(Resource):
    # /tasks
    def get(self):

        # these two lines do the same thing...they iterate over the list
        # returned by 'TaskModel.query.all()' and apply the '.json()' function
        # on each task in the list then returning a list or array of those
        # json blocks, assigning that list to an 'tasks' property of an object
        # or library and returning it.
        return {'tasks': list(map(lambda x: x.json(), TaskModel.query.all()))}
        # return {'tasks': [task.json() for task in TaskModel.query.all()]}