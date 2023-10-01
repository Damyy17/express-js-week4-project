class Review {
    constructor(id, content, bookId, userId) {
      this.id = id;
      this.content = content;
      this.bookId = bookId;
      this.userId = userId;
    }

    static validate(reviewContent){
      if(!reviewContent.content){
        throw new Error("The review is missing!");
      }
    }
}

module.exports = Review;

  