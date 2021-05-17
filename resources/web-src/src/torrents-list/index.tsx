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
  <>
    <Table compact="very" size="small" stackable fixed singleLine selectable>
      <Table.Header className="mobile-hidden">
        <Table.Row>
          <Table.HeaderCell width="11">Name</Table.HeaderCell>
          <Table.HeaderCell width="4">Size / Status</Table.HeaderCell>
          <Table.HeaderCell width="5">Ratios</Table.HeaderCell>
          <Table.HeaderCell width="5">Rates</Table.HeaderCell>
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
            <DeleteTorrentModal torrent={activeTorrent} />
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  </>
);

export default TorrentList;
