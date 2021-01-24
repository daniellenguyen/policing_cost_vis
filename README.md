# Danielle, what's this?

I made a visualization of [Vera Institute of Justice's](https://www.vera.org/publications/what-policing-costs-in-americas-biggest-cities) data on policing costs in different cities throughout the country. This is a rich and loamy dataset with lots of surprising tidbits. It was fun to look at it day after day; I really enjoyed using it.

Here's the link to it: https://daniellenguyen.github.io/policing_cost_vis/

Here's how it's supposed to look on [mobile](mobile-snapshot.jpg), [desktop](desktop-snapshot.jpeg), and [desktop large view.](desktop-snapshot-large.jpeg)

I used React, D3, and some miscellaneous Node scripts to make this. I also used Typescript, which annoyed me quite a bit to use in conjunction with D3. I'm not sure if I'll use it again for my d3 projects.

# Where I got the data from and how I treated it:

These steps could be way more streamlined and efficient; I'm just recalling what I did at the time.

1. Download state outline from pre-built [source](https://github.com/topojson/us-atlas) for convenience. Here it's called states_outline.json.

2. Create CSV in Excel from the data table on policing costs from the [Vera Institute for Justice](https://www.vera.org/publications/what-policing-costs-in-americas-biggest-cities)
Also do some minor cleaning, like separating strings for city and state, removing colon in ratio value.
Convert this CSV into a JSON file.

3. Compile by hand on Excel a list of coordinates for all cities from Step 2. Download this list as CSV and convert to JSON.

4. Join the two JSON files; do more cleaning like removing the dollar signs and percent signs, string/number conversions
Also, before joining the coordinate data, convert it into pixel coordinates through a geographic projection matching the pre-built source in Step 1.

5. Write a script to get a bunch of fake photos of people from [thispersondoesexist.com](thispersondoesnotexist.com). I waited 10 seconds between each request because I'm a nice person and a good internet steward.
Crop each photo to be circular and reduce it to 30x30 px.

# What I don't have time to do right now but might do later:

I want to make the arrows I hard coded in svg for this visualization into something people can download and tweak to use in their own visualizations. I was unable to find a sankey diagram in javascript that had only one parent node, two child nodes, and used arrows, so I had to just draw it and it took a whole day (especially the curved arrow, which I debugged using [Mike Bostock's example of De Casteljau’s Algorithm](https://observablehq.com/@mbostock/de-casteljaus-algorithm) and I'm very proud of it). But now it could theoretically be used for any dataset where the user needs to compare two values using a sankey diagram - I've just got to make a generalized version of it.

# My note to myself: how to deploy this on my github pages site because it's a submodule there:

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

# I'm so flattered you want to try running this locally

I've never tried to clone this repo myself, so all I can tell you is that I used Yarn, Create React App, and the Chrome browser to make this. You hopefully can just run `yarn start` and it'll work out for you. If it doesn't, you can probably dm me at @_nguyendanielle on Twitter.


