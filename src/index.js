import newsService from './js/api-service';
import updateArticlesMarkup from './js/update-articles-markup';
import LoadMoreBtn from './js/components/load-more-button';
import refs from './js/refs';
import './sass/styles.scss';

const loadMoreBtn = new LoadMoreBtn({
  selector: 'button[data-action="load-more"]',
  hidden: true,
});

refs.searchForm.addEventListener('submit', searchFormSubmitHandler);
loadMoreBtn.refs.button.addEventListener('click', fetchArticles);

function searchFormSubmitHandler(event) {
  event.preventDefault();

  const form = event.currentTarget;
  newsService.query = form.elements.query.value;

  clearArticlesContainer();
  newsService.resetPage();
  fetchArticles();
  form.reset();
}

function fetchArticles() {
  loadMoreBtn.disable();

  newsService.fetchArticles().then(hits => {
    if (hits.length === 12) {
      updateArticlesMarkup(hits);
      loadMoreBtn.show();
      loadMoreBtn.enable();
    } else {
      updateArticlesMarkup(hits);
      loadMoreBtn.hide();
    }

    window.scrollTo({
      top: document.documentElement.offsetHeight,
      behavior: 'smooth',
    });
  });
}

function clearArticlesContainer() {
  refs.articlesContainer.innerHTML = '';
}
