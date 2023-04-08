// @ts-nocheck
/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

const database = 'devdoc';
const collection = 'NEW_COLLECTION_NAME';

// The current database to use.
use(database);

// Create a new collection.
db.createCollection('usersCollection', {
    capped: true,
    size: 1000000,
    max: 1000,
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            required: ['name', 'email', 'password'],
            properties: {
                name: {
                    bsonType: 'string',
                    description: 'must be a string and is required',
                },
                email: {
                    bsonType: 'string',
                    pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$',
                    description: 'must be a valid email address and is required',
                },
                password: {
                    bsonType: 'string',
                    description: 'must be a string and is required',
                },
            },
        },
    },
    clusteredIndex: {
        enabled: true,
    },
    timeseries: {
        timeField: 'timestamp',
        metaField: 'meta',
        granularity: 'seconds',
        bucketMaxSpanSeconds: 3600,
    },
    expireAfterSeconds: 3600,
});

db.createCollection('servicesCollection', {
    capped: true,
    size: 1000000,
    max: 1000,
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            required: [
                'id',
                'name',
                'description',
                'price',
                'duration',
                'category',
                'subcategory',
                'image',
                'rating',
                'reviews',
                'timestamp',
                'meta',
            ],
            properties: {
                id: {
                    bsonType: 'string',
                    description: 'must be a string and is required',
                },
                name: {
                    bsonType: 'string',
                    description: 'must be a string and is required',
                },
                description: {
                    bsonType: 'string',
                    description: 'must be a string and is required',
                },
                price: {
                    bsonType: 'number',
                    description: 'must be a number and is required',
                },
                duration: {
                    bsonType: 'number',
                    description: 'must be a number and is required',
                },
                category: {
                    bsonType: 'string',
                    description: 'must be a string and is required',
                },
                subcategory: {
                    bsonType: 'string',
                    description: 'must be a string and is required',
                },
                image: {
                    bsonType: 'string',
                    description: 'must be a string and is required',
                },
                rating: {
                    bsonType: 'number',
                    minimum: 0,
                    maximum: 5,
                    description: 'must be a number between 0 and 5 and is required',
                },
                reviews: {
                    bsonType: 'array',
                    items: {
                        bsonType: 'object',
                        properties: {
                            user_id: {
                                bsonType: 'objectId',
                                description: 'must be a valid ObjectId and is required',
                            },
                            rating: {
                                bsonType: 'number',
                                minimum: 0,
                                maximum: 5,
                                description:
                                    'must be a number between 0 and 5 and is required',
                            },
                            comment: {
                                bsonType: 'string',
                                description: 'must be a string and is required',
                            },
                        },
                    },
                    description: 'must be an array of review objects and is required',
                },
                timestamp: {
                    bsonType: 'date',
                    description: 'must be a date and is required',
                },
                meta: {
                    bsonType: 'object',
                    properties: {
                        views: {
                            bsonType: 'number',
                            description: 'must be a number and is required',
                        },
                        favorites: {
                            bsonType: 'number',
                            description: 'must be a number and is required',
                        },
                    },
                },
            },
        },
    },
    clusteredIndex: {
        enabled: true,
    },
    timeseries: {
        timeField: 'timestamp',
        metaField: 'meta',
        granularity: 'seconds',
        bucketMaxSpanSeconds: 3600,
    },
    expireAfterSeconds: 3600,
});

db.createCollection('ordersCollection', {
    capped: true,
    size: 1000000,
    max: 1000,
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            required: ['userId', 'serviceId', 'price', 'timestamp'],
            properties: {
                userId: {
                    bsonType: 'objectId',
                    description: 'must be a valid objectId and is required',
                },
                serviceId: {
                    bsonType: 'objectId',
                    description: 'must be a valid objectId and is required',
                },
                price: {
                    bsonType: 'decimal',
                    description: 'must be a decimal and is required',
                },
                timestamp: {
                    bsonType: 'date',
                    description: 'must be a date and is required',
                },
            },
        },
    },
});


db.createCollection('favoritesCollection', {
    capped: true,
    size: 1000000,
    max: 1000,
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            required: ['userId', 'serviceId', 'timestamp'],
            properties: {
                userId: {
                    bsonType: 'objectId',
                    description: 'must be a valid objectId and is required',
                },
                serviceId: {
                    bsonType: 'objectId',
                    description: 'must be a valid objectId and is required',
                },
                timestamp: {
                    bsonType: 'date',
                    description: 'must be a date and is required',
                },
            },
        },
    },
});

db.createCollection('viewsCollection', {
    capped: true,
    size: 1000000,
    max: 1000,
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            required: ['userId', 'serviceId', 'timestamp'],
            properties: {
                userId: {
                    bsonType: 'objectId',
                    description: 'must be a valid objectId and is required',
                },
                serviceId: {
                    bsonType: 'objectId',
                    description: 'must be a valid objectId and is required',
                },
                timestamp: {
                    bsonType: 'date',
                    description: 'must be a date and is required',
                },
            },
        },
    },
});


db.createCollection('favoritesCollection', {
    capped: true,
    size: 1000000,
    max: 1000,
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            required: ['userId', 'serviceId', 'timestamp'],
            properties: {
                userId: {
                    bsonType: 'objectId',
                    description: 'must be a valid objectId and is required',
                },
                serviceId: {
                    bsonType: 'objectId',
                    description: 'must be a valid objectId and is required',
                },
                timestamp: {
                    bsonType: 'date',
                    description: 'must be a date and is required',
                },
            },
        },
    },
});


db.createCollection('reviewsCollection', {
    capped: true,
    size: 1000000,
    max: 1000,
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            required: ['userId', 'serviceId', 'rating', 'comment', 'timestamp'],
            properties: {
                userId: {
                    bsonType: 'objectId',
                    description: 'must be a valid objectId and is required',
                },
                serviceId: {
                    bsonType: 'objectId',
                    description: 'must be a valid objectId and is required',
                },
                rating: {
                    bsonType: 'number',
                    minimum: 0,
                    maximum: 5,
                    description: 'must be a number between 0 and 5 and is required',
                },
                comment: {
                    bsonType: 'string',
                    description: 'must be a string and is required',
                },
                timestamp: {
                    bsonType: 'date',
                    description: 'must be a date and is required',
                },
            },
        },
    },
});


db.createCollection('messagesCollection', {
    capped: true,
    size: 1000000,
    max: 1000,
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            required: ['userId', 'serviceId', 'message', 'timestamp'],
            properties: {
                userId: {
                    bsonType: 'objectId',
                    description: 'must be a valid objectId and is required',
                },
                serviceId: {
                    bsonType: 'objectId',
                    description: 'must be a valid objectId and is required',
                },
                message: {
                    bsonType: 'string',
                    description: 'must be a string and is required',
                },
                timestamp: {
                    bsonType: 'date',
                    description: 'must be a date and is required',
                },
            },
        },
    },
});
