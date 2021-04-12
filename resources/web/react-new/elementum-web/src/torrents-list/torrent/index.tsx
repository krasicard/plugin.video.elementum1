import React, { FC } from 'react';
import { Label, Table } from 'semantic-ui-react';
import { ITorrent } from '../../dataStructure';

interface ITorrentListItemProps {
  torrent: ITorrent
}

const TorrentListItem: FC<ITorrentListItemProps> = ({ torrent }: ITorrentListItemProps) => {
  const statusLabelColor = (torrent.status === 'Seeding' || torrent.status === 'Downloading') ? 'green' : 'grey';

  return (
    <>
      <Table.Row>
        <Table.Cell />
        <Table.Cell />
        <Table.Cell>{torrent.name}</Table.Cell>
        <Table.Cell>{torrent.progress}</Table.Cell>
        <Table.Cell>
          <Label color={statusLabelColor}>{torrent.status}</Label>
        </Table.Cell>
        <Table.Cell>
          <div>
            <div>
              {torrent.ratio.toFixed(2)}
              :1
            </div>
            <Label>seed ratio</Label>
          </div>
          <div>
            <div>
              {torrent.time_ratio.toFixed(2)}
              :1
            </div>
            <Label>time ratio</Label>
          </div>
          <div>
            <div>
              {torrent.seed_time.toFixed(2)}
              s
            </div>
            <Label>seed time</Label>
          </div>
        </Table.Cell>
        <Table.Cell>
          <span>{torrent.size}</span>
        </Table.Cell>
        <Table.Cell>
          <div>
            <div>
              {torrent.download_rate.toFixed(2)}
              {' '}
              kB/s
            </div>
            <Label>download</Label>
          </div>
          <div>
            <div>
              {torrent.upload_rate.toFixed(2)}
              {' '}
              kB/s
            </div>
            <Label>upload</Label>
          </div>
        </Table.Cell>
        <Table.Cell>
          <div>
            <div>{torrent.seeders}</div>
            <Label>active</Label>
          </div>
          <div>
            <div>{torrent.seeders_total}</div>
            <Label>total</Label>
          </div>
        </Table.Cell>
        <Table.Cell>
          <div>
            <div>{torrent.peers}</div>
            <Label>active</Label>
          </div>
          <div>
            <div>{torrent.peers_total}</div>
            <Label>total</Label>
          </div>
        </Table.Cell>
      </Table.Row>
    </>
  );
};

export default TorrentListItem;
