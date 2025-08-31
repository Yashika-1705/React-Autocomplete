import "./App.css";
import { React, useState } from "react";

function App() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [query, setquery] = useState("");
    const [contact, setContact] = useState("");
    const [suggestions,setSuggestions] = useState([]);
    const [resume, setResume] = useState("");
    const [url, setUrl] = useState();
    const [selectedOption, setSelectedOption] =
        useState("");
    const [about, setAbout] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(
            firstName,
            lastName,
            query,
            contact,
            gender,
            selectedOption,
            subjects,
            resume,
            url,
            about
        );
        // Add your form submission logic here
    };

    const fetchSuggestions = async (value) => {
      if(!value) {
        setSuggestions([]);
        return;
      }
      const res = await fetch(`http://127.0.0.1:5000/autocomplete?q=${value}`);
      const data = await res.json();
      setSuggestions(data);
    };

    const handleSubjectChange = (sub) => {
        setSubjects((prev) => ({
            ...prev,
            [sub]: !prev[sub],
        }));
    };
    const handleReset = () => {
        // Reset all state variables here
        setFirstName("");
        setLastName("");
        setquery("");
        setContact("");
        setGender("male");
        setSubjects({
            english: true,
            maths: false,
            physics: false,
        });
        setResume("");
        setUrl("");
        setSelectedOption("");
        setAbout("");
    };

    return (
        <div className="App">
            <h1>Form in React</h1>
            <fieldset>
                <form action="#" method="get">
                    <label for="firstname">
                        First Name*
                    </label>
                    <input
                        type="text"
                        name="firstname"
                        id="firstname"
                        value={firstName}
                        onChange={(e) =>
                            setFirstName(e.target.value)
                        }
                        placeholder="Enter First Name"
                        
                    />
                    <label for="lastname">Last Name*</label>
                    <input
                        type="text"
                        name="lastname"
                        id="lastname"
                        value={lastName}
                        onChange={(e) =>
                            setLastName(e.target.value)
                        }
                        placeholder="Enter Last Name"
    
                    />
                    <label for="query">Material Name* </label>
                    <input
                        type="text"
                        value={query}
                        onChange={(e) =>{
                          setquery(e.target.value);
                          fetchSuggestions(e.target.value);
                        }}                        
                        placeholder="enter material..."
                    />
                    {suggestions.length > 0 && (
                      <ul className="absolute bg-white border w-full rounded-lg shadow-md mt-1 max-h-40 overflow-y-auto">
                        {suggestions.map((item, i) => (
                          <li
                            key={i}
                            onClick={() => {
                              setquery(item);
                              setSuggestions([]);
                            }}
                            className="p-2 cursor-pointer hover:bg-gray-200"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                    <label for="tel">Contact*</label>
                    <input
                        type="tel"
                        name="contact"
                        id="contact"
                        value={contact}
                        onChange={(e) =>
                            setContact(e.target.value)
                        }
                        placeholder="Enter Mobile number"
                        required
                    />
                    <label for="url">Enter URL*</label>
                    <input
                        type="url"
                        name="url"
                        id="url"
                        onChange={(e) =>
                            setUrl(e.target.value)
                        }
                        placeholder="Enter url"
                        required
                    />
                    <button
                        type="reset"
                        value="reset"
                        onClick={() => handleReset()}
                    >
                        Reset
                    </button>
                    <button
                        type="submit"
                        value="Submit"
                        onClick={(e) => handleSubmit(e)}
                    >
                        Submit
                    </button>
                </form>
            </fieldset>
        </div>
    );
}

export default App;