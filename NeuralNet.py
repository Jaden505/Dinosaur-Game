import tensorflow as tf
import numpy as np
from tensorflow import keras
import matplotlib.pyplot as plt
#import os
import ast
#from numpy import loadtxt
import csv

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

    print(len(rd1), len(rd2), len(rd3), len(rd4))

    x_train = np.array(rd1)
    y_train = np.array(rd2)
    x_test = np.array(rd3)
    y_test = np.array(rd4)

    tf.keras.utils.normalize(x_train, axis=1)
    tf.keras.utils.normalize(x_test, axis=1)

    neuralNetwork(x_train, y_train, x_test, y_test)

def neuralNetwork(x_train, y_train, x_test, y_test):
    model = tf.keras.models.Sequential()

    # Input
    model.add(tf.keras.layers.Flatten())

    # Hidden
    model.add(tf.keras.layers.Dense(20000, activation='relu'))

    # Output
    model.add(tf.keras.layers.Dense(3, activation='softmax'))

    model.compile(optimizer= 'adam', loss= 'categorical_crossentropy', metrics=['accuracy'] )

    model.fit(x_train, y_train, epochs=3)

    predictions = model.predict([x_test])
    print(predictions)

    for i in range(10):
        print(predictions[i])
        print(y_test[i], '\n')

shapeData()


# Data shape working, Neural network not actually learning nor are the outputs correct