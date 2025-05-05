from flask import Blueprint, request, jsonify
from db_connection.connection import Conn
from db_connection.insert import insert_user_data
from db_connection.utils import get_user_id
from db_connection.read import read_user_data
from db_connection.delete import delete_user_data
import bcrypt

# User routes
user_bp = Blueprint('user', __name__, url_prefix='/user')

# Get a user by username and password
@user_bp.route('', methods=['GET'])
def get_user():
    # Get the username and password from the request
    username = request.args.get('username')
    password = request.args.get('password')
    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400
    
    # Connect to the database
    db_connection = Conn()
    conn = db_connection.conn
    cursor = conn.cursor()
    try:
        # Get the user id from the username
        user_id = get_user_id(cursor, username)

        # Get the user data from the database
        user = read_user_data(cursor, conn, {'user_id': user_id})

        # Check if the user exists and the password is correct
        if user and bcrypt.hashpw(password.encode('utf-8'), user["password_hash"].encode('utf-8')):
            return jsonify({"message": "User authenticated", "user": user}), 200
        else:
            return jsonify({"error": "User not found or password is incorrect"}), 404
    finally:
        # Close the connection to the database
        db_connection.close(cursor)

# Create a new user
@user_bp.route('', methods=['POST'])
def post_user():
    # Get the data from the request
    data = request.get_json()

    # Check if the username and password are provided
    if not data or "username" not in data or "password" not in data:
        return jsonify({"error": "Username and password are required"}), 400
    
    # Get the username from the data
    username = data['username']

    # Connect to the database
    db_connection = Conn()
    conn = db_connection.conn
    cursor = conn.cursor()
    
    try:
        # Check if the username already exists
        if get_user_id(cursor, username):
            return jsonify({"error": "Username already exists"}), 409
        
        # Insert the user data into the database
        success = insert_user_data(cursor, conn, data)
        if success:
            # Get the user id from the username
            user_id = get_user_id(cursor, username)
            conn.commit()
            return jsonify({"message": "User created", "user_id": {"id": user_id, **data}}), 201
        else:
            return jsonify({"error": "Failed to create user"}), 500
        
    finally:
        # Close the connection to the database
        db_connection.close(cursor)

# Update a user
# @user_bp.route('', methods=['PUT'])
# def put_user():
#     username = request.args.get('username')
#     password = request.args.get('password')
#     new_data = request.get_json()

#     if not username or not password or not new_data:
#         return jsonify({"error": "missing required fields"}), 400
    
#     db_connection = Conn()
#     conn = db_connection.conn
#     cursor = conn.cursor()
#     user_id = get_user_id(cursor, username)
#     try:
#         user = read_user_data(cursor, conn, {'user_id': user_id})
#         if user and bcrypt.hashpw(password.encode('utf-8'), user["password_hash"].encode('utf-8')):
            
#             return jsonify({"message": "User updated", "user": user}), 200
#         else:
#             return jsonify({"error": "User not found or password is incorrect"}), 404
#     finally:
#         db_connection.close(cursor)

# Delete a user
@user_bp.route('', methods=['DELETE'])
def delete_user():
    # Get the username and password from the request
    username = request.args.get('username')
    password = request.args.get('password')

    # Check if the username and password are provided
    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400
    
    # Connect to the database
    db_connection = Conn()
    conn = db_connection.conn
    cursor = conn.cursor()
    try:
        # Get the user id from the username
        user_id = get_user_id(cursor, username)

        # Get the user data from the database
        user = read_user_data(cursor, conn, {'user_id': user_id})

        # Check if the user exists and the password is correct
        if user and bcrypt.hashpw(password.encode('utf-8'), user["password_hash"].encode('utf-8')):
            delete_user_data(cursor, conn, {"user_id":user_id})
            return jsonify({"message": "User deleted"}), 200
        else:
            return jsonify({"error": "User not found or password is incorrect"}), 404
    finally:
        # Close the connection to the database
        db_connection.close(cursor)