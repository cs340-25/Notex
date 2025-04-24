import psycopg2

def read_user_data(cursor, conn, data):
    '''
    Args: 
    psycopg2 cursor for accessing database
    conn: psycopg2 connection to commit the transaction
    data: contains a user id as follows:
    
    {
    'user_id' : user_id_val
    }
      
    Returns: dictionary containing user data
    '''
    if 'user_id' not in data:
        print("Missing required field: user_id")
        return None
    
    
    try:
        cursor.execute("SELECT id, username, created_at FROM users WHERE id = %s", (data['user_id'],))
        
        user_data = cursor.fetchone()
        if user_data:
            # Return the result as a dictionary
            return {
                'id': user_data[0],
                'username': user_data[1],
                'created_at': user_data[2].strftime('%Y-%m-%d %H:%M:%S')
            }
    
        else:
            print(f"User information not found.")
            return None
    
    except psycopg2.Error as e:
        print(f"Database error: {e}")
        return None 

def read_canvas_data(cursor, conn, data):
    '''
    Args: 
    psycopg2 cursor for accessing database
    conn: psycopg2 connection to commit the transaction
    data: contains a user_id and title as follows:
    
    {
    'user_id' : id_val
    'title' : title_val
    }
      
    Returns: dictionary containing user data 
    '''
    if 'user_id' not in data or 'title' not in data:
        print("Missing required fields: user_id or title")
        return False
    
    try:
        cursor.execute("SELECT id, user_id, title, layout, created_at FROM canvas WHERE user_id = %s AND title = %s", (data['user_id'], data['title']))

        user_data = cursor.fetchone()
        if user_data:
            # Return the result as a dictionary
            return {
                'id': user_data[0],
                'user_id': user_data[1],
                'title': user_data[2],
                'layout': user_data[3],
                'created_at': user_data[4].strftime('%Y-%m-%d %H:%M:%S')
            }
    
        else:
            print(f"User information not found.")
            return None

    except psycopg2.Error as e:
        conn.rollback()
        print(f"Database error: {e}")
        return False

def read_image_data(cursor, conn, data):
    '''
    Args: 
    psycopg2 cursor for accessing database
    conn: psycopg2 connection to commit the transaction
    data: contains a user_id, folder_id, and filename as follows:
    
    {
    'user_id' : user_id_val,
    'folder_id' : folder_id_val, 
    'filename' : filename_val
    }
      
    Returns: dictionary containing user data 
    '''
    if 'user_id' not in data or 'folder_id' not in data or 'filename' not in data:
        print("Missing required fields: user_id, folder_id, or filename")
        return False
    
    try:
        cursor.execute("SELECT id, user_id, folder_id, filename, image_data, uploaded_at FROM images WHERE user_id = %s AND folder_id = %s AND filename = %s", (data['user_id'], data['folder_id'], data['filename']))
        
        user_data = cursor.fetchone()
        if user_data:
            # Return the result as a dictionary
            return {
                'id': user_data[0],
                'user_id': user_data[1],
                'folder_id': user_data[2],
                'filename': user_data[3],
                'image_data': user_data[4],
                'created_at': user_data[5].strftime('%Y-%m-%d %H:%M:%S')
            }
    
        else:
            print(f"User information not found.")
            return None      

    except psycopg2.Error as e:
        conn.rollback()
        print(f"Database error: {e}")
        return False
    
def read_folder_data(cursor, conn, data):
    '''
    Args:
    cursor: psycopg2 cursor for accessing the database
    conn: psycopg2 connection to commit the transaction
    data: contains a user_id, name, and a parent_folder_id (if necessary) as follows:
    
    {
        'user_id': user_id_val,
        'name': folder_name_val,
        'parent_folder_id': parent_folder_id_val (optional)
    }
    
    Dictionary containing user data
    '''
    if 'user_id' not in data or 'name' not in data:
        print("Missing required fields: user_id or name")
        return False
    
    try:
        parent_folder_id = data.get('parent_folder_id', None)

        if parent_folder_id:
            cursor.execute("SELECT id, user_id, name, created_at, favorite, parent_folder_id FROM folders WHERE user_id = %s AND name = %s AND parent_folder_id = %s", (data['user_id'], data['name'], parent_folder_id))
            user_data = cursor.fetchone()            
        else:
            cursor.execute("SELECT id, user_id, name, created_at, favorite, parent_folder_id FROM folders WHERE user_id = %s AND name = %s AND parent_folder_id IS NULL", (data['user_id'], data['name']))
            user_data = cursor.fetchone()
                
        if user_data:
            # Return the result as a dictionary
            return {
                'id': user_data[0],
                'user_id': user_data[1],
                'name': user_data[2],
                'created_at': user_data[3].strftime('%Y-%m-%d %H:%M:%S'),
                'favorite': user_data[4],
                'parent_folder_id': user_data[5]
            }

        else:
            print(f"User information not found.")
            return None      

    except psycopg2.Error as e:
        conn.rollback()
        print(f"Database error: {e}")
        return False

def read_note_data(cursor, conn, data):
    '''
    Args: 
    psycopg2 cursor for accessing database
    conn: psycopg2 connection to commit the transaction
    data: contains a user_id, folder_id, and title as follows:
    
    {
    'user_id' : user_id_val,
    'folder_id' : folder_id_val,
    'title' : title_val,
    }
      
    Returns: dictionary containing user data
    '''
    if 'user_id' not in data or 'folder_id' not in data or 'title' not in data:
        print("Missing required fields: user_id, folder_id, or title")
        return False
    
    try:
        cursor.execute("SELECT id, user_id, folder_id, title, content, favorite, created_at FROM notes WHERE user_id = %s AND folder_id = %s AND title = %s", (data['user_id'], data['folder_id'], data['title']))

        user_data = cursor.fetchone()
                
        if user_data:
            # Return the result as a dictionary
            return {
                'id': user_data[0],
                'user_id': user_data[1],
                'folder_id': user_data[2],
                'title': user_data[3],
                'content': user_data[4],
                'favorite': user_data[5],
                'created_at': user_data[6].strftime('%Y-%m-%d %H:%M:%S'),
            }
    except psycopg2.Error as e:
        conn.rollback()
        print(f"Database error: {e}")
        return False