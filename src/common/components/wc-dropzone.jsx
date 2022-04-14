import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect, useState } from "react";
import Dropzone from "react-dropzone";
const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

export const WCDropzone = React.forwardRef(
  ({ onChange, multiple = false }, ref) => {
    const [files, setFiles] = useState([]);

    const onDrop = useCallback((acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    }, []);

    const onRemoveImage = (index) => {
      let temp = files.length > 1 ? files.splice(index, 1) : [];
      setFiles(temp);
    };

    useEffect(() => {
      onChange(files);
    }, [files, onChange]);

    const thumbs = files.map((file, index) => (
      <React.Fragment key={index}>
        <div style={thumb} key={file.name}>
          <div className="text-center">
            <img
              src={file.preview}
              style={img}
              alt="preview-img"
              className="mb-2"
            />
            <FontAwesomeIcon
              role={"button"}
              icon={faTrashAlt}
              className="text-danger"
              onClick={onRemoveImage.bind(this, index)}
            />
          </div>
        </div>
        <div></div>
      </React.Fragment>
    ));

    return (
      <Dropzone onDrop={onDrop} multiple={multiple}>
        {({ getRootProps, getInputProps }) => (
          <section className="container">
            <div
              {...getRootProps({
                className: "dropzone dropzone-custom",
              })}
            >
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            <aside style={thumbsContainer}>{thumbs}</aside>
          </section>
        )}
      </Dropzone>
    );
  }
);
