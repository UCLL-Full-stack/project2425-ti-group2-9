import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { participantRouter } from './controller/participant.routes';
import { userRouter } from './controller/user.routes';
import { organizerRouter } from './controller/organizer.routes';
import { speakerRouter } from './controller/speaker.routes';
import { eventRouter } from './controller/event.routes';

const app = express();
dotenv.config();
const port = process.env.APP_PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/participants', participantRouter);
app.use('/users', userRouter);
app.use('/organizers', organizerRouter)
app.use('/speakers', speakerRouter);
app.use('/events', eventRouter);

app.get('/status', (req, res) => {
    res.json({ message: 'Back-end is running...' });
});

const swaggerOpts = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Event Managing API',
            version: '1.0.0',
        },
    },
    apis: ['./controller/*.routes.ts'],
};
const swaggerSpec = swaggerJSDoc(swaggerOpts);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
//     console.error(err); 
//     res.status(400).json({
//         status: "application error",
//         message: err.message
//     });
// });

app.listen(port || 3000, () => {
    console.log(`Back-end is running on port ${port}.`);
});
