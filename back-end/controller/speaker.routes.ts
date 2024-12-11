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

import express, { NextFunction, Request, Response } from 'express';
import speakerService from '../service/speaker.service';
import { Role } from '../types';

const speakerRouter = express.Router();

/**
 * @swagger
 * /speakers:
 *   get:
 *     security:
 *       - bearerAuth: []
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
speakerRouter.get('/', async(req: Request, res: Response, next: NextFunction) => {
    try {
        const request = req as Request & { auth: { username: string; role: Role } };
        const { username, role } = request.auth;
        const speakers = await speakerService.getAllSpeakers({username, role});
        res.status(200).json(speakers);
    } catch (error) {
        next(error);
    }
});

export { speakerRouter };
