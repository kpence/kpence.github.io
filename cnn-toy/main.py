#!/usr/bin/python3
''' main.py
'''

import pandas as pd
import numpy as np
import helpers
from helpers import FeatureSet

df = pd.read_csv('dataset/mnist_train.csv')

# Hyperparameters

feature_size = 3 # 3 by 3 pixels
window_size = 2
stride_size = 2
image_size = 28

# Filtered layer size
filtered_layer_size = image_size - feature_size + 1

train_ones = (df[df['label'] == 1] - 127.5) / 127.5
train_zeros = (df[df['label'] == 0] - 127.5) / 127.5

print("Starting...")
# print(train_zeros.head())

kernels = [\
    FeatureSet([\
        [[-1, 1,-1],\
         [ 1,-1, 1],\
         [ 1,-1, 1]] * 16,\
     ]),\
    FeatureSet([\
        [[-1, 1,-1],\
         [ 1,-1, 1],\
         [ 1,-1, 1]] * 6,\
     ]),\
 ]

def apply_pooling(layer):
    pool_size = (filtered_layer_size+stride_size-1)//stride_size
    print("pool_size: ", pool_size)
    pool_result = [[0 for x in range(pool_size)]\
                      for y in range(pool_size)]
    print(len(pool_result))

    for y_index in range(pool_size):
        for x_index in range(pool_size):
            iy = y_index * stride_size
            ix = x_index * stride_size
            max_val = 0
            for wy in range(window_size):
                for wx in range(window_size):
                    try:
                        if layer[iy+wy][ix+wx] > max_val:
                            max_val = layer[iy+wy][ix+wx]
                    except:
                        pass
            print(y_index, '   ' ,x_index)
            pool_result[y_index][x_index] = max_val

    return pool_result


# This applies the cross correlation of the convolutional kernel to the input data
def apply_filter(feature, image):
    filter_result = [[0 for x in range(filtered_layer_size)]\
                        for y in range(filtered_layer_size)]
    for iy in range(filtered_layer_size):
        for ix in range(filtered_layer_size):
            acc = 0

            for fy in range(feature_size):
                for fx in range(feature_size):
                    acc += image[iy+fy][ix+fx] * feature[fy][fx]
                
            acc /= feature_size**2
            filter_result[iy][ix] = acc

    return filter_result


def apply_convolution(image, kernel):
    filter_results = []
    pooling_results = []

    for ftr in kernel:
        print("Applying feature to image...")
        filter_results.append(apply_filter(ftr, image))

    print("Filtering done, now pooling")
    for layer in filter_results:
        print("Pooling filtered result...")
        pooling_results.append(apply_pooling(layer))

    return pooling_results
    # Serialize pooling results into fully connected layer
    #print("Serializing fully_connected_layers...")
    #fully_connected_layers = [ [i for L in pooling_result for i in L] for pooling_result in pooling_results ]
    #return fully_connected_layers


def apply_convolution_stack(initial_input, kernels, N=-1):
    if N==-1:
        N = len(kernels)
    elif N<=0:
        return initial_input
    apply_convolution_stack(apply_convolution(initial_input, kernels[N-1], N-1))

stack_result = apply_convolution(helpers.df2images(train_ones), kernels)



# 1. 

