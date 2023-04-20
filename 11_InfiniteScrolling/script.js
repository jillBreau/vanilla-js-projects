const postsContainer = document.querySelector('#posts-container');
const loader = document.querySelector('.loader');
const filter = document.querySelector('#filter');

let limit = 5;
let page = 1;
let isLoading = false;

// Fetch posts from API
const getPosts = async () => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  ); // returns a promise

  const data = await res.json(); // returns a promise

  return data;
};

// Show posts in DOM
const showPosts = async () => {
  const posts = await getPosts();

  posts.forEach((post) => {
    const postEl = document.createElement('div');
    postEl.classList.add('post');
    postEl.innerHTML = `
    <div class="number">${post.id}</div>
    <div class="post-info">
      <h2 class="post-title">${post.title}</h2>
      <p class="post-body">${post.body}</p>
    </div>
    `;
    postsContainer.appendChild(postEl);
  });
};

// Filter posts by input
const filterPosts = (e) => {
  const term = e.target.value.toUpperCase();

  const posts = document.querySelectorAll('.post');

  posts.forEach((post) => {
    const title = post.querySelector('.post-title').innerText.toUpperCase();
    const body = post.querySelector('.post-body').innerText.toUpperCase();

    if (title.includes(term) || body.includes(term)) {
      post.style.display = 'flex';
    } else {
      post.style.display = 'none';
    }
  });
};

// Show loader and fetch more posts
const showLoader = () => {
  if (isLoading) {
    return;
  }

  page++;
  isLoading = true;
  loader.classList.add('show');

  setTimeout(async () => {
    await showPosts();
    loader.classList.remove('show');
  }, 1000);

  isLoading = false;
};

// Show initial posts
showPosts();

// Event listeners

window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight) {
    showLoader();
  }
});

filter.addEventListener('input', (e) => {
  filterPosts(e);
});
