import React, { useState } from 'react';
import {
  Button, Checkbox, Modal,
} from 'semantic-ui-react';

interface ITorrentListProps {
  torrentIdsToDelete: string[]
}

const DeleteTorrentModal = ({ torrentIdsToDelete } : ITorrentListProps): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [deleteFiles, setDeleteFiles] = useState(false);

  // TODO: handle response
  // TODO: update list after executing fetch
  function deleteSelectedTorrents() {
    torrentIdsToDelete.map((id) => fetch(`/torrents/delete/${id}?files=${deleteFiles}`));
    setOpen(false);
  }

  return (
    <Modal onClose={() => setOpen(false)} onOpen={() => setOpen(true)} open={open} trigger={<Button floated="left" content="Delete" />}>
      <Modal.Header>Delete Torrent</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          Are you sure?
          <br />
          <Checkbox toggle label="Also delete files" onChange={(e, data) => setDeleteFiles(data.checked ?? false)} />
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
