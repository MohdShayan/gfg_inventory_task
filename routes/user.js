import express from 'express';
import { handleUserLogin, handleUserSignup, handleUserLogout } from '../controller/user.js';
import { checkForAuthCookie } from '../middleware/auth.js';
import USER from '../schema/user.js';
const router = express.Router();


router.get("/me", checkForAuthCookie("gfgauthToken2"), async (req, res) => {

    try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(401).json({ success: false, error: "Unauthorized" });
    }

    const user = await USER.findById(req.user._id).select("name email role");
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, error: "Server error" });
  }
});

router.post('/signup', handleUserSignup);
router.post('/login', handleUserLogin);
router.post('/logout', handleUserLogout);



export default router;