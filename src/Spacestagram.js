import './index.css';
import React, { useState, useEffect } from 'react';
import { month } from './constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faRocket, faHeart } from '@fortawesome/free-solid-svg-icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const Spacestagram = () => {

const [isLoading, setIsLoading] = useState(true);
const [apiData, setApiData] = useState(null);
const [copied, setCopied] = useState({
    value: '',
    copied: false
});
const [buttonStatus, setButtonStatus] = useState({
    0: true,
    1: true,
    2: true,
    3: true,
    4: true,
    5: true
});

useEffect(() => {
    const url = 'https://api.nasa.gov/planetary/apod?api_key=rfOteRGGpmwtn0HxnwvPb8XyzId5aPaVChqaUczJ&start_date=2016-08-06&end_date=2016-08-11';

    const fetchData = async() => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            setApiData(data);
            setIsLoading(false);
        }
        catch(error){
            console.log("error", error);
        }
    }
    fetchData();
}, []);

const handleDateConversion = (date) => {
    const copyDate = date;
    const stringDate = new Date(date);
    let outputDate = month[stringDate.getMonth()] + " " + copyDate.substring(8) + ", " + copyDate.substring(0, 4);
    return outputDate;
}

const handleClick = (index) => {
    let id = index;
    if(buttonStatus[id]) {
        return setButtonStatus(prevState => ({ ...prevState, [id]: false }));
    }
    else {
        return setButtonStatus(prevState => ({ ...prevState, [id]: true }));
    }
};

const handleCopy = () => {
    return setCopied({ [copied]: true }) + alert("Image Copied To Clipboard" );
};

    if(!isLoading){
        return (
            <div>
                  <header className="title">
                    <h1>Spacestagram <FontAwesomeIcon icon={faRocket} /></h1>
                  </header>
                  <div className="apiData-container">
                      <ul>
                        {apiData.map((item, index) => (
                            <li className="item-container" key={index}>
                            <div className="title-date-container">
                            {item.title}
                            <br/>
                            {handleDateConversion(item.date)}
                            <br/>
                            </div>
                            <img className="apiDataPicture" src={item.url} alt="NASA API PICTURE" />
                            <br/>
                            <div className="explanation-container">
                            {item.explanation}
                            </div>
                            <br/>
                            <div className="apiDataButton-container">
                                {buttonStatus[index] ?
                                <button className="apiDataButton" onClick={() => handleClick(index)}><FontAwesomeIcon icon={faThumbsUp} /></button> 
                                : <button className="apiDataButtonLiked" onClick={() => handleClick(index)}><FontAwesomeIcon icon={faHeart} /></button>
                                }
                            </div>
                            <CopyToClipboard text={item.url} onCopy={() => handleCopy()}>
                                <button className="copyButton">Copy Image URL</button>
                            </CopyToClipboard>
                            </li>
                        ))}
                    </ul>
                  </div>
            </div>
        );
    }

    else  {
        return ( 
            <div>
                <header className="title">
                    <h1>Spacestagram</h1>
                </header>
                <div className="loading">
                    LOADING...
                </div>
            </div>
            );
    }
}
 
export default Spacestagram;