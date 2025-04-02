import psycopg2
from dotenv import load_dotenv
import os

class Conn:
    def __init__(self):
        # Set attributes of class, access with Conn.conn or Conn.cursor
        try:
            self.config = self._load_config()
        except RuntimeError as e:
            raise RuntimeError(f"Error initializing connection: {e}") from e

        try:
            self.conn = self._connect_to_db(self.config)
        except RuntimeError as e:
            raise RuntimeError(f"Error connecting to database: {e}") from e
        
    # Close the database connection
    def close(self, cursor=None):
        if cursor:
            cursor.close()
        self.conn.close()

    # Helper function to get connection data from .env file
    def _load_config(self):
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
    def _connect_to_db(self, config):
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