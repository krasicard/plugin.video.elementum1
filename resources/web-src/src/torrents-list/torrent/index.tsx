import React from 'react';
import isEqual from 'react-fast-compare';
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
  StatisticLabel,
  StatisticValue,
  Table,
} from 'semantic-ui-react';
import { ITorrent } from '../../dataStructure';

interface ITorrentListItemProps {
  torrent: ITorrent;
  isClicked: boolean;
  isChecked: boolean;
  onSelect: (_torrentId: string, _isChecked: boolean) => void;
  onClick: (torrent: ITorrent | undefined) => void;
}

const TorrentListItem = ({ torrent, isClicked, isChecked, onSelect, onClick }: ITorrentListItemProps): JSX.Element => {
  const isActive = torrent.status !== 'Finished' && torrent.status !== 'Paused';
  const statusLabelColor = isActive ? 'green' : 'grey';

  const onResumePause = async (event: React.FormEvent<HTMLInputElement>, data: CheckboxProps) => {
    event.stopPropagation();
    const { checked } = data;
    const action = checked ? 'resume' : 'pause';

    await fetch(`/torrents/${action}/${torrent.id}`);
  };

  const onCheckboxClick = (event: React.FormEvent<HTMLInputElement>, data: CheckboxProps) => {
    event.stopPropagation();
    onSelect(torrent.id, data.checked ?? false);
  };

  const onPlay = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, _data: ButtonProps) => {
    event.stopPropagation();
    await fetch(`/playuri?resume=${torrent.id}`);
  };

  return (
    <>
      <Table.Row onClick={() => onClick(isClicked ? undefined : torrent)} active={isClicked}>
        <Table.Cell>
          <Checkbox toggle onChange={onResumePause} checked={isActive} />
        </Table.Cell>
        <Table.Cell textAlign="center">
          <Checkbox checked={isChecked} onChange={onCheckboxClick} />
        </Table.Cell>
        <Table.Cell textAlign="center">
          <Button color="green" icon="play" onClick={onPlay} />
        </Table.Cell>
        <Table.Cell title={torrent.name}>{torrent.name}</Table.Cell>
        <Table.Cell>
          <Popup content={`${torrent.progress.toFixed(2)}%`} trigger={<Progress percent={torrent.progress} autoSuccess size="small" />} />
        </Table.Cell>
        <Table.Cell textAlign="center">
          <Label color={statusLabelColor}>{torrent.status}</Label>
        </Table.Cell>
        <Table.Cell>
          <StatisticGroup size="mini" widths="2">
            <Statistic value={torrent.ratio.toFixed(2)} label="Seed ratio" />
            <Popup
              content={`Seed time: ${torrent.seeding_time}`}
              trigger={<Statistic value={`${torrent.time_ratio.toFixed(2)}`} label="Time ratio" />}
            />
          </StatisticGroup>
        </Table.Cell>
        <Table.Cell textAlign="center">
          <Label>{torrent.size}</Label>
        </Table.Cell>
        <Table.Cell>
          <StatisticGroup widths="2" size="mini">
            <Statistic>
              <StatisticValue>
                <Icon name="arrow down" size="small" />
                {` ${torrent.upload_rate.toFixed(2)}`}
              </StatisticValue>
              <StatisticLabel>kB/s</StatisticLabel>
            </Statistic>
            <Statistic>
              <StatisticValue>
                <Icon name="arrow up" size="small" />
                {` ${torrent.upload_rate.toFixed(2)}`}
              </StatisticValue>
              <StatisticLabel>kB/s</StatisticLabel>
            </Statistic>
          </StatisticGroup>
        </Table.Cell>
        <Table.Cell>
          <StatisticGroup widths="2" size="mini">
            <Statistic value={`${torrent.seeders} / ${torrent.seeders_total}`} label="Active / Total" />
            <Statistic value={`${torrent.peers} / ${torrent.peers_total}`} label="Active / Total" />
          </StatisticGroup>
        </Table.Cell>
      </Table.Row>
    </>
  );
};

export default React.memo(TorrentListItem, isEqual);
