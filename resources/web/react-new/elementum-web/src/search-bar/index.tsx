/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import React, { FC, useReducer } from 'react';
import {
  Dropdown, DropdownItemProps, Grid, Item, ItemGroup, Search, SearchResultProps,
} from 'semantic-ui-react';
import { useDebouncedCallback } from 'use-debounce';

const torrentTypes: DropdownItemProps[] = [
  {
    text: 'Movies',
    value: 'Movies',
    icon: 'film',
  },
  {
    text: 'TV Shows',
    value: 'TV Shows',
    icon: 'tv',
  },
  {
    text: 'General',
    value: 'General',
    icon: 'magnet',
  },
];

const debounceWaitTime = 300;

interface Action {
  type: ActionType,
  query: string,
  results: ResultView[],
  selection: string
}

// eslint-disable-next-line no-shadow
enum ActionType {
  CleanQuery,
  StartSearch,
  FinishSearch,
  UpdateSelection,
}

interface Info {
  plotoutline: string,
  tagline: string,
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
  key: string,
  title: string,
  tagline: string,
  description: string,
  image: string,
  path: string,
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
    case ActionType.CleanQuery:
      return initialState;
    case ActionType.StartSearch:
      return { ...state, loading: true, value: action.query };
    case ActionType.FinishSearch:
      return { ...state, loading: false, results: action.results };
    case ActionType.UpdateSelection:
      return { ...state, value: action.selection };

    default:
      throw new Error();
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

const Statistics: FC = () => {
  const [state, dispatch] = useReducer(queryReducer, initialState);
  const { loading, results, value } = state;

  const debounceSearchChange = useDebouncedCallback(async (query: string) => {
    const response = await fetch(`http://127.0.0.1:65220/movies/search?q=${query}`);
    const items = (await response.json()).items as Result[];

    dispatch({
      type: ActionType.FinishSearch,
      results: items.filter((i) => i.is_playable).map((i) => ({
        image: i.art.thumb,
        key: i.art.thumb,
        description: i.info.plotoutline,
        title: i.label,
        tagline: i.info.tagline,
        path: i.path,
      })),
      query,
      selection: '',
    });
  }, debounceWaitTime);

  const handleQueryChange = async (query: string) => {
    dispatch({
      type: ActionType.StartSearch, query, results: [], selection: '',
    });

    if (query.trim().length === 0) {
      dispatch({
        type: ActionType.CleanQuery, query: '', results: [], selection: '',
      });
      return;
    }

    await debounceSearchChange(query);
  };

  const handleResultSelect = (data: ResultView) => {
    const path = data.path.replace('plugin://plugin.video.elementum/', '');
    fetch(`http://127.0.0.1:65220/${path}`);
  };

  return (
    <>
      <Grid padded stackable columns="3">
        <Grid.Row>
          <Grid.Column width="7">
            <Grid>
              <Grid.Row>
                <Grid.Column width="5">
                  <Dropdown fluid selection options={torrentTypes} defaultValue={torrentTypes[0].value} />
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
