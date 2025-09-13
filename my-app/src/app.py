from flask import Flask, request, jsonify
from flask_cors import CORS 

app = Flask(__name__)
CORS(app) 

# Mock dataset (could come from Postgres later)
# later - in memory database
materials = [
    "SS316L Steel Flange",
    "Carbon Steel Pipe",
    "PVC Pipe",
    "Aluminum Sheet",
    "Steel Plate",
    "Copper Wire"
]

departments = [
    "Finance",
    "Human Resources",
    "IT",
    "Procurement",
    "Operations",
    "Sales",
    "Marketing",
]


# show after 3 char input
@app.route('/autocomplete/materials', methods=['GET'])
def autocomplete_materials():
    query = request.args.get("q", "").lower()
    if not query:
        return jsonify([])
    
    results = [m for m in materials if query in m.lower()]
    return jsonify(results[:5])  # return top 5

@app.route('/autocomplete/departments', methods=['GET'])
def autocomplete_departments():
    query = request.args.get("q", "").lower()
    if not query:
        return jsonify([])
    
    results = [d for d in departments if query in d.lower()]
    return jsonify(results[:5])

if __name__ == "__main__":
    app.run(debug=True)
