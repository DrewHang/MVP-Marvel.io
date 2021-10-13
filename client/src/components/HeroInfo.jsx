import React, { useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';

export default function HeroInfo({ hero }) {
  const [audioPlay, setaudioPlay] = useState(false)

  const renderHeroInfo = () => {
    if (hero === 'Spider-Gwen') {
      return (
        <>
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
        </>
      )
    } else {
      return (
        <>
          <h1 className="glitch" style={{textAlign:"center"}}>Spider-Man</h1>
          <div className="row">
            <div className="col-6">
            <p className="story" style={{fontSize: '16px'}}><b>Miles Morales</b>, a young kid from Brooklyn visited his uncle Aaron Davis after being awarded the final spot in a charter school lottery.
            At his uncle's apartment Miles was bitten by the <b>Oz-enhanced spider</b> and Miles discovered he received <b>superhuman abilities</b> like <b>camouflage</b>, <b>increased agility</b>, as well as some sort of <b>stun blast</b>.
            Months later, Spider-Man died saving his family from Osborn. Miles arrived late to the scene. Struck with grief at not helping Peter Parker before his demise,
            <b>Miles decided to follow Parker's philosophy -- with great power comes great responsibility -- and so continue Peter's legacy</b>.</p>
            </div>
            <div className="col-3" style={{paddingTop: '30px'}}>
              <ReactAudioPlayer
                src="miles-morales.mp3"
                autoplay
                controls
                onPlay={() => {setaudioPlay(true)}}
                onPause={() => {setaudioPlay(false)}}
                onEnded={() => {setaudioPlay(false)}}
              />
            </div>
            {audioPlay ? <div className="col-3">
              <img style={{paddingTop: '30px'}}src="miles-morales.jpeg" className="gwenIcon"></img>
            </div> : <></>}
          </div>
        </>
      )
    }
  }

  return (
    <div className="container-sm">
      {renderHeroInfo()}
    </div>
  )
}
