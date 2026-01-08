"""Client panel routes - placeholder."""
from flask import Blueprint

bp = Blueprint('client', __name__)

@bp.route('/dashboard', methods=['GET'])
def dashboard():
    return {'message': 'Client dashboard'}, 200
