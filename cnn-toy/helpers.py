''' helpers.py
'''

# Helper function to turn dataframes to images
def df2images(df):
    images = [np.reshape(row, (-1,28)) for row in df.loc[:, df.columns != 'label'].to_numpy()]
    return images

class FeatureSet():
    def __init__(self, table):
        self.table = table
    def __getitem__(self, key):
        return self.table[key]

