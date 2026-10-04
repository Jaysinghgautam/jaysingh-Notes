
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Notes from "../components/Notes";
import Navbar from "../components/Navbar";
import { delet, get, post, put } from "../services/ApiEndPoint";
import Modal from "../components/Modal";
import toast from "react-hot-toast";
import EidtModal from "../components/EidtModal";
import DeleteModal from "../components/DeleteModel";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

export default function Home() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateDescription, setUpdateDescription] = useState("");
  const [modalId, setModalId] = useState("");
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [refersh, setRefersh] = useState(false);

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Helper to close Bootstrap modals using Bootstrap JS API
  const closeModalById = (id) => {
    try {
      const modalElement = document.getElementById(id);
      if (modalElement && window.bootstrap) {
        const modal = window.bootstrap.Modal.getInstance(modalElement);
        if (modal) modal.hide();
      } else if (modalElement) {
        // Fallback: remove modal-related classes manually
        modalElement.classList.remove("show");
        modalElement.style.display = "none";
        document.body.classList.remove("modal-open");
        document.body.style.removeProperty("overflow");
        document.body.style.removeProperty("padding-right");
        const backdrop = document.querySelector(".modal-backdrop");
        if (backdrop) backdrop.remove();
      }
    } catch (e) {
      console.warn("Modal close error:", e);
    }
  };

  // Open edit modal and populate existing values
  const handleOpenEdit = (elem) => {
    setModalId(elem._id);
    setUpdateTitle(elem.title || "");
    setUpdateDescription(elem.description || "");
  };

  // Create Note (with duplicate check and validation)
  const handleNoteSubmit = async () => {
    try {
      if (!title || !title.trim()) {
        toast.error("Please enter a note title!");
        return;
      }

      // Duplicate note check (case-insensitive & safe check)
      const isDuplicate = notes?.some(
        (note) =>
          note?.title &&
          note.title.trim().toLowerCase() === title.trim().toLowerCase()
      );

      if (isDuplicate) {
        toast.error("A note with this title already exists!");
        return;
      }

      console.log("Sending note to backend:", {
        title: title.trim(),
        description: description.trim(),
      });

      const request = await post("/notes/create", {
        title: title.trim(),
        description: description.trim(),
      });
      const response = request.data;
      console.log("Create note backend response:", response);

      if (response.success) {
        toast.success(response.message || "Note created successfully");
        setTitle("");
        setDescription("");
        closeModalById("exampleModal");
        // Refresh notes after short delay to allow modal animation to finish
        setTimeout(() => {
          setRefersh((prev) => !prev);
        }, 300);
      }
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to create note. Please check your connection.");
      }
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
      console.error("Create note error:", error);
    }
  };

  // Update Note
  const handeleUpdate = async () => {
    try {
      if (!updateTitle || !updateTitle.trim()) {
        toast.error("Please enter a note title!");
        return;
      }
      const request = await put(`/notes/update/${modalId}`, {
        title: updateTitle.trim(),
        description: updateDescription.trim(),
      });
      const response = request.data;
      console.log("Update note backend response:", response);
      if (response.success) {
        toast.success(response.message || "Note updated successfully");
        setUpdateTitle("");
        setUpdateDescription("");
        closeModalById("eiditModal");
        setTimeout(() => {
          setRefersh((prev) => !prev);
        }, 300);
      }
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to update note.");
      }
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
      console.error("Update note error:", error);
    }
  };

  // Delete Note
  const handelNotesDelete = async () => {
    try {
      const request = await delet(`/notes/delete/${modalId}`);
      const response = request.data;
      if (response.success) {
        toast.success(response.message || "Note deleted successfully");
        closeModalById("deleteEmployeeModal");
        setTimeout(() => {
          setRefersh((prev) => !prev);
        }, 300);
      }
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to delete note.");
      }
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
      console.error("Delete note error:", error);
    }
  };

  // Fetch Notes
  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      try {
        const request = await get("/notes/getnotes");
        const response = request.data;
        console.log("Fetched notes from backend:", response.Notes);
        if (response.success && Array.isArray(response.Notes)) {
          setNotes(response.Notes);
        } else {
          setNotes([]);
        }
      } catch (error) {
        console.error("Fetch notes error:", error);
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
        setNotes([]);
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, [refersh, navigate]);

  return (
    <>
      {/* Create Note Modal */}
      <Modal
        Modaltitle={"Write Note"}
        title={title}
        description={description}
        handleTitleChange={(e) => setTitle(e.target.value)}
        handleDescriptionChange={(e) => setDescription(e.target.value)}
        handleNoteSubmit={handleNoteSubmit}
      />

      {/* Update Note Modal */}
      <EidtModal
        Modaltitle={"Update Note"}
        title={updateTitle}
        description={updateDescription}
        handleTitleChange={(e) => setUpdateTitle(e.target.value)}
        handleDescriptionChange={(e) => setUpdateDescription(e.target.value)}
        handleNoteSubmit={handeleUpdate}
      />

      {/* Delete Note Modal */}
      <DeleteModal handelNotesDelete={handelNotesDelete} />

      <div className="row">
        <div className="col-lg-10 col-md-10">
          <Navbar />

          {/* Add Note Button */}
          <div className="d-flex justify-content-start mx-5 mt-4">
            <div
              className="rounded-circle d-flex justify-content-center align-items-center shadow-sm"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              style={{
                backgroundColor: "black",
                width: "50px",
                height: "50px",
                cursor: "pointer",
              }}
              title="Add Note"
            >
              <FaPlus size={22} color="white" />
            </div>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="mt-5 text-center">
              <div className="spinner-border text-dark" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : !loading && notes.length === 0 ? (
            <div className="mt-5 justify-content-center d-flex align-items-center flex-column">
              <h2 className="fs-2 fw-bold text-muted mb-2">No Notes Found</h2>
              <p className="text-secondary">Click the + button above to create your first note!</p>
            </div>
          ) : null}

          {/* Notes List */}
          <div className="mt-4 mx-5 row g-4">
            {notes &&
              notes.map((elem) => (
                <div className="col-lg-4 col-md-6 mb-3" key={elem._id}>
                  <Notes
                    title={elem.title}
                    description={elem.description}
                    date={formatDate(elem.updatedAt)}
                    handleUpdate={() => handleOpenEdit(elem)}
                    handleDelete={() => setModalId(elem._id)}
                    openDropdownId={openDropdownId}
                    setOpenDropdownId={setOpenDropdownId}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
