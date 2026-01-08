"""Database models for Azure Solar application."""
from datetime import datetime
from app import db


class User(db.Model):
    """User model for authentication."""
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    phone = db.Column(db.String(20))
    role = db.Column(db.String(20), nullable=False, default='client')  # admin, client, staff
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    projects = db.relationship('Project', backref='client', lazy='dynamic')
    contacts = db.relationship('Contact', 
                               foreign_keys='Contact.user_id',
                               backref='user', 
                               lazy='dynamic')
    assigned_contacts = db.relationship('Contact',
                                       foreign_keys='Contact.assigned_to',
                                       backref='assigned_user',
                                       lazy='dynamic')
    
    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'phone': self.phone,
            'role': self.role,
            'is_active': self.is_active,
            'created_at': self.created_at.isoformat() if self.created_at else None,
        }


class Project(db.Model):
    """Solar installation project model."""
    __tablename__ = 'projects'
    
    id = db.Column(db.Integer, primary_key=True)
    client_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    
    # Installation details
    power_kw = db.Column(db.Float)  # System power in kW
    panel_count = db.Column(db.Integer)
    inverter_type = db.Column(db.String(100))
    installation_address = db.Column(db.String(255))
    roof_type = db.Column(db.String(50))  # flat, pitched, etc.
    
    # Financial
    total_cost = db.Column(db.Float)
    subsidy_amount = db.Column(db.Float, default=0)
    final_cost = db.Column(db.Float)
    
    # Status and dates
    status = db.Column(db.String(50), default='planning')  # planning, installation, testing, active, completed
    contract_date = db.Column(db.Date)
    installation_date = db.Column(db.Date)
    completion_date = db.Column(db.Date)
    
    # Energy production tracking
    annual_production_kwh = db.Column(db.Float)
    monthly_savings_pln = db.Column(db.Float)
    co2_reduction_kg = db.Column(db.Float)
    
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    documents = db.relationship('Document', backref='project', lazy='dynamic')
    production_data = db.relationship('ProductionData', backref='project', lazy='dynamic')
    
    def to_dict(self):
        return {
            'id': self.id,
            'client_id': self.client_id,
            'name': self.name,
            'description': self.description,
            'power_kw': self.power_kw,
            'panel_count': self.panel_count,
            'status': self.status,
            'total_cost': self.total_cost,
            'final_cost': self.final_cost,
            'installation_address': self.installation_address,
            'created_at': self.created_at.isoformat() if self.created_at else None,
        }


class Contact(db.Model):
    """Contact form submissions."""
    __tablename__ = 'contacts'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    
    # Contact info
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(20))
    
    # Message details
    subject = db.Column(db.String(200))
    message_type = db.Column(db.String(50))  # quote, service, question, other
    message = db.Column(db.Text, nullable=False)
    
    # Status
    status = db.Column(db.String(50), default='new')  # new, in_progress, resolved, closed
    assigned_to = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'phone': self.phone,
            'subject': self.subject,
            'message_type': self.message_type,
            'message': self.message,
            'status': self.status,
            'created_at': self.created_at.isoformat() if self.created_at else None,
        }


class Document(db.Model):
    """Project documents storage."""
    __tablename__ = 'documents'
    
    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'), nullable=False)
    
    title = db.Column(db.String(200), nullable=False)
    document_type = db.Column(db.String(50))  # contract, invoice, certificate, photo, other
    file_path = db.Column(db.String(500))
    file_url = db.Column(db.String(500))
    
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'document_type': self.document_type,
            'file_url': self.file_url,
            'created_at': self.created_at.isoformat() if self.created_at else None,
        }


class ProductionData(db.Model):
    """Energy production tracking."""
    __tablename__ = 'production_data'
    
    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'), nullable=False)
    
    date = db.Column(db.Date, nullable=False)
    production_kwh = db.Column(db.Float, nullable=False)
    consumption_kwh = db.Column(db.Float)
    exported_kwh = db.Column(db.Float)
    
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'date': self.date.isoformat() if self.date else None,
            'production_kwh': self.production_kwh,
            'consumption_kwh': self.consumption_kwh,
            'exported_kwh': self.exported_kwh,
        }


class Quote(db.Model):
    """Quote/Offer management."""
    __tablename__ = 'quotes'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    
    # Client info
    client_name = db.Column(db.String(100), nullable=False)
    client_email = db.Column(db.String(120), nullable=False)
    client_phone = db.Column(db.String(20))
    client_address = db.Column(db.String(255))
    
    # System parameters
    roof_area_m2 = db.Column(db.Float)
    monthly_bill_pln = db.Column(db.Float)
    estimated_power_kw = db.Column(db.Float)
    estimated_cost_pln = db.Column(db.Float)
    estimated_savings_pln = db.Column(db.Float)
    roi_years = db.Column(db.Float)
    
    # Quote details
    quote_number = db.Column(db.String(50), unique=True)
    pdf_url = db.Column(db.String(500))
    status = db.Column(db.String(50), default='draft')  # draft, sent, accepted, rejected
    valid_until = db.Column(db.Date)
    
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'quote_number': self.quote_number,
            'client_name': self.client_name,
            'client_email': self.client_email,
            'estimated_power_kw': self.estimated_power_kw,
            'estimated_cost_pln': self.estimated_cost_pln,
            'status': self.status,
            'created_at': self.created_at.isoformat() if self.created_at else None,
        }
