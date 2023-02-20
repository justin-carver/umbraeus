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

	const page = Number(req.query.page) || 1; // get the page number from query or default to page 1
	const perPage = 6; // number of items to show per page

	const documents = await Wallpaper.find()
		.skip((page - 1) * perPage)
		.limit(perPage);

	res.status(200).json(documents);
};

export default handler;
