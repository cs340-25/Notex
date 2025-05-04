from flask import Blueprint, request, jsonify
from db_connection.connection import Conn
from db_connection.insert import insert_canvas_data, insert_folder_data, insert_note_data, insert_image_data, insert_user_data

from db_connection.read import read_all_user_data
from db_connection.utils import get_user_id, get_folder_id
from db_connection.delete import delete_canvas_data, delete_folder_data, delete_note_data, delete_image_data, delete_user_data

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
        
        data = read_all_user_data(cursor, conn, user_id)
        if data:
            return jsonify(data), 200
        else:
            return jsonify({"error": "No data found"}), 404
    
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
        data_type = json_data.get('type')
        match data_type:
            case 'note':
                success = insert_note_data(cursor, conn, json_data)
            case 'folder':
                success = insert_folder_data(cursor, conn, json_data)
            case 'canvas':
                success = insert_canvas_data(cursor, conn, json_data)
            case 'image':
                success = insert_image_data(cursor, conn, json_data)
            case _:
                success = False
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

    db_connection = Conn()
    conn = db_connection.conn
    cursor = conn.cursor()
    
    if not username or not json_data:
        return jsonify({"error": "Username and data are required"}), 400
    try:
        user_id = get_user_id(cursor, username)
        json_data['user_id'] = user_id
        data_type = json_data.get('type')
        match data_type:
            case 'note':
                success = insert_note_data(cursor, conn, json_data)
            case 'folder':
                success = insert_folder_data(cursor, conn, json_data)
            case 'canvas':
                success = insert_canvas_data(cursor, conn, json_data)
            case 'image':
                success = insert_image_data(cursor, conn, json_data)
            case _:
                success = False
        if success:
            conn.commit()
            return jsonify({"message": "Data Updated", "data": json_data}), 201
        else:
            return jsonify({"error": "Update failed"}), 500
        
    finally:
        db_connection.close(cursor)


@data_bp.route('', methods=['DELETE'])
def delete_data():
    username = request.args.get('username')

    db_connection = Conn()
    conn = db_connection.conn
    cursor = conn.cursor()

    if not username:
        return jsonify({"error": "Username is required"}), 400
    if username:
        
        #! This is a placeholder for actual deletion logic
        return jsonify({"message": "Data deleted"}), 200
    else:
        return jsonify({"error": "Data not found"}), 404
