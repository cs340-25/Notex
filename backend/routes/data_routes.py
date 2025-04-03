from flask import Blueprint, request, jsonify

data_bp = Blueprint('data', __name__, url_prefix='/data')

mock_data_store = {}

@data_bp.route('', methods=['GET'])
def get_data():
    username = request.args.get('username')
    if not username:
        return jsonify({"error": "Username is required"}), 400
    
    data = mock_data_store.get(username)
    return jsonify({"data": data}), 200

@data_bp.route('', methods=['POST'])
def post_data():
    username = request.args.get('username')
    json_data = request.get_json()

    if not username or not json_data:
        return jsonify({"error": "Username and data are required"}), 400
    
    mock_data_store[username] = json_data
    return jsonify({"message": "Data created", "data": json_data}), 201

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
