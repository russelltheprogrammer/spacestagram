import './index.css';
import React, { useState, useEffect } from 'react';

const Spacestagram = () => {

const [isLoading, setIsLoading] = useState(true);


const fetchData = () => {
    fetch('https://api.nasa.gov/planetary/apod?api_key=rfOteRGGpmwtn0HxnwvPb8XyzId5aPaVChqaUczJ')
    .then(response => response.json())
    .then(data => {
        console.log(data) + setIsLoading(false)
    })
    .catch(error => console.error(error));
}

useEffect(() => {
    fetchData
})



    if(!isLoading){
        return (
            <div>
              <h1 className="title">Spacestagram</h1>
                  <div>
                  Pull API image here.
                  </div>
            </div>
        );
    }

    else  {
        return ( 
            <div className="loading">
                LOADING...
            </div>
            );
    }
}
 
export default Spacestagram;