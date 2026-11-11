
import { useEffect, useState } from 'react';
import './App.css';

// ========================================
// PERSONALISE YOUR BIRTHDAY LETTER HERE
// ========================================

const letterText = `Hii Aeri!

Happy 19th Birthday!

I hope your special day is filled with happiness, laughter, and beautiful memories.

Aku doakan kau semoga terus bahagia dan berjaya dalam hidup. Semoga semua benda yang kau nak dalam hidup ni tercapai. Aku nak tengok kau happy je tau aeri :D

Kalau takde siapa nak cakap benda ni kat kau, aku nak cakap je la.. Aku bangga sangat" dengan kau.

Aku harap kita akan terus kekal kawan sampai bila" dan semoga persahabatan kita ni takkan putus sampai bila" pun. Aku nak kita sama" happy je tau aeri.

Aku minta maaf kalau wish ni tak seberapa, tapi aku harap kau suka :)

And please remember, no matter what happens, aku akan sentiasa ada untuk kau. Aku nak kau tahu yang kau ni sangat special untuk aku.

Take care okay?

With love,
Alif`;

function App() {
  const [scene, setScene] = useState('calendar');
  const [year, setYear] = useState(2007);
  const [letterOpen, setLetterOpen] = useState(false);
  const [typedText, setTypedText] = useState('');

  const startExperience = () => {
    if (scene !== 'calendar') return;

    setScene('flipping');

    const audio = document.getElementById('birthday-music');
    audio?.play().catch(() => {});

    let currentYear = 2007;

    const flipInterval = setInterval(() => {
      currentYear += 1;
      setYear(currentYear);

      if (currentYear >= 2026) {
        clearInterval(flipInterval);
        setScene('fireworks');

        setTimeout(() => {
          setScene('envelope');
        }, 4500);
      }
    }, 130);
  };

  useEffect(() => {
    if (!letterOpen) {
      setTypedText('');
      return;
    }

    let index = 0;

    const typing = setInterval(() => {
      index++;
      setTypedText(letterText.slice(0, index));

      if (index >= letterText.length) {
        clearInterval(typing);
      }
    }, 40);

    return () => clearInterval(typing);
  }, [letterOpen]);

  return (
    <main className="birthday-app">

      <audio
        id="birthday-music"
        src="/music/birthday.mp3"
        loop
      />

      {/* SCENE 1 & 2: CALENDAR */}

      {(scene === 'calendar' ||
        scene === 'flipping' ||
        scene === 'fireworks') && (
        <section className={`calendar-scene ${scene === 'fireworks' ? 'calendar-fading' : ''}`}>

          <div
            className={`calendar ${scene === 'calendar' ? 'calendar-clickable' : ''}`}
            onClick={startExperience}
            role="button"
            tabIndex={scene === 'calendar' ? 0 : -1}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                startExperience();
              }
            }}
          >
            <div className="calendar-top">
              A DAY TO REMEMBER
            </div>

            <div className="calendar-body">
              <span className="calendar-month">NOVEMBER</span>

              <div className="calendar-day">12</div>

              <div
                key={year}
                className={`calendar-year ${scene === 'flipping' ? 'year-flip' : ''}`}
              >
                {year}
              </div>
            </div>

            <div className="calendar-bottom">
              {scene === 'calendar'
                ? 'CLICK TO OPEN'
                : scene === 'fireworks'
                ? 'HAPPY BIRTHDAY'
                : 'A LITTLE TIME TRAVEL...'}
            </div>
          </div>

        </section>
      )}

      {/* SCENE 3: FIREWORKS */}

      {scene === 'fireworks' && (
        <div className="fireworks-layer">
          <div className="firework firework-one" />
          <div className="firework firework-two" />
          <div className="firework firework-three" />
          <div className="firework firework-four" />

          <h1 className="birthday-heading">
            Happy 19th Birthday <br/> Arissa Sofea!
          </h1>
        </div>
      )}

      {/* SCENE 4: ENVELOPE */}

      {scene === 'envelope' && (
        <section className="envelope-scene">
          {!letterOpen ? (
            <>
              <button
                className="envelope-button"
                onClick={() => setLetterOpen(true)}
                aria-label="Open your birthday letter"
              >
                <div className="envelope">
                  <div className="envelope-back" />
                  <div className="envelope-front" />
                  <div className="envelope-flap" />
                  <div className="wax-seal" aria-hidden="true"></div>
                </div>
              </button>

              <p className="envelope-caption">
                Click to open.
              </p>
            </>
          ) : (
            <article className="letter">
              <div className="letter-content">
                {typedText}
                {typedText.length < letterText.length && (
                  <span className="typing-cursor">|</span>
                )}
              </div>
            </article>
          )}
        </section>
      )}

    </main>
  );
}

export default App;
