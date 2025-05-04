import psycopg2
from psycopg2.extras import Json
import bcrypt

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

# Will update canvas if it already exists. Restrictions: a user cannot have duplicate canvas names.
def insert_canvas_data(cursor, conn, data):
    '''
    Args: 
    psycopg2 cursor for accessing database
    conn: psycopg2 connection to commit the transaction
    data: contains a user_id, layout, title, and folder id as follows:
    
    {
    'user_id' : id_val
    'layout' : json_layout_val
    'title' : title_val
    'folder_id': id_val (optional, will default to None)
    }
      
    Returns: True or False depending on success of operation.
    '''
    try:
        # Verify input parameters are present first
        if 'user_id' not in data or 'layout' not in data or 'title' not in data:
            print("Missing required fields: user_id, layout, or title")
            return False
        
        folder_id = data.get('folder_id', None)

        cursor.execute("INSERT INTO canvas (user_id, layout, title, folder_id) VALUES (%s, %s, %s, %s)", 
                    (data['user_id'], Json(data['layout']), data['title'], folder_id)
        )

        query_success = cursor.rowcount
        conn.commit()
        
        # Returns whether row was inserted
        return query_success > 0
    
    except psycopg2.Error as e:
        conn.rollback()
        print(f"Database error: {e}")
        return False

# Will also update existing items
def insert_image_data(cursor, conn, data):
    '''
    Args: 
    psycopg2 cursor for accessing database
    conn: psycopg2 connection to commit the transaction
    data: contains a user_id, folder_id, image_data (bytea), and filename as follows:
    
    {
    'user_id' : user_id_val,
    'folder_id' : folder_id_val, 
    'image_data' : image_data_bytes_val, 
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
                    (data['user_id'], data['folder_id'], psycopg2.Binary(data['image_data']), data['filename'])
        )

        query_success = cursor.rowcount
        conn.commit()
        
        # Returns whether row was inserted
        return query_success > 0
    
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
        'favorite': true/false, (optional)
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

        # Similar with favorite, default False
        favorite = data.get('favorite', False)

        cursor.execute(
            "INSERT INTO folders (user_id, name, parent_folder_id, favorite) VALUES (%s, %s, %s, %s)",
            (data['user_id'], data['name'], parent_folder_id, favorite)
        )
        
        query_success = cursor.rowcount
        conn.commit()

        # Returns whether row was inserted
        return query_success > 0
    
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
    'content' : content_val,
    'favorite' : true/false (optional)
    }
      
    Returns: True or False depending on success of operation.
    '''
    try:
        # Verify input parameters are present first
        if 'user_id' not in data or 'folder_id' not in data or 'title' not in data or 'content' not in data:
            print("Missing required fields: user_id, folder_id, title, or content")
            return False

        favorite = data.get('favorite', False)

        cursor.execute("INSERT INTO notes (user_id, folder_id, title, content, favorite) VALUES (%s, %s, %s, %s, %s)", 
                    (data['user_id'], data['folder_id'], data['title'], data['content'], favorite)
        )

        query_success = cursor.rowcount
        conn.commit()
        
        # Returns whether row was inserted
        return query_success > 0
    
    except psycopg2.Error as e:
        conn.rollback()
        print(f"Database error: {e}")
        return False