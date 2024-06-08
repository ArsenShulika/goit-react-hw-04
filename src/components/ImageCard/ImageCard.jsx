import css from '../ImageCard/ImageCard';

export default function ImageCard({ photo }) {
  return (
    <div className={css.container}>
      <img
        className={css.photo}
        src={photo.urls.small}
        alt={photo.description}
      />
    </div>
  );
}
