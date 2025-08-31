from flask import Flask, request, jsonify
from flask_cors import CORS 

app = Flask(__name__)
CORS(app) 

# Mock dataset (could come from Postgres later)
materials = [
    "SS316L Steel Flange",
    "Carbon Steel Pipe",
    "PVC Pipe",
    "Aluminum Sheet",
    "Steel Plate",
    "Copper Wire"
]

@app.route('/autocomplete', methods=['GET'])
def autocomplete():
    query = request.args.get("q","").lower()
    if not query:
        return jsonify([])
    
    #simple filtering
    results = [m for m in materials if query in m.lower()]
    return jsonify(results[:5])  # return top 5

if __name__ == "__main__":
    app.run(debug=True)