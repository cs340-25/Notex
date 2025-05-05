#!/bin/bash
set -e

echo "============================================="
echo "Checking for Python..."

# Check if python3 exists
if command -v python3 &>/dev/null; then
  PYTHON=python3
  echo "Python found: $PYTHON"
else
  echo "Python 3 is not installed or not in PATH."
  exit 1
fi

echo "============================================="
echo "Setting up Python environment..."

if [ ! -d "venv" ]; then
  $PYTHON -m venv venv
  echo "venv created."
fi

# Activate virtual environment
source venv/bin/activate

echo "============================================="
echo "Installing Python dependencies..."
$PYTHON -m pip install --upgrade pip --quiet
$PYTHON -m pip install -r requirements.txt

echo "Python dependencies installed."

echo "============================================="
echo "Setting up Node environments..."

npm install --silent

cd Frontend
npm install --silent
npm audit fix --silent
cd ..

cd Electron
npm install --silent
npm audit fix --silent
cd ..

echo "Node environments setup complete."

echo "============================================="
echo "Launching app processes..."

# Make sure concurrently is installed
npx concurrently \
  "cd Backend && $PYTHON app.py" \
  "cd Frontend && npm run dev" \
  "cd Electron && npm start"