from flask import Flask, jsonify # pyright: ignore[reportMissingImports]
from flask_cors import CORS # type: ignore
from flask_pymongo import PyMongo # type: ignore
from config import Config # type: ignore

app = Flask(__name__)
app.config.from_object(Config)

CORS(app)  # allow React frontend to talk to Flask backend

# MongoDB connection
mongo = PyMongo(app)

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Welcome to SyNutrify Backend!"})

if __name__ == "__main__":
    app.run(debug=True, port=5000)
