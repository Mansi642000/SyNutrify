import os
from flask import Flask, request, jsonify
try:
    from flask_migrate import Migrate
    _HAS_MIGRATE = True
except Exception:
    Migrate = None
    _HAS_MIGRATE = False
from flask_jwt_extended import (
    JWTManager, create_access_token, jwt_required,
    get_jwt_identity, set_access_cookies, unset_jwt_cookies
)
from flask_cors import CORS
from models import db, User


def create_app():
    app = Flask(__name__)
    basedir = os.path.abspath(os.path.dirname(__file__))

    app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{os.path.join(basedir, 'data.db')}"
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'change-this-secret')
    app.config['JWT_TOKEN_LOCATION'] = ['cookies']
    app.config['JWT_COOKIE_SECURE'] = False
    app.config['JWT_COOKIE_SAMESITE'] = 'Lax'
    app.config['JWT_COOKIE_CSRF_PROTECT'] = False

    db.init_app(app)
    if _HAS_MIGRATE:
        Migrate(app, db)
    jwt = JWTManager(app)

    # Allow frontend origin and credentials
    CORS(app, supports_credentials=True, origins=[os.environ.get('FRONTEND_ORIGIN', 'http://localhost:5173')])

    @app.route('/auth/register', methods=['POST'])
    def register():
        data = request.json or {}
        email = data.get('email')
        password = data.get('password')
        if not email or not password:
            return jsonify({'msg': 'Missing fields'}), 400
        if User.query.filter_by(email=email).first():
            return jsonify({'msg': 'User exists'}), 400
        user = User(email=email)
        user.set_password(password)
        db.session.add(user)
        db.session.commit()
        return jsonify({'msg': 'Registered'}), 201

    @app.route('/auth/login', methods=['POST'])
    def login():
        data = request.json or {}
        email = data.get('email')
        password = data.get('password')
        user = User.query.filter_by(email=email).first()
        if not user or not user.check_password(password):
            return jsonify({'msg': 'Bad credentials'}), 401
        access_token = create_access_token(identity=user.id)
        resp = jsonify({'msg': 'Login successful'})
        set_access_cookies(resp, access_token)
        return resp, 200

    @app.route('/auth/logout', methods=['POST'])
    def logout():
        resp = jsonify({'msg': 'Logged out'})
        unset_jwt_cookies(resp)
        return resp, 200

    @app.route('/auth/me', methods=['GET'])
    @jwt_required()
    def me():
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        if not user:
            return jsonify({'msg': 'Not found'}), 404
        return jsonify(user.to_dict())

    return app


if __name__ == '__main__':
    app = create_app()
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=5000)
import os
from flask import Flask, request, jsonify
try:
    from flask_migrate import Migrate
    _HAS_MIGRATE = True
except Exception:
    Migrate = None
    _HAS_MIGRATE = False
from flask_jwt_extended import (
    JWTManager, create_access_token, jwt_required,
    get_jwt_identity, set_access_cookies, unset_jwt_cookies
)
from flask_cors import CORS
from models import db, User

def create_app():
    app = Flask(__name__)
    basedir = os.path.abspath(os.path.dirname(__file__))

    app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{os.path.join(basedir, 'data.db')}"
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'change-this-secret')
    app.config['JWT_TOKEN_LOCATION'] = ['cookies']
    app.config['JWT_COOKIE_SECURE'] = False
    app.config['JWT_COOKIE_SAMESITE'] = 'Lax'
    app.config['JWT_COOKIE_CSRF_PROTECT'] = False

    db.init_app(app)
    if _HAS_MIGRATE:
        Migrate(app, db)
    jwt = JWTManager(app)

    # Allow frontend origin and credentials
    CORS(app, supports_credentials=True, origins=[os.environ.get('FRONTEND_ORIGIN', 'http://localhost:5173')])

    @app.route('/auth/register', methods=['POST'])
    def register():

def add_recipe():
    try:
        name = request.form.get("name")
        ingredients = request.form.get("ingredients")
        process = request.form.get("process")
        youtubeLink = request.form.get("youtubeLink")
        nutrition = request.form.get("nutrition")
        photo = request.files.get("photo")

        if not name or not ingredients:
            return jsonify({"error": "Recipe name and ingredients are required"}), 400

        # Handle photo upload
        photo_path = None
        if photo and allowed_file(photo.filename):
            filename = secure_filename(photo.filename)
            photo_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
            photo.save(photo_path)

        # Parse nutrition JSON safely
        nutrition_dict = json.loads(nutrition) if nutrition else {}

        # Insert into MongoDB
        recipe = {
            "name": name,
            "ingredients": [i.strip() for i in ingredients.split(",")],
            "process": process,
            "youtubeLink": youtubeLink,
            "nutrition": nutrition_dict,
            "photo_path": photo_path
        }

        mongo.db.recipes.insert_one(recipe)
        return jsonify({"message": "Recipe added successfully", "recipe": recipe}), 201

    except Exception as e:
        traceback.print_exc()  # This will print full error in console
        return jsonify({"error": str(e)}), 500

# Get all recipes
@app.route("/api/recipes", methods=["GET"])
def get_recipes():
    recipes = list(mongo.db.recipes.find({}, {"_id": 0}))
    return jsonify(recipes)

# Run backend
if __name__ == "__main__":
    app.run(debug=True, port=5000)
