import React from "react";
import { FaMapMarkerAlt, FaRulerCombined } from "react-icons/fa";

const PropertyCard = ({
  id,
  name,
  description,
  imageSrc,
  company,
  location,
  price,
  seller,
  meters,
  category,
  className,
}) => {
  return (
    <div
      className={`rounded-2xl shadow-lg transition-transform transform hover:scale-105 bg-black overflow-hidden border-2 border-green-light ${className} text-white`}
    >
      <img
        src={imageSrc || "images/test.svg"}
        alt={name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2 text-green-light">
          {name}
        </h2>
        <p className="text-sm mb-3">{description}</p>
        <div className="flex items-center gap-2 mb-3">
          <FaMapMarkerAlt className="text-blue-light" />
          <span>{location}</span>
        </div>
        <div className="flex justify-between items-center text-xl mb-2">
          <span className="font-bold text-yellow">
            ${price.toLocaleString()}
          </span>
          <div className="flex items-center gap-1">
            <FaRulerCombined className="text-green-light text-xs" />
            <span>{meters} m²</span>
          </div>
        </div>
        <div className="text-xs mb-3">
          <span>Category: </span>
          <span className="text-green-light">{category}</span>
        </div>
        <div className="text-xs mb-1">
          <span>Company: {company}</span>
        </div>
        <div className="text-xs mb-3">
          <span>Seller: {seller}</span>
        </div>
        <button
          className="w-full py-2 rounded-lg bg-green-light text-black font-semibold hover:bg-blue-light transition"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default PropertyCard;

