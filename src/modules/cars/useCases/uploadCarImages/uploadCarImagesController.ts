import { Request, Response } from "express";
import { container } from "tsyringe";
import { UploadCarImagesUseCase } from "./uploadCarImagesUseCase";

interface IFiles {
  filename: string;
}

export class UploadCarImagesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id: car_id } = req.params;
    const images = req.files as IFiles[];

    const uploadCarImageUseCase = container.resolve(UploadCarImagesUseCase);

    const fileNames = images.map((file) => file.filename);

    await uploadCarImageUseCase.execute({
      car_id,
      images_names: fileNames,
    });

    return res.status(201).send();
  }
}
