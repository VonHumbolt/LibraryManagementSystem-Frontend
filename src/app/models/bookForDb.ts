export interface BookForDb{
    id: number,
    userId: number,
    categoryId: number,
    authorId: number,
    publisherId: number,
    bookName: string,
    year: number,
    bookPage: number,
    bookLocation: string,
    isTimeExtended: boolean,
    remainingDay: number,
    rentDate: string,
    returnDate: string
}