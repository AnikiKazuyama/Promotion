// Degree per one direction
const DEGREE_PER_DIRECTION = 45;
// Inaccuracy for strict directions
const DEGREE_SHIFT = 5;

const DIRECTIONS = ['E', 'NE', 'N', 'NW', 'W', 'SW', 'S', 'SE'];
const degreeToDirection = (degree: number) => DIRECTIONS.find((_, index) => {
    if (degree > 360) {
        throw new Error('А еще больше градусов не хочешь?');
    }

    if (index === 0) {
        const firstSector = (DEGREE_PER_DIRECTION - DEGREE_SHIFT);
        const lastSector = DIRECTIONS.length * DEGREE_PER_DIRECTION;

        return (
            degree < firstSector && degree >= 0)
            || (degree <= lastSector && degree > lastSector - DEGREE_SHIFT);
    }

    const sector = DEGREE_PER_DIRECTION * index;

    // Calculate diagonal directions
    if (index % 2 === 0) {
        return (degree > (sector - DEGREE_SHIFT) && degree < (sector + DEGREE_SHIFT));
    }

    const nextSector = sector + DEGREE_PER_DIRECTION - DEGREE_SHIFT;
    const previousSector = sector - DEGREE_PER_DIRECTION + DEGREE_SHIFT;

    return degree > previousSector && degree < nextSector;
});

export default degreeToDirection;
