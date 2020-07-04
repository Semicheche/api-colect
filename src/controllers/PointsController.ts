import {Request, Response} from 'express';
import knex from '../database/connection';

class PointsController {
    async index(request: Request, response: Response){
        const {city, uf, items} = request.query
        let points = null;
        let parsedItems = null;

        if (items){
            parsedItems = String(items).split(',').map(item => Number(item.trim()));
        }
        if (!city && !uf && !parsedItems){
            points = await knex('points').join('points_items', 'points.id', '=', 'points_items.id_points')
                .distinct()
                .select('points.*')
        }else{
            points = await knex('points').join('points_items', 'points.id', '=', 'points_items.id_points')
                .whereIn('points_items.id_items', parsedItems)
                .where('city', String(city))
                .where('uf', String(uf))
                .distinct()
                .select('points.*')
        }
        return response.json(points ? points : {message: "Points not Found!"})
    }
    async show(request: Request, response: Response){
        const { id } = request.params

        const point = await knex('points').where('id', id).first();

        const items = await knex('items')
            .join('points_items', 'items.id', '=', 'points_items.id_items')
            .where('points_items.id_points', id).select('items.title')

        if (!point){
            return response.status(400).json({message: "Point not Found!"})
        }

        return response.json({ point, items })
    }
    async create(request: Request, response: Response) {

        const {
            image,
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items,
        } = request.body;
        const trx = await knex.transaction();

        const point = {
            image: "https://www.kindpng.com/picc/b/235/2350524.png",
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
        }

        const insertedIds = await trx.insert(point).into('points').returning('id')

        const id_points = insertedIds[0]

        const pointsItems = items.map((id_items: number) =>{
            return {
                id_items,
                id_points,
            }
        })

        await trx.insert(pointsItems).into('points_items')

        trx.commit()
        return response.json({id: id_points, ...point})
    }
}

export default PointsController;