from flask import Flask, request, jsonify
from flask_cors import CORS 
import redis 

app = Flask(__name__)
CORS(app) 
r = redis.Redis(host="localhost",port=6379, decode_responses=True)

# Mock dataset (could come from Postgres later)
# later - in memory database
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


# show after 3 char input****
@app.route("/autocomplete/materials")
def autocomplete_materials():
    query = request.args.get("q", "").lower()
    if len(query) <3: # only search after 3+ characters
        return jsonify([])
    materials = r.smembers("materials")
    matches = [m for m in materials if query in m.lower()]
    return jsonify(matches)

@app.route("/autocomplete/departments")
def autocomplete_departments():
    query = request.args.get("q", "").lower()
    if len(query) <3: # only search after 3+ characters
        return jsonify([])
    departments = r.smembers("departments")
    matches = [d for d in departments if query in d.lower()]
    return jsonify(matches)

if __name__ == "__main__":
    app.run(debug=True)
