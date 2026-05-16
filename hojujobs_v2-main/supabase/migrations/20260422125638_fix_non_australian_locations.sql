
UPDATE jobs SET location = array_replace(location, '송도', '해외')
WHERE '송도' = ANY(location);
;
