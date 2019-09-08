# Customer_Analytica

Live demo : https://customer-analytica.now.sh

  Customer Analytica is an application which is used to create profile of bank customers by performing analysis on public data collected from social media platforms like facebook, linkedIn by customer's permission.
  
  This Profile can help banks to understand the current needs of customers and provide them better services accordingly.
  
  Profile provides following information about the customer:
1. Demographic Information (Age, Gender, Income, No. of dependents, Marital Status)
2. Financial Information (Credit Worthiness, Liabilities, Risk Level, Threeshold, Deposits)
3. Psychographic Information (Interests, Activities, Values, Attributes)
4. Behavioural Information (Bank Relationship, Repayment pattern, Transaction History)
5. Geogrphic Information (Home Address, Company Name, Work Location)

  App uses Multi Label Prediction to find out the customer's interests base on his activities on social media (e.g. Facebook likes) 
and transaction history.
  Then clusters of customers having similar profile is formed using K-means clustering. Live demo app is present at above given URL.
  
  'datasets' folder contains all the dataset used for Multi Label Prediction and K-means clustering.
 'Frontend' folder contains the code for frontend web application written in ReactJS.
 'Backend' folder cotains the code for REST API written in NodeJS.
 
 Insrtuctions to run :
    To run Multi Label Prediction:
      'python3 multi_label_prediction.py'
    To run k-means
      'python3 kmeansClustering.py'
