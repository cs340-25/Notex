from flask import Blueprint, request, jsonify
from db_connection.connection import Conn
from db_connection.insert import insert_canvas_data, insert_folder_data, insert_note_data, insert_image_data, insert_user_data
from db_connection.update import update_canvas_data, update_folder_data, update_note_data, update_image_data
from db_connection.read import read_all_user_data 
from db_connection.utils import get_user_id, get_folder_id, get_note_id
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

@data_bp.route('/noteid', methods=['GET'])
def get_note_data():
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
        folder_id = request.args.get('folder_id')
        title = request.args.get('title')

        data = get_note_id(cursor, user_id, folder_id, title)
        if data:
            return jsonify(data), 200
        else:
            return jsonify({"error": "No data found"}), 404
    
    finally:
        db_connection.close(cursor)

@data_bp.route('/folderid', methods=['GET'])
def get_folder_data():
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
        folder_name = request.args.get('folder_name')
        parent_folder_id = request.args.get('parent_folder_id')

        data = get_folder_id(cursor, user_id, folder_name, parent_folder_id)
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
        # user_id = get_user_id(cursor, username)
        data_type = json_data.get('type')
        match data_type:
            case 'note':
                success = update_note_data(cursor, conn, json_data)
            case 'folder':
                success = update_folder_data(cursor, conn, json_data)
            case 'canvas':
                success = update_canvas_data(cursor, conn, json_data)
            case 'image':
                success = update_image_data(cursor, conn, json_data)
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
    try:
        user_id = get_user_id(cursor, username)
        
        data_type = request.args.get('type')
        
        match data_type:
            case 'note':
                json_data = {
                    'user_id': user_id,
                    'folder_id': request.args.get('folder_id'),
                    'title': request.args.get('title')
                }
                success = delete_note_data(cursor, conn, json_data)
            case 'folder':
                json_data = {
                    'user_id': user_id,
                    'name': request.args.get('name'),
                    'parent_folder_id': request.args.get('parent_folder_id')
                }
                success = delete_folder_data(cursor, conn, json_data)
            case 'canvas':
                success = delete_canvas_data(cursor, conn, json_data)
            case 'image':
                success = delete_image_data(cursor, conn, json_data)
            case _:
                success = False
        
        #! This is a placeholder for actual deletion logic
        if success:
            return jsonify({"message": "Data deleted"}), 200
        else:
            return jsonify({"error": "Data not found"}), 404
    finally:
        db_connection.close(cursor)
