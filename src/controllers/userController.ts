import { Request, Response, NextFunction } from "express";

interface User {
  id: number;
  name: string;
  email: string;
}

let users: User[] = [];

let nextId = 1;

// CREATE USER
export const createUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      throw new Error("Name and email are required");
    }

    const user: User = {
      id: nextId++,
      name,
      email,
    };

    users.push(user);

    res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};

// GET ALL USERS
export const getUsers = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(200).json({
      totalUsers: users.length,
      users,
    });
  } catch (error) {
    next(error);
  }
};

// GET SINGLE USER
export const getUserById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);

    const user = users.find((user) => user.id === id);

    if (!user) {
      res.status(404).json({
        message: "User not found",
      });

      return;
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// UPDATE USER
export const updateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);

    const user = users.find((user) => user.id === id);

    if (!user) {
      res.status(404).json({
        message: "User not found",
      });

      return;
    }

    const { name, email } = req.body;

    if (name) user.name = name;
    if (email) user.email = email;

    res.status(200).json({
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE USER
export const deleteUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);

    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      res.status(404).json({
        message: "User not found",
      });

      return;
    }

    const deletedUser = users.splice(userIndex, 1);

    res.status(200).json({
      message: "User deleted successfully",
      user: deletedUser[0],
    });
  } catch (error) {
    next(error);
  }
};