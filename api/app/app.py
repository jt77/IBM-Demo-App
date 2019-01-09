from flask import Flask
from flask_restful import Api
from flask_cors import CORS
import os

from resources.task import Task, TaskList


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key = os.environ.get('SECRET_KEY')
api = Api(app)

CORS(app)

@app.before_first_request
def create_tables():
    db.create_all()


api.add_resource(Task, '/task', '/task/<int:id>')
api.add_resource(TaskList, '/tasks')

if __name__ == '__main__':
    from db import db
    db.init_app(app)
    app.run(host=os.environ.get('LOCAL_HOST_IP'), port=5000)