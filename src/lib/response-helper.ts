// lib/responseHelper.ts
import { NextApiResponse } from 'next';

export const sendSuccessResponse = (
  res: NextApiResponse,
  message: string,
  data: any = null,
  statusCode: number = 200
) => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export const sendErrorResponse = (
  res: NextApiResponse,
  message: string,
  errorCode: string | null = null,
  statusCode: number = 400,
  errors: any = null
) => {
  res.status(statusCode).json({
    success: false,
    message,
    errorCode,
    errors,
  });
};
