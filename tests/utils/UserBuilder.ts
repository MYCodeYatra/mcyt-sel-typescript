export class User {
  constructor(
    public username: string,
    public email: string,
    public role: string
  ) {}
}

export class UserBuilder {
  private username: string = "default_user";
  private email: string = "default@example.com";
  private role: string = "User";

  withUsername(username: string): UserBuilder {
    this.username = username;
    return this; // Allows method chaining!
  }

  withEmail(email: string): UserBuilder {
    this.email = email;
    return this;
  }

  withRole(role: string): UserBuilder {
    this.role = role;
    return this;
  }

  build(): User {
    return new User(this.username, this.email, this.role);
  }
}
