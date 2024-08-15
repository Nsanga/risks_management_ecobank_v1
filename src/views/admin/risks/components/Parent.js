import React, { useState } from 'react';
import Details from './Details';
import Review from './Review';

const App = () => {
    const [reviewData, setReviewData] = useState({});

    const handleSaveDetails = (data) => {
        setReviewData(data); // Update reviewData with data from Details
    };

    return (
        <div>
            <Details onSave={handleSaveDetails} />
            <Review eventData={reviewData} />
        </div>
    );
};

export default App;
