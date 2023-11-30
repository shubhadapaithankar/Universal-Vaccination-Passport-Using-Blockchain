import React, { useState } from 'react';
import './ChatComponent.css';
import { API_URL } from "../apiConfig";
import { CircularProgress, Container, Paper } from '@mui/material';

const ChatComponent = () => {
    const [userInput, setUserInput] = useState('');
    const [searchHistory, setSearchHistory] = useState([]);
    const [rulesList, setRulesList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setSearchHistory(prevHistory => [...prevHistory, userInput]);
    
        try {
            const response = await fetch(API_URL + '/api/user/summarize_rules', {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ user_input: userInput }),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                setRulesList(data.rules);
            } else {
                throw new Error(data.error || "An error occurred while fetching data.");
            }
        } catch (error) {
            setRulesList([error.message]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (event) => {
        setUserInput(event.target.value);
    };

    const clearConversation = () => {
        setRulesList([]);
        setUserInput('');
    };

    const displaySearchHistory = () => {
        return searchHistory.map((query, index) => (
            <li key={index} className='list-group-item animate__animated animate__fadeIn'>
                Query {index + 1}: {query}
            </li>
        ));
    };

    const historyContent = searchHistory.length > 0 ? (
        <ul className='list-group'>
          {displaySearchHistory()}
        </ul>
      ) : (
        <p className='no-history'>No history yet.</p>
      );

    return (
        <div className="container" style={{ color: 'black' }}>
            <div className="sidebar">
                <h2>Actions</h2>
                
                <button className="btn" onClick={clearConversation}>New Chat</button>
                <button className="btn" onClick={clearConversation}>Clear Conversation</button>
                {/* <button className="btn" onClick={() => {}}>Show History</button> */}
              

                <div id="history-list" className="mt-3">
                    {historyContent}
                </div>
                
            </div>
            <div className="content">
                <div className="header">
                    <h1>COVID-19 Vaccination Information Assistant</h1>
                    <p>Ask me about COVID-19 vaccination guidelines, record verification, and how blockchain technology enhances record security.</p>
                </div>
                <div className="input-section">
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <input 
                                type="text" 
                                className="form-control" 
                                id="user_input" 
                                name="user_input" 
                                placeholder="Enter your query" 
                                aria-label="Enter your query" 
                                value={userInput} 
                                onChange={handleInputChange}
                            />
                            <button 
                            disabled={isLoading} 
                            style={{
                            backgroundColor: isLoading ? "#cccccc" : "", 
                            color: isLoading ? "#666666" : "", }}
                            className="btn" 
                            type="submit">
                            Submit
                            </button>
                        </div>
                    </form>
                    
                    {isLoading && (
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
                        <CircularProgress />
                    </div>
                    )}

                    {
                        rulesList.length > 0 && (
                            <ul className="list-group rules-list" id="rules-list">
                            {rulesList.map((rule, index) => (
                                <li key={index} className='list-group-item animate__animated animate__fadeIn'>{rule}</li>
                            ))}
                            </ul>
                        )
                    }

                </div>
            </div>
        </div>
    );
};

export default ChatComponent;
