export const metaTitle = (title: string) => {
	return `${title} // Tobias Barsnes`;
};

type Metadata = {
	title?: string;
	description?: string;
	image?: string;
};

/**
 * Function that maps title, description and image to metadata object
 */
export const mapMetadata = (metadata: Metadata) => {
	const { title, description, image } = {
		...{
			title: 'Tobias Barsnes',
			description: 'Webdeveloper and esports enthusiast based in Norway.',
			image: '/images/meta.png',
		},
		...metadata,
	};

	return [
		{
			title: title,
		},
		{
			name: 'name',
			content: title,
		},
		{
			name: 'image',
			content: image,
		},
		{
			name: 'description',
			content: description,
		},
		{
			property: 'og:title',
			content: title,
		},
		{
			property: 'og:description',
			content: description,
		},
		{
			property: 'og:image',
			content: image,
		},
		{
			property: 'og:url',
			content: 'https://barsnes.dev',
		},
		{
			property: 'og:type',
			content: 'website',
		},
		{
			name: 'twitter:card',
			content: 'summary_large_image',
		},
		{
			name: 'twitter:title',
			content: title,
		},
		{
			name: 'twitter:description',
			content: description,
		},
		{
			name: 'twitter:image',
			content: image,
		},
	];
};
