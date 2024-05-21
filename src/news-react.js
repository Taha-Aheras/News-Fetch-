import React, { useState } from 'react';
import "./style.css";

const NewsFeed = () => {
    const [news, setNews] = useState([]);
    const [showReloadButton, setShowReloadButton] = useState(false);


    // Function to fetch news data
    const fetchNews = () => {
        fetch('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Ftechcrunch.com%2Ffeed%2F')
            .then(response => response.json())
            .then(data => {
                // Set news data in state
                setNews(data.items);
                setShowReloadButton(true);
            });
    };

    const cancleNews =()=>{
        setNews([]);
        setShowReloadButton(false);
    }

    // Function to extract description text
    const getDescriptionText = (description) => {
        const parser = new DOMParser();
        const parsedHtml = parser.parseFromString(description, "text/html");
        let descriptionText = parsedHtml.body.textContent;

        const unwantedTextStartIndex = descriptionText.indexOf("©");
        if (unwantedTextStartIndex !== -1) {
            descriptionText = descriptionText.slice(0, unwantedTextStartIndex).trim();
        }

        return descriptionText;
    };

    return (
        <div className="container">
            <h1>Taha News</h1>
            <button onClick={fetchNews} id="btn">Click here for awesome news</button>
            {showReloadButton && (
            <button onClick={cancleNews} id="btn-1">Click here to reload</button>
        )}
            <ul id="news-list">
                {news.map(item => (
                    <li key={item.guid} className="news-wale">
                        {item.image && (
                            <img src={item.image} alt={item.title} />
                        )}
                        <h1>{item.title}</h1>
                        <p>{item.pubDate}</p>
                        <p>{getDescriptionText(item.description)}</p>
                        <h4>Author: {item.author}</h4>
                        <a href={item.link} target="_blank" rel="noopener noreferrer">Read more</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NewsFeed;
