export enum BookForm {
    HARDCOVER = "HARDCOVER",
    PAPERBACK = "PAPERBACK",
    EBOOK = "EBOOK",
    AUDIOBOOK = "AUDIOBOOK",
    LEATHER_BOUND = "LEATHER_BOUND",
    SPIRAL_BOUND = "SPIRAL_BOUND",
    BOARD_BOOK = "BOARD_BOOK",
    COMBO = "COMBO",
    LIMITED_EDITION = "LIMITED_EDITION"
}

export const BookFormDisplayName: Record<BookForm, string> = {
    [BookForm.HARDCOVER]: "Bìa cứng",
    [BookForm.PAPERBACK]: "Bìa mềm",
    [BookForm.EBOOK]: "Sách điện tử",
    [BookForm.AUDIOBOOK]: "Sách nói",
    [BookForm.LEATHER_BOUND]: "Bìa da",
    [BookForm.SPIRAL_BOUND]: "Sách xoắn",
    [BookForm.BOARD_BOOK]: "Sách cho trẻ em",
    [BookForm.COMBO]: "Bản combo in và điện tử",
    [BookForm.LIMITED_EDITION]: "Ấn bản giới hạn"
};
