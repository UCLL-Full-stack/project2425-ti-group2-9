/**
 * @swagger
 * components:
 *   schemas:
 *     Event:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *         name:
 *           type: string
 *           description: The name of the event.
 *         description:
 *           type: string
 *           description: A brief description of the event.
 *         category:
 *           type: string
 *           description: The category of the event.
 *         startDate:
 *           type: string
 *           format: date-time
 *           description: The event start date.
 *         endDate:
 *           type: string
 *           format: date-time
 *           description: The event end date.
 *         organizer:
 *           type: object
 *           $ref: '#/components/schemas/Organizer'
 *         speakers:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Speaker'
 *         participants:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Participant'
 * 
 *     EventInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         category:
 *           type: string
 *         startDate:
 *           type: string
 *           format: date-time
 *         endDate:
 *           type: string
 *           format: date-time
 *         organizer:
 *           type: object
 *           properties:
 *             id:
 *               type: number
 *         speakers:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
 * 
 *     AttendingInput:
 *       type: object
 *       properties:
 *         event:
 *           type: object
 *           properties:
 *             id:
 *               type: number
 *               format: int64
 *         participants:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
 *                 format: int64
 */

import express, { NextFunction, Request, Response } from 'express';
import eventService from '../service/event.service';
import { AttendingInput, EventInput, Role } from '../types';

const eventRouter = express.Router();

/**
 * @swagger
 * /events:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create a new event
 *     description: Create a new event by providing event details.
 *     requestBody:
 *       description: Event object to be created
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EventInput'
 *     responses:
 *       200:
 *         description: Event successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       400:
 *         description: Error creating event
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
eventRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const request = req as Request & { auth: { username: string; role: Role } };
        const { username, role } = request.auth;
        const eventInput = <EventInput>req.body;
        const result = await eventService.createEvent(eventInput, { username, role });
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /events:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get all events
 *     description: Retrieve a list of all events.
 *     responses:
 *       200:
 *         description: List of events retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 *       400:
 *         description: Error retrieving events
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
eventRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const request = req as Request & { auth: { username: string; role: Role } };
        const { username, role } = request.auth;
        const events = await eventService.getAllEvents({username, role});
        res.status(200).json(events);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /events/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get event by ID
 *     description: Retrieve a specific event by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the event.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Event found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       400:
 *         description: Error retrieving event
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
eventRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const event = await eventService.getEventById(id);
        res.status(200).json(event);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /events/category/{category}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get events by category
 *     description: Retrieve events based on category.
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         description: The category of events to filter by.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Events found
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 *       400:
 *         description: Error retrieving events
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
eventRouter.get('/category/:category', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const category = req.params.category;
        const events = await eventService.getEventsByCategory(category);
        res.status(200).json(events);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /events/name/{name}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get event by name
 *     description: Retrieve events based on name.
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         description: The name of events to filter by.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Events found
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 *       400:
 *         description: Error retrieving events
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
eventRouter.get('/name/:name', async(req: Request, res: Response, next: NextFunction) => {
    try {
        const eventName = req.params.name;
        const event = await eventService.getEventByName(eventName);
        res.status(200).json(event)
    } catch (error) {
        next(error);
    }
})

/**
 * @swagger
 * /events/attending:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Enroll attendee to an event
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AttendingInput'
 *     responses:
 *       200:
 *         description: The event with all attendees enrolled.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       400:
 *         description: Error enrolling attendee
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
eventRouter.post('/attending',async (req: Request, res: Response, next: NextFunction) => {
      try {
        const request = req as Request & { auth: { username: string; role: Role } };
        const { username, role } = request.auth;
        const { event }: { event: EventInput } = req.body;
        const result = await eventService.addParticipantToEvent({event, username, role,});
        res.status(200).json(result);
      } catch (error) {
        next(error);
      }
    }
  );
  
  
/**
 * @swagger
 * /events/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Delete event by ID
 *     description: Delete a specific event by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the event to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Event deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       401:
 *         description: Unauthorized (Non-organizer)
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
eventRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction)=>{
    try {
        const request = req as Request & { auth: { username: string; role: Role } };
        const { username, role } = request.auth;
        const id = parseInt(req.params.id);
        const event = await eventService.deleteEvent({id, username, role});
        res.status(200).json(event);
    } catch (error) {
        next(error);
    }
    
})
/**
 * @swagger
 * /events/update/{id}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Update event name by ID
 *     description: Update the name of a specific event by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the event to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The new name of the event.
 *     responses:
 *       200:
 *         description: Event name updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       400:
 *         description: Invalid event ID or name
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 errorMessage:
 *                   type: string
 *       401:
 *         description: Unauthorized (Non-organizer or Non-admin)
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

eventRouter.put('/update/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const request = req as Request & { auth: { username: string; role: Role } };
        const { username, role } = request.auth;
        const id = parseInt(req.params.id);
        console.log('Request body:', req.body);
        const { name }: { name: string } = req.body;
        console.log({id, name, username, role});
        const updatedEvent = await eventService.updateEvent({id, name, username, role});
        res.status(200).json(updatedEvent);
    } catch (error) {
        next(error);
    }
});


export { eventRouter };
