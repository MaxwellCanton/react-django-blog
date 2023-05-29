# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`


Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.


# Getting Started with Django App

This project was bootstrapped with https://www.djangoproject.com/

#Create a virtual environment to install dependencies in and activate it:

### `pip install virtualenv`
### `python -m venv venv`
### `venv\Scripts\activate`


#Then install the dependencies:
### `(env)$ pip install -r requirements.txt`


#Enable database and django apps

### `python manage.py makemigrations blog`
### `python manage.py makemigrations security`


#Install react packages
### `npm install`
### `npm run build`


#Migrate database 
### `python manage.py migrate`


#Load data (opcional)
### `python manage.py loaddata db.json`


#Run servers 
### `python manage.py runserver`
### `npm run start`
