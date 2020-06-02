
import { Request, Response } from 'express';
import knex from '../database/connection';

export default class ItemsController {
    async index(request: Request, response: Response) {
        const items = await knex('items').select('*');

        // Processo para transformar os dados para um formato desejável chama-se serialized
        const serializedItems = items.map(item => {
            return {
                id: item.id,
                name: item.title,
                image_url: `http://localhost:3333/uploads/${item.image}`
            }
        })

        return response.json(serializedItems);
    }

    async create(request: Request, response: Response) {
        const {
            //image,
            title
        } = request.body;

        const item = {
            image: 'https://media-cdn.tripadvisor.com/media/photo-s/0d/95/19/fe/photo0jpg.jpg',
            title
        };

        const verifyItem = await knex('items').where('title', title).first()
        if (verifyItem)
            return response.json({
                message: "Item já criado"
            })

        await knex('items').insert(item);

        return response.json({
            title
        })
    }

    async update(request: Request, response: Response) {
        const { id } = request.params;
        const data = request.body;

        await knex('items')
            .where('id', String(id))
            .update(data);

        return response.json({
            data
        });
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        await knex('items')
            .where('id', String(id))
            .delete()

        return response.json({ 
            message: "Item deletado"
        });
    }
}