from flask import Flask, request, jsonify
from pymongo import MongoClient
import pandas as pd
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import json
from bson import json_util
import pymongo

app = Flask(__name__)
client = MongoClient("mongodb+srv://admin:admin123@cluster0.mgryyit.mongodb.net/?retryWrites=true&w=majority")
db = client["test"]
collection = db["products"]

# Check if connected to the database
if db.command("ping")["ok"] == 1:
    print("Connected to the database")
else:
    print("Could not connect to the database")

# @app.route('/')
# def home():
#     return 'Welcome to my Flask API'


@app.route('/recommend', methods=['GET'])
def get_recommendation():
    # Get the adtitle and n from the query parameters
    adtitle = request.args.get('adtitle')
    n = int(request.args.get('n', 5))  # default to 5 if n is not provided

    # Call the recommend function with the provided input
    recommended_products = recommend(adtitle, n)

    # Serialize the recommended products using json_util
    json_products = json.dumps(recommended_products, default=json_util.default)

    # Return the JSON string
    return json_products


@app.route('/recommend', methods=['POST'])
def recommend_endpoint():
    # Get the adtitle and n from the request data
    adtitle = request.json['adtitle']
    n = request.json.get('n', 5)  # default to 5 if n is not provided

    # Call the recommend function with the provided input
    recommended_products = recommend(adtitle, n)

    # Serialize the recommended products using json_util
    json_products = json.dumps(recommended_products, default=json_util.default)

    # Return the JSON string
    return json_products



def recommend(adtitle, n=5, input_file='data.json'):
   

    # Get the input adtitle from the request data
    adtitle = request.json['adtitle']
    
    # Fetch the product data from the MongoDB database
    cursor = collection.find({}, {'_id': 0})
    input_data = [item for item in cursor]

    # Preprocess the data
    df = pd.DataFrame(input_data)
    df = df.dropna()

    # Extract features from the text data
    vectorizer = CountVectorizer(stop_words='english')
    features = vectorizer.fit_transform(df['description'])

    # Calculate the similarity between the products
    similarity = cosine_similarity(features)

    # Get the index of the product
    idx = df[df['adtitle'] == adtitle].index[0]

    # Get the similarity scores for the product
    scores = list(enumerate(similarity[idx]))

    # Sort the products by similarity
    scores = sorted(scores, key=lambda x: x[1], reverse=True)

    # Get the top 5 most similar products
    scores = scores[1:6]

    # Get the product IDs and relevant information
    recommended_products = []
    for i, _ in scores:
        product_info = df.loc[i].to_dict()
        recommended_products.append(product_info)

    # Serialize the list using json_util
    json_products = json.dumps(recommended_products, default=json_util.default)
    
    # Return the JSON string
    return json_products



@app.route('/ranking', methods=['GET'])
def ranking():
    # Get the category and n from the query parameters
    category = request.args.get('category')
    n = request.args.get('n', 5)  # default to 5 if n is not provided

    # Call the get_top_rated_ids() function with the provided input
    ranking_products = get_top_rated_ids(category, n)

    # Serialize the recommended products using json_util
    json_products = json.dumps(ranking_products, default=json_util.default)

    # Return the JSON string
    return json_products


@app.route('/ranking', methods=['POST'])
def ranking_endpoint():
    # Get the adtitle and n from the request data
    category = request.json['category']
    n = request.json.get('n', 5)  # default to 5 if n is not provided

    # Call the recommend function with the provided input
    ranking_products = get_top_rated_ids(category, n)

    # Serialize the recommended products using json_util
    json_products = json.dumps(ranking_products, default=json_util.default)

    # Return the JSON string
    return json_products


def get_top_rated_ids(category, n=5, input_file='data.json'):
    if category is not None:
        try:
            n = int(n)
        except ValueError:
            return json.dumps({'error': 'n must be an integer.'})

        # Fetch the product data from the MongoDB database
        cursor = collection.find({'category': category}, {'_id': 1, 'rating': 1}).sort('rating', pymongo.DESCENDING).limit(n)
        input_data = [item for item in cursor]

        # Get the ids of the top n products
        top_rated_ids = [d['_id'] for d in input_data]

        # Serialize the list using json_util
        json_products = json.dumps(top_rated_ids, default=json_util.default)

        # Return the JSON string
        return json_products
    else:
        # Return an error message if category is not provided in the request data
        return json.dumps({'error': 'Category not provided in request data.'})



if __name__ == '__main__':
    app.run(debug=True)











# def get_top_rated_ids():
#     # Get the category and n values from the request body
#     category = request.json['category']
#     n = request.json.get('n', 5)

#     # Call the get_top_rated_ids function with the provided input
#     top_rated_ids = get_top_rated_ids(category, n)

#     # Return the JSON string
#     return top_rated_ids



# def get_top_rated_ids(category=None, n=5):
#     # If category and/or n are not provided, prompt the user to enter them
#     if not category:
#         category = input("Enter category: ")
#     # if not n:
#     #     n = int(input("Enter number of products to retrieve: "))

#     # Fetch the product data from the MongoDB database
#     cursor = collection.find({'category': category}).sort('rating', pymongo.DESCENDING).limit(n)

#     # Serialize the list using json_util
#     json_products = json.dumps([item for item in cursor], default=json_util.default)

#     # Return the JSON string
#     return json_products



# def get_top_rated_ids(category, n=5, input_file='data.json'):
#     # # Load the data from a JSON file
#     # with open(input_file, 'r', encoding='utf-8') as f:
#     #     input_data = json.load(f)
#     # Get the input adtitle from the request data
#     category = request.json['category']
    
#     # Fetch the product data from the MongoDB database
#     #cursor = collection.find({}, {'_id': 0})
#     cursor = collection.find({'category': category}, {'_id': 1, 'rating': 1}).sort('rating', pymongo.DESCENDING).limit(n)


#     input_data = [item for item in cursor]


#     # Filter the data by category and sort by rating
#     filtered_data = [d for d in input_data if d['category'] == category]
#     filtered_data = sorted(filtered_data, key=lambda x: x['rating'], reverse=True)

#     # Get the ids of the top 5 products
#     #top_rated_ids = [d['_id']['$oid'] for d in filtered_data[:5]]
#     top_rated_ids = [d['_id'] for d in filtered_data[:n]]

#     # Get the product IDs and relevant information
#     # top_rated_ids = []
#     # for i, _ in scores:
#     #     product_info = df.loc[i].to_dict()
#     #     top_rated_ids.append(product_info)

#     # Serialize the list using json_util
#     json_products = json.dumps(top_rated_ids, default=json_util.default)
    
#     # Return the JSON string
#     return json_products

#     # return top_rated_ids
