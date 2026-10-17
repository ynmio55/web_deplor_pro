#!/bin/bash
# =======================================================
# Stop Server Script for Service Portal (web_deplor_pro)
# =======================================================

echo "🛑 Stopping Service Portal..."

# 1. Stop via PM2 if managed
if command -v pm2 >/dev/null 2>&1; then
    if pm2 describe web-hub >/dev/null 2>&1; then
        echo "🔄 Stopping web-hub in PM2..."
        pm2 stop web-hub 2>/dev/null || true
    fi
fi

# 2. Kill process on port 8090
PID=$(lsof -t -i:8090 2>/dev/null)
if [ -n "$PID" ]; then
    echo "🔄 Terminating process on port 8090 (PID: $PID)..."
    kill -9 $PID 2>/dev/null
    echo "✅ Port 8090 is cleared."
else
    echo "ℹ️ No process running on port 8090."
fi

echo "======================================================="
echo "👋 Service Portal is shut down."
echo "======================================================="
