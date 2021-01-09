# run this file in citizen_photos directory. run using bash sample_citizen_photos.sh

# get a hundred images
for i in {1..100}
do
   wget 'https://thispersondoesnotexist.com/image' --output-document person$i.png
   convert person$i.png -gravity Center \( -size 1024x1024 xc:Black -fill White -draw 'circle 512 512 512 1' -alpha Copy \) -compose CopyOpacity -composite -trim person$i.png
   magick convert person$i.png -resize 30x30 person$i.png
   echo got $i images
   sleep 10
done