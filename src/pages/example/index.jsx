import { useCallback, useState } from "react";
import Age from "./components/age";
import City from "./components/city";

const Example = () => {
    const [name, setName] = useState("");
    const [age, setAge] = useState(0);
    const [city, setCity] = useState("");

    const setAgeValue = useCallback(val => {
        setAge(val);
    }, []);
    const setCityValue = useCallback(val => {
        setCity(val);
    }, []);

    console.log("example called");
    return (
        <div>
            <h1>Name: {name}</h1>
            <Age setAgeValue={setAgeValue} />
            <City setCityValue={setCityValue} />
            <span>{age}</span>
            <span>{city}</span>

            <label>
                Enter Name:{" "}
                <input
                    type='text'
                    value={name}
                    onChange={e => {
                        setName(e.target.value);
                    }}
                />
            </label>
        </div>
    );
};

export default Example;
