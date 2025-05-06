from db_connection.connection import Conn
from db_connection.insert import (
    insert_user_data, insert_canvas_data,
    insert_image_data, insert_folder_data, insert_note_data
)
from db_connection.read import (
    read_user_data, read_canvas_data,
    read_image_data, read_folder_data, read_note_data
)
from db_connection.update import (
    update_user_password, update_canvas_data,
    update_image_data, update_folder_data, update_note_data
)
from db_connection.delete import (
    delete_user_data, delete_canvas_data,
    delete_image_data, delete_folder_data, delete_note_data
)
from db_connection.utils import (
    get_user_id, get_folder_id, get_canvas_id, get_note_id
)

def test_db_queries():
    db = Conn()
    conn = db.conn
    cursor = conn.cursor()

    print("="*25, "INSERTION TESTS", "="*25)
    # Insert or fetch test user
    test_username = 'test_user'
    test_password = 'dummy_hash'
    cursor.execute("SELECT id FROM users WHERE username = %s", (test_username,))
    row = cursor.fetchone()
    if row:
        user_id = row[0]
        print(f"User '{test_username}' exists (id={user_id})")
    else:
        assert insert_user_data(cursor, conn, {'username': test_username, 'password': test_password}), "User insert failed"
        user_id = get_user_id(cursor, test_username)
        print(f"Inserted user '{test_username}' (id={user_id})")

    # Insert folder
    folder = {'user_id': user_id, 'name': 'Test Folder', 'parent_folder_id': None, 'favorite': True}
    assert insert_folder_data(cursor, conn, folder), "Folder insert failed"
    folder_id = get_folder_id(cursor, user_id, 'Test Folder')
    print(f"Folder id: {folder_id}")

    # Insert image
    image = {
        'user_id': user_id,
        'folder_id': folder_id,
        'image_data': b'test image bytea',
        'filename': 'test_image.png'
    }
    assert insert_image_data(cursor, conn, image), "Image insert failed"
    img_record = read_image_data(cursor, conn, {'user_id': user_id, 'folder_id': folder_id, 'filename': 'test_image.png'})
    image_id = img_record['id']
    print(f"Image id: {image_id}")

    # Insert note
    note = {
        'user_id': user_id,
        'folder_id': folder_id,
        'title': 'Test Note',
        'content': 'This is a sample note content.',
        'favorite': True
    }
    assert insert_note_data(cursor, conn, note), "Note insert failed"
    note_id = get_note_id(cursor, user_id, folder_id, 'Test Note')
    print(f"Note id: {note_id}")

    # Insert canvas
    canvas = {'user_id': user_id, 'layout': {'background':'white','items':[]}, 'title': 'Test Canvas', 'folder_id': None}
    assert insert_canvas_data(cursor, conn, canvas), "Canvas insert failed"
    canvas_id = get_canvas_id(cursor, user_id, 'Test Canvas', None)
    print(f"Canvas id: {canvas_id}")

    print("="*25, "UPDATE TESTS", "="*25)
    # Update password
    pwd_data = {'user_id': user_id, 'new_password': 'new_dummy_hash'}
    assert update_user_password(cursor, conn, pwd_data), "Password update failed"
    print("Password updated.")

    # Update folder
    folder_update = {'folder_id': folder_id, 'folder_name': 'Renamed Folder', 'parent_folder_id': None, 'favorite': False}
    assert update_folder_data(cursor, conn, folder_update), "Folder update failed"
    print("Folder updated.")

    # Update image
    img_update = {
        'image_id': image_id,
        'folder_id': folder_id,
        'filename': 'updated_image.png',
        'image_data': b'updated bytes'
    }
    assert update_image_data(cursor, conn, img_update), "Image update failed"
    print("Image updated.")

    # Update note
    note_update = {'note_id': note_id, 'folder_id': folder_id,
                   'title': 'Test Note', 'content': 'Updated note content.', 'favorite': False}
    assert update_note_data(cursor, conn, note_update), "Note update failed"
    print("Note updated.")

    # Update canvas
    canvas_update = {'canvas_id': canvas_id, 'title': 'Test Canvas',
                     'layout': {'background':'blue','items':[]}, 'folder_id': None}
    assert update_canvas_data(cursor, conn, canvas_update), "Canvas update failed"
    print("Canvas updated.")

    print("="*25, "READ TESTS", "="*25)
    # Verify reads
    user = read_user_data(cursor, conn, {'user_id': user_id})
    assert user and user['id']==user_id, "Read user failed"

    fld = read_folder_data(cursor, conn, {'user_id': user_id, 'name': 'Renamed Folder'})
    assert fld and fld['id']==folder_id and not fld['favorite'], "Read folder failed"

    img = read_image_data(cursor, conn, {'user_id': user_id, 'folder_id': folder_id, 'filename': 'updated_image.png'})
    assert img and img['id']==image_id and img['filename']=='updated_image.png', "Read image failed"

    nt = read_note_data(cursor, conn, {'user_id': user_id, 'folder_id': folder_id, 'title': 'Test Note'})
    assert nt and nt['id']==note_id and not nt['favorite'], "Read note failed"

    cvs = read_canvas_data(cursor, conn, {'user_id': user_id, 'title': 'Test Canvas'})
    assert cvs and cvs['id']==canvas_id, "Read canvas failed"

    print("All read tests passed.")

    print("="*25, "DELETE TESTS", "="*25)
    # Clean up
    assert delete_canvas_data(cursor, conn, {'user_id': user_id, 'title': 'Test Canvas'}), "Delete canvas failed"
    assert delete_image_data(cursor, conn, {'user_id': user_id, 'folder_id': folder_id, 'filename': 'updated_image.png'}), "Delete image failed"
    assert delete_note_data(cursor, conn, {'user_id': user_id, 'folder_id': folder_id, 'title': 'Test Note'}), "Delete note failed"
    assert delete_folder_data(cursor, conn, {'user_id': user_id, 'name': 'Renamed Folder'}), "Delete folder failed"
    assert delete_user_data(cursor, conn, {'user_id': user_id}), "Delete user failed"
    conn.commit()
    print("Cleanup complete.")

    db.close(cursor)

if __name__ == '__main__':
    test_db_queries()
