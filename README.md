# Task Manager

A full-stack task management app built with FastAPI and SQLite.

## Features

- Add, edit, complete, and delete tasks
- Tasks persist in a SQLite database (survive refresh and server restart)
- Input validation — empty task titles are rejected

## Tech Stack

- **Backend:** FastAPI, SQLite
- **Frontend:** HTML, CSS, JavaScript
- **Deployment:** Render

## How to Run Locally

1. Install dependencies:
```
pip install fastapi "uvicorn[standard]" pydantic
```

2. Start the server:
```
uvicorn main:app --reload
```

3. Open your browser to:
```
http://127.0.0.1:8000/
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|--------------|
| GET | /tasks | Get all tasks |
| POST | /tasks | Create a new task |
| PUT | /tasks/{id} | Update a task (title and/or completed status) |
| DELETE | /tasks/{id} | Delete a task |

## Author

Syed Jawad Ul Hassan
