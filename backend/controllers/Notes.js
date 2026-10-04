import NotesModel from "../models/Notes.js";

const CreateNotes = async (req, res) => {
  try {
    const userId = req.userId;
    const { title, description } = req.body;

    if (!title || !title.trim()) {
      return res
        .status(400)
        .json({ success: false, message: "Title is required" });
    }

    const newNote = new NotesModel({
      title: title.trim(),
      description: description ? description.trim() : "",
      userId,
    });

    await newNote.save();
    return res.status(201).json({
      success: true,
      message: "Notes created Successfully",
      Notes: newNote,
    });
  } catch (error) {
    console.error("CreateNotes error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const UpdateNotes = async (req, res) => {
  try {
    const userId = req.userId;
    const NotesId = req.params.id;
    const { title, description } = req.body;

    if (!title || !title.trim()) {
      return res
        .status(400)
        .json({ success: false, message: "Title is required" });
    }

    const foundNote = await NotesModel.findById(NotesId);
    if (!foundNote) {
      return res
        .status(404)
        .json({ success: false, message: "Notes not Found" });
    }

    if (userId.toString() !== foundNote.userId.toString()) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized user" });
    }

    const updatedNote = await NotesModel.findByIdAndUpdate(
      NotesId,
      {
        title: title.trim(),
        description: description !== undefined ? description.trim() : foundNote.description,
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Notes Updated Successfully",
      UpdateNotes: updatedNote,
    });
  } catch (error) {
    console.error("UpdateNotes error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const Delete = async (req, res) => {
  try {
    const userId = req.userId;
    const NotesId = req.params.id;
    const foundNote = await NotesModel.findById(NotesId);

    if (!foundNote) {
      return res
        .status(404)
        .json({ success: false, message: "Notes not Found" });
    }

    if (userId.toString() !== foundNote.userId.toString()) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized user" });
    }

    const deletedNote = await NotesModel.findByIdAndDelete(NotesId);

    return res.status(200).json({
      success: true,
      message: "Notes Deleted Successfully",
      Delete: deletedNote,
    });
  } catch (error) {
    console.error("Delete note error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const GetNotes = async (req, res) => {
  try {
    const userId = req.userId;
    const Notes = await NotesModel.find({ userId }).sort({ updatedAt: -1 });

    return res.status(200).json({ success: true, Notes });
  } catch (error) {
    console.error("GetNotes error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export { CreateNotes, UpdateNotes, Delete, GetNotes };