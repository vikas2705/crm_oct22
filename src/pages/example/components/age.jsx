import React from "react";
const Age = ({ age, setAgeValue }) => {
    console.log("age called");

    return (
        <div>
            <h1>Age: {age}</h1>
        </div>
    );
};

export default React.memo(Age);
