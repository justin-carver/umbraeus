// ! This HAS to match the appropriate schema model! From UmbraVault!
/**
 * Also (string != String)! One is Mongoose type, other is TypeScript type.
 * Consort UmbraVault for more information on verifying type data.
 *
 * https://github.com/justin-carver/umbravault/blob/main/models/wallpaperModel.js
 */

// TODO: At some point this will include download counts, views, ratings, etc.

export interface wallpaper {
	src: string;
	alt: string;
	author: string;
	title: string;
	views: number;
	likes: number;
	downloads: number;
	resolution: {
		width: number;
		height: number;
	};
	softDelete: boolean;
}
