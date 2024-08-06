import { UserModel } from "../models/user_model.js";



// Follow User
export const followUser = async (req, res) => {
    try {
        const userId = req?.user?.id;
        const followerId = req.params.followerId;

        if (userId === followerId) {
            return res.status(400).send("You cannot follow yourself");
        }

        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).send("User not found");
        }

        const follower = await UserModel.findById(followerId);
        if (!follower) {
            return res.status(404).send("Follower not found");
        }

        const isAlreadyFollowing = user.following.includes(followerId);
        if (isAlreadyFollowing) {
            return res.status(400).send("You are already following this user");
        }

        user.following.push(followerId);
        follower.followers.push(userId);

        await user.save();
        await follower.save();

        res.status(200).json({ message: "User followed successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
};


// Unfollow User
export const unfollowUser = async (req, res) => {
    try {
        const userId = req?.user?.id;
        const followerId = req.params.followerId;

        if (userId === followerId) {
            return res.status(400).send("You cannot unfollow yourself");
        }

        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).send("User not found");
        }

        const follower = await UserModel.findById(followerId);
        if (!follower) {
            return res.status(404).send("Follower not found");
        }

        const isFollowing = user.following.includes(followerId);
        if (!isFollowing) {
            return res.status(400).send("You are not following this user");
        }

        user.following = user.following.filter((id) => id !== followerId);
        follower.followers = follower.followers.filter((id) => id !== userId);

        await user.save();
        await follower.save();

        res.status(200).json({ message: "User unfollowed successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
};


// Get Followers
export const getFollowers = async (req, res) => {
    try {
        const userId = req?.user?.id;

        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).send("User not found");
        }

        const followers = await UserModel.find({ _id: { $in: user.followers } });
        res.status(200).json(followers);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
};



// Get following
export const getFollowing = async (req, res) => {
    try {
        const userId = req?.user?.id;

        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).send("User not found");
        }

        const following = await UserModel.find({ _id: { $in: user.following } });
        res.status(200).json(following);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
};

