from db_connection.connection import Conn
from db_connection.insert import insert_user_data, insert_canvas_data, insert_image_data, insert_folder_data, insert_note_data
from db_connection.read import read_user_data, read_canvas_data, read_image_data, read_folder_data, read_note_data
from db_connection.delete import delete_user_data, delete_canvas_data, delete_image_data, delete_folder_data, delete_note_data
from db_connection.utils import get_user_id, get_folder_id, get_table_info

def test_db_queries():
    db_connection = Conn()
    conn = db_connection.conn
    cursor = conn.cursor()
    
    print("="*25, "INSERTION TESTS", "="*25)

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
        'parent_folder_id': None,
        'favorite': True
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
        'image_data': b'test image bytea',
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
        'content': 'This is a sample note content.',
        'favorite': True
    }
    if insert_note_data(cursor, conn, note_data):
        print("Note inserted successfully with favorite=True.")
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

    print("="*25, "UPDATE TESTS", "="*25)
    # Update canvas layout
    updated_canvas_data = {
        'user_id': test_user_id,
        'layout': {"background": "blue", "items": [{"type": "note", "id": 1, "x": 100, "y": 150}]},
        'title': 'Test Canvas'
    }
    if insert_canvas_data(cursor, conn, updated_canvas_data):
        print("Canvas updated successfully.")
    else:
        print("Canvas update failed.")

    # Update image data
    updated_image_data = {
        'user_id': test_user_id,
        'folder_id': folder_id,
        'image_data': b'updated image bytes',
        'filename': 'test_image.png'
    }
    if insert_image_data(cursor, conn, updated_image_data):
        print("Image updated successfully.")
    else:
        print("Image update failed.")

    updated_folder_data = {
        'user_id': test_user_id,
        'name': 'Test Folder',
        'parent_folder_id': None,
        'favorites': False
    }
    if insert_folder_data(cursor, conn, updated_folder_data):
        print("Folder updated successfully with favorites=False.")
    else:
        print("Folder update failed.")

    # Update note content
    updated_note_data = {
        'user_id': test_user_id,
        'folder_id': folder_id,
        'title': 'Test Note',
        'content': 'This is the updated note content.',
        'favorite': True
    }
    if insert_note_data(cursor, conn, updated_note_data):
        print("Note updated successfully with favorite=False.")
    else:
        print("Note update failed.")

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
    
    print("="*25, "READ TESTS", "="*25)
    result = read_user_data(cursor, conn, {'user_id': test_user_id})
    assert result is not None, "Failed to fetch user data."
    assert result['id'] == test_user_id, "User ID mismatch."
    print("read_user_data passed.")

    print("Testing read_folder_data...")
    result = read_folder_data(cursor, conn, {'user_id': test_user_id, 'name': 'Test Folder'})
    assert result is not None, "Failed to fetch folder data."
    assert result['id'] == folder_id, "Folder ID mismatch."
    print("read_folder_data passed.")

    print("Testing read_image_data...")
    result = read_image_data(cursor, conn, {'user_id': test_user_id, 'folder_id': folder_id, 'filename': 'test_image.png'})
    assert result is not None, "Failed to fetch image data."
    assert result['filename'] == 'test_image.png', "Filename mismatch."
    print("read_image_data passed.")

    print("Testing read_note_data...")
    result = read_note_data(cursor, conn, {'user_id': test_user_id, 'folder_id': folder_id, 'title': 'Test Note'})
    assert result is not None, "Failed to fetch note data."
    assert result['title'] == 'Test Note', "Note title mismatch."
    assert result['favorite'] == True, "Note favorite flag mismatch after update."
    print("read_note_data passed.")

    print("Testing read_canvas_data...")
    result = read_canvas_data(cursor, conn, {'user_id': test_user_id, 'title': 'Test Canvas'})
    assert result is not None, "Failed to fetch canvas data."
    assert result['title'] == 'Test Canvas', "Canvas title mismatch."
    print("read_canvas_data passed.")

    print("="*25, "DELETE TESTS", "="*25)
    # Delete inserted test data (order matters due to foreign key constraints)
    print(f"delete canvas test: {delete_canvas_data(cursor=cursor, conn=conn, data={'user_id': test_user_id, 'title': 'Test Canvas'})}")
    print(f"delete image test: {delete_image_data(cursor=cursor, conn=conn, data={'user_id': test_user_id, 'folder_id': folder_id, 'filename': 'test_image.png'})}")
    print(f"delete note test: {delete_note_data(cursor=cursor, conn=conn, data={'user_id': test_user_id, 'folder_id': folder_id, 'title': 'Test Note'})}")
    print(f"delete folder test: {delete_folder_data(cursor=cursor, conn=conn, data={'user_id': test_user_id, 'name': 'Test Folder'})}")
    print(f"delete user test: {delete_user_data(cursor=cursor, conn=conn, data={'user_id': test_user_id})}")
    conn.commit()
    print("Test data deleted successfully.")

    db_connection.close(cursor=cursor)

# Example usage
if __name__ == '__main__':

    # get_table_info(cursor, 'users')
    # get_table_info(cursor, 'canvas')
    # get_table_info(cursor, 'folders')
    # get_table_info(cursor, 'images')
    # get_table_info(cursor, 'notes')

    test_db_queries()