import React, { useEffect, useState } from 'react';
import { Header } from 'semantic-ui-react';
import Statistics from './statistics-total';
import SearchBar from './search-bar';
import TorrentList from './torrents-list';
import { ITorrent, ITorrentView } from './dataStructure';
import 'semantic-ui-css/semantic.min.css';

function App(): JSX.Element {
  const [torrents, setTorrents] = useState<ITorrentView[]>([]);

  useEffect(() => {
    const getList = async () => {
      const response = await fetch('http://127.0.0.1:65220/torrents/list');
      const torrentsList = await response.json() as ITorrent[];
      setTorrents(torrentsList as ITorrentView[]);
    };

    void getList();
    setInterval(() => void getList(), 5000);
  }, []);

  return (
    <div className="App">
      <Header>
        <div style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.33), rgba(0, 0, 0, 0.33)), url("../header.jpg")',
          backgroundSize: 'cover',
          height: '150px',
          textAlign: 'center',
        }}
        >
          <a href="/web">
            <img src="../title.png" alt="Elementum" height="100%" />
          </a>
        </div>
      </Header>
      <div>
        <Statistics
          downloading={torrents.filter((t) => t.status !== 'Finished').length}
          finished={torrents.filter((t) => t.status === 'Finished').length}
          total={torrents.length}
        />
        <SearchBar />
        <TorrentList torrents={torrents} />
      </div>
    </div>
  );
}

export default App;
