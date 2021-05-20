import React, { FC, useEffect, useReducer } from 'react';
import { StrictTableHeaderCellProps, Table } from 'semantic-ui-react';
import { orderBy } from 'lodash-es';
import DeleteTorrentModal from '../delete-modal';
import UploadTorrentModal from '../upload-modal';
import TorrentListItem from './torrent';
import { ITorrent } from '../dataStructure';

interface ITorrentListProps {
  torrents: ITorrent[];
  activeTorrents: ITorrent[];
  onSetActiveTorrents: React.Dispatch<React.SetStateAction<ITorrent[]>>;
}

type LodashSortDirection = 'asc' | 'desc' | undefined;

interface State {
  column: string | null;
  data: ITorrent[];
  direction: LodashSortDirection;
}

type Action = { type: 'CHANGE_SORT'; column: string } | { type: 'UPDATE_TORRENTS'; torrents: ITorrent[] };

const initialState: State = {
  column: null,
  data: [],
  direction: undefined,
};

function sortReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'CHANGE_SORT': {
      let newDirection: NonNullable<LodashSortDirection>;
      if (state.column === action.column) {
        newDirection = state.direction === 'asc' ? 'desc' : 'asc';
      } else {
        newDirection = 'asc';
      }

      return {
        ...state,
        column: action.column,
        data: orderBy(state.data, [action.column, 'name'], [newDirection, 'asc']),
        direction: newDirection,
      };
    }
    case 'UPDATE_TORRENTS':
      return {
        ...state,
        data:
          state.column && state.direction ? orderBy(action.torrents, [state.column, 'name'], [state.direction, 'asc']) : action.torrents,
      };
    default:
      throw new Error();
  }
}

const getSemanticSortDirection = (lodashSortDirection: LodashSortDirection): StrictTableHeaderCellProps['sorted'] =>
  lodashSortDirection === 'asc' ? 'ascending' : 'descending';

const TorrentList: FC<ITorrentListProps> = ({ torrents, activeTorrents, onSetActiveTorrents }: ITorrentListProps) => {
  const [state, dispatch] = useReducer(sortReducer, initialState);
  const { column, data, direction } = state;

  useEffect(() => {
    dispatch({ type: 'UPDATE_TORRENTS', torrents });
  }, [torrents]);

  return (
    <>
      <Table compact="very" size="small" stackable fixed singleLine selectable sortable>
        <Table.Header className="mobile-hidden">
          <Table.Row>
            <Table.HeaderCell
              width="11"
              sorted={column === 'name' ? getSemanticSortDirection(direction) : undefined}
              onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'name' })}
            >
              Name
            </Table.HeaderCell>
            <Table.HeaderCell
              width="4"
              sorted={column === 'size' ? getSemanticSortDirection(direction) : undefined}
              onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'size' })}
            >
              Size / Status
            </Table.HeaderCell>
            <Table.HeaderCell
              width="5"
              sorted={column === 'ratio' ? getSemanticSortDirection(direction) : undefined}
              onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'ratio' })}
            >
              Ratios
            </Table.HeaderCell>
            <Table.HeaderCell
              width="5"
              sorted={column === 'download_rate' ? getSemanticSortDirection(direction) : undefined}
              onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'download_rate' })}
            >
              Rates
            </Table.HeaderCell>
            <Table.HeaderCell
              width="5"
              sorted={column === 'seeders' ? getSemanticSortDirection(direction) : undefined}
              onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'seeders' })}
            >
              Seeds / Peers
            </Table.HeaderCell>
            <Table.HeaderCell width="3" />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((t) => (
            <TorrentListItem
              key={t.id}
              torrent={t}
              onSetActiveTorrents={onSetActiveTorrents}
              isSelected={activeTorrents.some((at) => at.id === t.id)}
            />
          ))}
        </Table.Body>
        <Table.Footer fullWidth>
          <Table.Row>
            <Table.HeaderCell colSpan={11}>
              <UploadTorrentModal />
              <DeleteTorrentModal torrents={activeTorrents} />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </>
  );
};

export default TorrentList;
