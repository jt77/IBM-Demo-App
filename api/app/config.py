import os

SQLALCHEMY_DATABASE_URI = 'sqlite:///data.db'
SQLALCHEMY_TRACK_MODIFICATIONS = False
SECRET_KEY = os.environ.get('SECRET_KEY')
LOCAL_HOST_IP = os.environ.get('LOCAL_HOST_IP')