const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.querySelector('#count');
const total = document.querySelector('#total');
const movieSelect = document.querySelector('#movie');
let ticketPrice = parseInt(movieSelect.value);

// Utils

const updateSelectedCount = () => {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  const selectedSeatsIndices = [...selectedSeats].map((selectedSeat) =>
    [...seats].indexOf(selectedSeat)
  );

  localStorage.setItem(
    'selectedSeatsIndices',
    JSON.stringify(selectedSeatsIndices)
  );

  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
};

const setMovieData = (movieIndex, moviePrice) => {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
};

// Get data from localStorage and populate UI
const populateUI = () => {
  const selectedSeatsIndices = JSON.parse(
    localStorage.getItem('selectedSeatsIndices')
  );

  if (selectedSeatsIndices !== null && selectedSeatsIndices.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeatsIndices.includes(index)) {
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }

  const selectedMoviePrice = localStorage.getItem('selectedMoviePrice');
  if (selectedMovieIndex !== null) {
    ticketPrice = parseInt(selectedMoviePrice);
  }

  updateSelectedCount();
};

// Initial setup

populateUI();

// Event listeners

// Seat selection
container.addEventListener('click', (e) => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');
    updateSelectedCount();
  }
});

// Movie selection
movieSelect.addEventListener('change', (e) => {
  ticketPrice = parseInt(e.target.value);

  setMovieData(e.target.selectedIndex, e.target.value);
  console.log(e.target.selectedIndex);
  console.log(e.target.value);
  updateSelectedCount();
});
