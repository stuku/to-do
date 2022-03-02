import ENDPOINT from "@config/apis/endpoint";
import { Request, Response } from "express";
import router from "@routes/index";
import { StatusCodes } from "http-status-codes";
import ToDo, { IToDo } from "@models/ToDo";

// Get all
router.get(ENDPOINT.TO_DO, (_req: Request, res: Response): void => {
    ToDo.find().limit(10).then((toDos: IToDo[]): void => {
        res.status(StatusCodes.OK).json({
            code: StatusCodes.OK,
            message: "success",
            data: toDos
        });
    }).catch((err: Error) => {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            code: StatusCodes.INTERNAL_SERVER_ERROR,
            message: err.message,
        });
    });
});

// Get one
router.get(`${ENDPOINT.TO_DO}/:id`, (_req: Request, res: Response): void => {
    ToDo.findById({ _id: _req?.params?.id }, (err: Error, toDo: IToDo): void => {
        if (!!err) {
            res.status(StatusCodes.NOT_FOUND).json({
                code: StatusCodes.NOT_FOUND,
                message: err.message
            });
        } else {
            res.status(StatusCodes.OK).json({
                code: StatusCodes.OK,
                message: "success",
                data: toDo
            });
        }
    });
});

// Add
router.post(ENDPOINT.TO_DO, (_req: Request, res: Response): void => {
    ToDo.create(_req.body, (err: Error, toDo: IToDo): void => {
        if (!!err) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                code: StatusCodes.INTERNAL_SERVER_ERROR,
                message: err.message,
            });
        }
        res.status(StatusCodes.OK).json({
            code: StatusCodes.OK,
            message: "success",
            data: toDo
        });
    });
});

// Update
router.put(`${ENDPOINT.TO_DO}/:id`, (_req: Request, res: Response): void => {
    ToDo.findByIdAndUpdate(_req?.params?.id, {
        $set: _req.body
    }, (err: Error, toDo: IToDo): void => {
        if (!!err) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                code: StatusCodes.INTERNAL_SERVER_ERROR,
                message: err.message,
            });
        }
        res.status(StatusCodes.OK).json({
            code: StatusCodes.OK,
            message: "success",
            data: toDo
        });
    });
});

// Delete
router.delete(`${ENDPOINT.TO_DO}/:id`, (_req: Request, res: Response): void => {
    ToDo.findByIdAndRemove(_req?.params?.id, (err: Error, toDo: IToDo): void => {
        if (!!err) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                code: StatusCodes.INTERNAL_SERVER_ERROR,
                message: err.message,
            });
        }
        res.status(StatusCodes.OK).json({
            code: StatusCodes.OK,
            message: "success",
            data: toDo
        });
    });
});