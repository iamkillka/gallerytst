document.addEventListener('DOMContentLoaded', function() {
var 
	galleryClass = 'b-gallery',
	previewClass = 'b-gallery__preview',
	previewImageClass = 'b-gallery__preview-image',
	imageClass = 'b-gallery__image',
	previewHiddenClass = 'b-gallery__preview_hidden',
	currentPreviewImageClass = 'b-gallery__preview-image_current',
	arrowClass = 'b-gallery__arrow',
	arrowRightClass = 'b-gallery__arrow_right',
	arrowLeftClass = 'b-gallery__arrow_left',
	hiddenClass = 'hidden',
	gallery = document.querySelector('.' + galleryClass),
	preview = gallery.querySelector('.' + previewClass),
	items = preview.querySelectorAll('.' + previewImageClass),
	image = gallery.querySelector('.' + imageClass),
    arrowRight = gallery.querySelector('.' + arrowRightClass),
    arrowLeft = gallery.querySelector('.' + arrowLeftClass),
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
 
 /*Перехватываем движение мыши, прячем и показываем карусель*/
   gallery.addEventListener('mousemove', function(e){
    if(e.clientY > gallery.clientHeight - preview.clientHeight){
      preview.classList.remove(previewHiddenClass);
    }
    else{
      preview.classList.add(previewHiddenClass);
    }
  });
  
 function changeImage(index){
    if(index > -1 && index < images.length){
	  movePreview(index-currentIndex);
      currentIndex = index;
      showImage(images[currentIndex]);
	  setCurrentPreview(currentIndex);
      toggleArrows(index);
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
  
  function setCurrentPreview(index){
    for(var i = 0;i < items.length;i++){
      items[i].classList.remove(currentPreviewImageClass);
    }
    items[index].classList.add(currentPreviewImageClass);
  }
   
  function movePreview (delta){
	 scrollPreview(delta*preview.clientHeight);
  }
    function toggleArrows(index){
    if(index == 0){
      arrowLeft.classList.add('hidden');
    }
    else if(index == images.length - 1){
      arrowRight.classList.add(hiddenClass);
    }
    if(index > 0){
      arrowLeft.classList.remove(hiddenClass);
    }
    if(index < images.length - 1){
      arrowRight.classList.remove(hiddenClass);
    }
  }

  function hideArrows(){
    arrowLeft.classList.add(hiddenClass);
    arrowRight.classList.add(hiddenClass);
  }

  function scrollPreview(dy){
    preview.scrollLeft += dy;
  }
    /*Перехватываем клик мыши, если он попал 
	в превьюшку или стрелку, меняем основное изображение.*/
  gallery.addEventListener('click', function(e){
    var el = e.target, index;
    if(el.classList.contains(previewImageClass)){
      index = +el.getAttribute(indexAttributeName);
      changeImage(index);
    }
    if(el.classList.contains(arrowClass)){
      var dx = el.classList.contains(arrowRightClass) ? 1 : -1;
      changeImage(currentIndex + dx);
    }
  });
  
  /*Перехватываем колесо мыши*/
   preview.addEventListener('mousewheel', function(e){
    scrollPreview(e.deltaY);
  });

  /*Перехватываем скролл*/
  preview.addEventListener('DOMMouseScroll', function(e){
    scrollPreview(e.detail);
  });

  /*При потере фокуса, прячем стрелки*/
  gallery.addEventListener('mouseleave', function(e){
    hideArrows();
  });

  /*Фокус вернулся? Показываем стрелки*/
  gallery.addEventListener('mouseenter', function(e){
    toggleArrows(currentIndex);
  });
preview.style.bottom = preview.clientHeight - preview.offsetHeight + 'px';
  });