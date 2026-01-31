import Sondage from "../models/sondage-model.js";

export const vote = async (req, res) => {
  try {
    const { vote } = req.body;
    const voterId = req.user._id;

    if (!vote) return res.status(400).json({ message: "A vote is required" });

    // check if if user already voted
    const voted = await Sondage.findOne({ voterId });
    if (voted) {
      const updatedVote = await Sondage.findByIdAndUpdate(
        voted._id,
        { vote },
        { new: true },
      );
      await updatedVote.save();
      return res.status(200).json({ message: "Your vote is updated" });
    }

    // vote
    const newVote = await new Sondage({
      voterId,
      vote,
    });

    await newVote.save();

    res.status(201).json(newVote);
  } catch (error) {
    console.log("Error in vote controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getVote = async (req, res) => {
  try {
    const voterId = req.user._id;
    const vote = await Sondage.findOne({ voterId });
    res.status(200).json(vote);
  } catch (error) {
    console.log("Error in getVote controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getResults = async (req, res) => {
  try {
    const groups = await Sondage.aggregate([
      {
        $group: {
          _id: {
            vote: "$vote",
            total: { $sum: 1 },
          },
        },
      },
    ]);
    const votesCount = await Sondage.find().countDocuments();
    const results = groups.map((vote) => {
      return {
        percent: (vote._id.total / votesCount) * 100,
        vote: vote._id.vote,
      };
    });
    res.status(200).json(results);
  } catch (error) {
    console.log("Error in getResults controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getOptions = async (req, res) => {
  try {
    
    res.status(200).json({
      option: [
        "Persona 1",
        "Persona 2",
        "Persona 3 Reload",
        "Persona 4 Golden",
        "Persona 5 Royal"
      ]
    });
  } catch (error) {
    console.log("Error in getOptions controller", error.message);
  }
};
