import React, { FC, useState } from 'react';
import { Checkbox, Table } from 'semantic-ui-react';
import DeleteTorrentModal from '../delete-modal';
import UploadTorrentModal from '../upload-modal';
import TorrentListItem from './torrent';
import { ITorrentView } from '../dataStructure';

interface ITorrentListProps {
  torrents: ITorrentView[];
}

const TorrentList: FC<ITorrentListProps> = ({ torrents }: ITorrentListProps) => {
  const [selectedTorrents, setSelectedTorrents] = useState<string[]>([]);
  const torrentList = torrents.map((t) => {
    const torrent = t;
    torrent.is_selected = selectedTorrents.includes(t.id);
    return torrent;
  });

  const onTorrentSelected = (torrentId: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedTorrents([...selectedTorrents, torrentId]);
    } else {
      setSelectedTorrents(selectedTorrents.filter((t) => t !== torrentId));
    }
  };

  const onAllTorrentsSelected = (isChecked: boolean) => {
    if (isChecked) {
      setSelectedTorrents(torrents.map((t) => t.id));
    } else {
      setSelectedTorrents([]);
    }
  };

  return (
    <>
      <Table compact="very" size="small" stackable>
        <Table.Header className="mobile-hidden">
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell>
              <Checkbox
                onChange={(_, data) => onAllTorrentsSelected(data.checked ?? false)}
                checked={torrentList.every((t) => t.is_selected)}
              />
            </Table.HeaderCell>
            <Table.HeaderCell />
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Progress</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Ratios</Table.HeaderCell>
            <Table.HeaderCell>Size</Table.HeaderCell>
            <Table.HeaderCell>Rates</Table.HeaderCell>
            <Table.HeaderCell>Seeds</Table.HeaderCell>
            <Table.HeaderCell>Peers</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {torrentList.map((t) => (
            <TorrentListItem key={t.id} torrent={t} onTorrentSelected={onTorrentSelected} />
          ))}
        </Table.Body>
        <Table.Footer fullWidth>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell colSpan={10}>
              <UploadTorrentModal />
              <DeleteTorrentModal torrentIdsToDelete={selectedTorrents} />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </>
  );
};

export default TorrentList;
