import React, { FC } from 'react';

interface StatisticsProps {
  downloading: number,
  finished: number,
  total: number,
}

const Statistics: FC<StatisticsProps> = ({ downloading, finished, total }: StatisticsProps) => (
  <>
    <div className="statistics">
      <div>{downloading}</div>
      <div className="label">Downloading</div>
    </div>
    <div className="statistics">
      <div>{finished}</div>
      <div className="label">Finished</div>
    </div>
    <div className="statistics">
      <div>{total}</div>
      <div className="label">Total</div>
    </div>
  </>
);

export default Statistics;
