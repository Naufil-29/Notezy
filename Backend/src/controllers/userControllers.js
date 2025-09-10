import User from "../models/user-model.js";

export const getUserProfile = async (req, res) => { 
  try{ 
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
}
  catch(error){ 
    res.staus(500).json({ message: "server error" });
  }
};


export const updateUser = async (req, res) => {
  try {
    const userId = req.user.id; // agar tum JWT se nikal rahe ho
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Agar image upload hui hai
    if (req.file) {
      user.profileImg = "/uploads/" + req.file.filename;
    }

    // Agar description aayi hai
    if (req.body.description) {
      user.description = req.body.description;
    }

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};