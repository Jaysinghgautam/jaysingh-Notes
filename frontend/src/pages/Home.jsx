// import React, { useEffect, useState } from "react";
// // import SideBar from "../components/SideBar";
// import Cookies from "js-cookie";
// import Notes from "../components/Notes";
// import Navbar from "../components/Navbar";
// import { delet, get, post, put } from "../services/ApiEndPoint";
// import Modal from "../components/Modal";
// import toast from "react-hot-toast";
// import EidtModal from "../components/EidtModal"; // ✅ fixed typo
// import DeleteModal from "../components/DeleteModel"; // ✅ make sure file exists
// import { useNavigate } from "react-router-dom";
// import { FaPlus } from "react-icons/fa6";

// export default function Home() {
//   const navigate = useNavigate();
//   const [notes, setNotes] = useState([]);
//   console.log("notes", notes);
//   const [loading, setLoading] = useState(false);
//   const [title, setTitle] = useState("");
//   const [updatetitle, setUpdatetitle] = useState("");
//   const [modalId, setModalId] = useState("");
//   const [openDropdownId, setOpenDropdownId] = useState(null); // Manage open dropdown state
//   const [refersh, setRefersh] = useState(false);
//   const [closeModal, setCloseModal] = useState(false);

//   // Function to format the date
//   const formatDate = (dateString) => {
//     const options = { year: "numeric", month: "long", day: "numeric" };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };

//   const handleNoteSubmit = async () => {
//     try {
//       const request = await post("/notes/create", { title });
//       const response = request.data;
//       if (response.success) {
//         toast.success(response.message);
//         setRefersh(!refersh);
//         setCloseModal(true);
//       }
//     } catch (error) {
//       if (error.response) {
//         toast.error(error.response.data.message);
//       }
//       console.log(error);
//     }
//   };

//   const handeleUpdate = async () => {
//     try {
//       console.log("modal Id", modalId);
//       const request = await put(`/notes/update/${modalId}`, {
//         title: updatetitle,
//       });
//       const response = request.data;
//       console.log("update Resposne", response);
//       if (response.success) {
//         toast.success(response.message);
//         setRefersh(!refersh);
//         setCloseModal(true);
//       }
//     } catch (error) {
//       if (error.response) {
//         toast.error(error.response.data.message);
//       }
//       console.log(error);
//     }
//   };

//   const handelNotesDelete = async () => {
//     try {
//       console.log("modal Id", modalId);
//       const request = await delet(`/notes/delete/${modalId}`);
//       const response = request.data;
//       console.log("update Resposne", response);
//       if (response.success) {
//         toast.success(response.message);
//         setRefersh(!refersh);
//         setCloseModal(true);
//       }
//     } catch (error) {
//       if (error.response) {
//         toast.error(error.response.data.message);
//       }
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     const GetNotes = async () => {
//       try {
//         const request = await get("/notes/getnotes", { withCredentials: true });
//         const reponse = request.data;
//         setNotes(reponse.Notes);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     GetNotes();
//   }, [refersh]);

//   return (
//     <>
//       <Modal
//         Modaltitle={"Write Notes"}
//         value={title}
//         handleChange={(e) => setTitle(e.target.value)}
//         handleNoteSubmit={handleNoteSubmit}
//         HandleClose={closeModal}
//       />
//       <EidtModal
//         Modaltitle={"Updated Notes"}
//         handleChange={(e) => setUpdatetitle(e.target.value)}
//         handleNoteSubmit={handeleUpdate}
//         value={updatetitle}
//       ></EidtModal>
//       <DeleteModal handelNotesDelete={handelNotesDelete} />
//       <div className="row ">
//         {/* <div className="col-lg-2 col-md-2 shadow d-flex min-vh-100 ">
//           <SideBar />
//         </div> */}
//         <div className="col-lg-10 col-md-10 ">
//           <Navbar />
//           {notes.length > 0 && (
//             <div className=" mx-5">
//               {/* <h1 className="fs-2 fw-bold">NOTES</h1> */}
//                    <div className='rounded-circle mt-5 mx-2 d-flex  d-flex justify-content-center align-items-center'
//                    data-bs-toggle="modal" data-bs-target="#exampleModal"
//                     style={{backgroundColor:"black",width:"50px",height:"50px",cursor:'pointer'}}>
//                       <FaPlus  size={30} className='rounded-circle fs-5 text-white'  />
//                    </div>
//             </div>
//           )}
//           {notes.length === 0 && (
//             <div className="mt-5 justify-content-center d-flex align-items-center">
              
//                <div className='rounded-circle mt-5 mx-2 d-flex  d-flex justify-content-center align-items-center'
//                    data-bs-toggle="modal" data-bs-target="#exampleModal"
//                     style={{backgroundColor:"black",width:"50px",height:"50px",cursor:'pointer'}}>
//                       <FaPlus  size={30} className='rounded-circle fs-5 text-white'  />
//                    </div>
//                    <h1 className="fs-1 fw-bold">No Notes Found</h1>
//             </div>
//           )}
//           <div className="mt-4 bg-amber-900 mx-5 row">
//             {notes &&
//               notes.map((elem, index) => {
//                 return (
//                   <div className="col-lg-4 col-md-4 mb-5" key={index}>
//                     <Notes
//                       title={elem.title}
//                       date={formatDate(elem.updatedAt)}
//                       handleUpdate={() => setModalId(elem._id)}
//                       handleDelete={() => setModalId(elem._id)}
//                       openDropdownId={openDropdownId}
//                       setOpenDropdownId={setOpenDropdownId}
//                     />
//                   </div>
//                 );
//               })}
//           </div>
//         </div>
//       </div>
//     </>

// //  <>
// //   <Modal
// //     Modaltitle={"Write Notes"}
// //     value={title}
// //     handleChange={(e) => setTitle(e.target.value)}
// //     handleNoteSubmit={handleNoteSubmit}
// //     HandleClose={closeModal}
// //   />
// //   <EidtModal
// //     Modaltitle={"Updated Notes"}
// //     handleChange={(e) => setUpdatetitle(e.target.value)}
// //     handleNoteSubmit={handeleUpdate}
// //     value={updatetitle}
// //   />
// //   <DeleteModal handelNotesDelete={handelNotesDelete} />

// //   <div className="row">
// //     <div className="col-lg-10 col-md-10">
// //       {/* ✅ Fixed Navbar */}
// //       <Navbar className="fixed-top" />

// //       {/* ✅ Content Wrapper */}
// //       <div className="content-wrapper">
// //         {notes.length > 0 && (
// //           <div className="mt-3 mx-5">
// //             <h1 className="fs-2 fw-bold">NOTES</h1>
// //           </div>
// //         )}
// //         {notes.length === 0 && (
// //           <div className="mt-5 justify-content-center d-flex align-items-center">
// //             <h1 className="fs-1 fw-bold">No Notes Found</h1>
// //           </div>
// //         )}
// //         <div className="mt-4 bg-amber-900 mx-5 row">
// //           {notes &&
// //             notes.map((elem, index) => (
// //               <div className="col-lg-4 col-md-4 mb-5" key={index}>
// //                 <Notes
// //                   title={elem.title}
// //                   date={formatDate(elem.updatedAt)}
// //                   handleUpdate={() => setModalId(elem._id)}
// //                   handleDelete={() => setModalId(elem._id)}
// //                   openDropdownId={openDropdownId}
// //                   setOpenDropdownId={setOpenDropdownId}
// //                 />
// //               </div>
// //             ))}
// //         </div>
// //       </div>
// //     </div>
// //   </div>
// // </>

//   );
// }



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
import { FaPlus } from "react-icons/fa"; // ✅ FIXED import

export default function Home() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [updatetitle, setUpdatetitle] = useState("");
  const [modalId, setModalId] = useState("");
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [refersh, setRefersh] = useState(false);
  const [closeModal, setCloseModal] = useState(false);

  // Function to format the date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // ✅ Create Note
  const handleNoteSubmit = async () => {
    try {
      const request = await post(
        "/notes/create",
        { title },
        { withCredentials: true }
      );
      const response = request.data;
      if (response.success) {
        toast.success(response.message);
        setRefersh(!refersh);
        setTitle(""); // clear input
        setCloseModal(true);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      }
      console.log(error);
    }
  };

  // ✅ Update Note
  const handeleUpdate = async () => {
    try {
      const request = await put(
        `/notes/update/${modalId}`,
        { title: updatetitle },
        { withCredentials: true }
      );
      const response = request.data;
      if (response.success) {
        toast.success(response.message);
        setRefersh(!refersh);
        setUpdatetitle("");
        setCloseModal(true);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      }
      console.log(error);
    }
  };

  // ✅ Delete Note
  const handelNotesDelete = async () => {
    try {
      const request = await delet(`/notes/delete/${modalId}`, {
        withCredentials: true,
      });
      const response = request.data;
      if (response.success) {
        toast.success(response.message);
        setRefersh(!refersh);
        setCloseModal(true);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      }
      console.log(error);
    }
  };

  // ✅ Fetch Notes
  useEffect(() => {
    const GetNotes = async () => {
      try {
        const request = await get("/notes/getnotes", { withCredentials: true });
        const response = request.data;

        if (response.success) {
          setNotes(response.Notes);
        } else {
          setNotes([]);
        }
      } catch (error) {
        console.log(error);
        setNotes([]);
      }
    };
    GetNotes();
  }, [refersh]);

  return (
    <>
      {/* ✅ Create Note Modal */}
      <Modal
        Modaltitle={"Write Notes"}
        value={title}
        handleChange={(e) => setTitle(e.target.value)}
        handleNoteSubmit={handleNoteSubmit}
        HandleClose={closeModal}
      />

      {/* ✅ Update Note Modal */}
      <EidtModal
        Modaltitle={"Update Notes"}
        handleChange={(e) => setUpdatetitle(e.target.value)}
        handleNoteSubmit={handeleUpdate}
        value={updatetitle}
      />

      {/* ✅ Delete Note Modal */}
      <DeleteModal handelNotesDelete={handelNotesDelete} />

      <div className="row">
        <div className="col-lg-10 col-md-10">
          <Navbar />

          {/* ✅ Add Note Button */}
          <div className="d-flex justify-content-start mx-5 mt-4">
            <div
              className="rounded-circle d-flex justify-content-center align-items-center"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal" // must match Modal id
              style={{
                backgroundColor: "black",
                width: "50px",
                height: "50px",
                cursor: "pointer",
              }}
            >
              <FaPlus size={24} color="white" />
            </div>
          </div>

          {/* ✅ No Notes Found */}
          {notes.length === 0 && (
            <div className="mt-5 justify-content-center d-flex align-items-center flex-column">
              <h1 className="fs-1 fw-bold mb-3">No Notes Found</h1>
            </div>
          )}

          {/* ✅ Notes List */}
          <div className="mt-4 mx-5 row">
            {notes &&
              notes.map((elem, index) => (
                <div className="col-lg-4 col-md-4 mb-5" key={index}>
                  <Notes
                    title={elem.title}
                    date={formatDate(elem.updatedAt)}
                    handleUpdate={() => setModalId(elem._id)}
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
