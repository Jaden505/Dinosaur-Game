import tensorflow as tf
import numpy as np
from tensorflow import keras
import matplotlib.pyplot as plt
#import os
import ast
#from numpy import loadtxt
#import csv

def shapeData():
    # Train file x
    jump_train = open('Data_storage/datajump.csv', 'r')

    rd1 =jump_train.read()
    rd1 = ast.literal_eval(rd1)
    rd1 = list(rd1)

    jump_train.close()


    # Train file y
    jump_train = open('Data_storage/datatype.csv', 'r')

    rd2 =jump_train.read()
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

    x_train = np.array(rd1)
    y_train = np.array(rd2)
    x_test = np.array(rd3)
    y_test = np.array(rd4)

    #tf.keras.utils.normalize(x_train, axis=1)
    #tf.keras.utils.normalize(x_test, axis=1)

    #print(x_test, y_test)

    #neuralNetwork(x_train, y_train, x_test, y_test)





    print('Data before normalization', x_train[0])
    print('Data before normalization' ,y_train[0])

    x_train, x_test = x_train / 250.0, x_test / 250.0
    #tf.keras.utils.normalize(x_train, axis=1)
    #tf.keras.utils.normalize(x_test, axis=1)


    model = tf.keras.models.Sequential([
        tf.keras.layers.Flatten(),
        tf.keras.layers.Dense(128, activation='relu'),
        tf.keras.layers.Dropout(0.2),
        tf.keras.layers.Dense(3)
    ])

    predictions = model(x_train[:1]).numpy()
    print('Predictions:', predictions)

    tf.nn.softmax(predictions).numpy()

    print('Predictions2:', predictions)

    loss_fn = tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True)
    loss_fn(y_train[:1], predictions).numpy()

    model.compile(optimizer='adam',
                  loss=loss_fn,
                  metrics=['accuracy'])

    model.fit(x_train, y_train, epochs=150)

    predictions = model.predict([x_test])
    for i in range(20):
        print(np.argmax(predictions[i]))
        print(y_test[i])
        print('\n')

    #print("Evaluation: ", model.evaluate(x_test,  y_test, verbose=2))



shapeData()
