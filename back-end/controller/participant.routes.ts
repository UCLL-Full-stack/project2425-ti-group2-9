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
import { parse } from 'path';

const participantRouter = express.Router();
/**
 * @swagger
 * /participants:
 *   get:
 *     security:
 *         - bearerAuth: []
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
participantRouter.get('/', async(req: Request, res: Response) => {
    try {
        const participants = await participantService.getAllParticipants();
        res.status(200).json(participants);
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
 * /participants/{username}:
 *   get:
 *     security:
 *         - bearerAuth: []
 *     summary: Get a participant by username
 *     description: Retrieve a participant by their username
 *     parameters:
 *       - name: username
 *         in: path
 *         required: true
 *         description: Username of the participant
 *         schema:
 *           type: string
 *           example: john_doe
 *     responses:
 *       200:
 *         description: Participant retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Participant'
 *       404:
 *         description: Participant not found
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
participantRouter.get('/:username', async (req: Request, res: Response) => {
    try {
        const username = (req.params.username); 
        const participant = await participantService.getParticipantByUserName({username});

        if (!participant) {
            return res.status(404).json({
                status: 'error',
                errorMessage: `Participant with username ${username} not found`,
            });
        }

        res.status(200).json(participant);
    } catch (error: unknown) {
        let errorMessage = "Unknown error";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        res.status(400).json({ status: 'error', errorMessage });
    }
});



export { participantRouter };
