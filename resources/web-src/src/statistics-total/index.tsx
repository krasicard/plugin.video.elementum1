import React, { FC } from 'react';
import { Statistic } from 'semantic-ui-react';

interface StatisticsProps {
  downloading: number;
  finished: number;
  total: number;
}

const Statistics: FC<StatisticsProps> = ({ downloading, finished, total }: StatisticsProps) => (
  <>
    <Statistic.Group widths="3">
      <Statistic>
        <Statistic.Value>{downloading}</Statistic.Value>
        <Statistic.Label>Downloading</Statistic.Label>
      </Statistic>
      <Statistic>
        <Statistic.Value>{finished}</Statistic.Value>
        <Statistic.Label>Finished</Statistic.Label>
      </Statistic>
      <Statistic>
        <Statistic.Value>{total}</Statistic.Value>
        <Statistic.Label>Total</Statistic.Label>
      </Statistic>
    </Statistic.Group>
  </>
);

export default Statistics;
