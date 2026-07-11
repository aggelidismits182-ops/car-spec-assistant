import type { CarSuggestion } from "./types";

interface CarCardProps {
  car: CarSuggestion;
}

function formatPrice(value: number): string {
  return new Intl.NumberFormat("el-GR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function CarCard({ car }: CarCardProps) {
  return (
    <article className="car-card">
      <div className="car-card__image-wrap">
        <img
          src={car.imageUrl}
          alt={`${car.make} ${car.model}`}
          className="car-card__image"
          loading="lazy"
        />
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
  );
}
