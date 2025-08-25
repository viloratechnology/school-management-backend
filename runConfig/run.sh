#!/bin/bash


set -e

if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
fi


PROJECT_DIR="${PROJECT_DIR}"
PORT="${PORT}"


spin() {
    local pid=$1
    local delay=0.1
    local spinner=(⠋ ⠙ ⠹ ⠸ ⠼ ⠴ ⠦ ⠧ ⠇ ⠏)

    while [ -d /proc/$pid ]; do
        for i in "${spinner[@]}"; do
            printf "\r$2 %s" "$i"
            sleep $delay
        done
    done
    printf "\r$2 ✅\n"
}

echo "📂 Changing to $PROJECT_DIR"
cd "$PROJECT_DIR"

echo "📦 Installing dependencies..."
pnpm install &  # run in background
spin $! "Installing dependencies..."

echo "🛠️  Building the project..."
pnpm run dev # run in background
spin $! "Building project..."

echo "🚀 Serving on http://localhost:$PORT"





