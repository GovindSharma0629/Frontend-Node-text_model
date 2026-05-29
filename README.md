# Frontend Node Text Model

A small React Flow project for testing blueprint-style node workflows, text-node variables, and backend pipeline validation.

## Requirements

- Node.js
- Python 3.10+

## Install

```bash
cd frontend
npm install
```

```bash
cd backend
pip install -r requirements.txt
```

## Run

Start the backend:

```bash
cd backend
uvicorn main:app --reload
```

Start the frontend in another terminal:

```bash
cd frontend
npm start
```

Open:

```text
http://localhost:3000
```

## Notes

- Type variables like `{{ name }}` inside the Text node to create input handles.
- Click `Submit Pipeline` to see node count, edge count, and DAG status.
