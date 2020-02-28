import pickle
import tensorflow as tf
import numpy as np
from tensorflow import keras
import matplotlib.pyplot as plt
#import os
import ast
#from numpy import loadtxt
#import csv
from tensorflow.keras.models import load_model
from tensorflow.keras.models import model_from_json

def sigmoid(x):
    return 1.0/(1 + np.exp(-x))

def shapeData():
    # Train file x
    jump_train = open('Data_storage/datajump_train.csv', 'r')

    rd1 =jump_train.read()
    rd1 = ast.literal_eval(rd1)
    rd1 = list(rd1)

    jump_train.close()


    # Train file y
    jump_train = open('Data_storage/datatype_train.csv', 'r')

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

    # Removes first one in sublist
    #rd1 = [i[1:] for i in rd1]
    #rd3 = [i[1:] for i in rd3]

    x_train = np.array(rd1)
    y_train = np.array(rd2)
    x_test = np.array(rd3)
    y_test = np.array(rd4)

    print(x_train)
    print(x_test)

    model = tf.keras.models.Sequential([
        tf.keras.layers.Flatten(input_shape=(4,)),
        tf.keras.layers.Dense(128, activation='relu'),
        tf.keras.layers.Dropout(0.2),
        tf.keras.layers.Dense(3)
    ])

    predictions = model(x_train[:1]).numpy()
    tf.nn.softmax(predictions).numpy()

    loss_fn = tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True)
    loss_fn(y_train[:1], predictions).numpy()

    model.compile(optimizer='adam',
                  loss=loss_fn,
                  metrics=['accuracy'])

    model.fit(x_train, y_train, epochs=30, batch_size=50)

    predictions = model.predict([x_test])
    for i in range(20):
        print(np.argmax(predictions[i]))
        print(y_test[i])
        print('\n')

    print("Evaluation: ", model.evaluate(x_test,  y_test, verbose=2))
    import pdb; pdb.set_trace()

    #model_json = model.to_json()

    #with open("model.json", "w") as json_file:
        #json_file.write(model_json)

    #model.save_weights("model.h5")



shapeData()