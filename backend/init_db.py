"""Initialize database with sample data."""
import os
import sys
from datetime import datetime, timedelta

# Add parent directory to path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app import create_app, db, bcrypt
from app.models import User, Project, Contact

def init_database():
    """Initialize database with sample data."""
    app = create_app()
    
    with app.app_context():
        print('Creating database tables...')
        db.create_all()
        
        # Check if admin exists
        admin = User.query.filter_by(email='admin@azure-solar.pl').first()
        if not admin:
            print('Creating admin user...')
            admin = User(
                email='admin@azure-solar.pl',
                password_hash=bcrypt.generate_password_hash('admin123').decode('utf-8'),
                first_name='Admin',
                last_name='Azure Solar',
                phone='+48 503 691 808',
                role='admin',
                is_active=True
            )
            db.session.add(admin)
        
        # Create sample client
        client = User.query.filter_by(email='jan.kowalski@example.com').first()
        if not client:
            print('Creating sample client...')
            client = User(
                email='jan.kowalski@example.com',
                password_hash=bcrypt.generate_password_hash('client123').decode('utf-8'),
                first_name='Jan',
                last_name='Kowalski',
                phone='+48 123 456 789',
                role='client',
                is_active=True
            )
            db.session.add(client)
            db.session.flush()
            
            # Create sample project for client
            print('Creating sample project...')
            project = Project(
                client_id=client.id,
                name='Instalacja PV - Dom Kowalskich',
                description='System fotowoltaiczny 10kW na dachu budynku mieszkalnego',
                power_kw=10.0,
                panel_count=25,
                inverter_type='Fronius Symo 10.0-3-M',
                installation_address='ul. Słoneczna 15, 00-001 Warszawa',
                roof_type='pitched',
                total_cost=45000.00,
                subsidy_amount=5000.00,
                final_cost=40000.00,
                status='active',
                contract_date=datetime.now().date() - timedelta(days=60),
                installation_date=datetime.now().date() - timedelta(days=30),
                completion_date=datetime.now().date() - timedelta(days=15),
                annual_production_kwh=11000.0,
                monthly_savings_pln=450.00,
                co2_reduction_kg=8800.0
            )
            db.session.add(project)
        
        # Create sample contact
        contact = Contact.query.filter_by(email='info@example.com').first()
        if not contact:
            print('Creating sample contact...')
            contact = Contact(
                name='Maria Nowak',
                email='maria.nowak@example.com',
                phone='+48 987 654 321',
                subject='Zapytanie o ofertę',
                message_type='quote',
                message='Proszę o przesłanie oferty na instalację fotowoltaiczną dla domu jednorodzinnego o powierzchni dachu 50m2.',
                status='new'
            )
            db.session.add(contact)
        
        db.session.commit()
        print('✅ Database initialized successfully!')
        print('\nSample credentials:')
        print('Admin: admin@azure-solar.pl / admin123')
        print('Client: jan.kowalski@example.com / client123')

if __name__ == '__main__':
    init_database()
