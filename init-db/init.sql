CREATE TABLE songs (index INT, name TEXT, artist TEXT, release_date INT, length FLOAT, popularity INT, danceability FLOAT);
CREATE TABLE insert_song_jobs (insert_job_id PRIMARY KEY TEXT, status TEXT,info TEXT);

COPY songs FROM '/docker-entrypoint-initdb.d/data.csv' DELIMITER ',' CSV HEADER;



--index auto generate
SELECT MAX(index) + 1 FROM songs;
CREATE SEQUENCE index_seq START WITH 5484;
ALTER TABLE songs ALTER COLUMN index SET DEFAULT nextval('index_seq');

-- Searching case-insensitively indexes
CREATE INDEX idx_name_lower ON songs (LOWER(name));
CREATE INDEX idx_artist_lower ON songs (LOWER(artist));
CREATE INDEX idx_name_artist_lower ON songs (LOWER(name), LOWER(artist));

-- Add unique for song name and artist(Currently not working due to  multiple CSV records)
ALTER TABLE songs ADD CONSTRAINT unique_name_artist UNIQUE USING INDEX idx_name_artist_lower;
