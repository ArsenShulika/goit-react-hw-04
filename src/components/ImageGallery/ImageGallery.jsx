import css from './ImageGallery.module.css';
import ImageCard from '../ImageCard/ImageCard';

export default function ImageGallery({ items, openModal }) {
  return (
    <ul className={css.list}>
      {items.map(item => (
        <li key={item.id} onClick={() => openModal(item)}>
          <ImageCard photo={item} />
        </li>
      ))}
    </ul>
  );
}
