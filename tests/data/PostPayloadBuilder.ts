// POJO (Plain Old Javascript Object) Interface
export interface PostPayload {
  title: string;
  body: string;
  userId: number;
}

export class PostPayloadBuilder {
  private payload: PostPayload;

  constructor() {
    // Default valid payload
    this.payload = {
      title: "Default Generated Title",
      body: "Default Generated Body Content",
      userId: 1
    };
  }

  public withTitle(title: string): PostPayloadBuilder {
    this.payload.title = title;
    return this;
  }

  public withBody(body: string): PostPayloadBuilder {
    this.payload.body = body;
    return this;
  }

  public withUserId(userId: number): PostPayloadBuilder {
    this.payload.userId = userId;
    return this;
  }

  public build(): PostPayload {
    return this.payload;
  }
}
