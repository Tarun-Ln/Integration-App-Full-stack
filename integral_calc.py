from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from sympy import symbols, integrate, latex, sympify

app = Flask(__name__)

#MySQL Config
app.config['Your mysql'] = 'Your mysql'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class LeaderboardEntry(db.Model):
    __tablename__ = 'leaderboard'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    score = db.Column(db.Integer, nullable=False)

    def as_dict(self):
        return {"name": self.name, "score": self.score}

# SymPy Integration API
@app.route('/integrateapi/validate', methods=['POST'])
def integrate_expression():
    try:
        data = request.get_json()
        expression = data.get('expression')

        if not expression:
            return jsonify({"error": "Missing 'expression' in request body"}), 400

        x = symbols('x')
        expr = sympify(expression)
        result = integrate(expr, x)
        result_latex = latex(result)

        return jsonify({
            "original_expression": str(expr),
            "integrated_result": str(result),
            "latex_result": result_latex
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 400

#Add Score to Leaderboard
@app.route('/api/score', methods=['POST'])
def add_score():
    data = request.get_json()
    name = data.get('name')
    score = data.get('score')

    if not name or score is None:
        return jsonify({'error': 'Missing name or score'}), 400

    entry = LeaderboardEntry(name=name, score=score)
    db.session.add(entry)
    db.session.commit()
    return jsonify({'status': 'ok'})

#Get Leaderboard
@app.route('/api/leaderboard', methods=['GET'])
def get_leaderboard():
    entries = LeaderboardEntry.query.order_by(LeaderboardEntry.score.desc()).limit(10).all()
    return jsonify([entry.as_dict() for entry in entries])

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
