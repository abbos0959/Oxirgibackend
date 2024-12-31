const mongoose = require("mongoose");

const TutCategoryModel = new mongoose.Schema({
   title: {
      type: String,
      required: true,
      unique: true,
   },
   slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
   },
   image: {
      type: String,
      default:
         "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARIAAAC4CAMAAAAYGZMtAAAANlBMVEXp7vG6vsHIzM/m6+7M0NO/w8bCxsnR1di7v8Li5+rDyMvl6u3h5unAxMfLz9K3u77Y3eDW2t13gQCUAAADH0lEQVR4nO3c7ZKaMBhAYTEGAwHi3v/NdhGqkBBXJYzm5Tz/OtMyeBogfB4OAAAAAAAAAAAAAAAAAAAAAAAAAL5A89MdUzs3n/5VK9jOFOm5os42StNuEOTKXD79296jdNEPktQDZVhenuPk5NL3uNGf/nXvUFvVuGZ2OW46Fzf8dyY+3nTlEKb79O97w/maxFTJF1xfk5TJl7u9IUm9wYIzT7LBmm+24M2RJECSAEkC4Zqry1EbXZ5XHoQEJfnRw4zCFZ1NuuBs+Gveudv80+k1pyhikpzuRfo57YqNR0qSy6zIqimckCSq9E/e3j9tE5JkNkjMumEiJMnJHyRFoZIsOCuzNa+DIu7hQaeq48fpfSZptGujTXaZpOkndWWsiZAk3Sv7kuHKvqsjcxchSbxpiXn0k6px4l+Uy02EJLG68PzE/l11/6vL+1ghScY/3UVvOsziLe5PpCQ51PMmsZ2rnd/5aRf2OGKSqEkTF72BWfkbmA6biEkymcG6MjZGfucj/j4nHCeCkhyaU2mM0cdL7Pi7dF/dBfsTSUl+t56qaeIz9b7Iwk1k/7gjK8lDVRtsNYvjZD9JwqlLZJzsJkm8SD/Vne599pLE6kfPorjpcWcnSYL5iG8yP5GZxHondNXfT7Xdx4nIJLac38h5okhxv6YkMYktXTFt8kyRybFYYJLhBsb95tZzRfprSurxgr9ebM3VWOB/kwfzEc/4kJe8JLebXEOT54tITaJaN84/zHV/0hd59uFYmUnsbYyY6zh5YYwITWK9mxf6pafsJSbxi7xIYBJbB2f/Lz1jLy+JWjdGJCZZ/XaOuCTl8jWz/SYJH0PaexK7foxIS3JMUERYkgSbjbQka4+/JCEJSUjSI0mPJAEOwoH5VE0n0IpKopJYWHBWeN0xQJLAZu/BZ5yEUeLrR4lZ9V5jxHGr4be58U2C9pTYOOvL8fslKsVVo6gsv3Kz9A5OOll+C+mgNvs2VLHmndqPasxW246Lvs3z7ezRbRDFxV9LyEFzTvzBrF+nTDcaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC+zj/F2S2b1UhTuQAAAABJRU5ErkJggg==",
   },
});

module.exports = mongoose.model("tutcategory", TutCategoryModel);
