import React from "react";

interface CityDisplayProps {
  city: string;
  rawCity?: string;
}

export const CityDisplay: React.FC<CityDisplayProps> = ({ city, rawCity }) => {
  if (!city) {
    // No city - display in red
    return <span style={{ color: '#d82c0d' }}>No city</span>;
  } else if (city.startsWith('Unknown (')) {
    // Unrecognized city format - display in red
    return <span style={{ color: '#d82c0d' }}>{city}</span>;
  } else if (rawCity && city === rawCity) {
    // Original city from order - display in green
    return <span style={{ color: '#108043' }}>{city}</span>;
  } else {
    // Matched/standardized city - display in orange
    return <span style={{ color: '#c05717' }}>{city}</span>;
  }
};
