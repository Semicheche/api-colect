import express, { Request, Response } from "express"
import PointsController from './controllers/PointsController'
import ItemsController from './controllers/ItemsController'

const routes = express.Router();
const pointsController = new PointsController();
const itemsController = new ItemsController();

routes.post('/points', pointsController.create);
routes.get('/points/', pointsController.index);
routes.get('/points/:id', pointsController.show);
routes.get('/items', itemsController.index);


// routes.get('/points',  async (request, response) => {
//     const points = await knex('points').select('*')

//     return response.json(points)
// })

// routes.get('/points/:id', async (request, response) => {
//     const points =  await knex('points').select('*').where('id',request.params.id)

//     return response.json(points)
// })


export default routes