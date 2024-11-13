/**
 * @swagger
 * components:
 *   schemas:
 *     Organizer:
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
 *         companyName:
 *           type: string
 *           description: The organizer's company name.
 * 
 *     OrganizerInput:
 *       type: object
 *       properties:
 *         user:
 *           type: object
 *           properties:
 *             id:
 *               type: number
 *               format: int64
 *         companyName:
 *           type: string
 *           description: The organizer's company name.
 */
import express, { Request, Response } from 'express';
import organizerService from '../service/organizer.service';
import { OrganizerInput } from '../types';

const organizerRouter = express.Router();

/**
 * @swagger
 * /organizers:
 *   post:
 *     summary: Create a new organizer
 *     description: This endpoint allows you to create a new organizer by providing user details and company name.
 *     requestBody:
 *       description: Organizer object that needs to be created
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
 *               companyName:
 *                 type: string
 *                 description: The organizer's company name.
 *                 example: "Tech Corp"
 *     responses:
 *       200:
 *         description: Organizer successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Organizer'
 *       400:
 *         description: Error creating organizer
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
// organizerRouter.post('/', (req: Request, res: Response) => {
//     try {
//         const organizer = <OrganizerInput>req.body;
//         const result = organizerService.createOrganizer(organizer);
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
 * /organizers:
 *   get:
 *     summary: Get all organizers
 *     description: Retrieve a list of all organizers
 *     responses:
 *       200:
 *         description: List of organizers retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Organizer'
 *       400:
 *         description: Error retrieving organizers
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
organizerRouter.get('/', async (req: Request, res: Response) => {
    try {
        const organizers = await organizerService.getAllOrganizers();
        res.status(200).json(organizers);
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
 * /organizers/{id}:
 *   get:
 *     summary: Get an organizer by ID
 *     description: Retrieve an organizer by their ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the organizer
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Organizer retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Organizer'
 *       404:
 *         description: Organizer not found
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
organizerRouter.get('/:id', async(req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        const organizer = await organizerService.getOrganizerById(id);
        res.status(200).json(organizer);
    } catch (error: unknown) {
        let errorMessage = "Unknown error";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        res.status(404).json({ status: 'error', errorMessage });
    }
});

export { organizerRouter };
