from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Endpoint to add a new task
@app.route('/api/tasks', methods=['POST'])
def add_task():
    try:
        # Get task data from the request body
        data = request.json
        text = data['text']
        day = data['day']
        reminder = data['reminder']

        # Connect to the database
        conn = sqlite3.connect('tasks.db')
        c = conn.cursor()

        # Insert task data into the 'tasks' table
        c.execute("INSERT INTO tasks (text, day, reminder) VALUES (?, ?, ?)", (text, day, reminder))
        conn.commit()

        # Close the database connection
        conn.close()

        # Return success response
        return jsonify({"message": "Task added successfully"}), 201
    except Exception as e:
        # Return error response if an exception occurs
        return jsonify({"error": str(e)}), 500

# Endpoint to get all tasks
@app.route('/api/tasks', methods=['GET'])
def get_tasks():
    try:
        # Connect to the database
        conn = sqlite3.connect('tasks.db')
        c = conn.cursor()

        # Retrieve all tasks from the 'tasks' table
        c.execute("SELECT * FROM tasks")
        tasks = c.fetchall()

        # Close the database connection
        conn.close()

        # Return tasks as JSON response
        return jsonify(tasks), 200
    except Exception as e:
        # Return error response if an exception occurs
        return jsonify({"error": str(e)}), 500

# Endpoint to delete a task
@app.route('/api/tasks/<int:id>', methods=['DELETE'])
def delete_task(id):
    try:
        # Connect to the database
        conn = sqlite3.connect('tasks.db')
        c = conn.cursor()

        # Delete the task with the given ID from the 'tasks' table
        c.execute("DELETE FROM tasks WHERE id=?", (id,))
        conn.commit()

        # Close the database connection
        conn.close()

        # Return success response
        return jsonify({"message": f"Task with ID {id} deleted successfully"}), 200
    except Exception as e:
        # Return error response if an exception occurs
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
