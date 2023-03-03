import mongoose from 'mongoose';
import Wallpaper from '@/models/wallpaperModel';
import { NextApiRequest, NextApiResponse } from 'next';

let cachedDb: any = null;

const connectToDatabase = async () => {
	if (cachedDb) {
		return cachedDb;
	}

	const db = mongoose.connect(process.env.MONGO_URI as string);
	cachedDb = db;

	return db;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const db = await connectToDatabase();
	} catch (e) {
		console.log(`Cannot connect to database!\n${e}`);
	}

	const page = Number(req.query.page) || 1;
	const perPage = 16;
	const startIndex = (page - 1) * perPage;

	try {
		const totalDocuments = await Wallpaper.countDocuments();
		const totalPages = Math.ceil(totalDocuments / perPage);

		if (page > totalPages) {
			// Return empty response for invalid page number
			return res.status(200).json({ documents: [], totalPages });
		}

		const documents = await Wallpaper.find()
			.skip(startIndex)
			.limit(perPage)
			.sort({ _id: -1 }) // newest first
			.exec();

		return res.status(200).json({ documents, totalPages });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Something went wrong.' });
	}
};

export default handler;
