import React, { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import './App.css';

function App() {
  const [scanResult, setScanRessult] = useState(null);
  const [qrdata, setData] = useState([]);


  useEffect(() => {
    const scanner = new Html5QrcodeScanner('reader', {
      qrbox: {
        width: 250,
        height: 250,
      },  // Sets dimensions of scanning box (set relative to reader element width)
      fps: 20,
    });

    scanner.render(success, error);

    function success(result) {
      const url = "http://localhost:3001/result";

      const fetchData = async () => {
        try {
          const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify({ "data": result }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            }
          });
          const data = await response.json;
          console.log(data);
        } catch (error) {
          console.log("error", error);
        }
      };
      fetchData();
      setScanRessult(result);
      fetchTableData();
      scanner.clear();
    }

    function error(err) {
      console.warn(err);
    }

    const fetchTableData = () => {
      fetch(`http://localhost:3001/qrcode_data`)
        .then((response) => response.json())
        .then((actualData) => {
          console.log(actualData);
          setData(actualData);
          console.log(qrdata);
        })
        .catch((err) => {
          console.log(err.message);
        });
    };

    

  },[]);

  if (scanResult) {
    return (
      <>
        <tbody id="qrcode">
          <tr>
            <th>ID</th>
            <th>QRCODE RESULT</th>
          </tr>
          {qrdata.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.qrcode_result}</td>
            </tr>
          ))}
          <tr>
              <td>latest</td>
              <td>{scanResult}</td>
            </tr>
        </tbody>
      </>
    );
  }
  else {
    return (
      <div id='reader'></div>
    );
  }
}
export default App;