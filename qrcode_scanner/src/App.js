import React, {useState, useEffect} from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import './App.css';

function App() {
  const [scanResult, setScanRessult] = useState(null);

  useEffect(()=>{
    const scanner = new Html5QrcodeScanner('reader',{
      qrbox: {
        width: 250,
        height: 250,
    },  // Sets dimensions of scanning box (set relative to reader element width)
    fps: 20,
    });

    scanner.render(success, error);

    function success(result){
      const url = "http://localhost:3001/result/"+result;

      const fetchData = async () => {
        try {
          const response = await fetch(url);
          const json = await response.json();
          console.log(json);
        } catch (error) {
          console.log("error", error);
        }
      };
  
      fetchData();
      setScanRessult(result);
    }


    function error(err){
      console.warn(err);
    }

  },[]);


  return (
    <div className="App">
      {scanResult
      ? <div>Result : {scanResult}</div>
      : <div id='reader'></div>
      }
    </div>
  );
}

export default App;
