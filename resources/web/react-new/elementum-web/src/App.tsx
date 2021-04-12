import React, { useEffect, useState } from 'react';
import Statistics from './statistics-total';
import TorrentList from './torrents-list';
import './App.css';
import { ITorrent } from './dataStructure';
import 'semantic-ui-css/semantic.min.css';

function App() {
  const [torrents, setTorrents] = useState<ITorrent[]>([]);

  useEffect(() => {
    const getList = async () => {
      const response = await fetch('http://127.0.0.1:65220/torrents/list');
      setTorrents(await response.json());
    };

    getList();
    const interval = setInterval(() => getList(), 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src="../header.jpg" className="App-logo" alt="logo" />
      </header>
      <div>
        <Statistics
          downloading={torrents.filter((t) => t.status !== 'Finished').length}
          finished={torrents.filter((t) => t.status === 'Finished').length}
          total={torrents.length}
        />
        <TorrentList torrents={torrents} />
      </div>
    </div>
  );
}

export default App;
