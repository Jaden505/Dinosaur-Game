import tensorflow as tf
import numpy as np
from tensorflow import keras
import matplotlib.pyplot as plt
from tensorflow.keras.models import load_model
import ast
import pickle
import random

def sigmoid(x):
    return 1.0/(1 + np.exp(-x))

def shapeData():
    # Train file x
    jump_train = open('datajump (13).csv', 'r')

    rd1 =jump_train.read()
    rd1 = ast.literal_eval(rd1)
    rd1 = list(rd1)

    jump_train.close()

    # Train file y
    jump_train = open('datatype (11).csv', 'r')

    rd2 =jump_train.read()
    rd2 = ast.literal_eval(rd2)
    rd2 = list(rd2)

    jump_train.close()

    # Shuffle both list in same order
    list_shuffle = list(zip(rd1, rd2))
    random.shuffle(list_shuffle)
    rd1, rd2 = zip(*list_shuffle)

    x_train = np.array(rd1)
    y_train = np.array(rd2)

    model = tf.keras.models.Sequential([
        tf.keras.layers.Flatten(),
        tf.keras.layers.Dense(128, activation='relu'),
        tf.keras.layers.Dropout(0.2),
        tf.keras.layers.Dense(2)
    ])

    predictions = model(x_train[:1]).numpy()
    tf.nn.softmax(predictions).numpy()

    loss_fn = tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True)
    loss_fn(y_train[:1], predictions).numpy()

    model.compile(optimizer='adam',
                  loss=loss_fn,
                  metrics=['accuracy'])

    model.fit(x_train, y_train, epochs=50, batch_size=10)

    model.save('my.third.model')
    del model

    SaveLoad(x_train, y_train)

def SaveLoad(x_train, y_train):
    loaded_model = load_model('my.third.model')

    loaded_model.fit(x_train, y_train, epochs=50, batch_size=10)

    loaded_model.summary()

    wrong_predictions = 0

    # Predict loaded model
    predictions = loaded_model.predict([x_train])
    for i in range(500, 2000):
        prediction = np.argmax(predictions[i])
        actual = y_train[i]

        print(prediction)
        print(actual)
        print(x_train[i])
        print('\n')

        if prediction != actual:
            wrong_predictions += 1

    print(wrong_predictions)

shapeData()
