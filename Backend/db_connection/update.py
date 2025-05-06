import psycopg2
from psycopg2.extras import Json
import bcrypt

def update_user_password(cursor, conn, data):
    """
    Use this and next function in case of need for password reset

    Args:
    cursor: psycopg2 cursor for accessing database
    conn: psycopg2 connection to commit the transaction
    data: contains user_id and new password

    Returns: True or False depending on success of operation
    """
    try:
        if 'user_id' not in data or 'new_password' not in data:
            print('Missing required field: user_id or new_password')
            return False

        new_password = data['new_password'].encode('utf-8')
        salt = bcrypt.gensalt()
        hashed_new_password = bcrypt.hashpw(new_password, salt).decode('utf-8')

        cursor.execute("UPDATE users SET password_hash = %s WHERE id = %s", (hashed_new_password, data['user_id']))

        conn.commit()

        return cursor.rowcount > 0

    except psycopg2.Error as e: 
        conn.rollback()
        print(f"Database error: {e}")
        return False

def update_canvas_data(cursor, conn, data):
    """
    Args: 
    cursor: psycopg2 cursor for accessing database
    conn: psycopg2 connection to commit the transaction
    data: contains canvas_id, new title, layout, and folder_id

    Returns: True or False depending on success of operation
    """
    try:
        if 'canvas_id' not in data or 'title' not in data or 'layout' not in data or 'folder_id' not in data:
            print('Missing required fields: canvas_id, layout, or folder_id')
            return False
        
        cursor.execute("UPDATE canvas SET title = %s, layout = %s, folder_id = %s WHERE id = %s", (data['title'], Json(data['layout']), data['folder_id'], data['canvas_id']))

        conn.commit()

        return cursor.rowcount > 0

    except psycopg2.Error as e:
        conn.rollback()
        print(f"Database error: {e}")
        return False

def update_image_data(cursor, conn, data):
    """
    Args: 
    cursor: psycopg2 cursor for accessing database
    conn: psycopg2 connection to commit the transaction
    data: contains image_id, and new folder_id, new filename, new image_data

    Returns: True or False depending on success of operation
    """
    try:
        if 'image_id' not in data or 'folder_id' not in data or 'filename' not in data or 'image_data' not in data:
            print("Missing required fields: image_id, folder_id, filename, or image_data")
            return False
        
        cursor.execute("UPDATE images SET folder_id = %s, filename = %s, image_data = %s WHERE id = %s", (data['folder_id'], data['filename'], psycopg2.Binary(data['image_data']), data['image_id']))

        conn.commit()

        return cursor.rowcount > 0
    
    except psycopg2.Error as e:
        conn.rollback()
        print(f"Database error: {e}")
        return False

def update_folder_data(cursor, conn, data):
    """
    Args: 
    cursor: psycopg2 cursor for accessing database
    conn: psycopg2 connection to commit the transaction
    data: contains folder_id and new folder name, new parent folder id, and new favorite value

    Returns: True or False depending on success of operation
    """
    try:
        if 'folder_id' not in data or 'folder_name' not in data or 'parent_folder_id' not in data or 'favorite' not in data:
            print("Missing required fields: folder_id, folder_name, parent_folder_id, or favorite")
            return False
        
        cursor.execute("UPDATE folders SET name = %s, parent_folder_id = %s, favorite = %s WHERE id = %s", (data['folder_name'], data['parent_folder_id'], (data['favorite']), data['folder_id']))

        conn.commit()

        return cursor.rowcount > 0
    
    except psycopg2.Error as e:
        conn.rollback()
        print(f"Database error: {e}")
        return False
    
def update_note_data(cursor, conn, data):
    """
    Args: 
    cursor: psycopg2 cursor for accessing database
    conn: psycopg2 connection to commit the transaction
    data: contains note_id and new note title, new content, new folder id, and new favorite value

    Returns: True or False depending on success of operation
    """
    try:
        if 'note_id' not in data or 'title' not in data or 'content' not in data or 'folder_id' not in data or 'favorite' not in data:
            print("Missing required fields: note_id, title, content, folder_id, or favorite")
            return False
        
        cursor.execute("UPDATE notes SET folder_id = %s, title = %s, content = %s, favorite = %s WHERE id = %s", (data['folder_id'], data['title'], data['content'], data['favorite'], data['note_id']))

        conn.commit()

        return cursor.rowcount > 0
    
    except psycopg2.Error as e:
        conn.rollback()
        print(f"Database error: {e}")
        return False