import React from 'react';


import { Viewer, Worker } from '@react-pdf-viewer/core'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'

function App() {
  const [filePDF, setFilePDF] = React.useState(null)
  const [viewFile, setViewFile] = React.useState(null)
  const fileType = ['application/pdf']

  const handleChange = (event) => {
    let selectedFile = event.target.files[0]
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader()
        reader.readAsDataURL(selectedFile)
        reader.onload = (e) => {
          setFilePDF(e.target.result)
        }
      }
      else {
        setFilePDF(null)
      }
    }
    else {
      console.log("select file")
    }
  }

  const handleClick = (e) => {
    e.preventDefault()
    if (filePDF != null) {
      setViewFile(filePDF)
    } else {
      setViewFile(null)
    }
  }
  const newplugin = defaultLayoutPlugin()

  return (
    <div className="container">
      <form onSubmit={handleClick}>
        <input type="file" onChange={handleChange} />
        {
          !viewFile && <button className='upload' type="submit">Fileni Ko'rish</button>
        }
        {
          viewFile && <button type='button' className='delete' onClick={() => {
            window.location.reload()
          }}>Fileni o'chirish</button>
        }
      </form>
      <div className="pdf_watch">
        <div className="pdf_container">
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            {
              viewFile && <>
                <Viewer fileUrl={viewFile} plugins={[newplugin]} />
              </>
            }
            {
              !viewFile && <>File yuklanmagan</>
            }
          </Worker>
        </div>
      </div>
    </div >
  );
}

export default App;
