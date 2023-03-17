document.addEventListener('DOMContentLoaded', function () {
    const submitForm = document.getElementById('form');
    submitForm.addEventListener('submit', function (event) {
      event.preventDefault();
      addTodo();
    });
    if (isStorageExist()) {
        loadDataFromStorage();
      }
});

function addBook() {
    const judul = document.getElementById('inputJudulBk').value;
    const penulis = document.getElementById('inputTahunBk').value;
    const tahun = document.getElemenyById('inputPenulisBk').value;
   
    const generatedID = generateId();
    const BookObject = generateBookObject(generatedID, judul, penulis, tahun, false);
    Book.push(BookObject);
   
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}
function generateId() {
    return +new Date();
}
function generateBookObject(id, judul, penulis, tahun, isCompleted) {
return {
    id,
    judul,
    penulis,
    tahun,
    isCompleted
}
}
const Books = [];
const RENDER_EVENT = 'render-Book';
document.addEventListener(RENDER_EVENT, function () {
    console.log(todos);
});

function RakBuku (BookObject) {
    const textjudul = document.createElement('h2');
    textjudul.innerText = BookObject.judul;

    const textpenulis = document.createElement('p');
    textpenulis.innerText = BookObject.penulis;

    const texttahun = document.createElement('p');
    texttahun.innerText = BookObject.tahun;

    const textContainer = document.createElement('div');
    textContainer.classList.add('inner');
    textContainer.append(textjudul, textpenulis, texttahun);

    const container = document.createElement('div');
    container.classList.add('item', 'shadow');
    container.append(textContainer);
    container.setAttribute('id', `todo-${todoObject.id}`);

    if (BookObject.isCompleted) {
    const  inCompletedRead = document.createElement('button');
    inCompletedRead.classList.add('undo-button');
    
    inCompletedRead.addEventListener('click', function () {
        undoTaskFromCompleted(Bookbject.id);
    });
    
    const trashButton = document.createElement('button');
    trashButton.classList.add('trash-button');
    
    trashButton.addEventListener('click', function () {
        removeTaskFromCompleted(BookObject.id);
    });
    
    container.append(undoButton, trashButton);
    } else {
    const completedBook = document.createElement('button');
    completedBook.classList.add('succcess-button');
    
    completedBook.addEventListener('click', function () {
        addTaskToCompleted(BookObject.id);
    });
    
    container.append(completedBook);
    }

    return container;
}
document.addEventListener(RENDER_EVENT, function () {
    const uncompletedBookList = document.getElementById('inCompletedBk');
    uncompletedBookList.innerHTML = '';
    const completedBookList = document.getElementById('CompletedBk');
    completedBookList.innerHTML = '';

    for (const BooksItem of Books) {
        const BooksElement = makeTodo(BooksItem);
        if (!BooksItem.isCompleted)
        uncompletedBookList.append(BooksElement);
        else
        completedBookList.append(BooksElement);
    }
});

function addTaskToCompleted (BooksId) {
    const BooksTarget = findTodo(BooksId);
   
    if (BooksTarget == null) return;
   
    BooksTarget.isCompleted = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
}
function findBookIndex(BooksId) {
for (const index in Books) {
    if (Books[index].id === BooksId) {
    return index;
    }
}

return -1;
}
function removeTaskFromCompleted(BooksId) {
    const todoTarget = findBookIndex(BooksId);
   
    if (todoTarget === -1) return;
   
    Books.splice(todoTarget, 1);
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}
   
function undoTaskFromCompleted(BooksId) {
    const BooksTarget = findBook(BooksId);

    if (BooksTarget == null) return;

    BooksTarget.isCompleted = false;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}
function saveData() {
    if (isStorageExist()) {
      const parsed = JSON.stringify(todos);
      localStorage.setItem(STORAGE_KEY, parsed);
      document.dispatchEvent(new Event(SAVED_EVENT));
    }
  }

const SAVED_EVENT = 'saved-Book';
const STORAGE_KEY = 'BOOK_APPS';
 
function isStorageExist() /* boolean */ {
  if (typeof (Storage) === undefined) {
    alert('Browser kamu tidak mendukung local storage');
    return false;
  }
  return true;
}

document.addEventListener(SAVED_EVENT, function () {
  console.log(localStorage.getItem(STORAGE_KEY));
});

function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(serializedData);
 
  if (data !== null) {
    for (const todo of data) {
      Books.push(Book);
    }
  }
 
  document.dispatchEvent(new Event(RENDER_EVENT));
}
