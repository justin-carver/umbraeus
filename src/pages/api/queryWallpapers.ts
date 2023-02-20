import type { NextApiRequest, NextApiResponse } from 'next';
import { wallpaper } from '../../types';

// TODO: Request mutliple webpages by ${pageNumber}

type Data = {
	message?: string;
	wallpapers?: wallpaper[];
};

// TODO: Begin to serve wallpapers at various spliced indexes from MongoDB instance.
const queryWallpapers = (startIndex: number, endIndex: number): wallpaper[] => {
	return [];
};

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const { query } = req;
	const page = req.query.page || 1;
	const perPage = 20; // change this to the desired number of images per page
	const startIndex = ((page as number) - 1) * perPage;
	const endIndex = startIndex + perPage;

	const images = queryWallpapers(startIndex, endIndex);

	console.log(query.page);

	if (req.method === 'GET') {
		// Send a response
		res.status(200).json({ wallpapers: queryWallpapers(0, 20) });
	} else {
		res.status(405).json({
			message: 'This HTTP request method is not allowed.',
		});
	}
}
