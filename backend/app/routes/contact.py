"""Contact form API routes."""
from flask import Blueprint, request, jsonify
from flask_mail import Message
from app import db, mail
from app.models import Contact
import logging

logger = logging.getLogger(__name__)

bp = Blueprint('contact', __name__)


@bp.route('/submit', methods=['POST'])
def submit_contact():
    """Handle contact form submission."""
    try:
        data = request.get_json()
        
        # Validation
        required_fields = ['name', 'email', 'message']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'error': f'Missing required field: {field}'}), 400
        
        # Create contact record
        contact = Contact(
            name=data['name'],
            email=data['email'],
            phone=data.get('phone'),
            subject=data.get('subject'),
            message_type=data.get('message_type', 'question'),
            message=data['message'],
            status='new'
        )
        
        db.session.add(contact)
        db.session.commit()
        
        # Send notification email
        try:
            send_contact_notification(contact)
        except Exception as e:
            logger.error(f'Failed to send email notification: {e}')
            # Don't fail the request if email fails
        
        return jsonify({
            'success': True,
            'message': 'Your message has been sent successfully',
            'contact_id': contact.id
        }), 201
        
    except Exception as e:
        logger.error(f'Error handling contact form: {e}')
        db.session.rollback()
        return jsonify({'error': 'Failed to process contact form'}), 500


def send_contact_notification(contact):
    """Send email notification for new contact."""
    msg = Message(
        subject=f'New Contact Form: {contact.subject or contact.message_type}',
        recipients=['kontakt@azure-solar.pl'],  # Configure this
        html=f"""
        <html>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #FDB813 0%, #F97316 100%); padding: 20px; text-align: center;">
                <h1 style="color: white; margin: 0;">☀️ Azure Solar</h1>
                <p style="color: white; margin: 5px 0;">Nowa wiadomość z formularza kontaktowego</p>
            </div>
            
            <div style="padding: 20px; background: #f9f9f9;">
                <h2 style="color: #F97316;">Szczegóły kontaktu</h2>
                
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Imię i nazwisko:</strong></td>
                        <td style="padding: 10px; border-bottom: 1px solid #ddd;">{contact.name}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Email:</strong></td>
                        <td style="padding: 10px; border-bottom: 1px solid #ddd;">
                            <a href="mailto:{contact.email}">{contact.email}</a>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Telefon:</strong></td>
                        <td style="padding: 10px; border-bottom: 1px solid #ddd;">{contact.phone or 'Nie podano'}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Typ:</strong></td>
                        <td style="padding: 10px; border-bottom: 1px solid #ddd;">{contact.message_type}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Temat:</strong></td>
                        <td style="padding: 10px; border-bottom: 1px solid #ddd;">{contact.subject or 'Brak tematu'}</td>
                    </tr>
                </table>
                
                <div style="margin-top: 20px; padding: 15px; background: white; border-left: 4px solid #F97316;">
                    <h3 style="color: #F97316; margin-top: 0;">Wiadomość:</h3>
                    <p style="white-space: pre-wrap;">{contact.message}</p>
                </div>
                
                <div style="margin-top: 20px; text-align: center;">
                    <a href="http://localhost:3000/admin/contacts/{contact.id}" 
                       style="display: inline-block; padding: 12px 30px; background: linear-gradient(135deg, #FDB813 0%, #F97316 100%); 
                              color: white; text-decoration: none; border-radius: 8px; font-weight: bold;">
                        Zobacz w panelu administracyjnym
                    </a>
                </div>
            </div>
            
            <div style="padding: 15px; text-align: center; color: #666; font-size: 12px;">
                <p>Azure Solar - Energia słoneczna dla Twojego domu</p>
                <p>Ten email został wygenerowany automatycznie przez system Azure Solar</p>
            </div>
        </body>
        </html>
        """
    )
    
    mail.send(msg)
