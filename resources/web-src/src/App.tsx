import React, { useEffect, useState } from 'react';
import HeaderMenu from './menu';
import Statistics from './statistics-total';
import SearchBar from './search-bar';
import TorrentList from './torrents-list';
import TorrentInfo from './torrent-info';
import { ITorrent, ITorrentView } from './dataStructure';
import 'semantic-ui-css/semantic.min.css';
import './style.css';
import { getRefreshRate } from './Services/settings';

function App(): JSX.Element {
  const [torrents, setTorrents] = useState<ITorrentView[]>([]);
  const [activeTorrent, setActiveTorrent] = useState<ITorrentView>();

  useEffect(() => {
    const getList = async () => {
      const response = await fetch('/torrents/list');
      const torrentsList = (await response.json()) as ITorrent[];
      setTorrents(torrentsList as ITorrentView[]);
    };

    void getList();
    setInterval(() => void getList(), getRefreshRate());
  }, []);

  return (
    <div className="App">
      <HeaderMenu />
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
        <TorrentList torrents={torrents} onSetActiveTorrent={setActiveTorrent} activeTorrent={activeTorrent} />
        {activeTorrent !== undefined && <TorrentInfo torrent={activeTorrent} />}
      </div>
    </div>
  );
}

export default App;
