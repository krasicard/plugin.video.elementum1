import React from 'react';
import isEqual from 'react-fast-compare';
import {
  Button,
  ButtonProps,
  Icon,
  Label,
  Progress,
  Statistic,
  StatisticGroup,
  StatisticLabel,
  StatisticValue,
  Table,
} from 'semantic-ui-react';
import { ITorrent, StatusCode } from '../../dataStructure';

interface ITorrentListItemProps {
  torrent: ITorrent;
  isClicked: boolean;
  onClick: (torrent: ITorrent | undefined) => void;
}

const TorrentListItem = ({ torrent, isClicked, onClick }: ITorrentListItemProps): JSX.Element => {
  const isActive = torrent.status_code !== StatusCode.StatusFinished && torrent.status_code !== StatusCode.StatusPaused;

  const onResumePause = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, data: ButtonProps) => {
    event.stopPropagation();
    const { active } = data;
    const action = active ? 'pause' : 'resume';

    await fetch(`/torrents/${action}/${torrent.id}`);
  };

  const onPlay = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, _data: ButtonProps) => {
    event.stopPropagation();
    await fetch(`/playuri?resume=${torrent.id}`);
  };

  return (
    <>
      <Table.Row onClick={() => onClick(isClicked ? undefined : torrent)} active={isClicked}>
        <Table.Cell>
          <span title={torrent.name}>{torrent.name}</span>
          <Progress percent={torrent.progress} title={`${torrent.progress.toFixed(2)}%`} autoSuccess indicating={isActive} size="tiny" />
        </Table.Cell>
        <Table.Cell textAlign="center">
          <Label color={isActive ? 'green' : undefined}>
            {torrent.size}
            <Label.Detail>{torrent.status}</Label.Detail>
          </Label>
        </Table.Cell>
        <Table.Cell>
          <StatisticGroup size="mini" widths="2">
            <Statistic value={torrent.ratio.toFixed(2)} label="Seed ratio" />
            <Statistic value={`${torrent.time_ratio.toFixed(2)}`} label="Time ratio" />
          </StatisticGroup>
        </Table.Cell>
        <Table.Cell>
          <StatisticGroup widths="2" size="mini">
            <Statistic>
              <StatisticValue>
                <Icon name="arrow down" size="small" />
                {` ${torrent.download_rate.toFixed(2)}`}
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
        <Table.Cell textAlign="center">
          <Button.Group basic fluid size="tiny">
            <Button icon={isActive ? 'pause' : 'download'} toggle active={isActive} onClick={onResumePause} />
            <Button icon="play" onClick={onPlay} title="Play in Kodi" />
          </Button.Group>
        </Table.Cell>
      </Table.Row>
    </>
  );
};

export default React.memo(TorrentListItem, isEqual);
