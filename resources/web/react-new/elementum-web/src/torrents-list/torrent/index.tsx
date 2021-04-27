import React from 'react';
import {
  Button,
  ButtonProps,
  Checkbox,
  CheckboxProps,
  Icon,
  Label,
  Popup,
  Progress,
  Statistic,
  StatisticGroup,
  StatisticValue,
  Table,
} from 'semantic-ui-react';
import { ITorrentView } from '../../dataStructure';
import './style.css';

interface ITorrentListItemProps {
  torrent: ITorrentView,
  onTorrentSelected: (_torrentId: string, _isChecked: boolean) => void
}

const TorrentListItem = ({ torrent, onTorrentSelected }: ITorrentListItemProps): JSX.Element => {
  const isActive = torrent.status !== 'Finished' && torrent.status !== 'Paused';
  const statusLabelColor = isActive ? 'green' : 'grey';

  const onResumePause = async (_event: React.FormEvent<HTMLInputElement>, data: CheckboxProps) => {
    const { checked } = data;
    const action = checked ? 'resume' : 'pause';

    await fetch(`/torrents/${action}/${torrent.id}`);
  };

  const onPlay = async (_event: React.MouseEvent<HTMLButtonElement, MouseEvent>, _data: ButtonProps) => {
    await fetch(`/playuri?resume=${torrent.id}`);
  };

  return (
    <>
      <Table.Row>
        <Table.Cell collapsing>
          <Checkbox toggle onChange={onResumePause} checked={isActive} />
        </Table.Cell>
        <Table.Cell collapsing>
          <Checkbox onChange={(_, data) => onTorrentSelected(torrent.id, data.checked ?? false)} checked={torrent.is_selected} />
        </Table.Cell>
        <Table.Cell collapsing><Button color="green" icon="play" floated="right" onClick={onPlay} /></Table.Cell>
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
                <Icon name="arrow down" size="small" />
                {` ${torrent.download_rate.toFixed(2)} kB/s`}
              </StatisticValue>
            </Statistic>
            <Statistic>
              <StatisticValue>
                <Icon name="arrow up" size="small" />
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
