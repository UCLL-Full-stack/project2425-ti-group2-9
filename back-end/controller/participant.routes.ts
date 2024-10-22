/**
 * @swagger
 * components:
 *   schemas:
 *     Participant:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *         user:
 *           type: object
 *           properties:
 *             id:
 *               type: number
 *               format: int64
 *             username:
 *               type: string
 *             email:
 *               type: string
 *         dateOfBirth:
 *           type: string
 *           format: date
 *           description: The participant's date of birth.
 *         events:
 *           type: array
 *           description: List of events associated with the participant
 *           items:
 *             $ref: '#/components/schemas/Event'
 * 
 *     ParticipantInput:
 *       type: object
 *       properties:
 *         user:
 *           type: object
 *           properties:
 *             id:
 *               type: number
 *               format: int64
 *         dateOfBirth:
 *           type: string
 *           format: date
 *           description: The participant's date of birth.
 */

import express, { Request, Response } from 'express';
import participantService from '../service/participant.service';
import { ParticipantInput } from '../types';

const participantRouter = express.Router();

/**
 * @swagger
 * /participants:
 *   post:
 *     summary: Create a new participant
 *     description: This endpoint allows you to create a new participant by providing user details and date of birth.
 *     requestBody:
 *       description: Participant object that needs to be created
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                     description: The ID of the user.
 *                     example: 1
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *                 description: The participant's date of birth.
 *                 example: "2004-05-15"
 *     responses:
 *       200:
 *         description: Participant successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Participant'
 *       400:
 *         description: Error creating participant
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
participantRouter.post('/', (req: Request, res: Response) => {
    try {
        const participant = <ParticipantInput>req.body;
        const result = participantService.createParticipant(participant);
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
 * /participants:
 *   get:
 *     summary: Get all participants
 *     description: Retrieve a list of all participants
 *     responses:
 *       200:
 *         description: List of participants retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Participant'
 *       400:
 *         description: Error retrieving participants
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
participantRouter.get('/', (req: Request, res: Response) => {
    try {
        const participants = participantService.getAllParticipants();
        res.status(200).json(participants);
    } catch (error: unknown) {
        let errorMessage = "Unknown error";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        res.status(400).json({ status: 'error', errorMessage });
    }
});

export { participantRouter };
