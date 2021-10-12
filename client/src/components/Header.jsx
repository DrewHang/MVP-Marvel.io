import React from 'react';

export default function Header() {
  return (
    <header>
      <div className="header-inner">
        <div className="logo">MARVEL.io</div>
          <nav>
            <ul>
              <li>
              <a href='/'>HEROES</a>
              </li>
            </ul>
          </nav>
      </div>
    </header>
  )
}