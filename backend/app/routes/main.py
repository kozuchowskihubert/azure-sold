"""Main routes blueprint."""
from flask import Blueprint, jsonify

bp = Blueprint('main', __name__)


@bp.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint."""
    return jsonify({
        'status': 'healthy',
        'message': 'Azure Solar API is running',
        'version': '1.0.0'
    }), 200


@bp.route('/api/services', methods=['GET'])
def get_services():
    """Get available services."""
    services = [
        {
            'id': 1,
            'name': 'Instalacje Domowe',
            'description': 'Kompletne systemy fotowoltaiczne dla domów jednorodzinnych',
            'icon': 'home',
            'features': [
                'Projektowanie indywidualne',
                'Montaż i uruchomienie',
                'Gwarancja 10 lat',
                'Wsparcie techniczne'
            ]
        },
        {
            'id': 2,
            'name': 'Instalacje Przemysłowe',
            'description': 'Wielkie farmy solarne dla firm i zakładów',
            'icon': 'factory',
            'features': [
                'Analiza rentowności',
                'Projekty powyżej 100kW',
                'Finansowanie',
                'Monitoring produkcji'
            ]
        },
        {
            'id': 3,
            'name': 'Serwis i Konserwacja',
            'description': 'Profesjonalna obsługa serwisowa instalacji',
            'icon': 'wrench',
            'features': [
                'Przeglądy okresowe',
                'Naprawa usterek',
                'Czyszczenie paneli',
                '24/7 monitoring'
            ]
        },
        {
            'id': 4,
            'name': 'Doradztwo',
            'description': 'Pomoc w doborze rozwiązania i dotacjach',
            'icon': 'lightbulb',
            'features': [
                'Audyt energetyczny',
                'Obliczenia opłacalności',
                'Pomoc w dotacjach',
                'Konsultacje techniczne'
            ]
        }
    ]
    
    return jsonify({'services': services}), 200
