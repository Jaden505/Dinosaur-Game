import asyncio
import websockets
import random
import tensorflow as tf
from tensorflow.keras.models import load_model
import numpy as np
import ast

# Train file x
jump_train = open('Data_storage/datajump_train.csv', 'r')

rd1 = jump_train.read()
rd1 = ast.literal_eval(rd1)
rd1 = list(rd1)

jump_train.close()

# Train file y
jump_train = open('Data_storage/datatype_train.csv', 'r')

rd2 = jump_train.read()
rd2 = ast.literal_eval(rd2)
rd2 = list(rd2)

jump_train.close()

# Test file x
jump_test = open('Data_storage/datajump_test.csv', 'r')

rd3 = jump_test.read()
rd3 = ast.literal_eval(rd3)
rd3 = list(rd3)

jump_test.close()

# Test file y
jump_test = open('Data_storage/datatype_test.csv', 'r')

rd4 = jump_test.read()
rd4 = ast.literal_eval(rd4)
rd4 = list(rd4)

jump_test.close()

# Set data between 0 and 1
# rd1 = [[sigmoid(i) for i in x] for x in rd1]
# rd3 = [[sigmoid(i) for i in x] for x in rd3]

# Removes first one in sublist
# rd1 = [i[1:] for i in rd1]
# rd3 = [i[1:] for i in rd3]

x_train = np.array(rd1)
y_train = np.array(rd2)
x_test = np.array(rd3)
y_test = np.array(rd4)

model = tf.keras.models.Sequential([
    tf.keras.layers.Flatten(input_shape=(4,)),
    tf.keras.layers.Dense(128, activation='relu'),
    tf.keras.layers.Dropout(0.2),
    tf.keras.layers.Dense(2)
])

predictions = model(x_train[:1]).numpy()
tf.nn.softmax(predictions).numpy()

loss_fn = tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True)
loss_fn(y_train[:1], predictions).numpy()

model = load_model('test.keras.model')

model.compile(optimizer='adam',
                  loss=loss_fn,
                  metrics=['accuracy'])

predictions = model.predict([x_test])
for i in range(200, 250):
    print(np.argmax(predictions[i]))
    print(x_test[i])
    print('\n')

async def Answer(websocket, path):
    while True:
        data = await websocket.recv()
        data = ast.literal_eval(data)
        data = list(data)
        print(data)

        jump = model.predict([data])
        jump = np.argmax(jump)

        await websocket.send(str(jump))
        print(str(jump))

def run():
    start_server = websockets.serve(Answer, "localhost", 8765)

    print("Running")
    asyncio.get_event_loop().run_until_complete(start_server)
    asyncio.get_event_loop().run_forever()
    print("We are done")

run()