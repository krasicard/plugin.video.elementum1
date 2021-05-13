import React, { FC, useCallback, useState } from 'react';
import { Checkbox, Table } from 'semantic-ui-react';
import DeleteTorrentModal from '../delete-modal';
import UploadTorrentModal from '../upload-modal';
import TorrentListItem from './torrent';
import { ITorrent } from '../dataStructure';

interface ITorrentListProps {
  torrents: ITorrent[];
  activeTorrent: ITorrent | undefined;
  onSetActiveTorrent: (_torrentId: ITorrent | undefined) => void;
}

const TorrentList: FC<ITorrentListProps> = ({ torrents, activeTorrent, onSetActiveTorrent }: ITorrentListProps) => {
  const [selectedTorrents, setSelectedTorrents] = useState<string[]>([]);

  const onTorrentSelected = useCallback((torrentId: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedTorrents((st) => [...st, torrentId]);
    } else {
      setSelectedTorrents((st) => st.filter((t) => t !== torrentId));
    }
  }, []);

  const onAllTorrentsSelected = (isChecked: boolean) => {
    if (isChecked) {
      setSelectedTorrents(torrents.map((t) => t.id));
    } else {
      setSelectedTorrents([]);
    }
  };

  return (
    <>
      <Table compact="very" size="small" stackable fixed singleLine>
        <Table.Header className="mobile-hidden">
          <Table.Row>
            <Table.HeaderCell width="2" />
            <Table.HeaderCell width="1" textAlign="center">
              <Checkbox
                onChange={(_, data) => onAllTorrentsSelected(data.checked ?? false)}
                checked={selectedTorrents.length >= torrents.length}
              />
            </Table.HeaderCell>
            <Table.HeaderCell width="2" />
            <Table.HeaderCell width="11">Name</Table.HeaderCell>
            <Table.HeaderCell width="2">Progress</Table.HeaderCell>
            <Table.HeaderCell width="3">Status</Table.HeaderCell>
            <Table.HeaderCell width="6">Ratios</Table.HeaderCell>
            <Table.HeaderCell width="2">Size</Table.HeaderCell>
            <Table.HeaderCell width="6">Rates</Table.HeaderCell>
            <Table.HeaderCell width="5">Seeds / Peers</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {torrents.map((t) => (
            <TorrentListItem
              key={t.id}
              torrent={t}
              onSelect={onTorrentSelected}
              onClick={onSetActiveTorrent}
              isClicked={activeTorrent?.id === t.id}
              isChecked={selectedTorrents.includes(t.id)}
            />
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
