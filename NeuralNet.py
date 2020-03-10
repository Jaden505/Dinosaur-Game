import asyncio
import websockets
import random
import tensorflow as tf
from tensorflow.keras.models import load_model
import numpy as np
import ast
import time
from threading import Thread

# Train file x
jump_train = open('x_train.csv', 'r')

rd1 = jump_train.read()
rd1 = ast.literal_eval(rd1)
rd1 = list(rd1)

jump_train.close()

# Train file y
jump_train = open('y_train.csv', 'r')

rd2 = jump_train.read()
rd2 = ast.literal_eval(rd2)
rd2 = list(rd2)

jump_train.close()

# Shuffle both list in same order
list_shuffle = list(zip(rd1, rd2))
random.shuffle(list_shuffle)
rd1, rd2 = zip(*list_shuffle)

x_train = np.array(rd1)
y_train = np.array(rd2)

loaded_model = load_model('test.fourth.model')

loaded_model.fit(x_train, y_train, epochs=10, batch_size=10)

#loaded_model.summary()

#wrong_predictions = 0

# Predict loaded model
#predictions = loaded_model.predict([x_train])
#for i in range(2000):
#    print(np.argmax(predictions[i]))
#    print(y_train[i])
#    print(x_train[i])
#    print('\n')

#    prediction = np.argmax(predictions[i])
#    actual = y_train[i]

#    if prediction != actual:
#       wrong_predictions += 1

#print(wrong_predictions)


async def Answer(websocket, path):
    while True:
        data = await websocket.recv()

        # Checks if the sent data is training data
        if len(data) > 30 and any(nr > 1 for nr in list(ast.literal_eval(data))):
            with open('x_train.csv', 'a') as x:
                x.write(',', data)
                loaded_model.fit(x_train, y_train, epochs=10, batch_size=10)

        elif len(data) > 30 :
            with open('y_train.csv', 'a') as y:
                y.write(',', data)
                loaded_model.fit(x_train, y_train, epochs=10, batch_size=10)

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

run()
