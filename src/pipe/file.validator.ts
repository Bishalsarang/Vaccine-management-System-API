import {
  ParseFilePipeBuilder,
  UnprocessableEntityException,
} from '@nestjs/common';

const MAX_SIZE_MB = 2 * 1024 * 1024;

export const FileValidatorPipe = new ParseFilePipeBuilder()
  .addFileTypeValidator({
    fileType: 'image/*',
  })
  .addMaxSizeValidator({
    maxSize: MAX_SIZE_MB,
  })
  .build({
    fileIsRequired: false,
    exceptionFactory() {
      throw new UnprocessableEntityException(
        'Invalid file type or size. Make sure the type is image and size is 1Mb',
      );
    },
  });
