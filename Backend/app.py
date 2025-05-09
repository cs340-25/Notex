from flask import Flask
from flask_cors import CORS
from routes import user_bp, data_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(user_bp)
app.register_blueprint(data_bp)

if __name__ == '__main__':
    app.run(debug=True)
