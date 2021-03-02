import * as listHelper from '../utils/list_helper'

test('dummy returns one', () => {
	const blogs: listHelper.Blog[] = []
    
	const result = listHelper.dummy(blogs)
	expect(result).toBe(1)
})