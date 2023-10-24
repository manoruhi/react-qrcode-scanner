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
      const url = "http://localhost:3001/result";

      const fetchData = async () => {
        try {
          const response = await fetch(url,{
            method:"POST",
            body:JSON.stringify({"data":result}),
            headers:{
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
      scanner.clear();
    }
    
    function error(err){
      console.warn(err);
    }

  },[]);

  if(scanResult){
    return(
      <>
        <div>Result : {scanResult}</div>
      </>
    );
  }
  else{
    return(
    <div id='reader'></div>
    );
  }
}
export default App;