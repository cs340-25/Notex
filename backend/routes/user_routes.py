from flask import Blueprint, request, jsonify
from db_connection.connection import Conn
from db_connection.insert import insert_user_data
from db_connection.utils import get_user_id
from db_connection.read import read_user_data

user_bp = Blueprint('user', __name__, url_prefix='/user')

mock_user_store = {}


@user_bp.route('', methods=['GET'])
def get_user():
    username = request.args.get('username')
    password = request.args.get('password')

    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400
    
    db_connection = Conn()
    conn = db_connection.conn
    cursor = conn.cursor()

    try:
        user = read_user_data(cursor, conn, {'username': username})
        if user and user['password'] == password:
            return jsonify({"message": "User authenticated", "user": user}), 200
        else:
            return jsonify({"error": "User not found or password is incorrect"}), 404
    finally:
        db_connection.close(cursor)
        

@user_bp.route('', methods=['POST'])
def post_user():
    data = request.get_json()

    if not data or "username" not in data or "password" not in data:
        return jsonify({"error": "Username and password are required"}), 400
    
    username = data['username']

    db_connection = Conn()
    conn = db_connection.conn
    cursor = conn.cursor()

    try:
        if get_user_id(cursor, username):
            return jsonify({"error": "Username already exists"}), 409
        
        success = insert_user_data(cursor, conn, data)
        if success:
            user_id = get_user_id(cursor, username)
            conn.commit()
            return jsonify({"message": "User created", "user_id": {"id": user_id, **data}}), 201
        else:
            return jsonify({"error": "Failed to create user"}), 500
        
    finally:
        db_connection.close(cursor)


@user_bp.route('', methods=['PUT'])
def put_user():
    username = request.args.get('username')
    password = request.args.get('password')
    new_data = request.get_json()

    if not username or not password or not new_data:
        return jsonify({"error": "missing required fields"}), 400
    
    user = mock_user_store.get(username)
    if user and user['password'] == password:
        mock_user_store[username] = new_data
        return jsonify({"message": "User updated", "user": mock_user_store[username]}), 200
    else:
        return jsonify({"error": "User not found or password is incorrect"}), 404
    

@user_bp.route('', methods=['DELETE'])
def delete_user():
    username = request.args.get('username')
    password = request.args.get('password')

    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400
    
    user = mock_user_store.get(username)
    if user and user['password'] == password:
        del mock_user_store[username]
        return jsonify({"message": "User deleted"}), 200
    else:
        return jsonify({"error": "User not found or password is incorrect"}), 404