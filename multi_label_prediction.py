#!/usr/bin/env python
# coding: utf-8

# In[1]:


import pandas as pd
import ast
from sklearn.preprocessing import MultiLabelBinarizer
from sklearn.metrics import roc_curve
from sklearn.metrics import roc_auc_score
from matplotlib import pyplot
# In[2]:


df = pd.read_csv('final.csv')


# In[3]:


df


# In[4]:


df = pd.DataFrame(df)
cols = [1,2,3,4]
df = df[df.columns[cols]]


# In[5]:


df


# In[6]:


likes_list=[]
merchants_list=[]
interests_list=[]


# In[7]:


for i in df['likes']:
    likes_list.append(ast.literal_eval(i))


# In[8]:


for i in df['merchants']:
    merchants_list.append(ast.literal_eval(i))


# In[9]:


for i in df['interests']:
    interests_list.append(ast.literal_eval(i))


# In[10]:


mlb = MultiLabelBinarizer()
df = df.join(pd.DataFrame(mlb.fit_transform(likes_list),
                          columns=mlb.classes_,
                          index=df.index))


# In[11]:


df


# In[18]:


T1=pd.DataFrame(merchants_list).stack().str.get_dummies().sum(level=0)


# In[19]:


T2=pd.DataFrame(likes_list).stack().str.get_dummies().sum(level=0)


# In[23]:


y = pd.DataFrame(interests_list).stack().str.get_dummies().sum(level=0)


# In[24]:


x = pd.concat([T1.reset_index(drop=True),T2.reset_index(drop=True)], axis=1)


# In[25]:


x.shape


# In[26]:


y.shape


# In[30]:


import tensorflow as tf
from sklearn.model_selection import train_test_split


# In[31]:


xtrain, xval, ytrain, yval = train_test_split(x, y, test_size=0.2, random_state=9)


# In[32]:


from sklearn.linear_model import LogisticRegression

# Binary Relevance
from sklearn.multiclass import OneVsRestClassifier

# Performance metric
from sklearn.metrics import f1_score


# In[33]:


lr = LogisticRegression()
clf = OneVsRestClassifier(lr)


# In[34]:


clf.fit(xtrain, ytrain)


# In[35]:


y_pred = clf.predict(xval)


# In[43]:


import numpy as np


# In[69]:


'''for i in range(33):
    if y_pred[1][i]==1:
        print(y.columns[i])'''


# In[67]:


f1_score(yval, y_pred, average="micro")


# In[70]:


y_pred_prob = clf.predict_proba(xval)


# In[71]:


y_pred_prob


# In[72]:


t = 0.3 # threshold value
y_pred_new = (y_pred_prob >= t).astype(int)


# In[73]:


print("Accuracy:",f1_score(yval, y_pred_new, average="micro"))




