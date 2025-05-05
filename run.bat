@echo off
echo Setting up Python environment...

if not exist venv (
    python -m venv venv
    echo venv created
)

call venv\Scripts\activate

echo Installing Python dependencies...

pip install --upgrade pip
pip install -r requirements.txt

echo Python dependencies installed

echo Setting up Node environment...
call npm run update
@REM call npm install
@REM call cd Frontend && npm install && npm audit fix 
@REM call cd ../Electron && npm install && npm audit fix

echo Node environment setup complete

echo Launching app processes...

call npx concurrently ^
    "cd backend && python app.py" ^
    "cd Frontend && npm run dev" ^
    "cd Electron && npm start"
