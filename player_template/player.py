import json
import threading
import websocket


def on_message(ws):
    print(f"Received message: {ws}")


def on_error(ws, error):
    print(f"Error: {error}")


def on_close(ws):
    print("Connection closed")


def on_open(ws):
    print("Connection opened")
    register_message = json.dumps({"action": "register"})
    ws.send(register_message)

websocket.enableTrace(True)
ws = websocket.WebSocketApp("ws://localhost:8080/ws",
                            on_message=on_message,
                            on_error=on_error,
                            on_close=on_close)

ws.on_open = on_open

# websocket thread
wst = threading.Thread(target=ws.run_forever)
wst.daemon = True
wst.start()

try:
    while True:
        message = input("Enter message to send (hit/stand): ")
        ws.send(json.dumps({"action": message}))
        
except KeyboardInterrupt:
    ws.close()
