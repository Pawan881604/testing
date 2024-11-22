import { NextFunction, Request, Response } from "express";
import AsyncHandler from "../../../middlewares/AsyncHandler";
import CategorieService from "../../../services/karnalwebtech/post-caregorie-service";
import ErrorHandler from "../../../utils/ErrorHandler";

class CategorieController {
  constructor(private categorieService: CategorieService) {}

  // Create category with error handling and cleaner response
  create = AsyncHandler.handle(
    async (req: Request, res: Response, next: NextFunction) => {
      const userId = (req as any).user?._id; // Use the correct type for the request user
      const files = req.files;
      const is_existing_url: any = await this.categorieService.findByUrl(
        req.body.metaCanonicalUrl
      );

      if (is_existing_url) {
        return next(new ErrorHandler("Url is exist try another one", 404)); // Changed status to 401
      }
      // Validate if user is authenticated
      if (!userId) {
        return next(new ErrorHandler("User is not authenticated", 401)); // Changed status to 401
      }
      const result = await this.categorieService.create(
        req.body,
        files,
        userId,
        next
      );
      if (result) {
        return res.status(201).json({
          success: true,
          message: "Category created successfully", // Added message for better clarity
        });
      }

      // Handle case where creation failed or result is not returned
      return next(new ErrorHandler("Failed to create category", 500));
    }
  );
  all = AsyncHandler.handle(
    async (req: Request, res: Response, next: NextFunction) => {
      const query = req.query;
      const resultPerpage = Number(query.rowsPerPage);
      const result = await this.categorieService.all(query);

      const data_counter = await this.categorieService.data_counter(query);
      if (result) {
        return res.status(201).json({
          success: true,
          result,
          resultPerpage,
          data_counter,
        });
      }
    }
  );
  get_single_data = AsyncHandler.handle(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      if (!id) {
        return next(new ErrorHandler("ID parameter is required.", 400));
      }
      const result = await this.categorieService.findBYpageid(id, next);
      if (result) {
        return res.status(201).json({
          success: true,
          result,
        });
      }
    }
  );
}

export default CategorieController;