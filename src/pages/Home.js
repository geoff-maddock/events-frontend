import React, { useEffect, useState } from 'react';
import { fetchEvents } from '../api/eventService';
import EventList from '../components/EventList';

const Home = () => {
    const [eventsToday, setEventsToday] = useState([]);
    const [eventsTomorrow, setEventsTomorrow] = useState([]);
    const [eventsInTwoDays, setEventsInTwoDays] = useState([]);
    const [eventsInThreeDays, setEventsInThreeDays] = useState([]);
    const [loadingToday, setLoadingToday] = useState(true);
    const [loadingTomorrow, setLoadingTomorrow] = useState(true);
    const [loadingInTwoDays, setLoadingInTwoDays] = useState(true);
    const [loadingInThreeDays, setLoadingInThreeDays] = useState(true);
    const [error, setError] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const [darkMode, setDarkMode] = useState(false);

    const getEventsForDay = async (date, setEvents, setLoading) => {
        try {
            const events = await fetchEvents(date.toISOString().split('T')[0], date.toISOString().split('T')[0]);
            setEvents(events || []);
        } catch (err) {
            setError('Failed to load events.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const today = new Date(startDate);
        const tomorrow = new Date(startDate);
        tomorrow.setDate(today.getDate() + 1);
        const twoDays = new Date(startDate);
        twoDays.setDate(today.getDate() + 2);
        const threeDays = new Date(startDate);
        threeDays.setDate(today.getDate() + 3);

        setLoadingToday(true);
        setLoadingTomorrow(true);
        setLoadingInTwoDays(true);
        setLoadingInThreeDays(true);

        getEventsForDay(today, setEventsToday, setLoadingToday);
        getEventsForDay(tomorrow, setEventsTomorrow, setLoadingTomorrow);
        getEventsForDay(twoDays, setEventsInTwoDays, setLoadingInTwoDays);
        getEventsForDay(threeDays, setEventsInThreeDays, setLoadingInThreeDays);
    }, [startDate]);

    const handleNextDays = () => {
        const newStartDate = new Date(startDate);
        newStartDate.setDate(startDate.getDate() + 4);
        setStartDate(newStartDate);
    };

    const handlePreviousDays = () => {
        const newStartDate = new Date(startDate);
        newStartDate.setDate(startDate.getDate() - 4);
        setStartDate(newStartDate);
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const formatDate = (date) => {
        const options = { weekday: 'long', month: 'long', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    };

    const today = new Date(startDate);
    const tomorrow = new Date(startDate);
    tomorrow.setDate(today.getDate() + 1);
    const twoDays = new Date(startDate);
    twoDays.setDate(today.getDate() + 2);
    const threeDays = new Date(startDate);
    threeDays.setDate(today.getDate() + 3);

    return (
        <div className={`home ${darkMode ? 'dark-mode' : 'light-mode'}`}>
            <header className="header">
                <h1>Arcane City</h1>
                <h2>Upcoming Events in Pittsburgh</h2>
            </header>
            <div className="button-container">
                <button onClick={handlePreviousDays}>Previous 4 Days</button>
                <button onClick={handleNextDays}>Next 4 Days</button>
                <button onClick={toggleDarkMode}>
                    {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                </button>
            </div>
            <div className="event-columns">
                <div className="event-column">
                    <h3>{formatDate(today) === formatDate(new Date()) ? 'Today' : formatDate(today)}</h3>
                    {loadingToday ? (
                        <div className="loading-container">
                            <div className="loading-icon"></div>
                        </div>
                    ) : (
                        <EventList events={eventsToday} />
                    )}
                </div>
                <div className="event-column">
                    <h3>{formatDate(tomorrow)}</h3>
                    {loadingTomorrow ? (
                        <div className="loading-container">
                            <div className="loading-icon"></div>
                        </div>
                    ) : (
                        <EventList events={eventsTomorrow} />
                    )}
                </div>
                <div className="event-column">
                    <h3>{formatDate(twoDays)}</h3>
                    {loadingInTwoDays ? (
                        <div className="loading-container">
                            <div className="loading-icon"></div>
                        </div>
                    ) : (
                        <EventList events={eventsInTwoDays} />
                    )}
                </div>
                <div className="event-column">
                    <h3>{formatDate(threeDays)}</h3>
                    {loadingInThreeDays ? (
                        <div className="loading-container">
                            <div className="loading-icon"></div>
                        </div>
                    ) : (
                        <EventList events={eventsInThreeDays} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;