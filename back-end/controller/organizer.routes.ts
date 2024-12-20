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
import express, { Request, Response, NextFunction } from 'express';
import organizerService from '../service/organizer.service';
import {Role } from '../types';

const organizerRouter = express.Router();

/**
 * @swagger
 * /organizers:
 *   get:
 *     security:
 *       - bearerAuth: []
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
organizerRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const request = req as Request & { auth: { username: string; role: Role } };
        const { username, role } = request.auth;
        const organizers = await organizerService.getAllOrganizers({ username, role });
        res.status(200).json(organizers);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /organizers/{id}:
 *   get:
 *     security:
 *         - bearerAuth: []
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
organizerRouter.get('/:id', async(req: Request, res: Response, next: NextFunction) => {
    try {
        const request = req as Request & { auth: { username: string; role: Role } };
        const { username, role } = request.auth;
        const id = parseInt(req.params.id);
        const organizer = await organizerService.getOrganizerById({id,username, role} );
        res.status(200).json(organizer);
    } catch (error) {
        next(error);
    }
});

export { organizerRouter };
