#!/bin/bash
# =======================================================
# Start Server Script for Service Portal (web_deplor_pro)
# Port: 8090 (hub.miosmooth.com)
# =======================================================

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$PROJECT_DIR" || exit 1

PORT=8090

echo "🚀 Starting Service Portal (Hub)..."

# 1. Stop any existing process on port 8090
PID=$(lsof -t -i:$PORT 2>/dev/null)
if [ -n "$PID" ]; then
    echo "🔄 Stopping existing process on port $PORT (PID: $PID)..."
    kill -9 $PID 2>/dev/null
    sleep 1
fi

# 2. Start server in background
nohup node "$PROJECT_DIR/server.js" > "$PROJECT_DIR/server.log" 2>&1 &
sleep 1

# 3. Verify server status
if curl -s http://127.0.0.1:$PORT > /dev/null; then
    echo "✅ Service Portal is RUNNING at http://127.0.0.1:$PORT"
    echo "🌐 Public URL: https://hub.miosmooth.com"
else
    echo "❌ Failed to start Service Portal. Check server.log for details."
    cat "$PROJECT_DIR/server.log"
    exit 1
fi
