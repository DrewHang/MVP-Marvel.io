import React from 'react'

export default function Homepage({pageStatus, handlePage}) {

  const pageHide = () => {
    if (pageStatus) {
      return (
          <div className="cover-container d-flex h-100 p-3 mx-auto flex-column">
            <div id="cover-page" className="text-center">
              <main role="main" className="inner cover">
                <h1 style={{color: 'white', padding: '15px'}} className="cover-heading">Marvel.io</h1>
                <p style={{color: 'white'}} className="lead">A 3D Interactive Marvel Superhero Demo</p>
                <p className="lead">
                  <button onClick={handlePage} className="btn btn-lg btn-secondary">Explore</button>
                </p>
              </main>
            </div>
            <footer style={{position: 'absolute', bottom: '0'}}>
                <div className="inner">
                <p style={{color: 'white'}}>Credits to <a href="https://sketchfab.com/3d-models/spider-gwen-e8219faa3042417586c5580b2e219a18">Mora</a> & <a href="https://sketchfab.com/3d-models/miles-morales-459104cc7c8d4e3886866e729c36f8ce">Brad Groatman</a> for the models</p>
                </div>
            </footer>
          </div>
      )
    }
  }
  return (
    <>
      {pageHide()}
    </>
  )
}



