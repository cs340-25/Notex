@echo off
setlocal EnableDelayedExpansion

@REM Check for python installation
where python >nul 2>&1
if %errorlevel% neq 0 (
    echo python is not in your PATH.

    where python3 >nul 2>&1
    if %errorlevel% neq 0 (
        echo python3 is not in your PATH. Please install Python and add it to your system PATH.
        pause
        exit /b 1
    ) else (
        echo python3 is available in PATH.
        set "PYTHON=python3"
    )
) else (
    echo Python is available in PATH.
    set "PYTHON=python"
)

echo =============================================

echo Setting up Python environment...

if not exist venv (
    call !PYTHON! -m venv venv
    echo venv created.
)

call venv\Scripts\activate

echo =============================================

echo Installing Python dependencies...

call !PYTHON! -m pip install --upgrade pip --quiet
call !PYTHON! -m pip install -r requirements.txt

echo Python dependencies installed.

echo =============================================

echo Setting up Node environment...

call npm install --silent

pushd Frontend
call npm install --silent
call npm audit fix --silent
popd

pushd Electron
call npm install --silent
call npm audit fix --silent
popd

echo Node environment setup complete.

echo =============================================

echo Launching app processes...

call npx concurrently ^
    "cd Backend && python app.py" ^
    "cd Frontend && npm run dev" ^
    "cd Electron && npm start"
