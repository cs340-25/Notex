from flask import Blueprint, request, jsonify
from db_connection.connection import Conn
from db_connection.insert import insert_canvas_data
from db_connection.read import read_canvas_data
from db_connection.utils import get_user_id

data_bp = Blueprint('data', __name__, url_prefix='/data')

mock_data_store = {}


@data_bp.route('', methods=['GET'])
def get_data():
    username = request.args.get('username')
    if not username:
        return jsonify({"error": "Username is required"}), 400
    
    db_connection = Conn()
    conn = db_connection.conn
    cursor = conn.cursor()

    try:
        user_id = get_user_id(cursor, username)
        if not user_id:
            return jsonify({"error": "User not found"}), 404
        
        canvas = read_canvas_data(cursor, conn, {'user_id': user_id})
        return jsonify({"data": canvas}), 200
    
    finally:
        db_connection.close(cursor)


@data_bp.route('', methods=['POST'])
def post_data():
    username = request.args.get('username')
    json_data = request.get_json()

    if not username or not json_data:
        return jsonify({"error": "Username and data are required"}), 400
    
    db_connection = Conn()
    conn = db_connection.conn
    cursor = conn.cursor()

    try:
        user_id = get_user_id(cursor, username)
        if not user_id:
            return jsonify({"error": "User not found"}), 404
        
        json_data['user_id'] = user_id
        success = insert_canvas_data(cursor, conn, json_data)

        if success:
            conn.commit()
            return jsonify({"message": "Data created", "data": json_data}), 201
        else:
            return jsonify({"error": "Insert failed"}), 500
    
    finally:
        db_connection.close(cursor)


@data_bp.route('', methods=['PUT'])
def put_data():
    username = request.args.get('username')
    json_data = request.get_json()

    if not username or not json_data:
        return jsonify({"error": "Username and data are required"}), 400
    
    if username not in mock_data_store:
        return jsonify({"error": "Username not found"}), 404
    
    mock_data_store[username] = json_data
    return jsonify({"message": "Data updated", "data": json_data}), 200


@data_bp.route('', methods=['DELETE'])
def delete_data():
    username = request.args.get('username')

    if not username:
        return jsonify({"error": "Username is required"}), 400
    
    if username not in mock_data_store:
        del mock_data_store[username]
        return jsonify({"message": "Data deleted"}), 200
    else:
        return jsonify({"error": "Data not found"}), 404
