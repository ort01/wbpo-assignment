export default interface Note {
    title: string,
    text: string,
    isFinished: boolean,
    id: number,
    order?: number
}