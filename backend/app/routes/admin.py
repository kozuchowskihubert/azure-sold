"""Admin routes - placeholder."""
from flask import Blueprint

bp = Blueprint('admin', __name__)

@bp.route('/dashboard', methods=['GET'])
def dashboard():
    return {'message': 'Admin dashboard'}, 200
