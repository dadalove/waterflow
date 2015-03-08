$(function () {
    $('.xx').each(function () {
      
        var $window = $(window), 
            $header = $(this),  
            headerOffsetTop = $header.offset().top;

        $window.on('scroll', function () {
            if ($window.scrollTop() > headerOffsetTop) {
                $header.addClass('sticky');
            } else {
                $header.removeClass('sticky');
            }
        });
        $window.trigger('scroll');
    });

    $(function () {
    $('#gallery').each(function () {
        var $container = $(this),
            $loadMoreButton = $('#load-more'),
            $filter = $('#gallery-filter'),
            addItemCount = 16,
            added = 0,
            allDate = [],
            filteredDate = [];

        $container.masonry({
            columnWidth: 230,
            gutter: 10,
            itemSelector: '.gallery-item'
        });

        $.getJSON('./data/content.json', function (data) {
            var elements = [];
            $.each(data, function (i, item) {
                var itemHTML =
                        '<li class="gallery-item is-loading">' +
                            '<a href="' + item.images.large + '">' +
                                '<img src="' + item.images.thumb +
                                    '" alt="' + item.title + '">' +
                            '</a>' +
                        '</li>';
                elements.push($(itemHTML).get(0));
            });
            $container.append(elements);
            $container.imagesLoaded(function () {
                $(elements).removeClass('is-loading');
                $container.masonry('appended', elements);
            });
        });
    });
});
});