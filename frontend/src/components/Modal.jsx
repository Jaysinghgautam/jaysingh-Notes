import React from "react";

export default function Modal({
  Modaltitle,
  title,
  description,
  handleTitleChange,
  handleDescriptionChange,
  handleNoteSubmit,
}) {
  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg rounded-4">
          <div className="modal-header border-bottom-0 pb-0">
            <h1 className="modal-title fs-5 fw-bold" id="exampleModalLabel">
              {Modaltitle}
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body py-3">
            {/* Title Input */}
            <div className="mb-3">
              <label htmlFor="createNoteTitle" className="form-label fw-semibold text-secondary">
                Title
              </label>
              <input
                type="text"
                className="form-control form-control-lg rounded-3 fs-6"
                id="createNoteTitle"
                placeholder="Enter title..."
                value={title}
                onChange={handleTitleChange}
              />
            </div>

            {/* Description Textarea */}
            <div className="mb-2">
              <label htmlFor="createNoteDescription" className="form-label fw-semibold text-secondary">
                Description
              </label>
              <textarea
                className="form-control rounded-3"
                id="createNoteDescription"
                rows="4"
                placeholder="Enter note description..."
                value={description}
                onChange={handleDescriptionChange}
              ></textarea>
            </div>
          </div>
          <div className="modal-footer border-top-0 pt-0">
            <button
              type="button"
              className="btn btn-light rounded-pill px-4"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn bg-black text-white rounded-pill px-4"
              onClick={handleNoteSubmit}
            >
              Save Note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}