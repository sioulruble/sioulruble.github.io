import { useRef } from 'react'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import { PlayerProvider } from './context/PlayerContext'
import { GridBackground } from './components/GridBackground'
import { Player } from './components/Player'
import { Home } from './pages/Home'
import { About } from './pages/About'
import './styles/globals.css'

export default function App() {
  // Audio element lives above the Router so navigation never destroys it
  const audioRef = useRef<HTMLAudioElement>(null)

  return (
    <>
      {/* TODO: replace stream URL with your own flux */}
      <audio
        ref={audioRef}
        src="https://ice1.somafm.com/groovesalad-128-mp3"
        preload="none"
      />

      <PlayerProvider audioRef={audioRef as React.RefObject<HTMLAudioElement>}>
        <GridBackground />

        <BrowserRouter>
          <nav
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              zIndex: 50,
              display: 'flex',
              gap: '1.5rem',
              padding: '1rem 1.5rem',
              alignItems: 'center',
            }}
          >
            <NavLink
              to="/"
              end
              style={({ isActive }) => ({
                fontFamily: 'var(--font-sans)',
                fontSize: '0.7rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--fg)',
                textDecoration: 'none',
                opacity: isActive ? 1 : 0.4,
                transition: 'opacity 200ms',
              })}
            >
              Listen
            </NavLink>
            <NavLink
              to="/about"
              style={({ isActive }) => ({
                fontFamily: 'var(--font-sans)',
                fontSize: '0.7rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--fg)',
                textDecoration: 'none',
                opacity: isActive ? 1 : 0.4,
                transition: 'opacity 200ms',
              })}
            >
              About
            </NavLink>
          </nav>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>

          <Player />
        </BrowserRouter>
      </PlayerProvider>
    </>
  )
}
