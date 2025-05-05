# Notex
This is a note taking app made for all users. It is designed for a UTK cs340 (Software Development) Final Project.

### Project Members:
- Ashton Dy
- Porter Dosch
- Perry Shu
- Colsen Murray
- Adam Abdelrahman


### Prerequisite:
- npm
- node.js

### Running the App:
The app can be run using a simple batch script or manually. The project only works on Windows as of now.

#### Batch Script
1. copy `.env` file into root directory
2. run `./run.bat` from project root:

#### Manual Launch
1. create and activate a python venv
    - `python -m venv venv`
    - `./venv/Scripts/activate`
2. install requirements.txt
    - `pip install -r requirements.txt`

3. update node dependencies:
    - `npm run update`
4. concurrently run:
    - `npm run dev`
    - `python backend/app.py`
