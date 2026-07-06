import { z } from 'zod';
import { MAX_FILE_SIZE, ACCEPTED_PDF_TYPES, ACCEPTED_IMAGE_TYPES, MAX_IMAGE_SIZE } from './constants';

export const UploadSchema = z.object({
    title: z.string().min(1, "Le titre est requis").max(100, "Le titre est trop long"),
    author: z.string().min(1, "Le nom de l'auteur est requis").max(100, "Le nom de l'auteur est trop long"),
    persona: z.string().min(1, "Veuillez sélectionner une voix"),
    pdfFile: z.instanceof(File, { message: "Le fichier PDF est requis" })
        .refine((file) => file.size <= MAX_FILE_SIZE, "La taille du fichier doit être inférieure à 50 Mo")
        .refine((file) => ACCEPTED_PDF_TYPES.includes(file.type), "Seuls les fichiers PDF sont acceptés"),
    coverImage: z.instanceof(File).optional()
        .refine((file) => !file || file.size <= MAX_IMAGE_SIZE, "La taille de l'image doit être inférieure à 10 Mo")
        .refine((file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type), "Seuls les formats .jpg, .jpeg, .png et .webp sont supportés"),
});
