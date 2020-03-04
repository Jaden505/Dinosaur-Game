import asyncio
import websockets
import random
import tensorflow as tf
from tensorflow.keras.models import load_model
import numpy as np
import ast
import time

model = load_model('Second_model')

async def Answer(websocket, path):
    while True:
        data = await websocket.recv()
        data = ast.literal_eval(data)
        data = list(data)
        #data = np.array(data)
        #print(data)

        jump = np.argmax(model.predict([data]))
        #jump = np.argmax(jump)

        await websocket.send(str(jump))
        #print(str(jump))

def run():
    start_server = websockets.serve(Answer, "localhost", 8765)

    print("Running")
    asyncio.get_event_loop().run_until_complete(start_server)
    asyncio.get_event_loop().run_forever()
    print("We are done")

run()
