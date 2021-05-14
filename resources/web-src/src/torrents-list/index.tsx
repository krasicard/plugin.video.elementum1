import React, { FC } from 'react';
import { Table } from 'semantic-ui-react';
import DeleteTorrentModal from '../delete-modal';
import UploadTorrentModal from '../upload-modal';
import TorrentListItem from './torrent';
import { ITorrent } from '../dataStructure';

interface ITorrentListProps {
  torrents: ITorrent[];
  activeTorrent: ITorrent | undefined;
  onSetActiveTorrent: (_torrentId: ITorrent | undefined) => void;
}

const TorrentList: FC<ITorrentListProps> = ({ torrents, activeTorrent, onSetActiveTorrent }: ITorrentListProps) => (
  <div className="torrent-table">
    <Table compact="very" size="small" stackable fixed singleLine>
      <Table.Header className="mobile-hidden">
        <Table.Row>
          <Table.HeaderCell width="11">Name</Table.HeaderCell>
          <Table.HeaderCell width="2">Progress</Table.HeaderCell>
          <Table.HeaderCell width="3">Status</Table.HeaderCell>
          <Table.HeaderCell width="6">Ratios</Table.HeaderCell>
          <Table.HeaderCell width="2">Size</Table.HeaderCell>
          <Table.HeaderCell width="6">Rates</Table.HeaderCell>
          <Table.HeaderCell width="5">Seeds / Peers</Table.HeaderCell>
          <Table.HeaderCell width="3" />
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {torrents.map((t) => (
          <TorrentListItem key={t.id} torrent={t} onClick={onSetActiveTorrent} isClicked={activeTorrent?.id === t.id} />
        ))}
      </Table.Body>
      <Table.Footer fullWidth>
        <Table.Row>
          <Table.HeaderCell colSpan={11}>
            <UploadTorrentModal />
            <DeleteTorrentModal torrentIdToDelete={activeTorrent?.id} />
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  </div>
);

export default TorrentList;
