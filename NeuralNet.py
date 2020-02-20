import tensorflow as tf
import numpy as np
from tensorflow import keras
import matplotlib.pyplot as plt
import os
import ast
from numpy import loadtxt
import ast
import csv

def createData():
    # Detail file
    jump_train = open('Data_storage/datajump.txt', 'r')

    rd1 =jump_train.read()
    rd1 = ast.literal_eval(rd1)
    rd1 = list(rd1)

    jump_train.close()

    # Answer file
    jumptype_train = open('Data_storage/datatype.txt', 'r')

    rd2 = jumptype_train.read()
    rd2 = ast.literal_eval(rd2)
    rd2 = list(rd2)

    jumptype_train.close()

    x_train = np.array(rd1)
    y_train = np.array(rd2)

    tf.keras.utils.normalize(x_train, axis=1)

    neuralNetwork(x_train, y_train)

def neuralNetwork(x_train, y_train):
    model = tf.keras.models.Sequential()

    # Input
    model.add(tf.keras.layers.Flatten())

    # Hidden
    model.add(tf.keras.layers.Dense(128, activation='relu'))
    model.add(tf.keras.layers.Dense(128, activation='relu'))

    # Output
    model.add(tf.keras.layers.Dense(3, activation='softmax'))

    model.compile(optimizer= 'adam', loss= 'categorical_crossentropy', metrics=['accuracy'] )

    model.fit(x_train, y_train, epochs=3)

createData()
