import React, { useState } from 'react';
import { Button, Checkbox, Message, Modal, Popup } from 'semantic-ui-react';
import { ITorrent } from '../dataStructure';

interface ITorrentListProps {
  torrent: ITorrent | undefined;
}

const DeleteTorrentModal = ({ torrent }: ITorrentListProps): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [deleteFiles, setDeleteFiles] = useState(false);
  const hasSelectedTorrent = torrent !== undefined;

  // TODO: handle response
  // TODO: update list after executing fetch
  function deleteSelectedTorrent() {
    if (torrent) {
      void fetch(`/torrents/delete/${torrent.id}?files=${deleteFiles}`);
    }
    setOpen(false);
  }

  return (
    <Modal
      onClose={() => setOpen(false)}
      open={open}
      trigger={
        <Popup
          trigger={
            <div style={{ display: 'inline-block' }}>
              <Button content="Delete" disabled={!hasSelectedTorrent} onClick={(_, _data) => setOpen(true)} />
            </div>
          }
          content="Select a torrent first"
          disabled={hasSelectedTorrent}
          closeOnTriggerClick={false}
          inverted
        />
      }
    >
      <Modal.Header>Delete {torrent?.name}</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          Are you sure you want to delete <b>{torrent?.name}</b>?
          <br />
          <Message negative>
            <Checkbox label="Also delete files" onChange={(e, data) => setDeleteFiles(data.checked ?? false)} />
          </Message>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button content="No" icon="undo" onClick={() => setOpen(false)} />
        <Button content="Yes" icon="trash" color="red" onClick={() => deleteSelectedTorrent()} />
      </Modal.Actions>
    </Modal>
  );
};

export default DeleteTorrentModal;
