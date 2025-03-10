import psycopg2
from dotenv import load_dotenv
import os

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

# For more information about table structure (Current tables are users, folders, notes, images, canvas)
def get_table_info(cursor, table_name):
        cursor.execute("SELECT column_name, data_type, is_nullable, column_default FROM information_schema.columns WHERE table_name = 'users';")
        print('='*50)
        print(f"Structure of table {table_name}:")
        for column in cursor.fetchall():
            print(f"Column: {column[0]}, Data Type: {column[1]}, Nullable: {column[2]}, Default: {column[3]}")

# Example usage
if __name__ == '__main__':
    config = load_config()
    print(config)
    conn = connect_to_db(config)
    cursor = conn.cursor()

    get_table_info(cursor, 'users')

    cursor.close()
    conn.close()