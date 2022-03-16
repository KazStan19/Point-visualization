export const contours = [
    // one defect
    {
      name: "road",
      // geojson-like "feature" with the contours as "coordinates"
      coords: {
        type: "LineString",
        coordinates: [
          // [x, y] for the 4 red dots in the image
          [269,239], // top left
          [426,238], // top right
          [596,349], // bottom right
          [64,348], // bottom left
          [269,239] // top left again, to draw a polygon
        ]
      }
    }
  ]
  // x = distance in pixel from the top-left corner of the image on the X-axis
  // y = distance in pixel from the top-left corner of the image on the Y-axis239