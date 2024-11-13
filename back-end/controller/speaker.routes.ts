/**
 * @swagger
 * components:
 *   schemas:
 *     Speaker:
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
 *         expertise:
 *           type: string
 *           description: The speaker's area of expertise.
 *         events:
 *           type: array
 *           description: List of events associated with the speaker
 *           items:
 *             $ref: '#/components/schemas/Event'
 * 
 *     SpeakerInput:
 *       type: object
 *       properties:
 *         user:
 *           type: object
 *           properties:
 *             id:
 *               type: number
 *               format: int64
 *         expertise:
 *           type: string
 *           description: The speaker's area of expertise.
 */

import express, { Request, Response } from 'express';
import speakerService from '../service/speaker.service';
import { SpeakerInput } from '../types';

const speakerRouter = express.Router();

/**
 * @swagger
 * /speakers:
 *   post:
 *     summary: Create a new speaker
 *     description: This endpoint allows you to create a new speaker by providing user details and expertise.
 *     requestBody:
 *       description: Speaker object that needs to be created
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
 *               expertise:
 *                 type: string
 *                 description: The speaker's area of expertise.
 *                 example: "Data Science"
 *     responses:
 *       200:
 *         description: Speaker successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Speaker'
 *       400:
 *         description: Error creating speaker
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
// speakerRouter.post('/', (req: Request, res: Response) => {
//     try {
//         const speaker = <SpeakerInput>req.body;
//         const result = speakerService.createSpeaker(speaker);
//         res.status(200).json(result);
//     } catch (error: unknown) {
//         let errorMessage = "Unknown error";
//         if (error instanceof Error) {
//             errorMessage = error.message;
//         }
//         res.status(400).json({ status: 'error', errorMessage });
//     }
// });

/**
 * @swagger
 * /speakers:
 *   get:
 *     summary: Get all speakers
 *     description: Retrieve a list of all speakers
 *     responses:
 *       200:
 *         description: List of speakers retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Speaker'
 *       400:
 *         description: Error retrieving speakers
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
speakerRouter.get('/', async(req: Request, res: Response) => {
    try {
        const speakers = await speakerService.getAllSpeakers();
        res.status(200).json(speakers);
    } catch (error: unknown) {
        let errorMessage = "Unknown error";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        res.status(400).json({ status: 'error', errorMessage });
    }
});

export { speakerRouter };
