interface Blog {
	_id: string,
    title: string,
	author: string,
	url: string,
	likes: number,
	__v: number
}

function dummy(blogs: Blog[]): number {
	return 1
}

function totalLikes(blogs: Blog[]): number {
	return blogs.map(b => b.likes).reduce((a, b) => a + b, 0)
}

export {
	dummy,
	Blog,
	totalLikes
}