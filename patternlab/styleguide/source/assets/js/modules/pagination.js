import twiggy from '../helpers/twiggy';

export default function (window, document, $, undefined) {

  if ($('.js-pagination').length === 0) {
    return;
  }

  // Set up global component config
  let prevButton = '.js-pagination-prev',
    nextButton = '.js-pagination-next',
    pageButton = '.js-pagination-page';

  $('.js-pagination').each(function () {
    let $el = $(this);

    // Listen for previous page button click and trigger pagination event.
    $el.on('click', prevButton, function () {
      let targetPageNumber = parseInt(history.state.page, 10) - 1;
      pushPaginationState(targetPageNumber);
      $el.trigger('ma:Pagination:Pagination', [history.state.page]);
    });
    // Listen for next button click and trigger pagination event.
    $el.on('click', nextButton, function () {
      let targetPageNumber = parseInt(history.state.page, 10) + 1;
      pushPaginationState(targetPageNumber);
      $el.trigger('ma:Pagination:Pagination', [history.state.page]);
    });
    // Listen for page number button click and trigger pagination event;
    $el.on('click', pageButton, function (e) {
      let targetPageNumber = $(e.target).data('page');
      pushPaginationState(targetPageNumber);
      $el.trigger('ma:Pagination:Pagination', [history.state.page]);
    });

    window.onpopstate = function(e) {
      if (e.state.page) {
        $el.trigger("ma:Pagination:Pagination", [e.state.page]);
      }
    };

    // Listen for new data, render new pagination.
    $el.on('ma:Pagination:DataUpdated', function (e, data) {
      renderPagination({ data: data, $el: $el });
    });


    // if we already have a state or a query parameter, initialize things
    let targetPageNumber = 1;
    let params = new URLSearchParams(window.location.search);
    if (history.state && history.state.page) {
      targetPageNumber = history.state.page;
    } else if (params.has('_page')) {
      targetPageNumber = params.get('_page');
    }
    pushPaginationState(targetPageNumber);

  });

  /**
   * Renders the contents of a specific results pagination component.
   *
   * @param args
   *   The arguments object, can contain the following properties:
   *      data: data object from which to populate handlebars template variables (required),
   *      context: the parent component selector
   */
  function renderPagination(args) {
    // Don't attempt to render anything if we don't have new data.
    if (!args.data) {
      return;
    }

    // Render async with Twig.
    return twiggy('@molecules/pagination.twig')
      .then(template => template.renderAsync({ pagination: args.data }))
      .then(markup => args.$el.html(markup))

    // Create new markup using handlebars template, helper.
    let markup = compiledTemplate(args.data);
    args.$el.html(markup);
  }


  function pushPaginationState(pageNum) {
    let params = new URLSearchParams(window.location.search);
    params.set('_page', pageNum);

    history.pushState(
      { page: pageNum },
      `${document.title} | page ${pageNum}`, `${window.location.origin}${window.location.pathname}?${params.toString()}`
    );
  }

} (window, document, jQuery);