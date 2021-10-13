import React, { useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';

export default function Info() {
  const [audioPlay, setaudioPlay] = useState(false)
  return (
    <div className="container-sm">
      <h1 className="glitch" style={{textAlign:"center"}}>Spider-Gwen</h1>
      <div className="row">
        <div className="col-6">
        <p className="story">After being bitten by a <b>genetically-engineered spider</b>, Gwen was granted <b>arachnid-like super-powers</b>, and started a career as a <b>crimefighter</b>, dubbed by the media as "<b>Spider-Woman</b>."
        Gwen spent most of her early adventures focused on exploiting and maintaining her newfound attention more than helping those in need; however, Gwen's behavior changed after her father expressed he believed Spider-Woman could easily help people.</p>
        </div>
        <div className="col-3" style={{paddingTop: '30px'}}>
          <ReactAudioPlayer
            src="gwen-stacy.mp3"
            autoplay
            controls
            onPlay={() => {setaudioPlay(true)}}
            onPause={() => {setaudioPlay(false)}}
            onEnded={() => {setaudioPlay(false)}}
          />
        </div>
        {audioPlay ? <div className="col-3">
          <img src="gwen-stacy.jpeg" className="gwenIcon"></img>
        </div> : <></>}
      </div>
    </div>
  )
}
