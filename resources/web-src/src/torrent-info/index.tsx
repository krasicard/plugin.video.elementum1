import React from 'react';
import { Grid, GridColumn, GridRow, Tab } from 'semantic-ui-react';
import { ITorrentView } from '../dataStructure';

interface ITorrentInfoItemProps {
  torrent: ITorrentView;
  // onTorrentSelected: (_torrentId: string, _isChecked: boolean) => void;
}

const TorrentInfo = ({ torrent }: ITorrentInfoItemProps): JSX.Element => {
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
  ];

  return (
    <>
      <Tab panes={panes} />
    </>
  );
};

export default TorrentInfo;
