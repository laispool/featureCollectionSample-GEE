///////////////////////////////////////////////////////////
///// Laís Pool  (lais.pool@gmail.com)                /////                        
///// Florianopolis, 27/02/2023                       /////              
///// Code Editor - Earth Engine                      /////                             
///// A code to get random samples from a feature     /////
///// collection data                                 /////
///////////////////////////////////////////////////////////

// Import the asset from "assets" - you have to import on your asset page before runing this script
var table = ee.FeatureCollection('projects/ee-laispool/assets/batimetria_1K_20052018'); //chance this path to your own
  print('Bathymetry data: ', table);

var  geometry =ee.Geometry.Polygon(
          [[[-48.64139308218611, -26.17231960239237],
          [-48.5912679601158, -26.232695943867252],
          [-48.5418294835533, -26.204359927579166],
          [-48.59744776968611, -26.148899947992145]]]);
Map.centerObject(geometry,11);
Map.addLayer(geometry,{},'ROI', false);

// Create and apply function to specify the columns and add projection information
var inputProjection = table.map(function(feature) {
  return ee.Feature(ee.Geometry.Point([feature.get('X'),feature.get('Y')], 'EPSG:32722'), // change the EPSG code if you need
  {'depth': feature.get('Z')});
});

// Print on console and add to map
print('After projection input', inputProjection);
Map.addLayer(inputProjection, {}, 'Complete bathymetry',false);

// Add a random column to the feature collection
table = inputProjection.randomColumn('random');
// Sort the feature collection based on the random column
table = table.sort('random');
// Select a random subset of the features
var numSamples = 100; // Change this to the desired number of samples
var samples = table.limit(numSamples);

// Print on console and add to map
print('Random samples:', samples);
Map.addLayer(samples, {}, 'Samples extracted');