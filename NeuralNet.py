import tensorflow as tf
import numpy as np
from tensorflow import keras
#import matplotlib.pyplot as plt
from matplotlib import pyplot
import ast

from tensorflow.keras.models import model_from_json
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout, Activation, Flatten
from tensorflow.keras.layers import Conv2D, MaxPooling2D
from tensorflow.keras.optimizers import SGD , Adam
from tensorflow.keras.callbacks import TensorBoard

tf.keras.backend.set_floatx('float64')

def sigmoid(x):
    return 1.0/(1 + np.exp(-x))

def ShapeData():
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

     # Set data between 0 and 1
    #rd1 = [[sigmoid(i) for i in x] for x in rd1]
    #rd3 = [[sigmoid(i) for i in x] for x in rd3]

    x_train = np.array(rd1)
    y_train = np.array(rd2)
    x_test = np.array(rd3)
    y_test = np.array(rd4)

    NeuralNet(x_train, y_train, x_test, y_test)

def NeuralNet(x_train, y_train, x_test, y_test):

    model = Sequential()
    model.add(Conv2D(32, (8, 8), padding='same',strides=(4, 4),input_shape=(5,)))  #80*80*4
    model.add(MaxPooling2D(pool_size=(2,2)))
    model.add(Activation('relu'))
    model.add(Conv2D(64, (4, 4),strides=(2, 2),  padding='same'))
    model.add(MaxPooling2D(pool_size=(2,2)))
    model.add(Activation('relu'))
    model.add(Conv2D(64, (3, 3),strides=(1, 1),  padding='same'))
    model.add(MaxPooling2D(pool_size=(2,2)))
    model.add(Activation('relu'))
    model.add(Flatten())
    model.add(Dense(512))
    model.add(Activation('relu'))
    model.add(Dense(2))
    adam = Adam(lr=1e-4)
    model.compile(loss='mse',optimizer='adam')

    history = model.fit(x_train, y_train, epochs=30, batch_size=50)

    predictions = model.predict(x_test)

    for i in range(10):
        print(np.argmax(predictions[i]))
        print(y_test[i])
        print('\n')

    # plot loss during training
    pyplot.subplot(211)
    pyplot.title('Loss')
    pyplot.plot(history.history['loss'], label='train')
    pyplot.legend()
    # plot mse during training
    pyplot.subplot(212)
    pyplot.title('Accuracy')
    pyplot.plot(history.history['accuracy'], label='train')
    pyplot.legend()
    pyplot.show()

ShapeData()
