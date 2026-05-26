#!/bin/bash
cd "$(dirname "$0")"
# Load .env if it exists
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi
# Fallback to current env if set
if [ -z "$OPENAI_API_KEY" ]; then
  echo "ERROR: OPENAI_API_KEY not set. Add it to backend/.env or export it."
  exit 1
fi
echo "Starting resume chat backend on port 8080..."
echo "Model: ${OPENAI_MODEL:-gpt-5.4-mini}"
python3 -m uvicorn main:app --host 0.0.0.0 --port 8080
