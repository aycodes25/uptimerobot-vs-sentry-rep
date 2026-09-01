import { Router } from "express";

import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController";

const router = Router();

// CREATE USER
router.post("/", createUser);

// GET ALL USERS
router.get("/", getUsers);

// GET SINGLE USER
router.get("/:id", getUserById);

// UPDATE USER
router.put("/:id", updateUser);

// DELETE USER
router.delete("/:id", deleteUser);

export default router;