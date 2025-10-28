from flask import Flask, request, jsonify
from flask_cors import CORS 
import redis 
from rapidfuzz import fuzz


app = Flask(__name__)
CORS(app) 
r = redis.Redis(host="localhost",port=6379, decode_responses=True)

# Mock dataset (could come from Postgres later)
# materials = [
#     "SS316L Steel Flange",
#     "Carbon Steel Pipe",
#     "PVC Pipe",
#     "Aluminum Sheet",
#     "Steel Plate",
#     "Copper Wire"
# ]

# departments = [
#     "Finance",
#     "Human Resources",
#     "IT",
#     "Procurement",
#     "Operations",
#     "Sales",
#     "Marketing",
# ]

def fuzzy_filter(items, query, threshold=50):
    return [i for i in items if fuzz.partial_ratio(query, i.lower()) >= threshold]

# show after 3 char input****
@app.route("/autocomplete/materials")
def autocomplete_materials():
    query = request.args.get("q", "").lower()
    if len(query) <3: # only search after 3+ characters
        return jsonify([])
    materials = r.smembers("materials")
    matches = fuzzy_filter(materials, query)
    # if want result without fuzzy_filter:
    # matches = [m for m in materials if query in m.lower()]
    return jsonify(matches)

@app.route("/autocomplete/departments")
def autocomplete_departments():
    query = request.args.get("q", "").lower()
    if len(query) <3: # only search after 3+ characters
        return jsonify([])
    departments = r.smembers("departments")
    matches = fuzzy_filter(departments, query)
    # if want result without fuzzy_filter:
    # matches = [d for d in departments if query in d.lower()]
    return jsonify(matches)

if __name__ == "__main__":
    app.run(debug=True)
