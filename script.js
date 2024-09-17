const gridContainer = document.querySelector('.grid-container');
const btnPrompt = document.querySelector('.prompt');
let gridSize = 16;
let gridContainerSize = gridContainer.offsetWidth;
btnPrompt.addEventListener('click', newGridSizeHandler);
let isDrawing = false;

function fillSquare(e) {
  if (!isDrawing) {
    return;
  }

  if (e.target === gridContainer) {
    return;
  }

  if (
    window.getComputedStyle(e.target).backgroundColor !== 'rgba(0, 0, 0, 0)'
  ) {
    return;
  }

  const r = Math.floor(Math.random() * 255) + 1;
  const g = Math.floor(Math.random() * 255) + 1;
  const b = Math.floor(Math.random() * 255) + 1;
  const a = Math.floor(Math.random() * 255) + 1;
  e.target.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${a})`;
}

function startDrawing() {
  isDrawing = true;
}

function endDrawing() {
  isDrawing = false;
}

gridContainer.addEventListener('mouseover', fillSquare);
gridContainer.addEventListener('mousedown', startDrawing);
gridContainer.addEventListener('mouseup', endDrawing);

function createGrid(size) {
  gridContainer.innerHTML = '';
  const itemSize = (gridContainerSize - 4) / size;
  for (let i = 0; i < size * size; i++) {
    const div = document.createElement('div');
    div.classList.add('grid-item');
    div.style.width = `${itemSize}px`;
    div.style.height = `${itemSize}px`;
    gridContainer.appendChild(div);
  }
}

createGrid(gridSize);

function newGridSizeHandler() {
  gridSize = prompt('Select a new size for your grid!');
  // console.log(typeof gridSize);
  if (gridSize.trim() === '') {
    alertWrongSize();
    return;
  } else if (gridSize > 100) {
    alertWrongSize();
    return;
  } else if (gridSize < 16) {
    alertWrongSize();
  }
  createGrid(gridSize);
}

function alertWrongSize() {
  alert(`Please enter a size between 16 and 100`);
}
