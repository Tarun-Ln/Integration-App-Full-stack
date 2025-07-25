from flask import Flask, request, jsonify
from flask_cors import CORS
from sympy import symbols, integrate, latex, sympify

app = Flask(__name__)
CORS(app)

# SymPy Integration API
@app.route('/integrateapi/validate', methods=['POST'])
def integrate_expression():
    try:
        data = request.get_json()
        expression = data.get('user_problem')

        if not expression:
            return jsonify({"error": "Missing 'user_problem' in request body"}), 400

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


if __name__ == '__main__':
    app.run(port=5001)
    app.run(debug=True)
