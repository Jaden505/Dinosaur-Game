import asyncio
import websockets
import random
import tensorflow as tf
from tensorflow.keras.models import load_model
import numpy as np
import ast

# Train file x
jump_train = open('datajump.csv', 'r')

rd1 = jump_train.read()
rd1 = ast.literal_eval(rd1)
rd1 = list(rd1)

jump_train.close()

# Train file y
jump_train = open('datatype.csv', 'r')

rd2 = jump_train.read()
rd2 = ast.literal_eval(rd2)
rd2 = list(rd2)

jump_train.close()

# Test file x
jump_test = open('datajump (13).csv', 'r')

rd3 = jump_test.read()
rd3 = ast.literal_eval(rd3)
rd3 = list(rd3)

jump_test.close()

# Test file y
jump_test = open('datatype (11).csv', 'r')

rd4 = jump_test.read()
rd4 = ast.literal_eval(rd4)
rd4 = list(rd4)

jump_test.close()

x_train = np.array(rd1)
y_train = np.array(rd2)
x_test = np.array(rd3)
y_test = np.array(rd4)

loaded_model = load_model('my.third.model')

loaded_model.fit(x_train, y_train, epochs=50, batch_size=10)

loaded_model.summary()

# Predict loaded model
predictions = loaded_model.predict([x_train])
for i in range(20):
    print(np.argmax(predictions[i]))
    print(y_train[i])
    print(x_train[i])
    print('\n')

async def Answer(websocket, path):
    while True:
        data = await websocket.recv()
        data = ast.literal_eval(data)
        data = list(data)
        #print(data)

        jump = loaded_model.predict([data])
        jump = np.argmax(jump)

        await websocket.send(str(jump))
        #print(str(jump))

def run():
    start_server = websockets.serve(Answer, "localhost", 8765)

    print("Running")
    asyncio.get_event_loop().run_until_complete(start_server)
    asyncio.get_event_loop().run_forever()
    print("We are done")

run()