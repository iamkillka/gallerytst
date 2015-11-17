document.addEventListener('DOMContentLoaded', function() {
var 
galleryClass = 'b-gallery',
previewClass = 'b-gallery__preview',
previewImageClass = 'b-gallery__preview-image',
imageClass = 'b-gallery__image',
gallery = document.querySelector('.' + galleryClass),
preview = gallery.querySelector('.' + previewClass),
items = preview.querySelectorAll('.' + previewImageClass),
image = gallery.querySelector('.' + imageClass),
    preloaderSrc = image.src,
images = [], 
 storage = window.localStorage, /*тут храним последнюю открытую картинку*/
currentSrcKey = 'galleryCurrentIndex';
     currentSrc = storage.getItem(currentSrcKey),
  currentIndex = 0,
srcAttributeName = 'data-src',
  indexAttributeName = 'data-index';

  for(var i = 0;i < preview.childNodes.length;i++){
    if(preview.childNodes[i].nodeType === document.TEXT_NODE){
      preview.removeChild(preview.childNodes[i]);
    }
  }
  
  for(var i = 0;i < items.length;i++){
    var src = items[i].getAttribute(srcAttributeName);
    images.push(src);
    if(src == currentSrc){
      currentIndex = i;
    }
    items[i].setAttribute(indexAttributeName, i);
  }
changeImage(currentIndex);
 
 function changeImage(index){
    if(index > -1 && index < images.length){
      currentIndex = index;
      showImage(images[currentIndex]);
    }
  }
 
 function showImage(src){
    var img = new Image;

    img.addEventListener('load', function(){
      image.src = img.src;
    });

    image.src = preloaderSrc;
    img.src = src;

    storage.setItem(currentSrcKey, src);
  }
  
    /*Перехватываем клик мыши, если он попал 
	в превьюшку, меняем основное изображение.*/
	gallery.addEventListener('click', function(e){
    var el = e.target, index;
    if(el.classList.contains(previewImageClass)){
      index = +el.getAttribute(indexAttributeName);
      changeImage(index);
    }
  });
  });