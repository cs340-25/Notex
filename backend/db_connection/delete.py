import psycopg2

def delete_user_data(cursor, conn, data):
    '''
    Args: 
    psycopg2 cursor for accessing database
    conn: psycopg2 connection to commit the transaction
    data: contains a user id as follows:
    
    {
    'user_id' : user_id_val
    }
      
    Returns: True or False depending on success of operation.
    '''
    if 'user_id' not in data:
        print("Missing required field: user_id")
        return False
    
    
    try:
        cursor.execute("DELETE FROM users WHERE id = %s", (data['user_id'],))
        query_success = cursor.rowcount
        conn.commit()

        return query_success > 0

    except psycopg2.Error as e:
        conn.rollback()
        print(f"Database error: {e}")
        return False

def delete_canvas_data(cursor, conn, data):
    '''
    Args: 
    psycopg2 cursor for accessing database
    conn: psycopg2 connection to commit the transaction
    data: contains a user_id and title as follows:
    
    {
    'user_id' : id_val
    'title' : title_val
    }
      
    Returns: True or False depending on success of operation.
    '''
    if 'user_id' not in data or 'title' not in data:
        print("Missing required fields: user_id or title")
        return False
    
    try:
        cursor.execute("DELETE FROM canvas WHERE user_id = %s AND title = %s", (data['user_id'], data['title']))
        query_success = cursor.rowcount
        conn.commit()

        return query_success > 0

    except psycopg2.Error as e:
        conn.rollback()
        print(f"Database error: {e}")
        return False

def delete_image_data(cursor, conn, data):
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
      
    Returns: True or False depending on success of operation.
    '''
    if 'user_id' not in data or 'folder_id' not in data or 'filename' not in data:
        print("Missing required fields: user_id, folder_id, or filename")
        return False
    
    try:
        cursor.execute("DELETE FROM images WHERE user_id = %s AND folder_id = %s AND filename = %s", (data['user_id'], data['folder_id'], data['filename']))
        query_success = cursor.rowcount
        conn.commit()

        return query_success > 0

    except psycopg2.Error as e:
        conn.rollback()
        print(f"Database error: {e}")
        return False
    
def delete_folder_data(cursor, conn, data):
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
    
    Returns: True or False depending on the success of the operation.
    '''
    if 'user_id' not in data or 'name' not in data:
        print("Missing required fields: user_id or name")
        return False
    
    try:
        parent_folder_id = data.get('parent_folder_id', None)

        if parent_folder_id:
            cursor.execute("DELETE FROM folders WHERE user_id = %s AND name = %s AND parent_folder_id = %s", (data['user_id'], data['name'], parent_folder_id))
            query_success = cursor.rowcount
        else:
            cursor.execute("DELETE FROM folders WHERE user_id = %s AND name = %s AND parent_folder_id IS NULL", (data['user_id'], data['name']))
            query_success = cursor.rowcount 

        conn.commit()

        return query_success > 0

    except psycopg2.Error as e:
        conn.rollback()
        print(f"Database error: {e}")
        return False

def delete_note_data(cursor, conn, data):
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
      
    Returns: True or False depending on success of operation.
    '''
    if 'user_id' not in data or 'folder_id' not in data or 'title' not in data:
        print("Missing required fields: user_id, folder_id, or title")
        return False
    
    try:
        cursor.execute("DELETE FROM notes WHERE user_id = %s AND folder_id = %s AND title = %s", (data['user_id'], data['folder_id'], data['title']))
        query_success = cursor.rowcount
        conn.commit()

        return query_success > 0

    except psycopg2.Error as e:
        conn.rollback()
        print(f"Database error: {e}")
        return False