class User {
    constructor(id, username, password){
        this.id = id;
        this.username = username;
        this.password = password;
    }

    static validate(userData) {
        if(!userData.username || !userData.password){
            throw new Error("Some user data is missing")
        }
    }
}

module.exports = User;