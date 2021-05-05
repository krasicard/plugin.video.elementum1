import React, { useEffect, useState } from 'react';
import { Grid, GridColumn, GridRow, List, Tab } from 'semantic-ui-react';
import { ITorrentView } from '../dataStructure';

interface ITorrentInfoItemProps {
  torrent: ITorrentView;
  // onTorrentSelected: (_torrentId: string, _isChecked: boolean) => void;
}

const TorrentInfo = ({ torrent }: ITorrentInfoItemProps): JSX.Element => {
  const [filesList, setFilesList] = useState<string[]>([]);
  const [piecesList, setPiecesList] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);

    const getInfo = async () => {
      const regexp = new RegExp(`${torrent.id}.+?Files.+?:\\s+(?<files>.+?)\\n\\n.+?Pieces:\\s+(?<pieces>.+?)\\n\\n\\n`, 'gs');
      const response = await fetch('/info');
      const info = await response.text();
      const match = regexp.exec(info);
      if (!match || !match.groups) return;

      const { files, pieces } = match.groups;
      setFilesList(files.split('\n').map((f) => f.trim()));
      setPiecesList(pieces);

      setLoading(false);
    };

    void getInfo();
    const intervalHandle = setInterval(() => void getInfo(), 5000);
    return () => clearInterval(intervalHandle);
  }, [torrent.name]);

  const panes = [
    {
      menuItem: { key: 'general', content: 'General' },
      render: () => (
        <Tab.Pane>
          <Grid>
            <GridRow>
              <GridColumn>
                <div>
                  <b>Name:</b> {torrent.name}
                </div>
                <div>
                  <b>Size:</b> {torrent.size}
                </div>
              </GridColumn>
            </GridRow>
          </Grid>
        </Tab.Pane>
      ),
    },
    {
      menuItem: { key: 'files', content: 'Files' },
      render: () => (
        <Tab.Pane loading={loading}>
          <Grid>
            <GridRow>
              <GridColumn>
                <List items={filesList} />
              </GridColumn>
            </GridRow>
          </Grid>
        </Tab.Pane>
      ),
    },
    {
      menuItem: { key: 'pieces', content: 'Pieces' },
      render: () => (
        <Tab.Pane loading={loading}>
          <Grid>
            <GridRow>
              <GridColumn>
                <div>{piecesList}</div>
              </GridColumn>
            </GridRow>
          </Grid>
        </Tab.Pane>
      ),
    },
  ];

  return (
    <>
      <Tab panes={panes} />
    </>
  );
};

export default TorrentInfo;
