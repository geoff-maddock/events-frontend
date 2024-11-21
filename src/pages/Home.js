import React, { useEffect, useState } from 'react';
import { fetchEvents } from '../api/eventService';
import EventList from '../components/EventList';

const Home = () => {
    const [eventsToday, setEventsToday] = useState([]);
    const [eventsTomorrow, setEventsTomorrow] = useState([]);
    const [eventsInTwoDays, setEventsInTwoDays] = useState([]);
    const [eventsInThreeDays, setEventsInThreeDays] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);;

    useEffect(() => {
        const getEvents = async () => {
            try {
                const today = new Date();
                const dates = Array.from({ length: 4 }, (_, i) => {
                    const date = new Date(today);
                    date.setDate(today.getDate() + i);
                    return date;
                });

                const [todayEvents, tomorrowEvents, twoDaysEvents, threeDaysEvents] = await Promise.all(
                    dates.map(date => fetchEvents(date.toISOString().split('T')[0], date.toISOString().split('T')[0]))
                );

                setEventsToday(todayEvents || []);
                setEventsTomorrow(tomorrowEvents || []);
                setEventsInTwoDays(twoDaysEvents || []);
                setEventsInThreeDays(threeDaysEvents || []);
            } catch (err) {
                setError('Failed to load events.');
            } finally {
                setLoading(false);
            }
        };

        getEvents();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    const formatDate = (date) => {
        const options = { weekday: 'long', month: 'long', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    };

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const twoDays = new Date(today);
    twoDays.setDate(today.getDate() + 2);
    const threeDays = new Date(today);
    threeDays.setDate(today.getDate() + 3);

    return (
        <div className="home">
            <header className="header">
                <h1>Arcane City</h1>
                <h2>Upcoming Events in Pittsburgh</h2>
            </header>
            <div className="event-columns">
                <div className="event-column">
                    <h3>{formatDate(today) === formatDate(new Date()) ? 'Today' : formatDate(today)}</h3>
                    <EventList events={eventsToday} />
                </div>
                <div className="event-column">
                    <h3>{formatDate(tomorrow)}</h3>
                    <EventList events={eventsTomorrow} />
                </div>
                <div className="event-column">
                    <h3>{formatDate(twoDays)}</h3>
                    <EventList events={eventsInTwoDays} />
                </div>
                <div className="event-column">
                    <h3>{formatDate(threeDays)}</h3>
                    <EventList events={eventsInThreeDays} />
                </div>
            </div>
        </div>
    );
};

export default Home;