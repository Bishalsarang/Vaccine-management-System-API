import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Readable } from 'stream';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  constructor(private configService: ConfigService) {
    // configure the cloudinary instance
    cloudinary.config({
      cloud_name: this.configService.get('CLOUDINARY_ENV_NAME'),
      api_key: this.configService.get('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get('CLOUDINARY_API_SECRET'),
    });
  }

  /**
   * It takes an image as a string, uploads it to Cloudinary, and returns the image's secure URL
   *
   * @param {string} image - The image to be uploaded.
   * @returns The secure_url of the image.
   */
  uploadImage(file: Express.Multer.File): Promise<any> {
    return new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream((error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
      Readable.from(file.buffer).pipe(upload); // covert buffer to readable stream and pass to upload
    });
  }
}
