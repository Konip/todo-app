create TABLE list(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    color VARCHAR(255) NOT NULL
);

create TABLE task(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    completed BOOLEAN,
    listId INTEGER,
    FOREIGN KEY(listId)REFERENCES list(id)
);