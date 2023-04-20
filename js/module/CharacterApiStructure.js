/* This files contain the structure of the data 
 that will be received by following api
 
get /v1/public/characters 

main home will call this api
*/

export class Character {
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

export class Url {
    constructor(type, url) {
        this.type = type;
        this.url = url;
    }
}

export class Image {
    constructor(path, extension) {
        this.path = path;
        this.extension = extension;
    }
}

export class ComicList {
    constructor(available, returned, collectionURL, items) {
        this.available = available;
        this.returned = returned;
        this.collectionURL = collectionURL;
        this.items = items;
    }
}

export class ComicSummary {
    constructor(resourceUrl, name) {
        this.resourceUrl = resourceUrl;
        this.name = name;
    }
}