const myLibrary = [];

document.querySelector(".newBook").addEventListener("click", () => {
    const dialog = document.querySelector(".cardDialog");
    dialog.showModal();

    const saveButton = document.querySelector(".saveButton");
    const cancelButton = document.querySelector(".cancelButton");

    saveButton.onclick = (e) => {
        e.preventDefault();

        const newTitle = document.querySelector(".newTitle").value;
        const newAuthor = document.querySelector(".newAuthor").value;
        const newPages = document.querySelector(".newPages").value;
        const isChecked = document.querySelector(".newRead").checked;

        if (!newTitle || !newAuthor || !newPages) {
            alert("Please fill in all fields!");
            return;
        }

        const cardTemplate = document.querySelector(".card");
        const newCard = cardTemplate.cloneNode(true);

        newCard.querySelector(".title").textContent = `Title: ${newTitle}`;
        newCard.querySelector(".author").textContent = `Author: ${newTitle}`;
        newCard.querySelector(".pages").textContent = `pages: ${newPages}`;
        newCard.querySelector(".read").checked = isChecked;
        const cardIndex = myLibrary.length;
        newCard.setAttribute("data-index", cardIndex);

        const deleteButton = newCard.querySelector(".space");
        deleteButton.addEventListener("click", () => {
            const cardIndex = newCard.getAttribute("data-index");
            newCard.remove();
            removeBookFromLibrary(cardIndex);
        });

        const newBook = new Book(newTitle, newAuthor, newPages, isChecked);
        addBookToLibrary(newBook, cardIndex);

        document.querySelector(".container").appendChild(newCard);

        dialog.close();
        resetDialogInputs();
    };

    cancelButton.onclick = () => {
        dialog.close();
        resetDialogInputs();
    };
});

function resetDialogInputs() {
    document.querySelector(".newTitle").value = "";
    document.querySelector(".newAuthor").value = "";
    document.querySelector(".newPages").value = "";
    document.querySelector(".newRead").checked = false;
}

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

function addBookToLibrary(bookDetails, index) {
    myLibrary.push({ ...bookDetails, index });
}

function removeBookFromLibrary(index) {
    const bookIndex = myLibrary.findIndex((book) => book.index == index);
    if (bookIndex !== -1) {
        myLibrary.splice(bookIndex, 1);
    }
}
