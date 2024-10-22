/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *         username:
 *           type: string
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *         role:
 *           type: string
 *           enum: ['admin', 'organizer', 'speaker', 'participant']
 * 
 *     UserInput:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: The username of the user.
 *         firstName:
 *           type: string
 *           description: The first name of the user.
 *         lastName:
 *           type: string
 *           description: The last name of the user.
 *         email:
 *           type: string
 *           description: The email of the user.
 *         password:
 *           type: string
 *           description: The password of the user.
 *         role:
 *           type: string
 *           enum: ['admin', 'organizer', 'speaker', 'participant']
 *           description: The role of the user.
 */

import express, { Request, Response } from 'express';
import userService from '../service/user.service';
import { UserInput } from '../types';

const userRouter = express.Router();


/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     description: This endpoint allows you to create a new user by providing user details.
 *     requestBody:
 *       description: User object that needs to be created
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       200:
 *         description: User successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Error creating user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 errorMessage:
 *                   type: string
 */
userRouter.post('/', (req: Request, res: Response) => {
    try {
        const userInput: UserInput = req.body;
        const result = userService.createUser(userInput);
        res.status(200).json(result);
    } catch (error: unknown) {
        let errorMessage = "Unknown error";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        res.status(400).json({ status: 'error', errorMessage });
    }
});

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users
 *     responses:
 *       200:
 *         description: List of users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       400:
 *         description: Error retrieving users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 errorMessage:
 *                   type: string
 */
userRouter.get('/', (req: Request, res: Response) => {
    try {
        const users = userService.getAllUsers();
        res.status(200).json(users);
    } catch (error: unknown) {
        let errorMessage = "Unknown error";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        res.status(400).json({ status: 'error', errorMessage });
    }
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     description: Retrieve a user by their ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 errorMessage:
 *                   type: string
 */
userRouter.get('/:id', (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);
    try {
        const user = userService.getUserById(userId);
        res.status(200).json(user);
    } catch (error: unknown) {
        let errorMessage = "Unknown error";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        res.status(404).json({ status: 'error', errorMessage });
    }
});

/**
 * @swagger
 * /users/email/{email}:
 *   get:
 *     summary: Get user by email
 *     description: Retrieve a user by their email
 *     parameters:
 *       - name: email
 *         in: path
 *         required: true
 *         description: The email of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 errorMessage:
 *                   type: string
 */
userRouter.get('/email/:email', (req: Request, res: Response) => {
    const email = req.body;
    try {
        const user = userService.getUserByEmail(email);
        res.status(200).json(user);
    } catch (error: unknown) {
        let errorMessage = "Unknown error";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        res.status(404).json({ status: 'error', errorMessage });
    }
});

export { userRouter };
