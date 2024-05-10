/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useState, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [num, setNum] = useState(false);
  const [char, setChar] = useState(false);
  const [password, setPassword] = useState("");
  const PasswordRef = useRef(null);

  const passGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRTSUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (num) {
      str += "0123456789";
    }
    if (char) {
      str += "!@#$%^&*()~{}";
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, num, char, setPassword]);

  const copyToClipboard = useCallback(()=>{
    PasswordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])

  

  useEffect(() => {
    passGenerator();
  }, [length, num, char, passGenerator]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-4 my-8 text-indigo-500 bg-gray-600">
        <h1 className="text-4xl py-5">Password Generator</h1>

        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={PasswordRef}
          />
          <button 
          onClick={copyToClipboard}
          className="outline-none bg-indigo-500 hover:bg-indigo-600 hover:scale-105 text-white px-3 py-0.5">
            COPY
          </button>
        </div>

        <div className="flex text-sm gap-x-4 text-white align-middle text-center">
          <div className="flex items-center gap-x-1 ">
            <input
              type="range"
              name=""
              id=""
              min={8}
              max={100}
              value={length}  
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label htmlFor="">Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              name=""
              id="numberInput"
              defaultChecked={num}
              onChange={() => {
                setNum((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              name=""
              id="characterInput"
              defaultChecked={char}
              onChange={() => {
                setNum((prev) => !prev);
              }}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
