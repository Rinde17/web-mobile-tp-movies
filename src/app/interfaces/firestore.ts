export interface IFirestoreMedia {
  id: number;
  title: string;
  isWatched: boolean;
  posterPath: string | null;
  createdAt: Date;
  mediaType: string;
}
