import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileUpload } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../contexts/AuthContext";
import { storage, database } from "../../firebase";
import { ROOT_FOLDER } from "../../hooks/useFolder";

export default function AddFileButton({ currentFolder }) {
  const { currentUser } = useAuth();

  function handleUpload(e) {
    const file = e.target.files[0];
    if (currentFolder == null || file == null) return;

    const filePath =
      currentFolder === ROOT_FOLDER
        ? `${currentFolder.path.join("/")}/${file.name}`
        : `${currentFolder.path.join("/")}/${currentFolder.name}/${file.name}`;

    const uploadTask = storage
      .ref(`/files/${currentUser.uid}/${filePath}`)
      .put(file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      () => {},
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
          console.log(url);
          database.files.add({
            url: url,
            name: file.name,
            createdAt: database.getCurrentTimestamp(),
            folderId: currentFolder.id,
            userId: currentUser.uid,
          });
        });
      }
    );
  }
  return (
    <label className="btn btn-outline-success btn-lg">
      <FontAwesomeIcon icon={faFileUpload} />
      <input
        type="file"
        onChange={handleUpload}
        style={{ opacity: 0, position: "absolute", left: "-9999px" }}
      />
    </label>
  );
}
