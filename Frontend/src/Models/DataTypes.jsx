export class Note {
  constructor(user_id, id, title, content, favorite = false) {
    this.user_id = user_id;
    this.id = id;
    this.title = title;
    this.content = content;
    this.favorite = favorite;
    this.type = "note";
  }

  toJSON() {
    return {
        user_id: this.user_id,
        id: this.id,
        title: this.title,
        content: this.content,
        favorite: this.favorite,
        type: this.type,
    };
  }
}

export class Folder {
  constructor(user_id, id, name, favorite = false, parent_folder_id = null) {
    this.user_id = user_id;
    this.id = id;
    this.name = name;
    this.favorite = favorite;
    this.parent_folder_id = parent_folder_id;
    this.type = "folder";
    this.folders = [];
    this.notes = [];
    this.images = [];
    this.canvas = [];
  }

  toJSON() {
    return {
      user_id: this.user_id,
      folder_id: this.folder_id,
      name: this.name,
      favorite: this.favorite,
      parent_folder_id: this.parent_folder_id,
        type: this.type,
    };
  }
}
export class Image {
  constructor(user_id, folder_id, image_data, filename) {
    this.user_id = user_id;
    this.folder_id = folder_id;
    this.image_data = image_data;
    this.filename = filename;
    this.type = "image";
}

  toJSON() {
    return {
      user_id: this.user_id,
      folder_id: this.folder_id,
      image_data: this.image_data,
      filename: this.filename,
        type: this.type,

    };
  }
}

export class Canvas {
    constructor(user_id, layout, title) {
        this.user_id = user_id;
        this.layout = layout;
        this.title = title;
        this.type = "canvas";
    }

    toJSON() {
        return {
            user_id: this.user_id,
            layout: this.layout,
            title: this.title,
            type: this.type,
        };
    }
}

export class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    toJSON() {
        return {
            username: this.username,
            password: this.password
        };
    }
}