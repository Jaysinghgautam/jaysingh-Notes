import React from "react";
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function Notes({
  title,
  description,
  date,
  handleUpdate,
  handleDelete,
}) {
  return (
    <div
      className="card position-relative rounded-4 border-0 shadow-sm h-100 note-card"
      style={{
        minHeight: "12rem",
        backgroundColor: "#FEC971",
      }}
    >
      <div className="card-body d-flex flex-column justify-content-between p-3">
        {/* Top: Action Buttons */}
        <div className="d-flex justify-content-end gap-2 mb-2">
          {/* Edit Button */}
          <button
            className="btn btn-sm d-flex align-items-center justify-content-center rounded-circle"
            style={{
              width: "32px",
              height: "32px",
              backgroundColor: "rgba(0,0,0,0.1)",
              border: "none",
              padding: 0,
            }}
            onClick={handleUpdate}
            data-bs-toggle="modal"
            data-bs-target="#eiditModal"
            title="Edit Note"
          >
            <FaPen size={14} color="#000" />
          </button>

          {/* Delete Button */}
          <button
            className="btn btn-sm d-flex align-items-center justify-content-center rounded-circle"
            style={{
              width: "32px",
              height: "32px",
              backgroundColor: "rgba(220,53,69,0.15)",
              border: "none",
              padding: 0,
            }}
            onClick={handleDelete}
            data-bs-toggle="modal"
            data-bs-target="#deleteEmployeeModal"
            title="Delete Note"
          >
            <MdDelete size={16} color="#dc3545" />
          </button>
        </div>

        {/* Note Content */}
        <div className="flex-grow-1">
          {/* Title */}
          <h5
            className="fw-bold mb-2"
            style={{
              color: "#000000",
              fontSize: "1.1rem",
              wordBreak: "break-word",
              lineHeight: "1.4",
            }}
          >
            {title}
          </h5>

          {/* Description */}
          {description ? (
            <p
              className="mb-0"
              style={{
                color: "#000000",
                fontSize: "0.92rem",
                lineHeight: "1.5",
                whiteSpace: "pre-line",
                wordBreak: "break-word",
              }}
            >
              {description}
            </p>
          ) : null}
        </div>

        {/* Bottom: Date */}
        <div className="mt-3 pt-2" style={{ borderTop: "1px solid rgba(0,0,0,0.1)" }}>
          <small style={{ color: "#000000", opacity: 0.7, fontSize: "0.8rem" }}>
            {date}
          </small>
        </div>
      </div>
    </div>
  );
}