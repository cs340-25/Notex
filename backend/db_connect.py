import psycopg2
from psycopg2.extras import Json
from dotenv import load_dotenv
import os
import bcrypt

# Helper function to get connection data from .env file
def load_config():
    config = {}

    load_dotenv()
    
    try:
        config['DB_HOST'] = os.getenv('DB_HOST')
        config['DB_NAME'] = os.getenv('DB_NAME')
        config['DB_USER'] = os.getenv('DB_USER')
        config['DB_PASSWORD'] = os.getenv('DB_PASSWORD')
        config['DB_PORT'] = int(os.getenv('DB_PORT'))
    except:
        raise(RuntimeError("Failed to load .env file. Verify the file location and syntax."))

    return config

# Given configuration data, connect to postgreSQL database
def connect_to_db(config):
    try:
        conn = psycopg2.connect(
            host=config['DB_HOST'],
            database=config['DB_NAME'],
            user=config['DB_USER'],
            password=config['DB_PASSWORD'],
            port=config['DB_PORT']
        )
        print(f"Successfully connected to {config['DB_NAME']}.")

        return conn
    
    except psycopg2.Error as e:
        raise(RuntimeError(f"Error conecting to PostgreSQL: {e}"))

# Helper function to get user id from username
def get_user_id(cursor, username):
    '''
    Args:
    cursor: psycopg2 cursor to execute the query
    username: The username to query for
    
    Returns:
    user_id: The user_id if found, None if not
    '''
    cursor.execute("SELECT id FROM users WHERE username = %s", (username,))
    result = cursor.fetchone()
    return result[0] if result else None

def get_folder_id(cursor, user_id, folder_name):
    """
    Given a user_id and folder_name, return the folder id if found, otherwise None.
    """
    cursor.execute("SELECT id FROM folders WHERE user_id = %s AND name = %s", (user_id, folder_name))
    result = cursor.fetchone()
    return result[0] if result else None

# For more information about table structure (Current tables are users, folders, notes, images, canvas)
def get_table_info(cursor, table_name: str):
        '''
        Args: cursor for accessing database, string table name for which specific table to print information of
        Returns: Status of SELECT query, False if something went wrong with the query or specified table doesn't exist,
        true otherwise.
        '''
        cursor.execute("SELECT column_name, data_type, is_nullable, column_default FROM information_schema.columns WHERE table_name = %s;", (table_name,))
        if cursor.rowcount < 0:
            return False
        
        print('='*50)
        print(f"Structure of table {table_name}:")
        for column in cursor.fetchall():
            print(f"Column: {column[0]}, Data Type: {column[1]}, Nullable: {column[2]}, Default: {column[3]}")
        
        return True

# For initial user registration
def insert_user_data(cursor, conn, data):
    '''
    Args: 
    psycopg2 cursor for accessing database
    conn: psycopg2 connection to commit the transaction
    data: contains a username and an already hashed password as follows:
    
    {
    'username' : username_val
    'password' : password_val
    }
      
    We will hash the password again before insertion.

    Returns: True or False depending on success of operation.
    '''
    try:
        # Verify input parameters are present first
        if 'username' not in data or 'password' not in data:
            print("Missing required fields: username or password")
            return False
        # Hash password first
        password = data['password'].encode('utf-8')
        salt = bcrypt.gensalt()
        hashed_password = bcrypt.hashpw(password, salt).decode('utf-8')

        cursor.execute("INSERT INTO users (username, password_hash) VALUES (%s, %s)", 
                    (data['username'], hashed_password)
        )

        conn.commit()
        
        # Returns whether row was inserted
        return cursor.rowcount > 0
    
    except psycopg2.IntegrityError:
        conn.rollback()
        print("Error: Duplicate username")
        return False
    
    except psycopg2.Error as e:
        conn.rollback()
        print(f"Database error: {e}")
        return False

def insert_canvas_data(cursor, conn, data):
    '''
    Args: 
    psycopg2 cursor for accessing database
    conn: psycopg2 connection to commit the transaction
    data: contains a user_id, layout, and title as follows:
    
    {
    'user_id' : id_val
    'layout' : json_layout_val
    'title' : title_val
    }
      
    Returns: True or False depending on success of operation.
    '''
    try:
        # Verify input parameters are present first
        if 'user_id' not in data or 'layout' not in data or 'title' not in data:
            print("Missing required fields: user_id, layout, or title")
            return False

        cursor.execute("INSERT INTO canvas (user_id, layout, title) VALUES (%s, %s, %s)", 
                    (data['user_id'], Json(data['layout']), data['title'])
        )

        conn.commit()
        
        # Returns whether row was inserted
        return cursor.rowcount > 0
    
    except psycopg2.Error as e:
        conn.rollback()
        print(f"Database error: {e}")
        return False

def insert_image_data(cursor, conn, data):
    '''
    Args: 
    psycopg2 cursor for accessing database
    conn: psycopg2 connection to commit the transaction
    data: contains a user_id, folder_id, image_data (bytea), and filename as follows:
    
    {
    'user_id' : user_id_val,
    'folder_id' : folder_id_val, 
    'image_data' : image_data_bytea_val, 
    'filename' : filename_val
    }
      
    Returns: True or False depending on success of operation.
    '''
    try:
        # Verify input parameters are present first
        if 'user_id' not in data or 'folder_id' not in data or 'image_data' not in data or 'filename' not in data:
            print("Missing required fields: user_id, folder_id, image_data, or filename")
            return False

        cursor.execute("INSERT INTO images (user_id, folder_id, image_data, filename) VALUES (%s, %s, %s, %s)", 
                    (data['user_id'], data['folder_id'], data['image_data'], data['filename'])
        )

        conn.commit()
        
        # Returns whether row was inserted
        return cursor.rowcount > 0
    
    except psycopg2.Error as e:
        conn.rollback()
        print(f"Database error: {e}")
        return False

def insert_folder_data(cursor, conn, data):
    '''
    Args:
    cursor: psycopg2 cursor for accessing the database
    conn: psycopg2 connection to commit the transaction
    data: contains a user_id, name, and optionally a parent_folder_id as follows:
    
    {
        'user_id': user_id_val,
        'name': folder_name_val,
        'parent_folder_id': parent_folder_id_val (optional)
    }
    
    Returns: True or False depending on the success of the operation.
    '''
    try:
        # Verify input parameters are present
        if 'user_id' not in data or 'name' not in data:
            print("Missing required fields: user_id or name")
            return False

        # Set parent_folder_id to None if not provided
        parent_folder_id = data.get('parent_folder_id', None)

        cursor.execute(
            "INSERT INTO folders (user_id, name, parent_folder_id) VALUES (%s, %s, %s)",
            (data['user_id'], data['name'], parent_folder_id)
        )
        conn.commit()

        # Returns whether row was inserted
        return cursor.rowcount > 0
    
    except psycopg2.Error as e:
        conn.rollback()
        print(f"Database error: {e}")
        return False

def insert_note_data(cursor, conn, data):
    '''
    Args: 
    psycopg2 cursor for accessing database
    conn: psycopg2 connection to commit the transaction
    data: contains a user_id, folder_id, title, and content as follows:
    
    {
    'user_id' : user_id_val,
    'folder_id' : folder_id_val,
    'title' : title_val,
    'content' : content_val
    }
      
    Returns: True or False depending on success of operation.
    '''
    try:
        # Verify input parameters are present first
        if 'user_id' not in data or 'folder_id' not in data or 'title' not in data or 'content' not in data:
            print("Missing required fields: user_id, folder_id, title, or content")
            return False

        cursor.execute("INSERT INTO notes (user_id, folder_id, title, content) VALUES (%s, %s, %s, %s)", 
                    (data['user_id'], data['folder_id'], data['title'], data['content'])
        )

        conn.commit()
        
        # Returns whether row was inserted
        return cursor.rowcount > 0
    
    except psycopg2.Error as e:
        conn.rollback()
        print(f"Database error: {e}")
        return False


def main():
    config = load_config()
    conn = connect_to_db(config)
    cursor = conn.cursor()
    
    # Insert test user (if not exists)
    test_username = 'test_user'
    test_password = 'dummy_hash'
    cursor.execute("SELECT id FROM users WHERE username = %s", (test_username,))
    result = cursor.fetchone()
    if result:
        test_user_id = result[0]
        print(f"User '{test_username}' already exists with id {test_user_id}.")
    else:
        if insert_user_data(cursor, conn, {'username': test_username, 'password': test_password}):
            cursor.execute("SELECT id FROM users WHERE username = %s", (test_username,))
            test_user_id = cursor.fetchone()[0]
            print(f"Inserted test user '{test_username}' with id {test_user_id}.")
        else:
            print("Failed to insert test user.")
            return

     # Insert test folder (assume it's root-level)
    folder_data = {
        'user_id': test_user_id,
        'name': 'Test Folder',
        'parent_folder_id': None
    }
    folder_id = insert_folder_data(cursor, conn, folder_data)
    if folder_id:
        print("Folder inserted successfully with id:", folder_id)
    else:
        print("Folder insertion failed.")
    
    # Optionally, confirm folder_id with get_folder_id
    folder_id = get_folder_id(cursor, test_user_id, 'Test Folder')
    print("Retrieved folder id:", folder_id)

    conn.commit()
    cursor.execute("SELECT * FROM folders")
    for row in cursor.fetchall():
        print(row)
    
    # Use retrieved folder_id for image and note insertions instead of hardcoding 1
    image_data = {
        'user_id': test_user_id,
        'folder_id': folder_id,
        'image_data': b'test image bytes',
        'filename': 'test_image.png'
    }
    if insert_image_data(cursor, conn, image_data):
        print("Image inserted successfully.")
    else:
        print("Image insertion failed.")

    note_data = {
        'user_id': test_user_id,
        'folder_id': folder_id,
        'title': 'Test Note',
        'content': 'This is a sample note content.'
    }
    if insert_note_data(cursor, conn, note_data):
        print("Note inserted successfully.")
    else:
        print("Note insertion failed.")

    canvas_data = {
        'user_id': test_user_id,
        'layout': {"background": "white", "items": [{"type": "note", "id": 1, "x": 50, "y": 100}]},
        'title': 'Test Canvas'
    }
    if insert_canvas_data(cursor, conn, canvas_data):
        print("Canvas inserted successfully.")
    else:
        print("Canvas insertion failed.")

    # Verify inserted data
    cursor.execute("SELECT * FROM users WHERE id = %s", (test_user_id,))
    print("User record:", cursor.fetchall())
    cursor.execute("SELECT * FROM folders;")
    print("Folders:", cursor.fetchall())
    cursor.execute("SELECT * FROM images;")
    print("Images:", cursor.fetchall())
    cursor.execute("SELECT * FROM notes;")
    print("Notes:", cursor.fetchall())
    cursor.execute("SELECT * FROM canvas;")
    print("Canvas:", cursor.fetchall())
    
    # Delete inserted test data (order matters due to foreign key constraints)
    cursor.execute("DELETE FROM canvas WHERE user_id = %s AND title = %s", (test_user_id, "Test Canvas"))
    cursor.execute("DELETE FROM images WHERE user_id = %s AND filename = %s", (test_user_id, "test_image.png"))
    cursor.execute("DELETE FROM notes WHERE user_id = %s AND title = %s", (test_user_id, "Test Note"))
    cursor.execute("DELETE FROM folders WHERE user_id = %s AND name = %s", (test_user_id, "Test Folder"))
    cursor.execute("DELETE FROM users WHERE id = %s", (test_user_id,))
    conn.commit()
    print("Test data deleted successfully.")

    cursor.close()
    conn.close()

# Example usage
if __name__ == '__main__':
    config = load_config()
    print(config)
    conn = connect_to_db(config)
    cursor = conn.cursor()

    get_table_info(cursor, 'users')
    get_table_info(cursor, 'canvas')
    get_table_info(cursor, 'folders')
    get_table_info(cursor, 'images')
    get_table_info(cursor, 'notes')

    cursor.close()
    conn.close()

    main()