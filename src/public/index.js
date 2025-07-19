const API_URL = "http://localhost:3000/book";
const bookList = document.getElementById("book-list");
const bookForm = document.getElementById("book-form");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const priceInput = document.getElementById("price");
const dateInput = document.getElementById("published_date");
const submitBtn = document.getElementById("submitBtn");
const cancelEditBtn = document.getElementById("cancelEditBtn");

let editingBookId = null;

async function fetchBooks() {
  try {
    const res = await fetch(API_URL);
    const books = await res.json();
    bookList.innerHTML = "";
    books.forEach((book) => {
      const div = document.createElement("div");
      div.className = "p-4 bg-white dark:bg-gray-800 rounded shadow space-y-2";
      div.innerHTML = `
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white">${book.title}</h3>
        <p class="text-sm text-gray-600 dark:text-gray-300">Author: ${book.author}</p>
        <p class="text-sm text-gray-600 dark:text-gray-300">Price: $${book.price}</p>
        <p class="text-sm text-gray-600 dark:text-gray-300">Published: ${book.published_date.split("T")[0]}</p>
        <div class="flex gap-2">
          <button onclick="editBook(${book.id})" class="px-3 py-1 text-sm bg-blue-500 text-white rounded">Edit</button>
          <button onclick="deleteBook(${book.id})" class="px-3 py-1 text-sm bg-red-500 text-white rounded">Delete</button>
        </div>
      `;
      bookList.appendChild(div);
    });
  } catch (error) {
    alert("Failed to fetch books");
    console.error(error);
  }
}

bookForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const book = {
    title: titleInput.value,
    author: authorInput.value,
    price: parseFloat(priceInput.value),
    published_date: dateInput.value,
  };

  try {
    let res;
    if (editingBookId) {
      res = await fetch(`${API_URL}/${editingBookId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book),
      });
    } else {
      res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book),
      });
    }

    if (!res.ok) throw new Error("Failed to save book");

    bookForm.reset();
    editingBookId = null;
    submitBtn.textContent = "Add Book";
    cancelEditBtn.classList.add("hidden");
    fetchBooks();
  } catch (error) {
    alert(error.message);
    console.error(error);
  }
});

window.editBook = async (id) => {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) throw new Error("Book not found");
    const book = await res.json();
    titleInput.value = book.title;
    authorInput.value = book.author;
    priceInput.value = book.price;
    dateInput.value = book.published_date.split("T")[0];
    editingBookId = book.id;
    submitBtn.textContent = "Update Book";
    cancelEditBtn.classList.remove("hidden");
  } catch (error) {
    alert(error.message);
  }
};

cancelEditBtn.addEventListener("click", () => {
  bookForm.reset();
  editingBookId = null;
  submitBtn.textContent = "Add Book";
  cancelEditBtn.classList.add("hidden");
});
window.deleteBook = async (id) => {
  if (!confirm("Are you sure you want to delete this book?")) return;
  try {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete book");
    fetchBooks();
  } catch (error) {
    alert(error.message);
  }
};  // <- هل تأكدت إنه هنا القوس يغلق بشكل صحيح؟


// Dark Mode Toggle
const modeToggle = document.getElementById("mode-toggle");
modeToggle.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
  modeToggle.textContent = document.documentElement.classList.contains("dark") ? "☀️ Light Mode" : "🌙 Dark Mode";
});

// Initial load
fetchBooks();
