import React, { FC } from 'react';
import { Button, Table } from 'semantic-ui-react';
import UploadTorrentModal from '../upload-modal';
import TorrentListItem from './torrent';
import { ITorrent } from '../dataStructure';

interface ITorrentListProps {
  torrents: ITorrent[]
}

const TorrentList: FC<ITorrentListProps> = ({ torrents }: ITorrentListProps) => (
  <>
    <Table celled definition compact stackable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell />
          <Table.HeaderCell />
          <Table.HeaderCell />
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Progres</Table.HeaderCell>
          <Table.HeaderCell>Status</Table.HeaderCell>
          <Table.HeaderCell>Ratios</Table.HeaderCell>
          <Table.HeaderCell>Size</Table.HeaderCell>
          <Table.HeaderCell>Rates</Table.HeaderCell>
          <Table.HeaderCell>Seeds</Table.HeaderCell>
          <Table.HeaderCell>Peers</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {torrents.map((t) => <TorrentListItem torrent={t} key={t.id} />)}
      </Table.Body>
      <Table.Footer>
        <Table.Row>
          <Table.HeaderCell />
          <Table.HeaderCell colSpan={10}>
            <Button floated="left">Delete</Button>
            <UploadTorrentModal />
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  </>
);

export default TorrentList;
