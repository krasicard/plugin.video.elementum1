import React, {
  FC, useReducer, useRef, useState,
} from 'react';
import {
  Dropdown, DropdownItemProps, Grid, Item, ItemGroup, Search, SearchResultProps,
} from 'semantic-ui-react';
import { useDebouncedCallback } from 'use-debounce';

const debounceWaitTime = 300;

type TorrentType = 'Movies' | 'TvShows' | 'General';
const torrentTypes: DropdownItemProps[] = [
  {
    text: 'Movies',
    value: 'Movies',
    icon: 'film',
  },
  {
    text: 'TV Shows',
    value: 'TvShows',
    icon: 'tv',
  },
  {
    text: 'General',
    value: 'General',
    icon: 'magnet',
  },
];

type Action = { type: 'CleanQuery' }
| { type: 'StartSearch', query: string }
| { type: 'FinishSearch', results: ResultView[] }
| { type: 'UpdateSelection', selection: string };

interface Info {
  plotoutline: string,
  tagline: string,
  code: string,
}

interface Art {
  thumb: string
}

interface Result {
  label: string
  info: Info,
  art: Art,
  path: string,
  is_playable: boolean,
}

interface ResultView {
  title: string,
  tagline: string,
  description: string,
  image: string,
  path: string,
  key: string,
}

interface State {
  loading: boolean,
  results: ResultView[],
  value: string,
}

const initialState: State = {
  loading: false,
  results: [],
  value: '',
};

function queryReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'CleanQuery':
      return initialState;
    case 'StartSearch':
      return { ...state, loading: true, value: action.query };
    case 'FinishSearch':
      return { ...state, loading: false, results: action.results };
    case 'UpdateSelection':
      return { ...state, value: action.selection };
  }
}

const resultRenderer = (item: SearchResultProps) => {
  const result = item as ResultView;
  return (
    <ItemGroup>
      <Item>
        <Item.Image src={result.image} />
        <Item.Content>
          <Item.Header>{result.title}</Item.Header>
          <Item.Meta>{result.tagline}</Item.Meta>
          <Item.Description>{result.description}</Item.Description>
          <Item.Extra>test</Item.Extra>
        </Item.Content>
      </Item>
    </ItemGroup>
  );
};

function getSearchType(torrentType: TorrentType): string {
  switch (torrentType) {
    case 'Movies':
      return 'movies';
    case 'TvShows':
      return 'shows';
    case 'General':
      return '.';
  }
}

async function querySearchResults(url: string, dispatch: React.Dispatch<Action>) {
  const response = await fetch(url);
  const items = (await response.json()).items as Result[];

  dispatch({
    type: 'FinishSearch',
    results: items.filter((i) => i.info !== undefined).map((i) => ({
      image: i.art.thumb,
      key: i.info.code,
      description: i.info.plotoutline,
      title: i.label,
      tagline: i.info.tagline,
      path: i.path,
    })),
  });
}

const Statistics: FC = () => {
  const [torrentType, setTorrentType] = useState<TorrentType>('Movies');
  const searcRef = useRef<any>();
  const [state, dispatch] = useReducer(queryReducer, initialState);
  const { loading, results, value } = state;

  const debounceSearchChange = useDebouncedCallback(async (query: string) => {
    const searchType = getSearchType(torrentType);

    await querySearchResults(`/${searchType}/search?q=${query}`, dispatch);
  }, debounceWaitTime);

  const handleQueryChange = async (query: string) => {
    dispatch({
      type: 'StartSearch', query,
    });

    if (query.trim().length === 0) {
      dispatch({
        type: 'CleanQuery',
      });
      return;
    }

    await debounceSearchChange(query);
  };

  const handleResultSelect = async (data: ResultView): Promise<void> => {
    const path = data.path.replace('plugin://plugin.video.elementum/', '');
    const url = `/${path}?external=1`;

    switch (torrentType) {
      case 'Movies':
        await fetch(url);
        break;
      case 'TvShows': {
        dispatch({
          type: 'StartSearch', query: value,
        });

        if (path.includes('links')) {
          await fetch(url);
        } else {
          await querySearchResults(url, dispatch);
          searcRef.current.open();
        }
        break;
      }
      case 'General':
        break;
    }
  };

  const handleTorrentTypeChange = (torrentTypeValue: TorrentType) => {
    setTorrentType(torrentTypeValue);
    dispatch({
      type: 'CleanQuery',
    });
  };

  return (
    <>
      <Grid padded stackable columns="3">
        <Grid.Row>
          <Grid.Column width="7">
            <Grid>
              <Grid.Row>
                <Grid.Column width="5">
                  <Dropdown
                    fluid
                    selection
                    options={torrentTypes}
                    defaultValue={torrentTypes[0].value}
                    onChange={(_, data) => handleTorrentTypeChange(data.value as TorrentType)}
                  />
                </Grid.Column>
                <Grid.Column width="11">
                  <Search
                    fluid
                    placeholder="Search"
                    loading={loading}
                    results={results}
                    value={value}
                    onSearchChange={(_, data) => handleQueryChange(data.value ?? '')}
                    resultRenderer={resultRenderer}
                    onResultSelect={(_, data) => handleResultSelect(data.result)}
                    ref={searcRef}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>
          <Grid.Column width="4">test</Grid.Column>
          <Grid.Column width="3">test</Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
};

export default Statistics;
