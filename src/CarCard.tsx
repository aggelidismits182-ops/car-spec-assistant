import type { CarSuggestion } from "./types";

interface CarCardProps {
  car: CarSuggestion;
  isFavorite: boolean;
  onToggleFavorite: (car: CarSuggestion) => void;
}

function formatPrice(value: number): string {
  return new Intl.NumberFormat("el-GR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}
function carImageUrl(make: string, model: string): string {
  return `https://cdn.imagin.studio/getImage?customer=hrjavascript-mastery&make=${encodeURIComponent(
    make
  )}&modelFamily=${encodeURIComponent(model.split(" ")[0])}&zoomType=fullscreen`;
}
function carGrSearchUrl(make: string, model: string): string {
  const query = encodeURIComponent(`${make} ${model.split(" ")[0]}`);
  return `https://www.car.gr/classifieds/cars/?q=${query}`;
}


export default function CarCard({ car, isFavorite, onToggleFavorite }: CarCardProps) {
  return (
    <a
    href={carGrSearchUrl(car.make, car.model)}
      target="_blank"
      rel="noopener noreferrer"
      className="car-card__link"
    >
    <article className="car-card">
      <div className="car-card__image-wrap">
        <img
  src={carImageUrl(car.make, car.model)}
  alt={`${car.make} ${car.model}`}
  className="car-card__image"
  loading="lazy"
  onError={(e) => {
    const img = e.target as HTMLImageElement;
    if (img.src !== car.imageUrl) {
      img.src = car.imageUrl;
    }
  }}
/>

<button
  type="button"
  className={`car-card__fav ${isFavorite ? "is-active" : ""}`}
  onClick={(e) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite(car);
  }}
  aria-label={isFavorite ? "Αφαίρεση από αγαπημένα" : "Προσθήκη στα αγαπημένα"}
>
  {isFavorite ? "❤️" : "🤍"}
</button>
        <span className="car-card__price">{formatPrice(car.priceEUR)}</span>
      </div>

      <div className="car-card__body">
        <h3 className="car-card__title">
          {car.make} {car.model}
          <span className="car-card__year"> · {car.year}</span>
        </h3>

        <ul className="car-card__specs">
          <li>
            <span className="spec-label">Τύπος</span>
            <span className="spec-value">{car.bodyType}</span>
          </li>
          <li>
            <span className="spec-label">Ισχύς</span>
            <span className="spec-value">{car.horsepower} hp</span>
          </li>
          <li>
            <span className="spec-label">0-100</span>
            <span className="spec-value">{car.zeroToHundredSec}s</span>
          </li>
        </ul>

        <p className="car-card__reason">{car.reason}</p>
      </div>
    </article>
    </a>
  );
}
