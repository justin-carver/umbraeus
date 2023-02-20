import { wallpaper } from '@/types';
import { Schema, model, models } from 'mongoose';

const wallpaperSchema = new Schema<wallpaper>(
	{
		src: String,
		alt: String,
		author: String,
		title: String,
		views: Number,
		resolution: {
			width: Number,
			height: Number,
		},
	},
	{ timestamps: true, validateBeforeSave: true }
);

const Wallpaper = models.Wallpaper || model('Wallpaper', wallpaperSchema);

export default Wallpaper;
