# Got a shapefile from:
https://hub.arcgis.com/datasets/esri::usa-major-cities/data?geometry=-157.924%2C25.821%2C-42.611%2C49.740

# Converted shapefile to json
shp2json us_cities.shp -o us_cities.json

# Manually assigned FID to each city using Excel since there were less than 100 of them, not sorry at all

# Cull down us_cities.json to only the cities matching us_cities_with_FID.json
node choose_cities.js

# For every chosen city, join its coordinate data with the rest of its data
# Convert stringified numerical values back to numerical values
# Before joining coordinate data, convert it through a geographic projection into pixel coordinates
# Calculate each city's radius using its policing budget
node clean_city_data.js