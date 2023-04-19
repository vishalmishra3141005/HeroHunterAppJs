class Character {
    constructor(id, name, description, modified, resourceUrl, 
        urls, thumbnail, comics, stories, events, series) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.modified = modified;
        this.resourceUrl = resourceUrl;
        this.urls = urls;
        this.thumbnail = thumbnail;
        this.comics = comics;
        this.stories = stories;
        this.events = events;
        this.series = series;
    }
}

class Url {
    constructor(type, url) {
        this.type = type;
        this.url = url;
    }
}

class Image {
    constructor(path, extension) {
        this.path = path;
        this.extension;
    }
}

class ComicList {
    constructor(available, returned, collectionURL, items) {
        this.available = available;
        this.returned = returned;
        this.collectionURL = collectionURL;
        this.items = items;
    }
}