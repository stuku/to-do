import { getObserver } from "@utils/response";
import { Request, Response } from "express";
import { ToDoService } from "@services/to-do.service";

interface IToDoController {
    getAll(_req: Request, res: Response): Promise<void>;
    addOne(_req: Request, res: Response): Promise<void>;
    updateOne(_req: Request, res: Response): Promise<void>;
    deleteOne(_req: Request, res: Response): Promise<void>;
}

const _toDoService: ToDoService = new ToDoService();

export class ToDoController implements IToDoController {
    /**
     * #swagger.tags = ['To-Do']
     * #swagger.description = Get to-do list with filter, sort, and pagination
     * #swagger.parameters['title'] = {
     *          in: 'query',
     *          type: 'string'
     *   }
     * #swagger.parameters['description'] = {
     *          in: 'query',
     *          type: 'string'
     *   }
     * #swagger.parameters['status'] = {
     *          in: 'query',
     *          description: '0: TO_DO, 1: DOING, 2: DONE, 99: PENDING',
     *          type: 'number'
     *   }
     * #swagger.parameters['pageSize'] = {
     *          in: 'query',
     *          description: 'default: 10',
     *          type: 'number'
     *   }
     * #swagger.parameters['page'] = {
     *          in: 'query',
     *          description: 'default: 0, min: 10',
     *          type: 'number'
     *   }
     * #swagger.responses[200] = { 
     *          description: 'Get to-dos successfully',
     *   }
     */
    public async getAll(_req: Request, res: Response): Promise<void> {
        (await _toDoService.getAll(_req?.query)).subscribe(getObserver(res));
    }

    /**
     * #swagger.tags = ['To-Do']
     * #swagger.description = Create a to-do item
     * #swagger.parameters['to-do'] = {
     *          in: 'body',
     *          required: true,
     *          schema: { $ref: "#/definitions/ToDoParams" }
     *   }
     */
    public async addOne(_req: Request, res: Response): Promise<void> {
        (await _toDoService.addOne(_req?.body)).subscribe(getObserver(res));
    }

    /**
     * #swagger.tags = ['To-Do']
     * #swagger.description = Update a to-do item
     * #swagger.parameters['_id'] = {
     *          in: 'path',
     *          type: 'string',
     *          required: true,
     *   }
     * #swagger.parameters['to-do'] = {
     *          in: 'body',
     *          required: true,
     *          schema: { $ref: "#/definitions/ToDoParams" }
     *   }
     */
    public async updateOne(_req: Request, res: Response): Promise<void> {
        (await _toDoService.updateOne(_req?.body?._id, _req?.body)).subscribe(getObserver(res));
    }

    /**
     * #swagger.tags = ['To-Do']
     * #swagger.description = Delete a to-do item
     * #swagger.parameters['_id'] = {
     *          in: 'path',
     *          type: 'string'
     *          required: true,
     *   }
     */
    public async deleteOne(_req: Request, res: Response): Promise<void> {
        (await _toDoService.deleteOne(_req?.params?.id)).subscribe(getObserver(res));
    }
}