# Where I got the data from and how I treated it:

These steps could be way more streamlined and efficient; I'm just recalling what I did at the time.

1. Download state outline from pre-built source (https://github.com/topojson/us-atlas) for convenience. Here it's called states_outline.json.

2. Create CSV in Excel from the data table on policing costs from the Vera Institute for Justice (https://www.vera.org/publications/what-policing-costs-in-americas-biggest-cities)
Also do some minor cleaning, like separating strings for city and state, removing colon in ratio value.
Convert this CSV into a JSON file 🤦🏾‍♀️

3. Compile by hand on Excel a list of coordinates for all cities from Step 2. Download this list as CSV and convert to JSON 🤦🏾‍♀️🤦🏾‍♀️🤦🏾‍♀️

4. Join the two JSON files; do more cleaning like removing the dollar signs and percent signs, string/number conversions
Also, before joining the coordinate data, convert it into pixel coordinates through a geographic projection matching the pre-built source in Step 1.
### `cd src/data`
### `node clean_city_data.js`

# How to deploy this on my github pages site:

```
cd policing_cost_vis
yarn run deploy

cd personal-website
cd policing_cost_vis // the submodule inside the personal website repo
git checkout gh-pages // the branch used to deploy this page
git pull
cd ..
git status
git add policing_cost_vis // and also gitmodules if it's there
git commit 
git push origin master
```


