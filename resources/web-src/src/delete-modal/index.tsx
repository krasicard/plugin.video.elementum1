import React, { useState } from 'react';
import {
  Button, Checkbox, Message, Modal, Popup,
} from 'semantic-ui-react';

interface ITorrentListProps {
  torrentIdsToDelete: string[]
}

const DeleteTorrentModal = ({ torrentIdsToDelete } : ITorrentListProps): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [deleteFiles, setDeleteFiles] = useState(false);
  const hasSelectedTorrents = torrentIdsToDelete.length !== 0;

  // TODO: handle response
  // TODO: update list after executing fetch
  function deleteSelectedTorrents() {
    torrentIdsToDelete.map((id) => fetch(`/torrents/delete/${id}?files=${deleteFiles}`));
    setOpen(false);
  }

  return (
    <Modal
      onClose={() => setOpen(false)}
      open={open}
      trigger={(
        <Popup
          trigger={(
            <div style={{ display: 'inline-block' }}>
              <Button content="Delete" disabled={!hasSelectedTorrents} onClick={(_, _data) => setOpen(true)} />
            </div>
          )}
          content="Select at least 1 torrent"
          disabled={hasSelectedTorrents}
          closeOnTriggerClick={false}
          inverted
        />
      )}
    >
      <Modal.Header>Delete Torrent</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          Are you sure?
          <br />
          <Message negative>
            <Checkbox label="Also delete files" onChange={(e, data) => setDeleteFiles(data.checked ?? false)} />
          </Message>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button content="No" icon="undo" onClick={() => setOpen(false)} />
        <Button content="Yes" icon="trash" color="red" onClick={() => deleteSelectedTorrents()} />
      </Modal.Actions>
    </Modal>
  );
};

export default DeleteTorrentModal;
