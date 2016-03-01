function SearchWidget(){
    var SERCH_IMAGE_PATH = '../images/search.png',
        CONTAINER = '#productContentLeft',
        MAIN_IMAGE = '#product_image_bg img',
        CID = 'gap667',
        URL = "http://api.pounce.mobi/v2/app/auto3d.main.php",
        searchEl = $(
                "<div class='slyce-search-wrapper'>" +
                    "<a href='#' class='slyce-search'>" +
                        "<img src='" + chrome.extension.getURL(SERCH_IMAGE_PATH) + "'>" +
                    "</a>" +
                "</div>"
        ),
        modal,
        that = this;

    this.init = function(){
        $(CONTAINER).prepend(searchEl);
        this.bind()
    };

    this.bind = function() {
        $('.slyce-search').click(function (e) {
            e.preventDefault();
            modal = new SearchModal();
            modal.init();
            that.getData();
        })
    };

    this.getData = function(){
        var searchImageUrl = document.location.origin + $(MAIN_IMAGE).attr('src');
        $.get(URL, {cid: CID, img: searchImageUrl}, function (data) {
            modal.update(data.products);
        })
    }
}

function SearchModal() {
    var modalWindow = $("<div class='slyce-overlay'></div>"),
        modalContent = $("<div class='slyce-modal'></div>"),
        modalClose = $("<span class='slyce-close-modal' style='background-image: " +
                        "url(" + chrome.extension.getURL('../images/close_btn.png') + "') '>" +
                        "</span>"),
        SHOW_PRODUCTS = 8;

    this.init = function () {
        this.createSpinner();
        $('body').append(modalWindow)
    };

    this.createSpinner = function (){
        var spinnerWrapper = $("<div class='sk-fading-circle'></div>");
        for(var i = 1; i < 13; i++){
            spinnerWrapper.append("<div class='sk-circle " + 'sk-circle'+ i + "'></div>")
        }
        modalWindow.append(spinnerWrapper)
    };

    this.update = function (data) {
        $.each(data, function (e) {
            var currentProduct = $(
                "<div class='slyce-product'>" +
                    "<a target='_blank' href='" + this.productURL + "'>" +
                        "<img src='" + this.productImageURL + "'>" +
                         "<span>" + this.productName + "</span>" +
                    "</a>" +
                "</div>");

            modalContent.append(currentProduct);
            return ( e !== (SHOW_PRODUCTS-1));
        });

        modalClose.click(function () {
            modalWindow.remove()
        });
        modalContent.prepend(modalClose);
        $(modalWindow).append(modalContent)
    }
}

var widget = new SearchWidget();
widget.init();