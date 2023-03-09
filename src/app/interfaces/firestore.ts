export interface IFirestoreMedia {
  id: number;
  title: string;
  isWatched: boolean;
  posterPath: string;
  createdAt: Date;
  mediaType: string;
}
