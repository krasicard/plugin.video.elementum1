import React, { FC } from 'react';
import {
  Button,
  Checkbox,
  Icon,
  Label,
  Popup,
  Progress,
  Statistic,
  StatisticGroup,
  StatisticValue,
  Table,
} from 'semantic-ui-react';
import { ITorrent } from '../../dataStructure';
import './style.css';

interface ITorrentListItemProps {
  torrent: ITorrent
}

const TorrentListItem: FC<ITorrentListItemProps> = ({ torrent }: ITorrentListItemProps) => {
  const statusLabelColor = (torrent.status === 'Seeding' || torrent.status === 'Downloading') ? 'green' : 'grey';

  return (
    <>
      <Table.Row>
        <Table.Cell collapsing><Checkbox toggle fitted /></Table.Cell>
        <Table.Cell collapsing><Checkbox /></Table.Cell>
        <Table.Cell collapsing><Button color="green" icon="play" floated="right" /></Table.Cell>
        <Table.Cell>{torrent.name}</Table.Cell>
        <Table.Cell>
          <Popup
            content={`${torrent.progress.toFixed(2)}%`}
            trigger={<Progress percent={torrent.progress} autoSuccess size="small" />}
          />
        </Table.Cell>
        <Table.Cell collapsing>
          <Label color={statusLabelColor}>{torrent.status}</Label>
        </Table.Cell>
        <Table.Cell>
          <StatisticGroup widths="2" size="mini">
            <Statistic value={torrent.ratio.toFixed(2)} label="Seed ratio" />
            <Statistic value={torrent.time_ratio.toFixed(2)} label="Time ratio" />
            <Statistic value={torrent.seed_time} label="Seed time" />
          </StatisticGroup>
        </Table.Cell>
        <Table.Cell>
          <Label>{torrent.size}</Label>
        </Table.Cell>
        <Table.Cell>
          <StatisticGroup widths="1" size="mini">
            <Statistic>
              <StatisticValue>
                <Icon name="angle double down" />
                {` ${torrent.download_rate.toFixed(2)} kB/s`}
              </StatisticValue>
            </Statistic>
            <Statistic>
              <StatisticValue>
                <Icon name="angle double up" />
                {` ${torrent.upload_rate.toFixed(2)} kB/s`}
              </StatisticValue>
            </Statistic>
          </StatisticGroup>
        </Table.Cell>
        <Table.Cell>
          <StatisticGroup widths="1" size="mini">
            <Statistic value={torrent.seeders} label="Active" />
            <Statistic value={torrent.seeders_total} label="Total" />
          </StatisticGroup>
        </Table.Cell>
        <Table.Cell>
          <StatisticGroup widths="1" size="mini">
            <Statistic value={torrent.peers} label="Active" />
            <Statistic value={torrent.peers_total} label="Total" />
          </StatisticGroup>
        </Table.Cell>
      </Table.Row>
    </>
  );
};

export default TorrentListItem;
