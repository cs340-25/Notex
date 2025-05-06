# Helper functions that don't quite fit into any of the other function categories

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

def get_canvas_id(cursor, user_id, title, folder_id = None):
     """Retrieve the id of a canvas item."""
     cursor.execute("SELECT id FROM canvas WHERE user_id = %s AND title = %s AND folder_id IS NOT DISTINCT FROM %s", (user_id, title, folder_id))
     result = cursor.fetchone()
     return result[0] if result else None

def get_folder_id(cursor, user_id, folder_name, parent_folder_id = None):
    """
    Given a user_id and folder_name and parent_folder_name, return the folder id if found, otherwise None.
    """
    cursor.execute("SELECT id FROM folders WHERE user_id = %s AND name = %s AND parent_folder_id IS NOT DISTINCT FROM %s", (user_id, folder_name, parent_folder_id))
    result = cursor.fetchone()
    return result[0] if result else None

def get_note_id(cursor, user_id, folder_id, title):
     """Retrieve the id of a note item"""
     cursor.execute("SELECT id FROM notes WHERE user_id = %s AND folder_id = %s AND title = %s", (user_id, folder_id, title))
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