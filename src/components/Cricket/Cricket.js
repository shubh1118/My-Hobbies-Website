import React from "react";
import "./cricket.css";
import { playersData } from "../../data/players";

function Cricket() {
  return (
    <div className="cricket-container">
      <div className="overlay"></div>
      <div className="content">
        <header className="cricket-header">
          <h1>🏏 Indian Cricket Legends</h1>
          <p className="subtitle">Celebrating the heroes of Indian cricket</p>
        </header>

        <div className="players-grid">
          {playersData.map((player) => (
            <div key={player.name} className="player-card">
              <div className="player-info">
                <h2>{player.name}</h2>
                <span className="player-role">{player.role}</span>
                <blockquote className="player-quote">
                  "{player.quote}"
                </blockquote>
                <div className="achievements">
                  <h3>Key Achievements</h3>
                  <ul>
                    {player.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default React.memo(Cricket);
