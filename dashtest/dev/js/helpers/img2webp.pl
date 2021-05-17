find * -maxdepth 10 -name "*.jpg" -print0 | perl -pe 's/.jpg\0/\0/g' | xargs -0 -I{} cwebp -q 80 {}.jpg -o {}.jpg.webp
find * -maxdepth 10 -name "*.png" -print0 | perl -pe 's/.png\0/\0/g' | xargs -0 -I{} cwebp -q 80 {}.png -o {}.png.webp
