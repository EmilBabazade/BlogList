interface Blog {
    title: string,
	author: string,
	url: string,
	likes: number
}

function dummy(blogs: Blog[]): number {
	return 1
}

export {
	dummy,
	Blog
}