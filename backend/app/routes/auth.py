"""Auth routes - placeholder."""
from flask import Blueprint

bp = Blueprint('auth', __name__)

@bp.route('/login', methods=['POST'])
def login():
    return {'message': 'Login endpoint'}, 200
