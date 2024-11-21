import React from 'react';
import './EventCard.css';

const EventCard = ({ event }) => (
    <div className="event-card">
        {event.primary_photo_thumbnail && (
            <img src={event.primary_photo_thumbnail} alt={event.name} className="event-thumbnail" />
        )}
        <h3>{event.name}</h3>
        {event.short && <p><strong>Short Description:</strong> {event.short}</p>}
        {event.description && <p><strong>Description:</strong> {event.description}</p>}
        {event.venue && <p><strong>Venue:</strong> {event.venue.name}</p>}
        {event.start_at && <p><strong>Start:</strong> {new Date(event.start_at).toLocaleString()}</p>}
        {event.end_at && <p><strong>End:</strong> {new Date(event.end_at).toLocaleString()}</p>}
        {event.primary_link && <p><strong>Primary Link:</strong> <a href={event.primary_link} target="_blank" rel="noopener noreferrer">{event.primary_link}</a></p>}
        {event.ticket_link && <p><strong>Ticket Link:</strong> <a href={event.ticket_link} target="_blank" rel="noopener noreferrer">{event.ticket_link}</a></p>}
    </div>
);

export default EventCard;