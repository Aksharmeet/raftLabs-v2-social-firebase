 export interface Posts {
   comments: { uid: string, comment: string }[],
		coomentsCount: number,
		likes: string[],
		likesCount: number,
		postImage: string,
		description: string,
}