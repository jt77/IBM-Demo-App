from flask import Flask
from flask_restful import Api
from flask_cors import CORS
import os

from resources.task import Task, TaskList

import config


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = config.SQLALCHEMY_DATABASE_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = config.SQLALCHEMY_TRACK_MODIFICATIONS
app.secret_key = config.SECRET_KEY
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
    app.run(host=config.LOCAL_HOST_IP, port=5000)