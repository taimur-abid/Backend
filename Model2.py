#!/usr/bin/env python
# coding: utf-8

# In[16]:


import pandas as pd
from sklearn.neighbors import NearestNeighbors
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

from sklearn.neighbors import KNeighborsClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split


# In[17]:


df = pd.read_csv('products.csv')


# In[18]:


df = df.dropna()
df.head()


# In[19]:


# Extract features from the text data
vectorizer = CountVectorizer(stop_words='english')
features = vectorizer.fit_transform(df['description'])
print(features)


# In[20]:


similarity = cosine_similarity(features)
print(similarity)


# In[21]:


idx = df[df['pid'] == 'SRTEH2FF9KEDEFGF'].index[0]
    
  # Get the similarity scores for the product
scores = list(enumerate(similarity[idx]))

  # Sort the products by similarity
scores = sorted(scores, key=lambda x: x[0], reverse=True)

  # Get the top N most similar products
scores = scores[1:5+1]
product_ids = []
products=[]
for i, _ in scores:
    if i in df.index and isinstance(i, int):
        product_ids.append(df.loc[i]['pid'])
        #products.append(product)
        #product_ids.append(df.loc[i]['pid'])
        
    
print(product_ids)


# In[28]:


def recommend(product_id, n=5):
    
    product_df = df.loc[df['pid'] == product_id]

  # Get the index of the product
    idx = df[df['pid'] == product_id].index[0]
    
  # Get the similarity scores for the product
    scores = list(enumerate(similarity[idx]))

  # Sort the products by similarity
    scores = sorted(scores, key=lambda x: x[0], reverse=True)

  # Get the top N most similar products
    scores = scores[1:n+1]
    product_ids = []
    products=[]
    for i, _ in scores:
        if i in df.index and isinstance(i, int):
            i = df.index.get_loc(i)
            product = {
            'pid': df.loc[i]['pid'],
            'name': df.loc[i]['product_name'],
            'description': df.loc[i]['description']
            }
            products.append(product)
            product_ids.append(df.loc[i]['pid'])
    print(product_ids)
    return products


# In[32]:


recommendations = recommend('JEAE8CZGJ8PGGHRQ')
print(recommendations)


# In[ ]:




