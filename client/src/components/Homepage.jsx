import React from 'react'

export default function Homepage({pageStatus, handlePage}) {

  const pageHide = () => {
    if (pageStatus) {
      return (
        <div id="cover-page" className="text-center">
          <main role="main" className="inner cover">
            <h1 style={{color: 'white', padding: '15px'}} className="cover-heading">Marvel.io</h1>
            <p style={{color: 'white'}} className="lead">A 3D Interactive Marvel Superhero Demo</p>
            <p className="lead">
              <button onClick={handlePage} className="btn btn-lg btn-secondary">Explore</button>
            </p>
          </main>
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
