import knex from '../database/connection';
import { Request, Response } from 'express';

export default class PointsController {
    async index(request: Request, response: Response) {
        // cidade, uf, items (Query Params)
        const { city, uf, items } = request.query;

        const parsedItems = String(items)
            .split(',')
            .map(item => Number(item.trim()))

        const points = await knex('points')
            .join('point_items', 'points.id', '=', 'point_items.point_id')
            .whereIn('point_items.item_id', parsedItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('points.*');

        return response.json(points);
    }
    async create(request: Request, response: Response) {
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
        } = request.body;

        const trx = await knex.transaction();
        const point = {
            image: 'https://media-cdn.tripadvisor.com/media/photo-s/0d/95/19/fe/photo0jpg.jpg',
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
        };

        const insertedIds = await trx('points').insert(point);

        const point_id = insertedIds[0];

        const point_items = items.map((item_id: Number) => {
            return {
                item_id,
                point_id
            }
        })

        await trx('point_items').insert(point_items);

        await trx.commit();
        return response.json({
            id: point_id,
            ...point  // spread operator
        })
    }
    async show(request: Request, response: Response) {
        const { id } = request.params;

        const point = await knex('points').where('id', id).first();

        if (!point)
            return response.status(400).json({ message: 'Point not found' });

        /**
         * SELECT * FROM items
         *  JOIN point_items ON items.id = point_items.item_id
         * WHERE point_items.point_id = { id }
         */

        const items = await knex('items')
            .join('point_items', 'items.id', '=', 'point_items.item_id')
            .where('point_items.point_id', id)
            .select('items.title');

        return response.json({
            point,
            items
        });
    }
}