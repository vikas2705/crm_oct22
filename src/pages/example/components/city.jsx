import React from "react";

const City = ({ city, setCityValue }) => {
    console.log("city called");

    return (
        <div>
            <h1>City: {city}</h1>
        </div>
    );
};

export default React.memo(City);
