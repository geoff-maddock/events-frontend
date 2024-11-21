import React from 'react';
import './EventCard.css';

const EventCard = ({ event }) => (
    <div className="event-card">
        <h3>{event.name}</h3>
        <p><strong>Short Description:</strong> {event.short}</p>
        <p><strong>Description:</strong> {event.description}</p>
        <p><strong>Venue:</strong> {event.venue.name}</p>
        <p><strong>Start:</strong> {new Date(event.start_at).toLocaleString()}</p>
        <p><strong>End:</strong> {new Date(event.end_at).toLocaleString()}</p>
        <p><strong>Primary Link:</strong> <a href={event.primary_link} target="_blank" rel="noopener noreferrer">{event.primary_link}</a></p>
        <p><strong>Ticket Link:</strong> <a href={event.ticket_link} target="_blank" rel="noopener noreferrer">{event.ticket_link}</a></p>
    </div>
);

export default EventCard;