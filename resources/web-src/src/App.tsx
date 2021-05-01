import React, { useEffect, useState } from 'react';
import { Header } from 'semantic-ui-react';
import Statistics from './statistics-total';
import SearchBar from './search-bar';
import TorrentList from './torrents-list';
import { ITorrent, ITorrentView } from './dataStructure';
import 'semantic-ui-css/semantic.min.css';
import header from './static/header.jpg';
import logo from './static/logo.png';
import './style.css';

function App(): JSX.Element {
  const [torrents, setTorrents] = useState<ITorrentView[]>([]);

  useEffect(() => {
    const getList = async () => {
      const response = await fetch('/torrents/list');
      const torrentsList = (await response.json()) as ITorrent[];
      setTorrents(torrentsList as ITorrentView[]);
    };

    void getList();
    setInterval(() => void getList(), 5000);
  }, []);

  return (
    <div className="App">
      <Header>
        <div
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.33), rgba(0, 0, 0, 0.33)), url("${header}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'top',
            height: '150px',
            padding: '20px',
            textAlign: 'center',
          }}
        >
          <a href="/web">
            <img src={logo} alt="Elementum" height="100%" />
          </a>
        </div>
      </Header>
      <div>
        <Statistics
          downloading={torrents.filter((t) => t.status !== 'Finished').length}
          finished={torrents.filter((t) => t.status === 'Finished').length}
          total={torrents.length}
        />
        <SearchBar
          totalDownloadRate={torrents.reduce((rate, item) => rate + item.download_rate, 0)}
          totalUploadRate={torrents.reduce((rate, item) => rate + item.upload_rate, 0)}
        />
        <TorrentList torrents={torrents} />
      </div>
    </div>
  );
}

export default App;
